import { NextRequest, NextResponse } from "next/server";

import { portableTextToPlainText, upsertArticle, type PortableTextBlock } from "@/lib/pinecone-articles";
import { canIndexPinecone, toSafeErrorMessage } from "@/lib/pinecone-route";
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
  if (!canIndexPinecone(request)) {
    return NextResponse.json({ error: "Indexing is not authorized." }, { status: 403 });
  }

  try {
    const articles = await client.fetch<SanityArticle[]>(ALL_PUBLISHED_BLOG_POSTS_QUERY);
    const failures: { slug: string; error: string }[] = [];
    let articlesIndexed = 0;
    let chunksCreated = 0;
    let staleRecordsDeleted = 0;

    for (const article of articles) {
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
        articlesIndexed += 1;
        chunksCreated += result.chunksCreated;
        staleRecordsDeleted += result.staleRecordsDeleted;
      } catch {
        failures.push({ slug: article.slug, error: "Unable to index this article." });
      }
    }

    return NextResponse.json({
      success: failures.length === 0,
      namespace: "articles",
      articlesFound: articles.length,
      articlesIndexed,
      chunksCreated,
      recordsUpserted: chunksCreated,
      staleRecordsDeleted,
      failures,
    });
  } catch (error) {
    return NextResponse.json(
      { error: toSafeErrorMessage(error, "Unable to fetch published Sanity articles.") },
      { status: 500 },
    );
  }
}
