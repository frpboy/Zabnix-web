# Zabnix Web

**Build faster. Automate smarter.**

The corporate website for Zabnix — a premium product engineering firm delivering software development, AI automation, ERP systems, and mobile applications for enterprise clients across healthcare, pharma, retail, and manufacturing.

---

## What This Is

This is a marketing-grade corporate website that functions as Zabnix's primary lead-generation engine and product showcase. It is not a generic template — every design decision, from the light-canvas layout to the grid background, was intentionally chosen to position Zabnix alongside tier-1 SaaS companies like Vercel, Linear, and Stripe.

The site is **not a CMS-driven brochure**. It is a developer-owned, code-first marketing site where content lives in source code, pages are statically generated at build time, and every interaction is designed to convert B2B decision-makers.

---

## Design Philosophy

The visual language is modeled after a premium Vercel-inspired light-canvas design:

- **Light-Canvas by Default:** The page body sits on a clean near-white canvas (`#fafafa`). Inset regions use `#f5f5f5` and elevated card surfaces use pure white (`#ffffff`).
- **Mesh Gradients for Decoration:** The single source of color at marketing scale is a multi-stop mesh gradient (Develop blue/teal, Preview violet/pink, and Ship coral/amber). It operates as atmospheric depth backdrops at hero scale.
- **Typography-First:** Custom geometric sans typography carrying the display weight (display ceiling is 600, never 700+). Headlines feature aggressive negative tracking (`-0.04em` to `-0.05em`) to feel modern and tight.
- **Sentence-Case, Period-Terminated Headlines:** Headlines like "Build faster. Automate smarter." are sentence-case and end with a deliberate period to communicate authority and finality.
- **Technical Monospace Layer:** Monospaced typography is reserved as a secondary technical layer for section eyebrows, console prompts, and code blocks to signal engineering rigour.
- **Subtle Stacked Shadows:** Card surfaces sit held by inset hairline borders and stacked multi-layered low-opacity shadows (Level 1–5), faking natural light elevation without heavy drop-shadow blurs.

### Brand Tokens

| Token | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| Canvas Soft | `var(--background)` | `#fafafa` | Page body background |
| Canvas | `var(--surface)` | `#ffffff` | Elevated cards and forms |
| Canvas Soft 2 | N/A | `#f5f5f5` | Inset code mockup boxes, active rows |
| Ink / Primary | `var(--foreground)` | `#171717` | Primary conversion target, body text, dark polarity bands |
| Muted | `var(--muted)` | `#888888` | Low-priority labels, placeholder text |
| Hairline | `var(--border)` | `#ebebeb` | Card borders, inputs, tables, dividers |
| Hairline Strong | `var(--border-hover)` | `#a1a1a1` | Focus borders, stronger divider lines |
| Link Blue | N/A | `#0070f3` | Success states and inline text links |

---

## Architecture

### Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | React Server Components, fast static generation, Vercel-native |
| Language | TypeScript | Type safety across dynamic route parameters and state props |
| Styling | Tailwind CSS v3 | Utility-first styling, zero dead CSS in production |
| Icons | Lucide React | Clean, tree-shakable svg icons |
| Animation | CSS Keyframes | Hardware-accelerated transitions without JS overhead |

### Content Architecture

All marketing copy and mock data are structured inside a single file `src/lib/data.ts` using timezone-safe formatting. This design prevents hydration mismatches between server and client environments while keeping lists easily maintainable.

### Pinecone Content Indexing (Phase 1)

Sanity content can be indexed server-side into the `zabnix-knowledge` Pinecone index. Pinecone integrated embeddings use the index's `llama-text-embed-v2` model, so the app sends source text in the configured `text` field and never creates embedding vectors locally. Records live in the `articles` namespace.

Set these server-only variables in `.env.local` and in the deployment environment:

```bash
PINECONE_API_KEY=
PINECONE_INDEX_NAME=zabnix-knowledge
# Required only to permit indexing in production.
PINECONE_INDEXING_SECRET=
```

