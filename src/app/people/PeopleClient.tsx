"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  ChevronRight,
  Code2,
  Eye,
  Github,
  Globe,
  HeartHandshake,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LetterRevealLink } from "@/components/sections/LetterRevealLink";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROTATING_WORDS = [
  { text: "Engineers", accent: "#0EA5E9" },
  { text: "Designers", accent: "#8B5CF6" },
  { text: "Architects", accent: "#10B981" },
  { text: "Builders", accent: "#F97316" },
  { text: "Problem Solvers", accent: "#EC4899" },
  { text: "Innovators", accent: "#06B6D4" },
] as const;

const stats = [
  { value: 50, suffix: "+", label: "Clients", supporting: ["Across Healthcare,", "ERP & Retail"], accent: "#8B5CF6", isYear: false },
  { value: 4, suffix: "", label: "Countries", supporting: ["India", "UAE", "KSA", "Singapore"], accent: "#0EA5E9", isYear: false },
  { value: 3, suffix: "", label: "Languages", supporting: ["English", "Arabic", "Malayalam"], accent: "#10B981", isYear: false },
  { value: 2021, suffix: "", label: "Founded", supporting: ["Building software", "since 2021."], accent: "#EC4899", isYear: true },
] as const;

const DECORATIONS = [
  { position: "left-[7%] top-[18%]", shape: "filled-circle", duration: 12, delay: 0.4, parallax: -12, accent: true },
  { position: "left-[14%] top-[68%]", shape: "outline-circle", duration: 16, delay: 1.2, parallax: -18 },
  { position: "left-[26%] top-[30%]", shape: "square", duration: 10, delay: 0.8, parallax: -10 },
  { position: "left-[33%] top-[78%]", shape: "dot", duration: 14, delay: 2, parallax: -16 },
  { position: "right-[31%] top-[20%]", shape: "plus", duration: 11, delay: 0.2, parallax: -14, accent: true },
  { position: "right-[23%] top-[72%]", shape: "outline-circle", duration: 18, delay: 1.5, parallax: -22 },
  { position: "right-[14%] top-[32%]", shape: "cross", duration: 13, delay: 0.7, parallax: -15 },
  { position: "right-[7%] top-[63%]", shape: "filled-circle", duration: 15, delay: 1.1, parallax: -20, accent: true },
  { position: "left-[4%] top-[48%]", shape: "dot", duration: 9, delay: 1.8, parallax: -9 },
  { position: "right-[4%] top-[16%]", shape: "square", duration: 17, delay: 0.5, parallax: -19 },
  { position: "left-[42%] top-[13%]", shape: "dot", duration: 12, delay: 1.4, parallax: -11 },
  { position: "right-[42%] top-[84%]", shape: "plus", duration: 16, delay: 2.2, parallax: -17 },
] as const;

const team = [
  {
    name: "Shabin",
    handle: "@shabin___muhammed",
    role: "CEO",
    location: "India",
    initial: "S",
    from: "#171717",
    to: "#525252",
  },
  {
    name: "Althaf",
    handle: "@alt_ha_f_",
    role: "UI Engineer",
    location: "India",
    initial: "A",
    from: "#7928ca",
    to: "#5a67d8",
  },
  {
    name: "Deepthi",
    handle: "@deep_thi_jaya",
    role: "Senior Developer",
    location: "India",
    initial: "D",
    from: "#0070f3",
    to: "#00dfd8",
  },
  {
    name: "Rahul",
    handle: "@stuck.in.the.middle.of.nowhere",
    role: "Catalyst",
    location: "India",
    initial: "R",
    from: "#10b981",
    to: "#0ea5e9",
  },
  {
    name: "Arun",
    handle: "@_lich_josep_",
    role: "Junior Developer",
    location: "India",
    initial: "A",
    from: "#f59e0b",
    to: "#ef4444",
  },
  {
    name: "Muzamil",
    handle: "@muzammll.p",
    role: "Junior Developer",
    location: "India",
    initial: "M",
    from: "#ec4899",
    to: "#8b5cf6",
  },
  {
    name: "Anshad",
    handle: "@anshad.pp",
    role: "Junior Developer",
    location: "India",
    initial: "A",
    from: "#6366f1",
    to: "#a78bfa",
  },
  {
    name: "Jinshad",
    handle: "@_mj______",
    role: "Data Analyst",
    location: "India",
    initial: "J",
    from: "#14b8a6",
    to: "#0ea5e9",
  },
  {
    name: "Sinan",
    handle: "@sinan____mhd",
    role: "Trainee",
    location: "India",
    initial: "S",
    from: "#0ea5e9",
    to: "#6366f1",
  },
  {
    name: "Asarudheen",
    handle: "@azaruu_",
    role: "Trainee",
    location: "India",
    initial: "A",
    from: "#8b5cf6",
    to: "#6366f1",
  },
  {
    name: "Shamil",
    handle: "@shamil._.msk",
    role: "Trainee",
    location: "India",
    initial: "S",
    from: "#0ea5e9",
    to: "#14b8a6",
  },
] satisfies TeamMember[];

