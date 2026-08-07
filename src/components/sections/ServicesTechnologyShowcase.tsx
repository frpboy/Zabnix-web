"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CloudCog,
  Database,
  Layers3,
  MonitorCog,
  ServerCog,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SiClaude,
  SiDocker,
  SiExpress,
  SiExpo,
  SiFastapi,
  SiFlutter,
  SiGooglegemini,
  SiGithub,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

type TechnologyIcon = IconType | LucideIcon;
type TechnologyCategory = {
  title: string;
  icon: LucideIcon;
  technologies: readonly { name: string; icon: TechnologyIcon }[];
};

const categories: readonly TechnologyCategory[] = [
  { title: "Frontend", icon: MonitorCog, technologies: [{ name: "Next.js", icon: SiNextdotjs }, { name: "React", icon: SiReact }, { name: "TypeScript", icon: SiTypescript }, { name: "Tailwind CSS", icon: SiTailwindcss }] },
  { title: "Backend", icon: ServerCog, technologies: [{ name: "Python", icon: SiPython }, { name: "FastAPI", icon: SiFastapi }, { name: "Node.js", icon: SiNodedotjs }, { name: "Express", icon: SiExpress }] },
  { title: "Cloud & DevOps", icon: CloudCog, technologies: [{ name: "AWS", icon: CloudCog }, { name: "Vercel", icon: SiVercel }, { name: "Docker", icon: SiDocker }, { name: "GitHub", icon: SiGithub }] },
  { title: "AI & Automation", icon: Bot, technologies: [{ name: "OpenAI", icon: Bot }, { name: "Claude", icon: SiClaude }, { name: "Gemini", icon: SiGooglegemini }, { name: "LangChain", icon: SiLangchain }] },
  { title: "Mobile", icon: Smartphone, technologies: [{ name: "React Native", icon: SiReact }, { name: "Flutter", icon: SiFlutter }, { name: "Expo", icon: SiExpo }, { name: "Swift", icon: SiSwift }] },
  { title: "Data & Storage", icon: Database, technologies: [{ name: "PostgreSQL", icon: SiPostgresql }, { name: "Redis", icon: SiRedis }, { name: "MongoDB", icon: SiMongodb }, { name: "Supabase", icon: SiSupabase }] },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export function ServicesTechnologyShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-canvas px-6 pb-12 pt-14 md:pb-16 md:pt-18" aria-labelledby="services-technologies-heading">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        >
        <motion.header variants={cardVariants} className="text-left">
          <h2 id="services-technologies-heading" className="sr-only">Technologies We Use</h2>
          <p className="text-sm font-mono uppercase tracking-[0.22em] text-mute md:text-base">Technologies We Use</p>
        </motion.header>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, icon: Icon, technologies }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { rotate: -1.25, scale: 1.015 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="technology-brutalist-card group relative min-h-[240px] overflow-hidden rounded-[20px] border-2 border-black bg-white"
            >
              <div className="technology-brutalist-card__header flex h-20 items-center justify-center border-b-2 border-black bg-white text-black">
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="technology-brutalist-card__content flex flex-1 flex-col p-3.5">
                <h3 className="pb-2 text-base font-black uppercase tracking-[0.12em] text-black">{title}</h3>
                <ul className="mt-5 grid flex-1 grid-cols-2 content-start gap-x-5 gap-y-5" aria-label={`${title} technologies`}>
                  {technologies.map(({ name, icon: TechnologyIcon }) => (
                    <li key={name} className="flex min-w-0 flex-col items-center gap-2 text-center text-xs font-medium text-neutral-600">
                      <TechnologyIcon size={32} className="shrink-0 text-[#111111]" aria-hidden="true" />
                      <span className="block w-full truncate" title={name}>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

          {false && (<Link href="/contact#consultation" className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
            Let&apos;s Build Together <span className="ml-2" aria-hidden="true">→</span>
          </Link>)}
        {/* Technology callout removed. */}
      </motion.div>
    </section>
  );
}
