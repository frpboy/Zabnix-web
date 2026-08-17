import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { NextRequest, NextResponse } from "next/server";

import { syncSanityBlogPost } from "@/lib/sanity-pinecone-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookPayload = {
  documentId?: unknown;
  documentType?: unknown;
  slug?: unknown;
  previousSlug?: unknown;
  operation?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function logWebhook(event: string, details: Record<string, string | number | undefined>) {
  console.info("[sanity-pinecone-webhook]", event, details);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[sanity-pinecone-webhook] configuration error: SANITY_WEBHOOK_SECRET is missing");
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const isValid = Boolean(signature && await isValidSignature(rawBody, signature, secret));
  if (!isValid) {
    console.warn("[sanity-pinecone-webhook] rejected invalid signature");
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Webhook payload must be valid JSON." }, { status: 400 });
  }

  const documentId = getString(payload.documentId) ?? getString(request.headers.get("sanity-document-id"));
  const documentType = getString(payload.documentType);
  const operation = getString(payload.operation) ?? getString(request.headers.get("sanity-operation"));
  const previousSlug = getString(payload.previousSlug) ?? getString(payload.slug) ?? undefined;
  const deliveryId = request.headers.get("idempotency-key") ?? undefined;

  if (!documentId || !documentType || !operation) {
    return NextResponse.json({ error: "Webhook payload is missing documentId, documentType, or operation." }, { status: 400 });
  }

  if (!new Set(["create", "update", "delete"]).has(operation)) {
    return NextResponse.json({ error: "Webhook operation is invalid." }, { status: 400 });
  }

  if (documentType !== "blogPost") {
    logWebhook("ignored unsupported document type", { documentId, documentType, operation, deliveryId });
    return NextResponse.json({ ignored: true, reason: "Unsupported document type." });
  }

  try {
    const result = await syncSanityBlogPost(documentId, previousSlug);
    logWebhook("sync completed", { documentId, documentType, operation, deliveryId, result: result.action });
    return NextResponse.json({ ok: true, documentId, documentType, operation, deliveryId, result });
  } catch (error) {
    console.error("[sanity-pinecone-webhook] sync failed", {
      documentId,
      documentType,
      operation,
      deliveryId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    // A 5xx lets Sanity safely retry. The sync is idempotent because record IDs
    // are deterministic and stale records are deleted after each upsert.
    return NextResponse.json({ error: "Unable to synchronize document." }, { status: 500 });
  }
}
