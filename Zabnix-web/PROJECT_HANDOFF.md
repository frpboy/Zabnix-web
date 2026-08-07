# Zabnix Website Project Handoff

## Purpose

This document is the implementation baseline for the Zabnix marketing website. It records the product decisions made during the redesign work, the intended visual system, and the constraints that prevent prior regressions from returning.

The project is a Next.js, React, TypeScript, and Tailwind website with Framer Motion used for restrained, one-time viewport reveals. The visual direction is premium enterprise SaaS: Apple, Linear, Stripe, and Vercel references, but always within the Zabnix identity.

## Product Principles

- Use a white canvas, subtle grid backgrounds where already established, thin neutral borders, generous whitespace, and black-first typography.
- Use the Zabnix blue to purple to pink gradient only as a deliberate brand accent, never as a page background or a loud decorative treatment.
- Prefer rounded surfaces, low-contrast shadows, and monochrome interface elements.
- Avoid generic template patterns: excessive glass, bright gradients, heavy shadows, stock illustrations, or dense dashboard-like marketing sections.
- Preserve established page structure unless a task explicitly requests a structural change.
- Motion should be quiet: opacity and transform, `whileInView`/viewport once, reduced-motion support, no bounce or continuous distraction.

## Global Navigation

- Primary navigation is implemented through `src/components/ui/PillNav.tsx`.
- Main routes are Products, Services, Case Studies, People, and Blog, with Contact and Book Consultation actions on the right.
- The Zabnix logo is sourced from `public`; retain the current logo scale while keeping the navigation banner height compact.
- Pill hover motion was intentionally slowed. Do not restore fast, abrupt hover transitions.
- Contact is an outlined, rounded monochrome action. Book Consultation is the inverse black rounded action.

## Home Page

### Hero

- Headline remains `Build faster.` followed by `Automate smarter.`
- Supporting copy: `From startups to enterprises, we create custom digital solutions that streamline operations, enhance customer experiences, and drive business growth.`
- Only `Automate smarter.` receives the premium cursor-light/shader treatment. `Build faster.` must remain completely unaffected.
- The interactive headline must never translate, scale, rotate, skew, or otherwise move letters. Use CSS variables, radial gradient/masking layers, and requestAnimationFrame only.
- Cursor tracking is disabled on mobile and when reduced motion is requested.

### Trust, Statistics, and Industries

- The trust/logo section sits between the hero and statistics. It uses a quiet `Trusted by` label and monochrome client marks, not logo cards.
- Example placeholder client marks: Northstar, Meridian, Axis, Vertex, and Nova. Keep them low-contrast by default with a subtle opacity hover.
- Statistics use the approved values: `50+ Successful Projects`, `20+ Business Partners`, and `5+ Years of Innovation` where the home statistics component is shown.
- Statistics may use small neutral icons and count-up motion, but the original spacing and premium restraint must remain intact.
- `Trusted Across Industries` remains an understated infinite text marquee with soft edge fading. It must not use blue separator dots or icons.
- The How We Work timeline was moved off the Home page. Do not reintroduce it there.

## Products

### ZerpAI ERP Showcase

- ZerpAI is the reference layout for product showcases. Other products should align with its integrated two-column system without changing ZerpAI itself.
- The product section is one unified premium container, not a left card next to a separate dashboard card.
- Left content includes the product eyebrow, title, concise proposition, industry tags, feature list, and CTAs.
- Right content is a real React dashboard preview, never a screenshot, iframe, image, or placeholder.
- ZerpAI headline: `ZerpAI ERP`; proposition: `The intelligent ERP for modern operations.`
- Use the industry tags Healthcare, Retail, Manufacturing, and Distribution. Tags should fit on one line where possible and retain dark text.
- Feature list uses meaningful Lucide icons: Package, ShoppingCart, Landmark, and Sparkles. Keep the icons black in the final product showcase styling.

### Dashboard Preview

