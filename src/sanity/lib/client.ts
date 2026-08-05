import { createClient } from "next-sanity";
import { apiVersion } from "@/sanity/lib/api-version";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lihbhllf";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(projectId && dataset);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
