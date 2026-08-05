import {
  blogPosts,
  caseStudies,
  openRoles,
  products,
  type BlogPost,
  type CaseStudy,
  type JobRole,
  type Product,
} from "@/lib/data";
import { client, isSanityConfigured } from "@/sanity/lib/client";
import {
  BLOG_POST_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  JOB_ROLE_QUERY,
  JOB_ROLE_SLUGS_QUERY,
  JOB_ROLES_QUERY,
  PRODUCT_QUERY,
  PRODUCT_SLUGS_QUERY,
  PRODUCTS_QUERY,
} from "@/sanity/lib/queries";

type BlogPostSummary = Omit<BlogPost, "content">;
type SanityBlogPost = BlogPostSummary & { body?: unknown[] };

const revalidateOptions = { next: { revalidate: 60 } };

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

function mapSanityBlogPost(post: {
  slug: string;
  category?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  publishedAt?: string;
  readTime?: number;
  gradient?: string;
  border?: string;
  body?: unknown[];
}): SanityBlogPost {
  const isoDate = (post.publishedAt || new Date().toISOString()).slice(0, 10);

  return {
    slug: post.slug,
    category: post.category || "Engineering",
    title: post.title || "Untitled post",
    excerpt: post.excerpt || "",
    author: post.author || "Zabnix Team",
    date: formatDate(isoDate),
    isoDate,
    readTime: post.readTime || 5,
    gradient: post.gradient || "from-blue-600/20 to-cyan-600/20",
    border: post.border || "border-blue-500/15",
    body: Array.isArray(post.body) ? post.body : [],
  };
}

async function fetchFromSanity<T>(query: string, params?: Record<string, string>) {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params ?? {}, revalidateOptions);
  } catch {
    return null;
  }
}

export async function getBlogPosts() {
  const postsFromSanity = await fetchFromSanity<
    {
      slug: string;
      category?: string;
      title?: string;
      excerpt?: string;
      author?: string;
      publishedAt?: string;
      readTime?: number;
      gradient?: string;
      border?: string;
    }[]
  >(BLOG_POSTS_QUERY);

  if (!postsFromSanity?.length) {
    return blogPosts;
  }

  return postsFromSanity.map(mapSanityBlogPost);
}

export async function getBlogPost(slug: string) {
  const postFromSanity = await fetchFromSanity<{
    slug: string;
    category?: string;
    title?: string;
    excerpt?: string;
    author?: string;
    publishedAt?: string;
    readTime?: number;
    gradient?: string;
    border?: string;
    body?: unknown[];
  } | null>(BLOG_POST_QUERY, { slug });

  if (postFromSanity) {
    return mapSanityBlogPost(postFromSanity);
  }

  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export async function getBlogSlugs() {
  const slugsFromSanity = await fetchFromSanity<{ slug: string }[]>(
    BLOG_POST_SLUGS_QUERY
  );

  const combined = new Set(blogPosts.map((post) => post.slug));
  slugsFromSanity?.forEach((entry) => combined.add(entry.slug));

  return Array.from(combined).map((slug) => ({ slug }));
}

export async function getProducts() {
  const productsFromSanity = await fetchFromSanity<Product[]>(PRODUCTS_QUERY);
  return productsFromSanity?.length ? productsFromSanity : products;
}

export async function getProduct(slug: string) {
  const productFromSanity = await fetchFromSanity<Product | null>(PRODUCT_QUERY, {
    slug,
  });

  return productFromSanity ?? products.find((product) => product.slug === slug) ?? null;
}

export async function getProductSlugs() {
  const slugsFromSanity = await fetchFromSanity<{ slug: string }[]>(
    PRODUCT_SLUGS_QUERY
  );

  const combined = new Set(products.map((product) => product.slug));
  slugsFromSanity?.forEach((entry) => combined.add(entry.slug));

  return Array.from(combined).map((slug) => ({ slug }));
}

export async function getCaseStudies() {
  const caseStudiesFromSanity = await fetchFromSanity<CaseStudy[]>(
    CASE_STUDIES_QUERY
  );

  return caseStudiesFromSanity?.length ? caseStudiesFromSanity : caseStudies;
}

export async function getCaseStudy(slug: string) {
  const caseStudyFromSanity = await fetchFromSanity<CaseStudy | null>(
    CASE_STUDY_QUERY,
    { slug }
  );

  return caseStudyFromSanity ?? caseStudies.find((entry) => entry.slug === slug) ?? null;
}

export async function getCaseStudySlugs() {
  const slugsFromSanity = await fetchFromSanity<{ slug: string }[]>(
    CASE_STUDY_SLUGS_QUERY
  );

  const combined = new Set(caseStudies.map((entry) => entry.slug));
  slugsFromSanity?.forEach((entry) => combined.add(entry.slug));

  return Array.from(combined).map((slug) => ({ slug }));
}

export async function getJobRoles() {
  const rolesFromSanity = await fetchFromSanity<JobRole[]>(JOB_ROLES_QUERY);
  return rolesFromSanity?.length ? rolesFromSanity : openRoles;
}

export async function getJobRole(slug: string) {
  const roleFromSanity = await fetchFromSanity<JobRole | null>(JOB_ROLE_QUERY, {
    slug,
  });

  return roleFromSanity ?? openRoles.find((role) => role.slug === slug) ?? null;
}

export async function getJobRoleSlugs() {
  const slugsFromSanity = await fetchFromSanity<{ slug: string }[]>(
    JOB_ROLE_SLUGS_QUERY
  );

  const combined = new Set(openRoles.map((role) => role.slug));
  slugsFromSanity?.forEach((entry) => combined.add(entry.slug));

  return Array.from(combined).map((slug) => ({ slug }));
}