In development, index the existing Sanity test article with:

```bash
curl -X POST http://localhost:3000/api/pinecone/index-sanity-article \
  -H "Content-Type: application/json" \
  -d '{"slug":"zabnix-cms-test-post"}'
```

Test semantic retrieval after Pinecone has finished indexing the record:

```bash
curl -X POST http://localhost:3000/api/pinecone/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is this Zabnix CMS test post about?"}'
```

Index all published Sanity blog posts with:

```bash
curl -X POST http://localhost:3000/api/pinecone/index-all-articles
```

`POST /api/pinecone/index-sanity-article` reindexes one published article by slug, and `POST /api/pinecone/upsert` accepts a validated manual article payload. Each article is converted from Portable Text to clean plain text, then split at paragraph boundaries into deterministic chunks of about 6,000 characters (with a small 400-character overlap). This stays conservatively below the model's 2,048-token input limit while preserving semantic context.

Chunk IDs use `<slug>-chunk-<index>`, such as `zabnix-cms-test-post-chunk-0`. Reindexing upserts those stable IDs; after successful upserts, it lists only that slug's chunk-ID prefix and removes obsolete chunks. This avoids duplicates and never deletes records for other articles. Each record includes `articleId`, `slug`, `title`, `category`, `excerpt`, `chunkIndex`, optional `publishedAt`, `source: "sanity"`, and `documentType: "article"`; its searchable chunk is stored in `text`.

Indexing endpoints are development-only unless requests include a matching `x-pinecone-indexing-secret` header in production. A future phase can pass semantic-search results to an LLM and then the website chatbot; neither is implemented here.

### RAG Chat (Phase 3)

`POST /api/chat` accepts `{ "message": "..." }`. It retrieves the most relevant `articles` records from Pinecone, excludes results below `PINECONE_MINIMUM_SIMILARITY` (default `0.15`; a retrieval filter, not a confidence percentage), and sends compact title/category/slug/text context to Gemini. Gemini is server-only and uses Vertex AI Application Default Credentials; no Google or Pinecone credential is sent to the browser.

Set these non-secret configuration values locally and in the deployed server environment:

```bash
GOOGLE_CLOUD_PROJECT=shield-zabnix
GOOGLE_CLOUD_LOCATION=global
GOOGLE_GENAI_USE_VERTEXAI=true
GEMINI_MODEL=gemini-2.5-flash
```

For local development, authenticate outside this repository with `gcloud auth application-default login`, and ensure the Vertex AI API and billing are enabled for the project. The endpoint returns a concise grounded `answer` plus a deduplicated `sources` array. It does not use web search, long-term memory, or an LLM tool chain.

### Sanity → Pinecone Webhook (Phase 4)

Published Sanity `blogPost` documents are synchronized through `POST https://<your-production-domain>/api/webhooks/sanity`.

Add this server-only value locally and in the deployment environment; generate a long random secret and never prefix it with `NEXT_PUBLIC_`:

```bash
SANITY_WEBHOOK_SECRET=
```

In Sanity Manage, open project `lihbhllf`, then **API → Webhooks → Create webhook**:

- Dataset: `production`; method: `POST`; URL: `https://<your-production-domain>/api/webhooks/sanity`
- Trigger on `Create`, `Update`, and `Delete`; filter: `_type == "blogPost"`
- Include drafts: off; include versions: off; set the webhook secret to `SANITY_WEBHOOK_SECRET`
- Use this projection:

```groq
{
  "documentId": _id,
  "documentType": _type,
  "slug": coalesce(after().slug.current, before().slug.current),
  "previousSlug": before().slug.current,
  "operation": delta::operation()
}
```

The endpoint verifies Sanity’s `sanity-webhook-signature` against the raw body before parsing. It fetches the latest published document directly from Sanity, so delayed and retried deliveries converge on current content. Deterministic `<slug>-chunk-<index>` IDs make repeated deliveries safe, while reindexing removes stale chunks. Deleting or unpublishing removes every record whose `articleId` matches the Sanity document. The delivery `idempotency-key` is logged for traceability.

