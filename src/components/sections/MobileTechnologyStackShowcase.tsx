"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  CloudCog,
  Code2,
  MonitorCog,
  ServerCog,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TechnologyStack = {
  id: string;
  number: string;
  title: string;
  preview: string;
  icon: LucideIcon;
  technologies: Array<{
    name: string;
    description: string;
  }>;
};

const technologyStacks: TechnologyStack[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend",
    preview: "React - Next.js",
    icon: MonitorCog,
    technologies: [
      { name: "Next.js", description: "React framework for fast, scalable web apps." },
      { name: "React", description: "Component-based interface development." },
      { name: "TypeScript", description: "Type-safe product engineering." },
      { name: "Tailwind CSS", description: "Utility-first styling for consistent interfaces." },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend",
    preview: "Node.js - Python",
    icon: Code2,
    technologies: [
      { name: "Python", description: "Reliable services, automation and data workflows." },
      { name: "FastAPI", description: "High-performance API development." },
      { name: "Node.js", description: "Scalable JavaScript runtime for server apps." },
      { name: "Express", description: "Lightweight backend routing and APIs." },
    ],
  },
  {
    id: "cloud",
    number: "03",
    title: "Cloud",
    preview: "AWS - Docker",
    icon: CloudCog,
    technologies: [
      { name: "AWS", description: "Cloud infrastructure for production systems." },
      { name: "Vercel", description: "Fast deployment and edge delivery." },
      { name: "Docker", description: "Containerized apps and repeatable releases." },
      { name: "GitHub", description: "Source control and delivery workflows." },
    ],
  },
  {
    id: "ai-data",
    number: "04",
    title: "AI & Data",
    preview: "OpenAI - Python",
    icon: Bot,
    technologies: [
      { name: "OpenAI", description: "Intelligent product features and automation." },
      { name: "Claude", description: "AI-assisted workflows and reasoning systems." },
      { name: "Gemini", description: "Multimodal AI for modern applications." },
      { name: "LangChain", description: "Composable AI agent and workflow tooling." },
    ],
  },
];

const STACK_CYCLE_MS = 1800;

export function MobileTechnologyStackShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion || openId) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % technologyStacks.length);
    }, STACK_CYCLE_MS);

    return () => window.clearInterval(interval);
  }, [openId, reduceMotion]);

  return (
    <section className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#050505] px-4 py-7 text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]" aria-labelledby="mobile-technology-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.08),transparent_2px)] bg-[length:18px_18px] opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-6 bottom-8 h-px bg-white/10" aria-hidden="true" />

      <div className="relative z-10">
        <h2 id="mobile-technology-heading" className="max-w-[9ch] text-[2.45rem] font-black leading-[0.96] tracking-tight text-white min-[390px]:text-[2.72rem]" style={{ textWrap: "balance" }}>
          Technology We Use
        </h2>

        <div className="mt-5 flex items-center gap-2" aria-hidden="true">
          <span className="h-1 w-16 rounded-full bg-white" />
          <span className="h-1 w-1 rounded-full bg-white" />
        </div>

        <p className="mt-5 max-w-[24ch] text-[1rem] leading-relaxed text-white/68 min-[390px]:text-[1.08rem]">
          The modern tools and frameworks that power the solutions we build.
        </p>
      </div>

      <div className="relative z-10 mt-8 space-y-[-0.65rem] pb-3">
        {technologyStacks.map((stack, index) => {
          const isOpen = openId === stack.id;
          const isActive = isOpen || activeIndex === index;
          const Icon = stack.icon;

          return (
            <motion.article
              key={stack.id}
              animate={reduceMotion ? undefined : { y: isActive ? -7 : 0, scale: isActive ? 1.035 : 1 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ zIndex: isActive ? 20 : technologyStacks.length - index }}
            >
              <button
                type="button"
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${stack.title} technology stack`}
                aria-expanded={isOpen}
                aria-controls={`technology-panel-${stack.id}`}
                onClick={() => {
                  setActiveIndex(index);
                  setOpenId(isOpen ? null : stack.id);
                }}
                className={cn(
                  "group w-[calc(100%-var(--stack-offset))] rounded-[1.15rem] border border-white/14 bg-white/[0.075] px-3.5 py-4 text-left shadow-[0_18px_32px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur transition-[background-color,border-color,box-shadow,transform] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isActive ? "border-white/38 bg-white/[0.13] shadow-[0_26px_46px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.2)]" : "hover:bg-white/[0.095]"
                )}
                style={{ "--stack-offset": `${index * 0.7}rem`, marginLeft: `${index * 0.7}rem` } as React.CSSProperties}
              >
                <span className="grid grid-cols-[2.1rem_3.25rem_minmax(0,1fr)_1.4rem] items-center gap-3">
                  <span className="font-mono text-[1.05rem] text-white/86 tabular-nums">{stack.number}</span>
                  <span className="grid h-12 w-12 place-items-center border-x border-white/12 text-white">
                    <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.96rem] font-black uppercase tracking-[0.04em] text-white">{stack.title}</span>
                    <span className="mt-1 block truncate text-[0.86rem] text-white/68">{stack.preview}</span>
                  </span>
                  <ChevronDown className={cn("text-white/82 transition-transform duration-500", isOpen && "rotate-180")} size={20} aria-hidden="true" />
                </span>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`technology-panel-${stack.id}`}
                      initial={reduceMotion ? false : { opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-white/12 pt-4">
                        <ul className="space-y-3" aria-label={`${stack.title} technologies`}>
                          {stack.technologies.map((technology) => (
                            <li key={technology.name} className="min-w-0">
                              <p className="text-[0.82rem] font-semibold text-white">{technology.name}</p>
                              <p className="mt-0.5 text-[0.7rem] leading-relaxed text-white/55">{technology.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
