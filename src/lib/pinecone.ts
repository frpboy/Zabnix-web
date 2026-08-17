import "server-only";

import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_INDEX_NAME;

function requireEnvironmentValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}

export const PINECONE_ARTICLES_NAMESPACE = "articles";

export function getPineconeArticlesNamespace() {
  const pinecone = new Pinecone({
    apiKey: requireEnvironmentValue(apiKey, "PINECONE_API_KEY"),
  });

  return pinecone
    .index(requireEnvironmentValue(indexName, "PINECONE_INDEX_NAME"))
    .namespace(PINECONE_ARTICLES_NAMESPACE);
}
