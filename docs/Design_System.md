# Design System Specification
Project: Zabnix Corporate Website

## 1. Design Tokens

### 1.1 Colors
**Backgrounds:**
- Base Background: `#000000` (Pitch Black)
- Surface/Card: `#0a0a0a` (Very dark grey)
- Elevated Surface: `#111111`

**Text (Foreground):**
- Primary Text: `#ffffff`
- Secondary/Muted Text: `#888888` (or `text-gray-400`)

**Brand & Accents:**
- Primary Brand (White): `#ffffff`
- Accent 1 (Purple): `#7c3aed` (Violet 600)
- Accent 2 (Blue): `#2563eb` (Blue 600)
- Gradient: `linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)`

### 1.2 Typography
- **Font Family:** Geist Sans (primary) and Geist Mono (for code/data).
- **Tabular Numbers:** Use `font-variant-numeric: tabular-nums` (or Geist Mono) for comparisons and data tables.
- **Quotes:** Prefer typographic curly quotes (“ ”) over straight quotes (" ").
- **Formatting:** Avoid widows/orphans by tidying line breaks.
- **H1:** 4rem (64px), Tracking tight (`-0.02em`), Bold.
- **H2:** 3rem (48px), Tracking tight, Semi-bold.
- **H3:** 2rem (32px), Semi-bold.
- **Body:** 1.125rem (18px), Normal weight, Muted color.

### 1.3 Spacing, Borders & Shadows
- **Border Radius:** `0.5rem` (8px) for buttons/cards. Use nested radii where child radius ≤ parent radius.
- **Borders:** Crisp borders using semi-transparent colors (e.g., `1px solid rgba(255,255,255,0.1)`). Combine borders and shadows to improve edge clarity.
- **Shadows:** Use layered shadows to mimic ambient + direct light (at least two layers).
- **Alignment:** Optical alignment. Adjust ±1px when perception beats geometry. Every element aligns intentionally.

### 1.4 Theming
- **Theme Color:** Set `<meta name="theme-color" content="#000000">` to align the browser’s theme color with the page background.
- **Color-scheme:** Set `color-scheme: dark` on the `<html>` tag to ensure scrollbars match the dark theme.

---

## 2. UI Components

### 2.1 Buttons
- **Primary:** Background `#ffffff`, Text `#000000`. Hover: `#e5e5e5`.
- **Secondary:** Background transparent, Border `#333333`, Text `#ffffff`. Hover: Background `#111111`.
- **Accent:** Background Gradient (Purple to Blue), Text `#ffffff`.

### 2.2 Cards
- **Base:** Background `#0a0a0a`, Border `#1a1a1a`, Padding `1.5rem`.
- **Hover State:** Border transitions to slightly lighter (`#333333`) or subtle gradient glow on hover. No drastic drop shadows.

### 2.3 Inputs & Forms
- **Base:** Background `#000000`, Border `#333333`, Text `#ffffff`.
- **Focus:** Ring `2px solid #7c3aed`, outline none.
- **Labels:** Text `#888888`, 0.875rem (14px), uppercase, slight letter spacing.
