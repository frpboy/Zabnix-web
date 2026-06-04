# Zabnix Web

**Build Faster. Automate Smarter.**

The corporate website for Zabnix — a premium product engineering firm delivering software development, AI automation, ERP systems, and mobile applications for enterprise clients across healthcare, pharma, retail, and manufacturing.

---

## What This Is

This is a marketing-grade corporate website that functions as Zabnix's primary lead-generation engine and product showcase. It is not a generic template — every design decision, from the dark-mode grid background to the glassmorphism navbar, was intentionally chosen to position Zabnix alongside tier-1 SaaS companies like Vercel, Linear, and Stripe.

The site is **not a CMS-driven brochure**. It is a developer-owned, code-first marketing site where content lives in source code, pages are statically generated at build time, and every interaction is designed to convert B2B decision-makers.

---

## Design Philosophy

The entire aesthetic is modeled after the "Vercel school" of design:

- **Dark by default.** Background is pure `#000000`. No dark-grey compromises.
- **Typography-first.** Headlines carry the weight. No hero illustrations, no stock photos.
- **Negative space as a feature.** Generous padding, tight type scales, and nothing unnecessary.
- **Subtle motion.** Gradient orbs pulse. Cards glow on hover. The marquee scrolls. Nothing shouts.
- **Premium without being expensive.** The site should feel like it costs $500k to build but loads in under 1 second.

### Brand Tokens

| Token | Value | Usage |
|---|---|---|
| `--background` | `#000000` | Page background |
| `--surface` | `#0a0a0a` | Cards, panels |
| `--elevated` | `#111111` | Tooltips, dropdowns |
| `--foreground` | `#ffffff` | Primary text |
| `--muted` | `#888888` | Secondary text |
| Accent Purple | `#7c3aed` | Primary brand accent, focus rings |
| Accent Blue | `#2563eb` | Secondary gradient endpoint |
| Gradient | `135deg #7c3aed → #2563eb` | CTAs, icons, highlights |

---

## Architecture

### Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC-first, best-in-class DX, Vercel-native |
| Language | TypeScript | Type safety across all components |
| Styling | Tailwind CSS v3 | Utility-first, zero dead CSS in production |
| Icons | Lucide React | Crisp, consistent, tree-shakable |
| Animation | CSS Keyframes | Compositor-safe, no JavaScript overhead |
| Hosting | Vercel (planned) | Edge network, preview deployments, analytics |

### Why No CMS (Yet)

Content is in source code for now. This was a deliberate Phase 1 decision — moving fast matters more than a CMS dashboard when you're the only editor. Phase 2 will evaluate Sanity or Contentlayer for blog posts and case studies once the editorial workflow has more than one contributor.

### Why No `framer-motion`

It was in the original `package.json` but removed. Every animation on the site is achievable with CSS keyframes and `transition` properties — no 50kB runtime needed. Framer Motion will be reintroduced only if genuinely complex gesture-driven UI is needed.

---

## Pages & Routing

All pages live under `src/app/` using the Next.js App Router.

```
/                   → Homepage (Hero, Services, Products, TechStack, CaseStudies, Contact CTA)
/services           → Services listing with deliverables breakdown
/services#<id>      → Anchor to specific service (software, mobile, erp, ai, consulting, security)
/products           → Product catalog (ZerpAI ERP, Healthcare Suite)
/products/zerpai    → ZerpAI ERP product detail (planned)
/products/healthcare → Healthcare Suite product detail (planned)
/company            → Team showcase (Vercel-style grid, stats, global presence)
/careers            → Open roles list + perks
/careers/<slug>     → Individual job detail + application form (planned)
/blog               → Blog post listing
/blog/<slug>        → Individual blog post (planned)
/case-studies       → Case study listing with metrics
/case-studies/<slug>→ Full case study (planned)
/contact            → Full contact form + consultation booking anchor
```

---

## Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, Navbar, Footer, skip link
│   ├── globals.css         # Design system: tokens, animations, utilities
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404
│   ├── services/
│   ├── products/
│   ├── company/
│   ├── careers/
│   ├── blog/
│   ├── case-studies/
│   └── contact/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky glass navbar, mobile menu
│   │   └── Footer.tsx      # 4-column footer, social links
│   └── sections/           # Homepage sections (one file per section)
│       ├── Hero.tsx
│       ├── TrustedBy.tsx
│       ├── ServicesGrid.tsx
│       ├── ProductShowcase.tsx
│       ├── TechStack.tsx
│       ├── CaseStudies.tsx
│       └── ContactCTA.tsx
└── lib/
    └── utils.ts            # cn() utility: clsx + tailwind-merge
