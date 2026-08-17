import "server-only";

import { deleteArticle, portableTextToPlainText, upsertArticle, type PortableTextBlock } from "@/lib/pinecone-articles";
import { client } from "@/sanity/lib/client";
import { PUBLISHED_BLOG_POST_BY_ID_QUERY } from "@/sanity/lib/queries";

type PublishedSanityArticle = {
  _id: string;
  slug: string;
  title?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
  body?: PortableTextBlock[];
};

/**
 * Always read the current published document rather than trusting webhook body
 * content. This makes retries and delayed deliveries converge on Sanity's
 * latest state and keeps indexing payloads deliberately small.
 */
async function getPublishedArticle(documentId: string) {
  return client.withConfig({ useCdn: false }).fetch<PublishedSanityArticle | null>(
    PUBLISHED_BLOG_POST_BY_ID_QUERY,
    { documentId },
  );
}

export async function syncSanityBlogPost(documentId: string, previousSlug?: string) {
  const article = await getPublishedArticle(documentId);

  if (!article) {
    const result = await deleteArticle(documentId, previousSlug);
    return { action: "deleted" as const, ...result };
  }

  // The existing article index uses the slug in its deterministic record IDs.
  // Remove a renamed document's old prefix before writing the new prefix.
  if (previousSlug && previousSlug !== article.slug) {
    await deleteArticle(documentId, previousSlug);
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

  return { action: "indexed" as const, slug: article.slug, ...result };
}
