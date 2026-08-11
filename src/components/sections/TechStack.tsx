import { MobileTechStackShowcase } from "@/components/sections/MobileTechStackShowcase";

const baseTechStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Flutter", category: "Mobile" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Firebase", category: "Platform" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Prisma", category: "ORM" },
  { name: "GraphQL", category: "API" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vercel", category: "Deployment" },
] as const;

const desktopTechStack = [...baseTechStack, ...baseTechStack];

const categoryColors: Record<string, string> = {
  Frontend: "text-violet-600 bg-violet-50/50",
  Mobile: "text-blue-600 bg-blue-55/50",
  Language: "text-emerald-600 bg-emerald-50/50",
  Backend: "text-orange-600 bg-orange-50/50",
  "AI/ML": "text-pink-600 bg-pink-50/50",
  Database: "text-cyan-700 bg-cyan-50/50",
  Platform: "text-amber-700 bg-amber-50/50",
  Cloud: "text-red-600 bg-red-50/50",
  DevOps: "text-indigo-600 bg-indigo-50/50",
  ORM: "text-teal-600 bg-teal-50/50",
  API: "text-amber-600 bg-amber-50/50",
  Styling: "text-purple-600 bg-purple-50/50",
  Deployment: "text-sky-600 bg-sky-50/50",
};

export function TechStack() {
  return (
    <section
      className="overflow-hidden border-t border-hairline bg-canvas-soft py-14 md:py-24"
      aria-labelledby="techstack-heading"
    >
      <div className="mx-auto mb-8 max-w-7xl px-6 md:mb-12">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-mute">
          Tech Stack
        </p>
        <h2
          id="techstack-heading"
          className="mt-3 text-center text-2xl font-semibold tracking-tight text-ink md:text-3xl"
          style={{ textWrap: "balance" }}
        >
          Powered by industry-leading technology.
        </h2>
      </div>

      <MobileTechStackShowcase techItems={baseTechStack} />

      <div className="relative hidden md:block">
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32"
          style={{ background: "linear-gradient(90deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32"
          style={{ background: "linear-gradient(270deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%)" }}
          aria-hidden="true"
        />

        <div className="overflow-hidden" aria-hidden="true">
          <div className="marquee-track" style={{ animationDuration: "35s" }}>
            {desktopTechStack.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="mx-3 flex items-center gap-2 whitespace-nowrap rounded-xl border border-hairline bg-canvas px-4 py-2.5 shadow-level-1"
              >
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-mono font-semibold uppercase ${categoryColors[tech.category] ?? "text-body bg-canvas-soft-2"}`}
                >
                  {tech.category}
                </span>
                <span className="text-sm font-medium text-ink">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