```

### Component Rules

1. **Server Components by default.** Every component is an RSC unless it explicitly needs browser APIs or event handlers.
2. **`"use client"` at the leaf.** The `Navbar` (scroll detection), `ContactCTA` (form state), and the Contact page (submit state) are the only client components.
3. **`cn()` for all class composition.** Never raw string concatenation. Always `cn(base, conditional)`.
4. **No inline styles except for dynamic values.** Position offsets for gradient orbs use inline styles because they're numeric — everything else is Tailwind.

---

## Key Design Patterns

### The Gradient Orb

Used on every hero section to add depth without photography. Two orbs overlapping at slight offsets — one purple, one blue — filtered to `blur(120px)` and animated with a slow `pulseGlow` keyframe. They never distract; they only add atmosphere.

### The Grid Background

A CSS `background-image` with two orthogonal `linear-gradient` lines at 3% opacity. Applied via `.grid-bg` utility class. Creates the "technical blueprint" feel without any SVG overhead.

### The Card Glow

Cards use `.card-glow` which on `:hover` adds a `box-shadow` with a purple hue and transitions `border-color` to a violet tint. The transition uses explicit properties (`border-color`, `box-shadow`), never `transition: all`.

### The Marquee

Two infinite marquees — one for industry verticals (TrustedBy), one for the tech stack. Both use a single CSS `@keyframes marquee` animation on a `.marquee-track` div that contains its children duplicated to create a seamless loop. Pauses on hover. Disabled by `prefers-reduced-motion`.

### The Glassmorphism Navbar

`.glass-nav` applies `backdrop-filter: blur(20px)` with a semi-transparent black background. Only activates after 16px of scroll (detected in the `Navbar` client component via a passive scroll listener). Below the fold it's transparent to let the grid show through.

---

## SEO & Performance Strategy

- **Metadata API.** Every page exports a `metadata` object. Root `layout.tsx` sets `title.template` so child pages inherit the brand suffix automatically.
- **OpenGraph & Twitter cards.** Defined in the root layout, overrideable per page.
- **`themeColor: #000000`.** Matches the page background so the browser UI blends seamlessly on mobile.
- **Skip link.** A visually hidden `<a href="#main-content">` is the first focusable element — required for keyboard and screen reader accessibility.
- **`Intl.DateTimeFormat`.** All dates (blog post dates, etc.) use the JavaScript Intl API, never hardcoded format strings. This ensures correct locale output on any system.
- **No layout shift.** No images yet — all visual elements are CSS/DOM. When product screenshots are added, they'll require explicit `width` and `height` attributes.

### Target Metrics (Phase 3)

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 100ms |

---

## Accessibility Commitments

This site is held to WCAG 2.1 AA. Key decisions:

- **Focus rings** use `:focus-visible` (not `:focus`) to avoid showing rings on mouse click.
- **All focus rings** are `2px solid #7c3aed` with an offset — visible on both light and dark surfaces.
- **Icon-only buttons** (`Navbar` hamburger/close) have `aria-label`. Decorative icons have `aria-hidden="true"`.
- **Form labels** are always explicit `<label htmlFor>` elements, never placeholder-only.
- **`aria-live="polite"`** is on the contact form success state so screen readers announce the confirmation.
- **Semantic HTML first.** `<button>` for actions, `<a>` for navigation, `<article>` for blog/case study cards, `<nav>` with `aria-label` for the navbar.
- **`color-scheme: dark`** on `<html>` ensures browser native elements (scrollbars, inputs, selects) match the dark theme.

---

## Content & Copywriting Rules

These rules apply to all content on the site, maintained for consistency across contributors:

- **Active voice.** "Book a consultation" not "A consultation can be booked."
- **Title Case** for all headings and button labels (Chicago style).
- **Sentence case** for body copy and descriptions.
- **Numbers as numerals.** "3 languages" not "three languages."
- **Ellipsis character `…`** not three dots `...` — including in loading states ("Sending…").
- **Typographic quotes** `"` `"` in rendered copy, not straight quotes `"`.
- **Non-breaking spaces** for brand names in running text.
- **Error messages name the fix,** not just the problem.
- **`&` over "and"** in space-constrained UI labels.

---

## Products Documented

### ZerpAI ERP

A full-stack enterprise resource planning platform purpose-built for manufacturing, retail, logistics, and distribution companies. Core modules: inventory management, procurement & PO, finance & accounts, AI demand forecasting, role-based access, and a REST API layer for third-party integrations.

Differentiation: the "AI" in ZerpAI is not marketing. The demand forecasting module uses trained time-series models on the client's historical transaction data. This is not a pre-built plugin; it's custom ML per deployment.

### Healthcare Suite

A HIPAA-compliant all-in-one platform for hospitals, clinics, diagnostic centers, and pharmacies. Modules: EMR, appointment scheduling, billing & insurance claims, lab & radiology portal, pharmacy management, and telemedicine with video consultation.

---

## Roadmap

### Phase 1 — Foundation ✅ (Current)
- [x] Design system & global CSS
- [x] Root layout with metadata
- [x] Navbar & Footer
- [x] Homepage (all sections)
- [x] Services, Products, Company, Careers, Blog, Case Studies, Contact pages

### Phase 2 — Content & Backend
- [ ] Individual product detail pages (`/products/[slug]`)
- [ ] Individual blog post renderer (`/blog/[slug]`)
- [ ] Individual case study pages (`/case-studies/[slug]`)
- [ ] Job detail + application form with resume upload
- [ ] Contact form server action (Resend email notification)
- [ ] Prisma schema + Neon PostgreSQL (leads, applications)
- [ ] Sanity CMS integration for blog & case studies

### Phase 3 — Performance & Launch
- [ ] Dynamic OpenGraph image generation (`og` route)
- [ ] `sitemap.xml` and `robots.txt` generation
- [ ] Schema.org JSON-LD structured data
- [ ] Lighthouse 95+ audit pass
- [ ] Vercel production deployment + custom domain
- [ ] Analytics (Vercel Analytics + PostHog)

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/app/globals.css` | All design tokens, animations, and utility classes |
| `src/app/layout.tsx` | Root layout — the single source of truth for metadata |
| `src/lib/utils.ts` | `cn()` — import this in every component that uses conditional classes |
| `tailwind.config.ts` | Tailwind extensions: colors, radii, font, animations |
| `next.config.mjs` | Next.js configuration |
| `docs/Design_System.md` | Full design token specification |
| `docs/Frontend_Architecture.md` | RSC patterns, state management, animation rules |
| `docs/PRD.md` | Product requirements and business context |
| `AGENTS.md` | Web interface coding guidelines for AI agents |
| `log.md` | Running dev log of all changes made |

---

*This README describes the project architecture and design philosophy. It is a living document — update it whenever a significant architectural decision is made.*
