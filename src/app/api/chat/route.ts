import { NextRequest, NextResponse } from "next/server";

import { answerWithZabnixKnowledge } from "@/lib/zabnix-rag";
import { toSafeErrorMessage } from "@/lib/pinecone-route";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const message =
      body && typeof body === "object" && typeof (body as Record<string, unknown>).message === "string"
        ? (body as Record<string, string>).message.trim()
        : "";

    if (!message) {
      return NextResponse.json({ error: "A non-empty message is required." }, { status: 400 });
    }

    const response = await answerWithZabnixKnowledge(message);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: toSafeErrorMessage(error, "I couldn't answer that from the Zabnix knowledge base right now.") },
      { status: 500 },
    );
  }
}
