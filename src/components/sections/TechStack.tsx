const techStack = [
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
  // duplicate for seamless loop
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
];

const categoryColors: Record<string, string> = {
  Frontend: "text-violet-400",
  Mobile: "text-blue-400",
  Language: "text-emerald-400",
  Backend: "text-orange-400",
  "AI/ML": "text-pink-400",
  Database: "text-cyan-400",
  Platform: "text-yellow-400",
  Cloud: "text-red-400",
  DevOps: "text-indigo-400",
  ORM: "text-teal-400",
  API: "text-amber-400",
  Styling: "text-purple-400",
  Deployment: "text-sky-400",
};

export function TechStack() {
  return (
    <section
      className="py-24 border-t border-white/8 overflow-hidden"
      aria-labelledby="techstack-heading"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase">
          Tech Stack
        </p>
        <h2
          id="techstack-heading"
          className="text-center text-2xl md:text-3xl font-bold text-white mt-3"
          style={{ textWrap: "balance" }}
        >
          Powered by industry-leading technology
        </h2>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #000000 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #000000 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="overflow-hidden" aria-hidden="true">
          <div className="marquee-track" style={{ animationDuration: "35s" }}>
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="mx-3 flex items-center gap-2 border border-white/8 bg-white/3 rounded-xl px-4 py-2.5 whitespace-nowrap"
              >
                <span
                  className={`text-xs font-semibold ${categoryColors[tech.category] ?? "text-gray-500"}`}
                >
                  {tech.category}
                </span>
                <span className="text-sm font-medium text-white">
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