- Maintain a compact hero-dashboard proportion, wider than tall, so the entire product section can be understood within one desktop viewport.
- Keep a narrow dark sidebar, compact top bar, six KPI cards, sales/finance widgets, and recent order activity. Avoid a full-application density.
- Remove detached badges such as `AI Powered`, `ISO 27001`, and temporary task callouts if they cause visual overflow.
- Search, company selector, notification controls, KPI values, and all top-bar controls must remain inside the browser frame at every supported size.
- Currency values must fit their cards. Do not render unwanted leading negative signs for the cash-on-hand value.
- Reuse the existing `AnimatedCounter` implementation for all preview KPI values. Cards reveal in sequence, numbers count once, and progress bars fill after number motion begins.
- Preview and full demo should share ERP primitives instead of duplicating markup: shell, sidebar, navbar, metric card, chart card, table, and controls.

### Product Demo and Launch

- Full interactive ZerpAI demo route: `/products/zerpai/demo`.
- The demo uses realistic Indian-business mock data and has no backend, authentication, or external API dependency.
- The Launch action links to `https://zerpai.pages.dev/login` in a new tab with `rel="noopener noreferrer"`.
- Other product previews follow the ZerpAI product-card visual language. The Retail Platform `Convenience` tag was explicitly removed.

## Services

### Hero

- Eyebrow: `OUR SERVICES`.
- Headline lines: `From idea to production.` and `Enterprise engineering without compromise.`
- Supporting text: `Whether you're launching a new platform, modernizing existing software, or automating complex workflows, our team delivers scalable digital solutions designed for long-term growth.`
- Retain service pills: Custom Software, Enterprise ERP, AI Automation, Mobile Apps, and Cloud Solutions.
- The old capability/check row below the pills was removed. Do not restore it.

### How We Work

- This reusable timeline belongs on Services directly below the hero, before service blocks.
- It contains Discovery, Strategy, Design, Build, Launch, and Support.
- Final direction is compact, monochrome, and editorial: small left-aligned `HOW WE WORK` label, a constrained timeline container, 60-64px circles, thin gray line, and neutral icons.
- Tooltips must remain fully visible above nodes without clipping. Ensure parent containers do not hide tooltip overflow.
- Hover progress and tooltip interaction remains, but no oversized headline/description should be reintroduced into this section.

### Editorial Service Blocks

- Preserve the alternating zig-zag layout and all existing content/copy.
- Each service is a premium editorial content block with a distinct live preview. Do not replace previews with technology logos or generic static illustrations.
- Previews may include subtle domain-specific activity: code cursor for software, phone transitions for mobile, dashboard updates for ERP, workflow nodes for AI, roadmap milestones for consulting, and verification scan states for security.
- Keep interactions subtle and use card-level viewport reveal only once. The content hierarchy, spacing, typography, CTA location, and alternating layout must not change without approval.
- Remove the temporary mobile preview `New task` callout.

### Technologies We Use

- The final section uses only the small `TECHNOLOGIES WE USE` label, left aligned in the content container. The former large heading and supporting paragraph were removed.
- Display exactly six technology categories in a responsive 3x2 grid: Frontend, Backend, Cloud & DevOps, AI & Automation, Mobile, and Data & Storage.
- Use `react-icons/si` Simple Icons where installed, rendered monochrome, with labels beneath each icon in a 2x2 grid.
- Technology cards are clean white rounded cards with thin neutral borders. Keep them compact and less wide than early iterations.
- The technology-section bottom callout (`Modern stack. Future ready.`) was removed. Do not restore it.

## Case Studies

### Hero

- Eyebrow: `OUR WORK`.
- Heading: `Real projects. Real clients. Real results.`
- Supporting copy: `Explore how we've helped businesses modernize operations, automate workflows, and build software that creates lasting value.`
- Preserve left alignment, grid background, monochrome styling, and restrained hero entrance.

### Case Study Visual Stories

- Keep the existing overall card structure: industry/client, headline, problem, solution, visualization, and CTA.
- Cards were reduced in size for a more concise executive-report feel.
- Healthcare uses average wait-time before/after and a patient wait trend line.
- Retail/inventory uses inventory holding cost declining from approximately Rs 3.6Cr to Rs 1.6Cr with savings chips.
- Manufacturing/ERP rollout uses a horizontal deployment timeline with milestones, plants, records migrated, and duration.
- Visualizations are bespoke SVG/React elements. Do not convert them into uniform KPI rows or use external chart libraries.
- Case-study CTAs use the approved animated monochrome button treatment. Ensure the resting state returns cleanly after hover.
- The `Start a Project` CTA follows the same approved animation pattern.

