import type { Metadata } from "next";
import { getBlogPosts } from "@/sanity/lib/loaders";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software engineering, AI automation, ERP implementation, and digital transformation from the Zabnix team.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogClient posts={posts} />;
}
