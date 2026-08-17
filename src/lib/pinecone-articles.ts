import "server-only";

import { getPineconeArticlesNamespace } from "@/lib/pinecone";

export type PineconeArticleInput = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  text: string;
  publishedAt?: string;
};

export type PortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: { text?: string }[];
};

type SearchHitFields = {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  text?: string;
  source?: string;
  documentType?: string;
  articleId?: string;
  chunkIndex?: number;
  publishedAt?: string;
};

const CHUNK_TARGET_CHARACTERS = 6_000;
const CHUNK_OVERLAP_CHARACTERS = 400;
const UPSERT_BATCH_SIZE = 96;

export function portableTextToPlainText(body: PortableTextBlock[] | undefined) {
  let number = 0;

  return (body ?? [])
    .flatMap((block) => {
      if (block._type !== "block") return [];

      const value = block.children?.map((child) => child.text ?? "").join("").replace(/\s+/g, " ").trim();
      if (!value) return [];

      if (block.listItem === "number") {
        number += 1;
        return [`${number}. ${value}`];
      }

      if (block.listItem === "bullet") return [`- ${value}`];
      number = 0;
      return [block.style && block.style.startsWith("h") ? `${value}` : value];
    })
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildArticleText(article: PineconeArticleInput) {
  return [
    `Title: ${article.title}`,
    article.category && `Category: ${article.category}`,
    article.excerpt && `Excerpt: ${article.excerpt}`,
    article.text && `Body:\n${article.text}`,
  ]
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

export function getArticleRecordId(slug: string, chunkIndex = 0) {
  return `${slug}-chunk-${chunkIndex}`;
}

export function chunkArticleText(text: string) {
  const paragraphs = text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const addChunk = () => {
    if (current.trim()) chunks.push(current.trim());
  };

  for (const paragraph of paragraphs) {
    if (!current) {
      current = paragraph;
      continue;
    }

    if (current.length + paragraph.length + 2 <= CHUNK_TARGET_CHARACTERS) {
      current += `\n\n${paragraph}`;
      continue;
    }

    addChunk();
    const overlap = current.slice(-CHUNK_OVERLAP_CHARACTERS).replace(/^\S*\s/, "").trim();
    current = [overlap, paragraph].filter(Boolean).join("\n\n");

    while (current.length > CHUNK_TARGET_CHARACTERS) {
      const splitAt = current.lastIndexOf(" ", CHUNK_TARGET_CHARACTERS);
      chunks.push(current.slice(0, splitAt > 0 ? splitAt : CHUNK_TARGET_CHARACTERS).trim());
      current = current.slice(splitAt > 0 ? splitAt : CHUNK_TARGET_CHARACTERS).trim();
    }
  }

  addChunk();
  return chunks;
}

function partition<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

async function getArticleRecordIds(slug: string) {
  const namespace = getPineconeArticlesNamespace();
  const ids: string[] = [];
  let paginationToken: string | undefined;

  do {
    const page = await namespace.listPaginated({
      prefix: `${slug}-chunk-`,
      paginationToken,
    });
    ids.push(...(page.vectors ?? []).flatMap((vector) => (vector.id ? [vector.id] : [])));
    paginationToken = page.pagination?.next;
  } while (paginationToken);

  return ids;
}

/**
 * Removes every record that belongs to a Sanity article. Metadata deletion is
 * intentional: a slug can change, while the Sanity document ID remains stable.
 */
export async function deleteArticle(articleId: string, slug?: string) {
  const namespace = getPineconeArticlesNamespace();
  const prefixedRecordIds = slug ? await getArticleRecordIds(slug) : [];

  if (prefixedRecordIds.length) {
    await namespace.deleteMany({ ids: prefixedRecordIds });
  }

  // This also removes records made under an earlier slug, including any that
  // predate the current webhook delivery.
  await namespace.deleteMany({ filter: { articleId: { $eq: articleId } } });

  return { recordsDeletedBySlug: prefixedRecordIds.length };
}

export async function upsertArticle(article: PineconeArticleInput) {
  const text = buildArticleText(article);

  if (!text) {
    throw new Error("Article text must not be empty.");
  }

  const chunks = chunkArticleText(text);
  const records = chunks.map((chunk, chunkIndex) => ({
    _id: getArticleRecordId(article.slug, chunkIndex),
    text: chunk,
    title: article.title,
    slug: article.slug,
    category: article.category || "Uncategorized",
    excerpt: article.excerpt || "",
    source: "sanity",
    documentType: "article",
    articleId: article.id,
    chunkIndex,
    ...(article.publishedAt ? { publishedAt: article.publishedAt } : {}),
  }));
  const namespace = getPineconeArticlesNamespace();
  const existingRecordIds = await getArticleRecordIds(article.slug);

  for (const batch of partition(records, UPSERT_BATCH_SIZE)) {
    await namespace.upsertRecords({ records: batch });
  }

  const currentRecordIds = new Set(records.map((record) => record._id));
  const staleRecordIds = existingRecordIds.filter((id) => !currentRecordIds.has(id));
  if (staleRecordIds.length) await namespace.deleteMany({ ids: staleRecordIds });

  return { recordId: records[0]._id, text, chunksCreated: records.length, staleRecordsDeleted: staleRecordIds.length };
}

export async function searchArticles(query: string, topK = 5) {
  const namespace = getPineconeArticlesNamespace();
  const response = await namespace.searchRecords({
    query: {
      inputs: { text: query },
      topK,
    },
    fields: [
      "title",
      "slug",
      "category",
      "excerpt",
      "text",
      "source",
      "documentType",
      "articleId",
      "chunkIndex",
      "publishedAt",
    ],
  });

  return response.result.hits.map((hit) => {
    const fields = hit.fields as SearchHitFields;

    return {
      id: hit._id,
      score: hit._score,
      title: fields.title ?? null,
      slug: fields.slug ?? null,
      category: fields.category ?? null,
      excerpt: fields.excerpt ?? null,
      text: fields.text ?? null,
      metadata: fields,
    };
  });
}