## People

### Hero and Team

- Hero eyebrow: `ZABNIX · OUR PEOPLE`.
- Heading starts with `Meet our team of`, followed by a fixed-height masked vertical role slider.
- Roles cycle Engineers, Designers, Architects, Builders, Problem Solvers, and Innovators. Preserve the approved accent mapping and smooth 600ms vertical transition with roughly 2200ms pause.
- Do not change hero height or create layout shifts when role length changes.
- Decorative geometry is subtle, abstract, and motion-reduced aware. It must not distract from the role slider.
- Team profiles use the final names and roles: Shabin (CEO), Althaf (UI Engineer), Deepthi (Senior Developer), Rahul (Catalyst), Arun/Muzamil/Anshad (Junior Developers), Jinshad (Data Analyst), and Shamil/Sinan/Asarudheen (Trainees).
- All profile locations are India. Social handles follow the latest supplied data in the source.
- Team cards are white-dominant with retained soft shadows, black initial avatars, compact social-icon bar, and a subtle avatar interaction.
- The peer-card blur/scale effect must activate only while an actual team card is hovered. Empty space in an incomplete grid must not trigger blur.
- GitHub and LinkedIn controls remain present. Their compact dark icon buttons use the premium tilt/background treatment; GitHub tilts black and LinkedIn tilts blue.

### Values and Careers

- The older regional-language and By the Numbers sections were removed. Do not restore them.
- `WHAT WE STAND FOR` is centered in the values section. It includes the principles interaction with only the active principle emphasized; Innovation must not remain permanently bold.
- Keep values spacing compact and use the line divider between major People sections.
- `View Open Roles` uses the same final animated visual treatment as the Case Studies `Start a Project` CTA.

## Blog

- Blog uses an editorial, cover-story direction rather than generic article cards.
- Preserve the Blog route, featured article layout, and the current article content unless copy is explicitly requested.
- The hero and featured article need balanced spacing; avoid the large blank gap previously visible between the blog hero metrics and the featured article.
- The current blog client implementation is in `src/app/blog/BlogClient.tsx`; treat existing uncommitted work there as user work unless directly assigned.
- **Weekly Engineering Dispatch Section**:
  - Located immediately before the footer.
  - Concludes the page cleanly inside a white `max-w-7xl` container of `350px` height.
  - Displays a clean visual headline: `"Stay close to the work."` (52px, font-black, leading-0.95) with compact description, form input (placeholder slides left on focus), and stacked interactive social avatars.
  - The right column contains a realistic `"Latest Dispatch"` internal memo card which dynamically rotates between Dispatches `#127` through `#124` every 6 seconds using vertical slide transitions.
  - Interactive details include card-hover lift (6px) and shadow depth, button hover arrow offset, and input focus border glow. Do not scale, bloat, or add decorative SVG artwork or blueprints here.

## Contact and Footer

- Preserve all existing contact information and field content. Design work changes presentation only.
- The current preferred contact treatment is black-and-white, with white as the dominant surface, rounded inputs, and a rounded submit button.
- Keep visible focus states and semantic form labels.
- Footer continues to use the existing Zabnix information architecture. Do not remove routes or replace links with non-semantic clickable elements.

## Shared Motion Contract

- Use shared Framer Motion variants rather than per-page copies.
- Typical reveal: opacity 0 to 1 and `y: 20-40` to 0, 0.7-0.9 seconds, ease-out, `viewport={{ once: true, amount: 0.25 }}`.
- Stagger reading order by approximately 80-120ms.
- Preview/dashboard surfaces can reveal from 0.97/0.98 scale to 1; avoid bounce, spring overshoot, permanent shimmer, or movement of text itself.
- Respect `prefers-reduced-motion` and disable cursor tracking/continuous motion when requested.
- Animate transform and opacity where possible. Avoid `transition: all` and layout-changing animation.

## Architecture Guidance