const values = [
  {
    number: "01",
    title: "Innovation",
    description: "We constantly explore better ways to solve real business problems.",
    accent: "#0EA5E9",
  },
  {
    number: "02",
    title: "Integrity",
    description: "We believe trust is built through honesty, ownership and accountability.",
    accent: "#8B5CF6",
  },
  {
    number: "03",
    title: "Customer Success",
    description: "We succeed only when our clients succeed.",
    accent: "#10B981",
  },
  {
    number: "04",
    title: "Quality Engineering",
    description: "Scalable architecture, clean code and thoughtful engineering define every product.",
    accent: "#06B6D4",
  },
  {
    number: "05",
    title: "Continuous Learning",
    description: "We stay curious because technology never stops evolving.",
    accent: "#F97316",
  },
  {
    number: "06",
    title: "Transparency",
    description: "Open communication creates stronger partnerships.",
    accent: "#EC4899",
  },
  {
    number: "07",
    title: "Reliability",
    description: "We build software businesses can confidently depend on.",
    accent: "#171717",
  },
] as const;

interface TeamMember {
  name: string;
  handle: string;
  role: string;
  location: string;
  initial: string;
  from: string;
  to: string;
}

// ─── Desktop Team Card ────────────────────────────────────────────────────────

function TeamCard({
  member,
  isDimmed,
  onHoverChange,
}: {
  member: TeamMember;
  isDimmed: boolean;
  onHoverChange: (name: string | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const socialUrl = member.handle.startsWith("@")
    ? `https://github.com/${member.handle.substring(1)}`
    : "#";

  return (
    <Link
      href={socialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex min-h-[280px] flex-col items-center overflow-hidden rounded-[2em] border border-hairline bg-white px-4 py-5 text-center text-ink shadow-[8px_8px_28px_rgba(17,17,17,0.14),-6px_-6px_24px_rgba(255,255,255,0.95)] transition-[border-color,box-shadow,filter,transform] duration-[400ms] ease-out hover:scale-105 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[12px_14px_34px_rgba(17,17,17,0.2),-6px_-6px_24px_rgba(255,255,255,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
        isDimmed && "scale-90 blur-sm",
      )}
      aria-label={`${member.name}, ${member.role}, ${member.location}`}
      onMouseEnter={() => onHoverChange(member.name)}
      onMouseLeave={() => onHoverChange(null)}
    >
      <div className="flex flex-1 flex-col items-center transition-transform duration-200 ease-out group-hover:-translate-y-1">
        <motion.div
          className="relative mt-3"
          animate={reduceMotion ? undefined : { y: [0, -3, 0], rotate: [0, 1, 0] }}
          transition={reduceMotion ? undefined : { duration: 7, ease: "easeInOut", repeat: Infinity }}
          aria-hidden="true"
        >
          <span className="absolute -inset-1 rounded-full bg-ink/10 opacity-0 blur-md transition-opacity duration-300 ease-out group-hover:opacity-100" />
          <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#191919] text-3xl font-semibold text-white transition-[box-shadow,transform] duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_12px_24px_rgba(17,17,17,0.22)]">
            {member.initial}
          </div>
        </motion.div>
        <h3 className="mt-4 max-w-full truncate text-lg font-semibold leading-tight">{member.name}</h3>
        <p className="mt-1 text-sm text-body">{member.role}</p>
        <p className="mt-1 truncate font-mono text-xs text-mute" translate="no">{member.handle}</p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-mute">
          <MapPin size={12} aria-hidden="true" />
          <span className="truncate">{member.location}</span>
        </div>
      </div>

      <div className="mt-4 flex w-[90%] items-center justify-center gap-4 rounded-[3em] bg-canvas-soft-2 px-4 py-3 text-ink shadow-[3px_3px_12px_rgba(17,17,17,0.12),-2px_-2px_10px_rgba(255,255,255,0.95)]">
        <span className="group/icon relative flex h-9 w-9 items-center justify-center rounded-[7px]" aria-hidden="true">
          <span className="absolute inset-0 z-0 rounded-[9px] bg-[linear-gradient(45deg,#050505_0%,#3b3b3b_100%)] transition-transform duration-300 ease-out group-hover/icon:origin-bottom group-hover/icon:rotate-[35deg]" />
          <span className="relative z-10 flex h-full w-full items-center justify-center rounded-[10px] border border-white/10 bg-[#171717] text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out group-hover/icon:border-white/45 group-hover/icon:bg-[rgba(156,156,156,0.466)]">
            <Github size={13} />
          </span>
        </span>
        <span className="group/icon relative flex h-9 w-9 items-center justify-center rounded-[7px]" aria-hidden="true">
          <span className="absolute inset-0 z-0 rounded-[9px] bg-[linear-gradient(45deg,#0a66c2_0%,#004182_100%)] transition-transform duration-300 ease-out group-hover/icon:origin-bottom group-hover/icon:rotate-[35deg]" />
          <span className="relative z-10 flex h-full w-full items-center justify-center rounded-[10px] border border-white/10 bg-[#171717] text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out group-hover/icon:border-white/45 group-hover/icon:bg-[rgba(156,156,156,0.466)]">
            <Linkedin size={13} />
          </span>
        </span>
        <span className="group/icon relative flex h-9 w-9 items-center justify-center rounded-[7px]" aria-hidden="true">
          <span className="absolute inset-0 z-0 rounded-[9px] bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] transition-transform duration-300 ease-out group-hover/icon:origin-bottom group-hover/icon:rotate-[35deg]" />
          <span className="relative z-10 flex h-full w-full items-center justify-center rounded-[10px] border border-white/10 bg-[#171717] text-white backdrop-blur-sm transition-[background-color,border-color] duration-300 ease-out group-hover/icon:border-white/45 group-hover/icon:bg-[rgba(156,156,156,0.466)]">
            <ArrowUpRight size={13} />
          </span>
        </span>
      </div>
    </Link>
  );
}

// ─── Desktop Values Section ───────────────────────────────────────────────────

function DesktopValuesSection() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const parallaxFrameRef = useRef<number | null>(null);
  const valuesGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index === null ? 0 : (index + 1) % values.length));
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      if (parallaxFrameRef.current) window.cancelAnimationFrame(parallaxFrameRef.current);
    };
  }, []);

  const pauseAutoplay = (index: number) => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
    setActiveIndex(index);
  };

  const resumeAutoplay = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 5000);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !valuesGroupRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offset = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;

    if (parallaxFrameRef.current) window.cancelAnimationFrame(parallaxFrameRef.current);
    parallaxFrameRef.current = window.requestAnimationFrame(() => {
      valuesGroupRef.current?.style.setProperty("--values-parallax-x", `${offset}px`);
    });
  };

  const resetParallax = () => {
    valuesGroupRef.current?.style.setProperty("--values-parallax-x", "0px");
  };

  return (
    <section
      className="relative overflow-hidden bg-white px-6 pb-6 pt-20 md:pb-8 md:pt-24"
      aria-labelledby="values-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[["left-[9%]", "top-[24%]"], ["left-[22%]", "bottom-[17%]"], ["right-[17%]", "top-[20%]"], ["right-[8%]", "bottom-[28%]"], ["left-[46%]", "top-[58%]"]].map(([horizontal, vertical], index) => (
          <motion.span
            key={`${horizontal}-${vertical}`}
            className={cn(
              "absolute h-2 w-2 rounded-full bg-ink/[0.05]",
              index % 2 === 0 ? horizontal : `${horizontal} h-3 w-3 rounded-none border border-ink/[0.05] bg-transparent`,
              vertical,
            )}
            animate={reduceMotion ? undefined : { x: [0, index % 2 === 0 ? 6 : -5, 0], y: [0, -6, 0] }}
            transition={{ duration: 10 + index * 2, delay: index * 0.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl"
        initial={reduceMotion ? false : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          id="values-heading"
          className="text-center font-mono text-xs font-medium uppercase tracking-[0.4em] text-[#9a9a9a]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          What We Stand For
        </motion.p>
        <div
          ref={valuesGroupRef}
          className="mt-12 text-center transition-transform duration-500 ease-out motion-reduce:transform-none"
          style={{ transform: "translate3d(var(--values-parallax-x, 0px), 0, 0)" }}
        >
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-5">
            {values.map((value, index) => (
              <motion.button
                type="button"
                key={value.number}
                className="group relative inline-flex items-center justify-center px-1 py-2 text-[22px] font-medium leading-[1.8] tracking-normal text-[#7a7a7a] opacity-65 transition-[color,opacity,transform,font-weight] duration-[400ms] ease-out hover:-translate-y-[3px] hover:scale-[1.04] hover:font-semibold hover:text-black hover:opacity-100 focus-visible:outline-none md:text-[26px] lg:text-[34px]"
                style={{ "--value-accent": value.accent } as CSSProperties}
                initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)", y: 25 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                animate={activeIndex === index ? { color: "#171717", opacity: 1 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => pauseAutoplay(index)}
                onMouseLeave={resumeAutoplay}
                onFocus={() => pauseAutoplay(index)}
                onBlur={resumeAutoplay}
                aria-pressed={activeIndex === index}
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--value-accent)] transition-[opacity,transform] duration-300 ease-out",
                    activeIndex === index ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                  )}
                  aria-hidden="true"
                />
                <span>{value.title}</span>
                {index < values.length - 1 ? <span className="ml-4 text-[#c5c5c5] opacity-70 md:ml-5" aria-hidden="true">•</span> : null}
              </motion.button>
            ))}
          </div>

          <div className="mx-auto mt-12 flex min-h-24 max-w-[620px] items-start justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {activeIndex !== null ? (
                <motion.p
                  key={values[activeIndex].title}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-pretty text-lg leading-relaxed text-body md:text-xl"
                >
                  {values[activeIndex].description}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type Decoration = (typeof DECORATIONS)[number];

