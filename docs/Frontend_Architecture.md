# Frontend Architecture Specification
Project: Zabnix Corporate Website

## 1. Next.js App Router Paradigms

### 1.1 Server vs. Client Components
- **Default:** All components are React Server Components (RSC) by default. This ensures zero client-side JavaScript for static content, maximizing performance and SEO.
- **Client Boundary (`"use client"`):** Only used at the leaf nodes of the component tree when interactivity is required:
  - Form state handling (React Hook Form).
  - Animations (Framer Motion).
  - Browser APIs (window, localStorage).
  - Event listeners (onClick, onChange).

### 1.2 Data Fetching
- Data fetching occurs on the server inside Server Components directly using Prisma.
- Example: 
  ```tsx
  // src/app/blog/page.tsx
  import { db } from "@/lib/prisma"
  
  export default async function BlogPage() {
    const posts = await db.post.findMany({ where: { published: true } })
    return <BlogList posts={posts} />
  }
  ```

## 2. State Management & Interactions
- **URL State:** Used for search filters, tabs, and pagination to ensure shareability (e.g., using `nuqs`). Deep-link everything.
- **Local State:** React `useState` / `useReducer` for component-level UI state (e.g., toggling a modal).
- **Form State:** `react-hook-form` integrated with `@hookform/resolvers/zod`.
  - Do not pre-disable submit. Keep submit enabled until submission starts; disable during in-flight requests and show a loading state.
  - Enter submits text inputs if focused.
  - Show validation feedback inline without blocking typing.
- **Interactions:**
  - **Hydration Safe:** Inputs must not lose focus or value after hydration.
  - **Optimistic Updates:** Update the UI immediately when success is likely; reconcile on server response.
  - **Ellipsis:** Append an ellipsis to menus that open a follow-up ("Rename…") and loading states ("Saving…").
  - **Keyboard Operable:** All flows must be keyboard-operable with clear focus rings (`:focus-visible`). Avoid dead zones.

## 2.5 Animations
- **Preference:** CSS > Web Animations API > JavaScript libraries (e.g. framer-motion).
- **Properties:** Animate only compositor-friendly properties (opacity, transform) to avoid layout thrash. Never use `transition: all`.
- **Interruptible:** Animations must be cancelable by user input.
- **Reduced Motion:** Always provide a `prefers-reduced-motion` variant.

## 3. Component Architecture
Based on atomic principles and Shadcn UI:
- **UI Primitives (`/components/ui`):** Buttons, Inputs, Dialogs. Highly reusable, strictly controlled via Radix UI primitives for accessibility.
- **Composite Components:** Combination of primitives (e.g., `JobCard`, `PricingTable`).
- **Layouts (`/components/layout`):** Structural components that dictate page flow (Containers, Grids).

## 4. Styling & Theming
- **Utility-First:** Tailwind CSS is used exclusively for styling. No CSS modules or Styled Components.
- **Class Merging:** `cn()` utility (`clsx` + `tailwind-merge`) is used to dynamically construct class names and resolve conflicts.
  ```tsx
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```
- **Dark Mode:** Enforced globally. The `.dark` class is set at the root `<html>` element. Colors are mapped to semantic CSS variables in `globals.css` (e.g., `bg-background`, `text-foreground`).