- Keep server-to-client boundaries explicit. Client interactions, motion, mouse tracking, and DOM observers belong in client components.
- Server components may pass serializable data only. Do not pass Lucide icon component functions or other class/function values as props to client components.
- For service metadata, use a serializable `iconName` string and resolve it inside the client component, or define the icon-bearing configuration inside that client component.
- Extract reusable sections into `src/components/sections`, UI primitives into `src/components/ui`, and ERP showcase primitives into a dedicated showcase area.
- Maintain one source of truth for ERP components used by both the product mini preview and `/products/zerpai/demo`.
- Existing important files include `src/components/ui/PillNav.tsx`, `src/components/sections/ServiceEditorialBlock.tsx`, and `src/app/blog/BlogClient.tsx`.

## Known Failure Modes and Recovery

### React Server Component Serialization

Error patterns:

- `Only plain objects can be passed to Client Components from Server Components`
- `Functions cannot be passed directly to Client Components`

Cause: passing an imported icon component such as `CodeXml` within a server-rendered data object to a client component.

Fix: pass serializable icon names or move the configuration into the client component. Never mark icon functions as server actions to work around this.

### Stale Next Development Artifacts

Error patterns:

- `webpack_modules[moduleId] is not a function`
- missing React Client Manifest module errors
- `Cannot read properties of undefined (reading '/_app')`
- chunk timeout for `/_next/static/chunks/app/layout.js`

Recovery: stop the dev server, delete only the generated `.next` directory, then restart the dev server. Do not reset Git, revert source work, or change package versions as the first response.

### Icon or Favicon 500 Errors

- Verify the referenced `public` asset or App Router icon route exists and is a valid file.
- Remove invalid generated icon exports rather than returning an unresolved object/event.
- Restart after clearing `.next` if the asset was recently changed.

### Hydration Warnings

- Browser extensions can inject attributes such as `fdprocessedid` before hydration. Reproduce in a clean browser profile before changing application code.
- Do not use `suppressHydrationWarning` as a default fix.

### Tailwind Editor Warning

- `Unknown at rule @tailwind` is often an editor-language configuration warning. Confirm the installed Tailwind version and VS Code extension/configuration before changing valid global CSS directives.

## Verification Checklist

- Run the project scripts defined in `package.json`, especially lint and production build, after meaningful changes.
- Test desktop, tablet, and mobile for each route.
- Confirm fixed headers do not hide content and no horizontal overflow exists.
- Confirm tooltips, product controls, tags, and dashboard top bars stay inside their parent frames.
- Confirm hover effects do not trigger from empty grid areas.
- Confirm keyboard focus is visible for navigation, CTA buttons, team social links, and form controls.
- Confirm animation runs once, does not replay on reverse scrolling, and respects reduced motion.
- Confirm external ZerpAI launch links use a new tab with `noopener noreferrer`.

## Git and Deployment Notes

- Do not use `git reset --hard`, `git checkout --`, or other destructive recovery commands on this project.
- A historical known-good point supplied by the project owner is `d5f566fc2b9e4e48a84c80c002f6298a1cfb296c`.
- A later referenced commit is `0970c8a06e3bd42dcacd3c3792202170a1902e3b`. Before pushing or synchronizing, inspect remotes, branches containing each commit, and the diff between them.
- Use `git remote -v`, `git branch -a --contains <commit>`, `git log --decorate`, and `git diff <older>..<newer>` before selecting a remote/branch.
- Verify the target GitHub account and repository URL before any push. Never force-push to reconcile account confusion.
- The worktree may contain user changes. Preserve them unless the user explicitly asks otherwise.

## Do Not Reintroduce

- The Home-page How We Work section.
- The old Services capability check row.
- Technology section headline/supporting paragraph or bottom stack callout.
- People page regional-language and old By the Numbers sections.
- Screenshots, iframes, or image placeholders for ERP product previews.
- Detached dashboard badges, overflowing search bars, the Mobile `New task` badge, or removed Retail `Convenience` tag.
- Blue industry-marquee dots/icons, logo cards, loud gradients, excessive glass effects, or generic repeated KPI rows.

## Handoff Standard

When making future changes, inspect the existing component and its neighboring section before editing. Preserve the final content and layout decisions above, make one scoped change at a time, and verify both the affected route and shared navigation afterward. The intended outcome is a cohesive, restrained, high-confidence enterprise website rather than a collection of individual UI experiments.
