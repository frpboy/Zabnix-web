import { NextRequest, NextResponse } from "next/server";

import { upsertArticle } from "@/lib/pinecone-articles";
import { portableTextToPlainText, type PortableTextBlock } from "@/lib/pinecone-articles";
import { canIndexPinecone, toSafeErrorMessage } from "@/lib/pinecone-route";
import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY } from "@/sanity/lib/queries";

export const runtime = "nodejs";

const DEFAULT_TEST_SLUG = "zabnix-cms-test-post";

type SanityArticle = {
  _id: string;
  slug: string;
  title?: string;
  category?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  readTime?: number;
  body?: PortableTextBlock[];
};

export async function POST(request: NextRequest) {
  if (!canIndexPinecone(request)) {
    return NextResponse.json({ error: "Indexing is not authorized." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json().catch(() => ({}));
    const requestedSlug =
      body && typeof body === "object" && typeof (body as Record<string, unknown>).slug === "string"
        ? (body as Record<string, string>).slug.trim()
        : DEFAULT_TEST_SLUG;

    if (!requestedSlug) {
      return NextResponse.json({ error: "A non-empty slug is required." }, { status: 400 });
    }

    const article = await client.fetch<SanityArticle | null>(BLOG_POST_QUERY, { slug: requestedSlug });

    if (!article) {
      return NextResponse.json({ error: "Sanity article not found." }, { status: 404 });
    }

    const result = await upsertArticle({
      id: article._id,
      title: article.title || "Untitled post",
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      text: portableTextToPlainText(article.body),
      publishedAt: article.publishedAt,
    });

    return NextResponse.json({
      indexed: true,
      namespace: "articles",
      recordId: result.recordId,
      chunksCreated: result.chunksCreated,
      staleRecordsDeleted: result.staleRecordsDeleted,
      slug: article.slug,
    });
  } catch (error) {
    return NextResponse.json(
      { error: toSafeErrorMessage(error, "Unable to fetch or index the Sanity article.") },
      { status: 500 },
    );
  }
}
