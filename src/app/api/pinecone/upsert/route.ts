import { NextRequest, NextResponse } from "next/server";

import { upsertArticle, type PineconeArticleInput } from "@/lib/pinecone-articles";
import { canIndexPinecone, toSafeErrorMessage } from "@/lib/pinecone-route";

export const runtime = "nodejs";

function isArticlePayload(value: unknown): value is PineconeArticleInput {
  if (!value || typeof value !== "object") return false;

  const article = value as Record<string, unknown>;
  return ["id", "title", "slug", "text"].every(
    (field) => typeof article[field] === "string" && article[field].trim().length > 0,
  ) &&
    (article.category === undefined || typeof article.category === "string") &&
    (article.excerpt === undefined || typeof article.excerpt === "string");
}

export async function POST(request: NextRequest) {
  if (!canIndexPinecone(request)) {
    return NextResponse.json({ error: "Indexing is not authorized." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();

    if (!isArticlePayload(body)) {
      return NextResponse.json(
        { error: "Invalid article payload. id, title, slug, and text are required strings." },
        { status: 400 },
      );
    }

    const result = await upsertArticle(body);
    return NextResponse.json({
      indexed: true,
      namespace: "articles",
      recordId: result.recordId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: toSafeErrorMessage(error, "Unable to upsert the Pinecone record.") },
      { status: 500 },
    );
  }
}
