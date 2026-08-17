import { NextRequest, NextResponse } from "next/server";

import { searchArticles } from "@/lib/pinecone-articles";
import { toSafeErrorMessage } from "@/lib/pinecone-route";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const query =
      body && typeof body === "object" && typeof (body as Record<string, unknown>).query === "string"
        ? (body as Record<string, string>).query.trim()
        : "";

    if (!query) {
      return NextResponse.json({ error: "A non-empty query is required." }, { status: 400 });
    }

    const results = await searchArticles(query);
    return NextResponse.json({ namespace: "articles", results });
  } catch (error) {
    return NextResponse.json(
      { error: toSafeErrorMessage(error, "Unable to search Pinecone.") },
      { status: 500 },
    );
  }
}
