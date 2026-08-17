import "server-only";

import type { NextRequest } from "next/server";

export function canIndexPinecone(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const secret = process.env.PINECONE_INDEXING_SECRET;
  const providedSecret = request.headers.get("x-pinecone-indexing-secret");

  return Boolean(secret && providedSecret === secret);
}

export function toSafeErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.startsWith("Missing required server environment variable:")) {
    return error.message;
  }

  return fallback;
}
