import "server-only";

import { chunkArticleText } from "@/lib/pinecone-articles";
import { getPineconeArticlesNamespace } from "@/lib/pinecone";

const UPSERT_BATCH_SIZE = 96;

export type PineconeKnowledgeDocument = {
  idPrefix: string;
  documentType: "product" | "caseStudy" | "jobRole" | "service" | "company";
  source: string;
  route: string;
  title: string;
  text: string;
  slug?: string;
  category?: string;
};

function partition<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));
}

async function getRecordIds(idPrefix: string) {
  const namespace = getPineconeArticlesNamespace();
  const ids: string[] = [];
  let paginationToken: string | undefined;
  do {
    const page = await namespace.listPaginated({ prefix: `${idPrefix}:chunk:`, paginationToken });
    ids.push(...(page.vectors ?? []).flatMap((vector) => vector.id ? [vector.id] : []));
    paginationToken = page.pagination?.next;
  } while (paginationToken);
  return ids;
}

export async function upsertKnowledgeDocument(document: PineconeKnowledgeDocument) {
  const text = document.text.trim();
  if (!text) throw new Error("Knowledge document text must not be empty.");

  const chunks = chunkArticleText(text);
  const records = chunks.map((chunk, chunkIndex) => ({
    _id: `${document.idPrefix}:chunk:${chunkIndex}`,
    text: chunk,
    documentType: document.documentType,
    source: document.source,
    route: document.route,
    title: document.title,
    ...(document.slug ? { slug: document.slug } : {}),
    ...(document.category ? { category: document.category } : {}),
    chunkIndex,
  }));
  const namespace = getPineconeArticlesNamespace();
  const existingRecordIds = await getRecordIds(document.idPrefix);
  for (const batch of partition(records, UPSERT_BATCH_SIZE)) await namespace.upsertRecords({ records: batch });

  const currentIds = new Set(records.map((record) => record._id));
  const staleIds = existingRecordIds.filter((id) => !currentIds.has(id));
  if (staleIds.length) await namespace.deleteMany({ ids: staleIds });

  return { chunksCreated: records.length, staleRecordsDeleted: staleIds.length };
}