Only `blogPost` is wired because it is the only registered Sanity schema in this repository. Products, case studies, jobs, services, and company knowledge remain code-owned and continue to use `POST /api/pinecone/index-website-knowledge`; no missing Sanity schemas were invented.

#### Local webhook tests

Start the app with a non-empty `SANITY_WEBHOOK_SECRET` in `.env.local`, then replace the placeholders with a published Sanity blog-post ID and slug. This produces a Sanity-format signature using the same verifier as the route.

```powershell
$articleId = "<published-sanity-blog-post-id>"
$slug = "<current-slug>"
$env:ARTICLE_ID = $articleId
$env:ARTICLE_SLUG = $slug
node -e "const {encodeSignatureHeader}=require('@sanity/webhook'); const body=JSON.stringify({documentId:process.env.ARTICLE_ID,documentType:'blogPost',slug:process.env.ARTICLE_SLUG,previousSlug:process.env.ARTICLE_SLUG,operation:'update'}); encodeSignatureHeader(body,Date.now(),process.env.SANITY_WEBHOOK_SECRET).then(async signature=>{const response=await fetch('http://localhost:3000/api/webhooks/sanity',{method:'POST',headers:{'content-type':'application/json','sanity-webhook-signature':signature,'idempotency-key':crypto.randomUUID()},body}); console.log(response.status,await response.text())})"
```

Run that command after publishing an update to verify chunk replacement. For deletion or unpublishing, change `operation` to `delete`, keep the last known `$slug`, remove the published document first, then send the request; `result.action` will be `deleted`.

To validate authentication without touching Pinecone:

```powershell
Invoke-WebRequest -Method Post -Uri "http://localhost:3000/api/webhooks/sanity" -ContentType "application/json" -Headers @{ "sanity-webhook-signature" = "t=1700000000000,v1=invalid" } -Body '{"documentId":"test","documentType":"blogPost","operation":"update"}'
```

This returns HTTP `401`.

---

## Pages & Routing

All pages live under `src/app/` using the Next.js App Router.

```
/                   → Homepage (Hero, TrustedBy, ServicesGrid, ProductShowcase, TechStack, CaseStudies, ContactCTA)
/services           → Services listing with deliverables breakdown
/services#<id>      → Anchor to specific service (software, mobile, erp, ai, consulting, security)
/products           → Product catalog (ZerpAI ERP, Healthcare Suite)
/products/[slug]    → Individual product detail + request demo sidebar
/company            → Team showcase (Vercel-style card grid, stats, global presence)
/careers            → Open roles list + perks
/careers/[slug]     → Individual job detail + resume application sidebar
/blog               → Blog post listing
/blog/[slug]        → Individual blog post + newsletter aside
/case-studies       → Case study listing with outcomes
/case-studies/[slug]→ Full case study detailed problem, approach, and results
/contact            → Full contact form + info cards
```

---

## Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, Navbar, Footer, skip link
│   ├── globals.css         # Design system: tokens, scrollbars, animations, utilities
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Stark 404 page
│   ├── services/
│   ├── products/
│   ├── company/
│   ├── careers/
│   ├── blog/
│   ├── case-studies/
│   └── contact/
├── components/
│   ├── forms/              # Interactive Client Forms
│   │   ├── JobApplicationForm.tsx  # Resume upload, drag-and-drop form
│   │   └── ProductDemoForm.tsx     # Demo booking form
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky glass navbar with logo and consultation CTAs
│   │   └── Footer.tsx      # Mono uppercase eyebrows, company links, social rows
│   └── sections/           # Homepage sections
│       ├── Hero.tsx
│       ├── TrustedBy.tsx
│       ├── ServicesGrid.tsx
│       ├── ProductShowcase.tsx
│       ├── TechStack.tsx
│       ├── CaseStudies.tsx
│       └── ContactCTA.tsx
└── lib/
    ├── data.ts             # Central mock database for blog posts, jobs, case-studies
    └── utils.ts            # cn() utility: clsx + tailwind-merge
