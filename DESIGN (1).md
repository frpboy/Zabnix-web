# Vercel Design

## Mission
Create implementation-ready, token-driven UI guidance for Vercel Design that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: Vercel Design
- URL: https://vercel.com/design
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Geist`, `font.family.stack=Geist, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=20px`, `font.size.xl=40px`, `font.size.2xl=52px`
- Color palette: `color.text.primary=#ededed`, `color.text.secondary=#0000ee`, `color.text.tertiary=#ffffff`, `color.text.inverse=#a1a1a1`, `color.surface.base=#000000`, `color.surface.muted=#ff990a`, `color.surface.raised=#0062d1`, `color.surface.strong=#df2670`, `color.border.muted=#333333`
- Spacing scale: `space.1=2px`, `space.2=4px`, `space.3=8px`, `space.4=16px`, `space.5=20px`, `space.6=24px`, `space.7=32px`, `space.8=120px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=16px`, `radius.md=20px`, `radius.lg=9999px` | `motion.duration.instant=150ms`, `motion.duration.fast=250ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (34), buttons (5).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
