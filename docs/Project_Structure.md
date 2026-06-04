# Project Structure
Project: Zabnix Corporate Website
Architecture: Next.js App Router

## Directory Layout

```text
zabnix-web/
├── prisma/
│   ├── schema.prisma        # Database schema definitions
│   └── migrations/          # Auto-generated migrations
├── public/
│   ├── images/              # Static assets (logos, placeholders)
│   └── fonts/               # Custom fonts (Inter, Geist)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (marketing)/     # Route group for marketing pages
│   │   │   ├── page.tsx     # Homepage
│   │   │   ├── about/
│   │   │   ├── products/
│   │   │   ├── services/
│   │   │   └── case-studies/
│   │   ├── (dynamic)/       # Route group for dynamic content
│   │   │   ├── blog/
│   │   │   └── careers/
│   │   ├── api/             # API Route Handlers
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Tailwind and global styles
│   ├── components/
│   │   ├── ui/              # Shadcn UI components (buttons, inputs, cards)
│   │   ├── layout/          # Navbar, Footer, Section containers
│   │   ├── forms/           # Contact form, Demo request form
│   │   └── marketing/       # Hero, Marquee, Feature sections
│   ├── lib/
│   │   ├── prisma.ts        # Prisma client instantiation
│   │   ├── utils.ts         # Tailwind merge, formatting utilities
│   │   └── validations/     # Zod schemas for form validation
│   ├── server/
│   │   └── actions/         # Next.js Server Actions (form submissions)
│   ├── styles/
│   │   └── theme.css        # CSS variables for design system tokens
│   └── types/               # TypeScript interfaces and types
├── .env                     # Environment variables
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Key Architectural Decisions
- **`src/` Directory:** Keeps root clean, separating config files from application code.
- **Route Groups `(...)`:** Used to apply different layouts to marketing pages vs dynamic pages without affecting the URL structure.
- **`components/ui/`:** Dedicated to reusable, atomic components (following Shadcn UI patterns).
- **Server Actions:** Placed in `src/server/actions/` to keep business logic separate from UI components.
