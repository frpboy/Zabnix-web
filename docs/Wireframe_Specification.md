# Wireframe Specification
Project: Zabnix Corporate Website

## 1. Global Components

### 1.1 Header (Navbar)
- **Left:** Zabnix Logo (Wordmark).
- **Center:** Navigation Links (Products, Services, Case Studies, Company).
- **Right:** Book Consultation (Primary Button, solid #ffffff text #000000).
- **Behavior:** Sticky on scroll, glassmorphism blur effect (`backdrop-blur-md`).

### 1.2 Footer
- **Layout:** 4-column grid.
- **Col 1:** Logo, brief tagline, social links.
- **Col 2:** Products (ZerpAI ERP, Healthcare, etc.).
- **Col 3:** Company (About, Careers, Blog).
- **Col 4:** Contact Info & Legal (Privacy Policy, Terms).

---

## 2. Homepage (Screen-by-Screen)

### 2.1 Hero Section
- **Background:** Black (`#000000`), subtle grid pattern.
- **Headline (H1):** "Build Faster. Automate Smarter." (Large, Inter bold, stark white).
- **Subheadline:** "Software Development, AI Solutions, ERP Systems, Mobile Apps, Business Automation." (Muted grey).
- **CTAs:** [Book Consultation] (Primary) and [View Products] (Secondary outline).
- **Visual:** Floating blurred orb in background using brand gradients.

### 2.2 Social Proof (Trusted By)
- **Layout:** Horizontal scrolling marquee.
- **Content:** Desaturated logos of partner industries (Healthcare, Pharma, Retail).

### 2.3 Services Grid
- **Layout:** 3x2 Grid of Cards.
- **Card Design:** Dark grey background, slight border (`border-gray-800`), hover effect (border glows purple).
- **Content:** Icon, Title (Software Development, Mobile Applications, ERP Solutions), Description.

### 2.4 Product Showcase
- **Layout:** Alternating left/right image and text.
- **Visuals:** High-fidelity mockups of ZerpAI ERP dashboard.
- **Content:** Bullet points highlighting "Built for real business problems".

### 2.5 Tech Stack Section
- **Layout:** Infinite scrolling marquee.
- **Visuals:** Tech logos (Next.js, Flutter, Python, AWS).

---

## 3. Product Detail Page
- **Hero:** Product Name, Tagline, Demo CTA.
- **Features Breakdown:** Sticky sidebar with navigation, scrolling main content area detailing each feature.
- **Screenshots:** Masonry gallery or carousel of UI shots.
- **Bottom CTA:** "Ready to automate?" [Schedule Demo].

---

## 4. Team Showcase Page (Company)
*Modeled after vercel.com/design*
- **Hero:** "Meet our team of designers, engineers, and strategists." with a changing dynamic text for roles.
- **Global Presence Headline:** "Remote, but together. We speak [X] languages and live in [Y] countries."
- **Team Grid:** Masonry or tight CSS Grid of team members.
  - **Card Content:** High-quality portrait (often monochrome or stylized), Full Name, X/Twitter Handle (e.g. `@username`), Role (e.g. `Design Engineer`), Location (e.g. `Estonia`).
  - **Interactions:** Subtle scale and brightness shift on hover. 

---

## 5. Careers Page
- **Hero:** "Join Zabnix" with company culture imagery.
- **Open Roles:** Filterable list (by Department).
- **Job Card:** Title, Location, Type (Remote/On-site). Clicking expands to Job Detail.
- **Application Form:** Name, Email, Resume Upload, Cover Letter text area.