```

### Component Rules

1. **Server Components by default.** Every page and section remains an RSC unless it requires local state, document access, or event handlers.
2. **`"use client"` at the leaf.** Interactive form handlers (`JobApplicationForm`, `ProductDemoForm`), the `Navbar` (for scroll threshold detection), and the main `ContactPage` are client components.
3. **`cn()` for conditional styles.** Never concatenate raw strings for CSS classes. Always use `cn(...)` to merge utility overrides correctly.
4. **Button & Input Shape Consistency.** Inputs, nav CTA elements, and inner form buttons use a tight `rounded-[6px]` (6px) radius for cohesion. Large marketing CTAs use `rounded-full` (100px) pills to command attention.

---

## Key Design Patterns

### Grid Background

A light grid pattern is generated via linear CSS gradients at 2% opacity (`rgba(23, 23, 23, 0.02)`). Mapped via the `.grid-bg` class, it delivers a clean "technical blueprint" structure without loading heavy SVG assets.

### Stacked Elevation Shadows

Elevated cards and surfaces use multiple box shadow layers to simulate organic lighting. For instance, Level 3 feature cards apply:
`box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05) inset, 0px 2px 2px rgba(0, 0, 0, 0.04), 0px 8px 8px -8px rgba(0, 0, 0, 0.04);`

The inset hairline border guarantees that card contours remain sharp on any display.

### Polarity Flipped Code Mockups

To keep the page active and offer depth cues, specific mockups (like code panels in `ProductShowcase`) use deep ink backgrounds (`bg-[#121212]` with `#2e2e2e` borders) and syntax highlights.

---

## SEO & Accessibility

- **Skip Link:** A keyboard-focusable `<a href="#main-content">` is the first node in `layout.tsx` to enable fast keyboard navigation.
- **Semantic Tags:** Uses `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, and `<nav>` with appropriate labels.
- **ARIA Compliance:** Interactive components have explicit names, labels, and roles. Icon buttons include `aria-label` tags, and decorative assets include `aria-hidden="true"`.
- **Metadata API:** Page titles are dynamically generated via a layout title template (`%s | Zabnix`) and viewport colors match the canvas theme.
- **Touch Targets:** Interactive targets comfortably exceed the 44px hit footprint minimum.

---

## Products Cataloged

### ZerpAI ERP
An intelligent enterprise resource planning platform purpose-built for manufacturing, retail, logistics, and distribution. Includes real-time inventory tracking, procurement systems, multi-currency accounting, and customized predictive demand forecasting using client historical transactions.

### Healthcare Solutions
A HIPAA-compliant platform for clinics, hospital networks, and pharmacies. Manages EMR data, patient scheduling, automated billing, lab reports, and integrates telemedicine services.

---

## Roadmap

### Phase 1 — Stark Light-Canvas Theme ✅
- [x] Design token migration (`globals.css`, `tailwind.config.ts`)
- [x] Translucent white navigation header and clean monospace footer
- [x] Homepage sections visually adapted to light theme
- [x] Listing pages redesigned (Products, Services, Company, Careers, Blog, Case Studies)
- [x] Detail routes adapted (`/products/[slug]`, `/careers/[slug]`, `/blog/[slug]`, `/case-studies/[slug]`)
- [x] Interactive resumes & product demo client forms redesigned

### Phase 2 — Database & server actions
- [ ] Neon PostgreSQL schema integration via Prisma (leads, applications)
- [ ] Email notifications server actions (Resend API)
- [ ] Dynamic sitemap and robots generation
- [ ] Production audit check for Lighthouse scoring 95+

---

*This README describes the project architecture and design philosophy. It is a living document — update it whenever a significant architectural decision is made.*
