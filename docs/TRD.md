# Technical Requirements Document (TRD)
Project: Zabnix Corporate Website

## 1. System Architecture
The application uses a serverless, decoupled architecture deployed on Vercel. 
- **Frontend:** Server-Side Rendered (SSR) and Statically Generated (SSG) pages using Next.js.
- **Backend:** Server Actions handle mutations directly from React components without needing explicit REST endpoints for internal logic, though `/api` routes are available for external integrations.
- **Database:** Prisma ORM connects to a pooled Neon Postgres database.

## 2. Performance Requirements
- **Lighthouse Score:** 95+ across all metrics (Performance, Accessibility, Best Practices, SEO).
- **Core Web Vitals:** 
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- **Optimization Strategy:** 
  - Next.js `next/image` for image optimization and WebP/AVIF formatting.
  - Inter/Geist fonts self-hosted or loaded via `next/font` with zero layout shift.

## 3. Security Requirements
- **Authentication:** Role-based access control (RBAC) via Better Auth for admin/CMS areas.
- **Data Validation:** All incoming data (forms, API requests) strictly validated using Zod.
- **Protection Measures:**
  - Rate limiting on API routes and Server Actions (e.g., maximum 5 form submissions per IP per hour).
  - CSRF protection enabled natively by Next.js.
  - SQL Injection prevention guaranteed by Prisma parameterized queries.
  - Strict Content Security Policy (CSP) headers configured in `next.config.mjs`.

## 4. SEO & Metadata
- **Static Metadata:** Defined in `layout.tsx` and `page.tsx` using Next.js Metadata API.
- **Dynamic OpenGraph:** `next/og` used to generate dynamic sharing images for Blog posts and Case Studies.
- **Structured Data:** JSON-LD schema injected into the `<head>` for LocalBusiness, Organization, Article, and JobPosting.
- **Sitemap:** Auto-generated `sitemap.xml` and `robots.txt`.

## 5. Development Workflow
- **Linting & Formatting:** ESLint + Prettier + Husky pre-commit hooks.
- **Branching:** `main` (production), `develop` (staging), `feature/*` (active work).
- **CI/CD:** Automated builds and preview deployments on Vercel for every Pull Request.

## 6. Dependancy rules
- always use latest and stable version of tools and dependacies 