function FloatingDecoration({ decoration, accent }: { decoration: Decoration; accent: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, decoration.parallax]);

  return (
    <motion.div
      style={{ y: reduceMotion ? 0 : parallaxY }}
      className={`pointer-events-none absolute ${decoration.position} hidden lg:block`}
      aria-hidden="true"
    >
      <span className="block h-3 w-3 rounded-full bg-slate-300/40" style={{ backgroundColor: accent ? accent : undefined }} />
    </motion.div>
  );
}

// ─── Desktop People Page (Untouched) ──────────────────────────────────────────

function DesktopPeopleClient() {
  const [wordIdx, setWordIdx] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setWordIdx((index) => (index + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const currentWord = ROTATING_WORDS[wordIdx];

  return (
    <div className="pt-24 min-h-screen bg-canvas text-ink">
      <section className="relative overflow-hidden border-b border-hairline bg-canvas grid-bg px-6 pb-12 pt-28 md:pb-16 md:pt-32">
        {DECORATIONS.map((decoration, index) => (
          <FloatingDecoration key={`${decoration.shape}-${index}`} decoration={decoration} accent={currentWord.accent} />
        ))}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            className="mb-7 text-xs font-mono uppercase tracking-[0.2em] text-mute"
          >
            ZABNIX · OUR PEOPLE
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            className="mb-1 text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:text-7xl"
          >
            Meet our team of
          </motion.h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="relative mb-6 h-[1.15em] overflow-hidden text-5xl font-bold leading-[1.08] tracking-[-0.04em] md:text-7xl"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={currentWord.text}
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0, color: currentWord.accent }}
                exit={{ opacity: 0, y: -42 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-x-0 top-0 block text-balance"
              >
                {currentWord.text}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="mx-auto max-w-[700px] text-pretty text-lg leading-relaxed text-body md:text-xl"
          >
            Behind every product is a team of passionate engineers, designers, architects, and problem-solvers building software that businesses trust every day.
          </motion.p>
        </motion.div>
      </section>

      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pb-20 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-mono font-semibold text-mute uppercase tracking-[0.2em] text-center mb-16">
            The Team
          </h2>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
            {team.map((member) => (
              <TeamCard
                key={member.name}
                member={member}
                isDimmed={hoveredMember !== null && hoveredMember !== member.name}
                onHoverChange={setHoveredMember}
              />
            ))}
          </div>
        </div>
      </section>

      <DesktopValuesSection />

      <section className="border-t border-hairline bg-canvas px-6 pb-28 pt-16 text-center md:pt-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-4 tracking-tight">
            Join the team.
          </h2>
          <p className="text-body mb-10 leading-relaxed">
            We&apos;re always looking for sharp engineers, designers, and problem-solvers who want to build something meaningful.
          </p>
          <LetterRevealLink href="/careers" label="View Open Roles" />
        </div>
      </section>
    </div>
  );
}

// ─── Mobile People Page (Reference Target Redesign) ───────────────────────────

function MobilePeopleClient() {
  const teamMembers = [
    { name: "Mohammed Shamil", role: "Founder & CEO", location: "Malappuram, Kerala", github: "https://github.com", initial: "MS", from: "#0f172a", to: "#334155" },
    { name: "Suhail K", role: "Full Stack Developer", location: "Kozhikode, Kerala", github: "https://github.com", initial: "SK", from: "#1e1b4b", to: "#4338ca" },
    { name: "Fazhan KT", role: "Backend Developer", location: "Kochi, Kerala", github: "https://github.com", initial: "FK", from: "#14532d", to: "#15803d" },
    { name: "Gokul K", role: "Frontend Developer", location: "Kollam, Kerala", github: "https://github.com", initial: "GK", from: "#701a75", to: "#a21caf" },
    { name: "Ajmal A", role: "UI/UX Designer", location: "Malappuram, Kerala", github: "https://github.com", initial: "AA", from: "#7c2d12", to: "#c2410c" },
    { name: "Adarsh A", role: "MERN Stack Developer", location: "Palakkad, Kerala", github: "https://github.com", initial: "AD", from: "#064e3b", to: "#047857" },
    { name: "Muhammed Sinan", role: "Flutter Developer", location: "Malappuram, Kerala", github: "https://github.com", initial: "MS", from: "#1e293b", to: "#475569" },
    { name: "Akshay P", role: "Backend Developer", location: "Thrissur, Kerala", github: "https://github.com", initial: "AP", from: "#312e81", to: "#4f46e5" },
  ];

  const valueCards = [
    { title: "Innovation", desc: "We challenge norms and create better solutions.", icon: Lightbulb },
    { title: "Integrity", desc: "We do the right thing, always.", icon: ShieldCheck },
    { title: "Customer Success", desc: "We build solutions that drive real outcomes.", icon: HeartHandshake },
    { title: "Quality Engineering", desc: "We write clean code and build reliable systems.", icon: Code2 },
    { title: "Continuous Learning", desc: "We learn, unlearn and keep evolving.", icon: Target },
    { title: "Transparency", desc: "We communicate openly and honestly.", icon: Eye },
    { title: "Reliability", desc: "We deliver on our promises, every single time.", icon: Box },
  ];

  return (
    <div className="bg-canvas text-ink pt-20 px-4 pb-12 space-y-9">
      {/* ── Mobile Hero ────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-4">
        <div>
          <span className="mb-3 inline-block rounded-full bg-[#f1f5f9] border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-800">
            OUR PEOPLE
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Meet our team of <br />
            <span className="text-black">Engineers</span>
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium max-w-[34ch]">
            We&apos;re a group of builders, thinkers and problem-solvers working together to create meaningful digital solutions.
          </p>
        </div>

        {/* 4 Stats White Card */}
        <div className="rounded-[24px] border border-[#e5e9f0] bg-white p-5 shadow-xs grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <Users size={18} className="text-slate-700" aria-hidden="true" />
            <p className="text-lg font-extrabold text-slate-900 tracking-tight">11+</p>
            <p className="text-[11px] font-semibold text-slate-500">Engineers</p>
          </div>
          <div className="space-y-1">
            <Globe size={18} className="text-slate-700" aria-hidden="true" />
            <p className="text-lg font-extrabold text-slate-900 tracking-tight">Remote</p>
            <p className="text-[11px] font-semibold text-slate-500">Worldwide</p>
          </div>
          <div className="space-y-1 border-t border-[#f1f5f9] pt-3">
            <Code2 size={18} className="text-slate-700" aria-hidden="true" />
            <p className="text-base font-extrabold text-slate-900 tracking-tight">Collaborative</p>
            <p className="text-[11px] font-semibold text-slate-500">Our Strength</p>
          </div>
          <div className="space-y-1 border-t border-[#f1f5f9] pt-3">
            <Target size={18} className="text-slate-700" aria-hidden="true" />
            <p className="text-base font-extrabold text-slate-900 tracking-tight">Impact</p>
            <p className="text-[11px] font-semibold text-slate-500">What Drives Us</p>
          </div>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────────────────────────────── */}
      <section className="space-y-4 pt-2">
        <div>
          <span className="mb-2 inline-block rounded-full bg-[#f1f5f9] border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-800">
            THE TEAM
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            The Team
          </h2>
        </div>

        <div className="space-y-2.5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-[#e5e9f0] bg-white p-3.5 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white font-extrabold text-xs shadow-xs"
                  style={{
                    background: `linear-gradient(135deg, ${member.from}, ${member.to})`,
                  }}
                >
                  {member.initial}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <MapPin size={10} aria-hidden="true" />
                    <span>{member.location}</span>
                  </div>
                </div>
              </div>

              <Link
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub profile for ${member.name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-black transition-colors"
              >
                <Github size={16} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full rounded-full border border-black bg-white py-3 px-5 text-xs font-bold text-black flex items-center justify-center gap-2 transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 shadow-2xs"
        >
          <span>View all team members</span>
          <Users size={14} aria-hidden="true" />
        </button>
      </section>

      {/* ── Values Section ────────────────────────────────────────────────────── */}
      <section className="space-y-4 pt-2">
        <div>
          <span className="mb-2 inline-block rounded-full bg-[#f1f5f9] border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-800">
            WHAT WE STAND FOR
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {valueCards.map(({ title, desc, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#e5e9f0] bg-white p-4 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200 mb-2.5">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                  {title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 font-normal">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Careers Section ───────────────────────────────────────────────────── */}
      <section className="space-y-3 pt-2">
        <div className="rounded-[28px] border border-[#e5e9f0] bg-white p-5 shadow-sm space-y-4 relative overflow-hidden">
          <span className="inline-block rounded-full bg-[#f1f5f9] border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-800">
            JOIN OUR JOURNEY
          </span>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Join the team.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium max-w-[32ch]">
              We&apos;re always looking for passionate people who love solving real-world problems.
            </p>
          </div>

          <div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition-colors"
            >
              <span>View Open Roles</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="pt-2">
            <img
              src="/images/team-careers.png"
              alt="Team sitting together at desk illustration"
              className="w-full rounded-2xl border border-slate-100 object-cover max-h-48"
            />
          </div>
        </div>

        {/* Secondary Contact Card */}
        <div className="rounded-2xl border border-[#e5e9f0] bg-white p-4 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200">
              <Mail size={16} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Don&apos;t see a role for you?
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                We&apos;d still love to hear from you.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="text-xs font-bold text-black flex items-center gap-1 shrink-0 hover:underline"
          >
            <span>Say Hello</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Exported People Client Component ─────────────────────────────────────────

export default function PeopleClient() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopPeopleClient />
      </div>
      <div className="block lg:hidden">
        <MobilePeopleClient />
      </div>
    </>
  );
}
