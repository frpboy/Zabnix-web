import { defineQuery } from "next-sanity";

export const BLOG_POST_SLUGS_QUERY = defineQuery(
  `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`
);

export const BLOG_POSTS_QUERY = defineQuery(
  `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){
    "slug": slug.current,
    category,
    title,
    excerpt,
    "author": coalesce(author->name, "Zabnix Team"),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "readTime": coalesce(readTime, 5),
    "gradient": coalesce(gradient, "from-blue-600/20 to-cyan-600/20"),
    "border": coalesce(border, "border-blue-500/15")
  }`
);

export const BLOG_POST_QUERY = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]{
    "slug": slug.current,
    category,
    title,
    excerpt,
    "author": coalesce(author->name, "Zabnix Team"),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "readTime": coalesce(readTime, 5),
    "gradient": coalesce(gradient, "from-blue-600/20 to-cyan-600/20"),
    "border": coalesce(border, "border-blue-500/15"),
    body
  }`
);

export const PRODUCT_SLUGS_QUERY = defineQuery(
  `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`
);

export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && defined(slug.current)] | order(orderRank asc, name asc){
    "slug": slug.current,
    tag,
    name,
    tagline,
    description,
    gradient,
    industries,
    features[]{
      title,
      desc
    },
    specs[]{
      label,
      value
    }
  }`
);

export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{
    "slug": slug.current,
    tag,
    name,
    tagline,
    description,
    gradient,
    industries,
    features[]{
      title,
      desc
    },
    specs[]{
      label,
      value
    }
  }`
);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`
);

export const CASE_STUDIES_QUERY = defineQuery(
  `*[_type == "caseStudy" && defined(slug.current)] | order(orderRank asc, company asc){
    "slug": slug.current,
    industry,
    company,
    title,
    problem,
    solution,
    results[]{
      iconName,
      value,
      label
    },
    gradient,
    border,
    tag,
    detailedProblem,
    detailedSolution,
    detailedResults
  }`
);

export const CASE_STUDY_QUERY = defineQuery(
  `*[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    industry,
    company,
    title,
    problem,
    solution,
    results[]{
      iconName,
      value,
      label
    },
    gradient,
    border,
    tag,
    detailedProblem,
    detailedSolution,
    detailedResults
  }`
);

export const JOB_ROLE_SLUGS_QUERY = defineQuery(
  `*[_type == "jobRole" && defined(slug.current)]{ "slug": slug.current }`
);

export const JOB_ROLES_QUERY = defineQuery(
  `*[_type == "jobRole" && defined(slug.current)] | order(orderRank asc, title asc){
    title,
    department,
    location,
    type,
    "slug": slug.current,
    description,
    responsibilities,
    requirements
  }`
);

export const JOB_ROLE_QUERY = defineQuery(
  `*[_type == "jobRole" && slug.current == $slug][0]{
    title,
    department,
    location,
    type,
    "slug": slug.current,
    description,
    responsibilities,
    requirements
  }`
);
