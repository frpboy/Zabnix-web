# Product Requirements Document (PRD)
Project: Zabnix Corporate Website
Version: 1.0
Status: Approved for Development

## 1. Product Overview

### 1.1 Objective
Build a modern, high-performance corporate website for Zabnix, positioning the company as a premium product engineering and business automation firm. The website must serve as a lead-generation engine and product showcase, moving away from generic IT company designs to a highly technical, SaaS-like presentation.

### 1.2 Target Audience
- B2B Decision Makers (CEOs, CTOs, Operations Managers)
- Healthcare, Pharmacy, Retail, Education, and Manufacturing enterprises seeking digital transformation.
- Job Seekers (Developers, Designers, Engineers).

### 1.3 Value Proposition
- "Build Faster. Automate Smarter."
- Focus on real business problems, scalable architecture, rapid cycles, and transparent pricing.

---

## 2. Design & UX Strategy

### 2.1 Design Philosophy (The "Vercel" Style)
- **Aesthetic:** Minimal, Fast, Premium, Technical.
- **Theme:** Dark mode first.
- **Visuals:** Lots of whitespace, sharp typography, subtle gradient blurs, tiny grid patterns. Clean micro-animations. No stock photos, giant sliders, or unnecessary icons.
- **Copywriting:** Use active voice (e.g. "Install the CLI" not "The CLI will be installed"). Headings use Title Case, marketing pages use sentence case. Default to positive language.

### 2.2 Brand System
- **Colors:** Background (`#000000`), Foreground (`#ffffff`), Muted (`#888888`).
- **Accents:** Primary (`#ffffff`), Secondary (`#7c3aed`), Accent (`#2563eb`).
- **Gradients:** Linear diagonal `#7c3aed` to `#2563eb`.
- **Typography:** Geist Sans for headings and body; Geist Mono for code/numbers. Apply tabular numbers for data.

---

## 3. Scope & Features (Release 1)

### 3.1 Homepage
- **Hero Section:** Bold wordmark, gradient blur, grid background.
- **Social Proof:** "Trusted By" logos (Healthcare, Pharma, Retail, etc.)
- **Services Showcase:** Software Development, Mobile Apps, ERP Solutions, AI & Automation.
- **Product Showcase:** UI screenshots for ZerpAI ERP, Healthcare Solutions.
- **Tech Stack Marquee:** Flutter, React, Next.js, Node.js, Firebase, PostgreSQL.

### 3.2 Core Business Pages
- **Products:** Listing and individual product detail pages with feature breakdowns and Demo request CTA.
- **Services:** Service descriptions, technology stacks, process flows, and Consultation request CTA.
- **Case Studies:** Problem, solution, and results showcase.
- **Team Showcase (Company):** Modeled after Vercel Design, featuring a masonry grid of team members (Name, Handle, Role, Location) emphasizing global presence and culture.
- **About & Contact:** Company details and Lead capture forms.

### 3.3 Dynamic Modules
- **Careers Portal:** Open positions, job descriptions, and resume upload form.
- **Blog:** SEO-optimized articles, categories, and author attribution.

---

## 4. Technical Architecture

### 4.1 Tech Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Framer Motion.
- **Backend:** Server Actions, Prisma ORM, PostgreSQL (Neon).
- **Hosting & Deployment:** Vercel (frontend & edge functions).
- **Storage:** AWS S3 or Vercel Blob (media, resumes).
- **Email:** Resend (transactional emails, form notifications).

### 4.2 Data Models (High-Level)
- **Leads & Contacts:** Stores all incoming inquiries, demo requests, and consultation bookings.
- **Content:** Products, Services, Industries, Case Studies.
- **Publishing:** Blog Posts, Categories, Authors.
- **HR:** Jobs, Applications (with status tracking).
- **System:** Users, Roles, Audit Logs, Media Library.

### 4.3 Security & Performance Requirements
- **Performance Targets:** Lighthouse 95+, LCP < 2.5s, CLS < 0.1.
- **Security:** Rate limiting on forms, CSRF protection, input validation (Zod).
- **SEO:** Dynamic OpenGraph images, Schema.org JSON-LD, sitemap generation, highly semantic HTML.

---

## 5. User Flows

1. **Lead Generation Flow:** Homepage → Service/Product → Case Study → Contact Form → Success Page.
2. **Demo Request Flow:** Product Detail → Feature Review → Demo Form → Email Notification.
3. **Candidate Flow:** Careers → Job Detail → Apply (Resume Upload) → Application Stored.

---

## 6. Implementation Roadmap

- **Phase 1 (Weeks 1-2):** Repository setup, design system, base components, and Homepage development.
- **Phase 2 (Weeks 3-5):** Core business pages, Careers, Blog, and CMS/Database integration.
- **Phase 3 (Weeks 6-8):** Backend APIs, performance optimization, QA, security hardening, and Vercel production deployment.

## 7. Future Considerations (Phase 2+)
- Client portal for onboarding and project tracking.
- Automated ticketing and support systems.
- Billing and subscription management for SaaS products.
