# Launch Checklist

This checklist must be reviewed, executed, and signed off by the engineering team before deploying the Zabnix website to production.

---

## 1. SEO & Metadata Verification
- [ ] **Meta Titles & Descriptions**: Verify that all routes (Homepage, Products, Services, Company, Careers, Blog, Contact) have unique, descriptive meta metadata values defined.
- [ ] **Canonical URL**: Verify `metadataBase` is set to `https://zabnix.com`.
- [ ] **Dynamic XML Sitemap**: Navigate to `/sitemap.xml` and check that all static and dynamic paths (`/products/[slug]`, `/careers/[slug]`, `/blog/[slug]`) compile successfully.
- [ ] **Robots configuration**: Navigate to `/robots.txt` and verify `/api/` and admin dashboards are blocked for crawlers.
- [ ] **Image Alt Text**: Verify all `<img>` or `Image` components have explicit `alt` descriptions defined.

---

## 2. Analytics & Tracking
- [ ] **Clarity ID Check**: Verify `NEXT_PUBLIC_CLARITY_ID` is defined in production environment settings.
- [ ] **Script Injection**: Open the browser developer console on landing and ensure the Clarity tracking code fires without throwing network or security CSP errors.

---

## 3. Interactive Forms & Lead Capture
- [ ] **Form Validation**: Test all form inputs (Contact consultation, demo requests, and job applications) with invalid inputs (e.g. invalid emails, missing required inputs) to confirm inline validation warnings trigger.
- [ ] **Submitting state**: Verify that submit buttons disable and show a loading indicator (e.g. `Requesting Demo…`) while the request is in progress.
- [ ] **Success states**: Verify that successful submissions redirect to a clean success card (`role="alert"` and `aria-live="polite"`).

---

## 4. Mailer Integrations (Resend)
- [ ] **Environment Settings**: Confirm `RESEND_API_KEY` is configured in production.
- [ ] **Delivery Testing**: Trigger test form entries to ensure emails arrive in sales and hiring inboxes with correct customer payload layouts.

---

## 5. Mobile & Responsive Layouts
- [ ] **Touch Targets**: Verify all buttons, links, and forms meet the minimum WCAG touch target floor (at least `44x44px` or padded bounds).
- [ ] **Text Overflow**: Verify that text containers on mobile screens wrap or clamp correctly without breaking page dimensions horizontally (no horizontal scrollbar on body).
- [ ] **Navbar collapse**: Verify the navigation collapses into a responsive menu layout on viewports `<600px`.

---

## 6. Accessibility (A11y)
- [ ] **Skip Navigation**: Ensure the "Skip to main content" link is present, focusable, and links correctly to `<main id="main-content">`.
- [ ] **Interactive Elements**: Verify all icon-only buttons have an `aria-label` defined.
- [ ] **Semantic elements**: Verify lists (`<ul>`/`<li>`), navigation (`<nav>`), footers (`<footer>`), and headings (`<h1>` - `<h6>`) use standard HTML5 semantic elements.
- [ ] **Keyboard navigation**: Ensure all interactive cards and fields are tab-focusable and can be selected/submitted using the keyboard alone.

---

## 7. Performance & Optimization
- [ ] **Images Dimensions**: Verify all standard images have defined width and height attributes to avoid Cumulative Layout Shift (CLS).
- [ ] **Fonts Rendering**: Verify fonts render with `font-display: swap` to prevent long blank screen intervals during asset loading.
- [ ] **Bundle size check**: Run `npm run build` and ensure JavaScript assets do not exceed default Next.js bundle budgets.
