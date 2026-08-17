import { NextRequest, NextResponse } from "next/server";

import { upsertKnowledgeDocument } from "@/lib/pinecone-knowledge";
import { portableTextToPlainText, upsertArticle, type PortableTextBlock } from "@/lib/pinecone-articles";
import { canIndexPinecone, toSafeErrorMessage } from "@/lib/pinecone-route";
import { getWebsiteKnowledgeDocuments } from "@/lib/website-knowledge";
import { client } from "@/sanity/lib/client";
import { ALL_PUBLISHED_BLOG_POSTS_QUERY } from "@/sanity/lib/queries";

export const runtime = "nodejs";

type SanityArticle = {
  _id: string;
  slug: string;
  title?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
  body?: PortableTextBlock[];
};

export async function POST(request: NextRequest) {
  if (!canIndexPinecone(request)) return NextResponse.json({ error: "Indexing is not authorized." }, { status: 403 });

  try {
    const documents = getWebsiteKnowledgeDocuments();
    const summary = new Map<string, { items: number; chunksCreated: number; staleChunksRemoved: number; failures: string[] }>();
    for (const document of documents) {
      const entry = summary.get(document.documentType) ?? { items: 0, chunksCreated: 0, staleChunksRemoved: 0, failures: [] };
      entry.items += 1;
      try {
        const result = await upsertKnowledgeDocument(document);
        entry.chunksCreated += result.chunksCreated;
        entry.staleChunksRemoved += result.staleRecordsDeleted;
      } catch {
        entry.failures.push(document.idPrefix);
      }
      summary.set(document.documentType, entry);
    }

    const articlesEntry = { items: 0, chunksCreated: 0, staleChunksRemoved: 0, failures: [] as string[] };
    try {
      const articles = await client.fetch<SanityArticle[]>(ALL_PUBLISHED_BLOG_POSTS_QUERY);
      for (const article of articles) {
        articlesEntry.items += 1;
        try {
          const result = await upsertArticle({
            id: article._id,
            title: article.title || "Untitled post",
            slug: article.slug,
            category: article.category,
            excerpt: article.excerpt,
            text: portableTextToPlainText(article.body),
            publishedAt: article.publishedAt,
          });
          articlesEntry.chunksCreated += result.chunksCreated;
          articlesEntry.staleChunksRemoved += result.staleRecordsDeleted;
        } catch {
          articlesEntry.failures.push(article.slug);
        }
      }
    } catch {
      articlesEntry.failures.push("sanity-blog-fetch");
    }
    summary.set("blogPost", articlesEntry);

    return NextResponse.json({
      success: [...summary.values()].every((entry) => entry.failures.length === 0),
      namespace: "articles",
      contentTypes: Object.fromEntries(summary),
      itemsIndexed: documents.length,
      chunksCreated: [...summary.values()].reduce((total, entry) => total + entry.chunksCreated, 0),
      staleChunksRemoved: [...summary.values()].reduce((total, entry) => total + entry.staleChunksRemoved, 0),
      failures: [...summary.entries()].flatMap(([contentType, entry]) => entry.failures.map((idPrefix) => ({ contentType, idPrefix }))),
    });
  } catch (error) {
    return NextResponse.json({ error: toSafeErrorMessage(error, "Unable to index website knowledge.") }, { status: 500 });
  }
}
