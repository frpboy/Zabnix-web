"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  handle: string;
  role: string;
  location: string;
  initial: string;
  from: string;
  to: string;
}

// ─── Team Card ────────────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

function ValuesSection() {
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
        <motion.span
          className="absolute bottom-[20%] right-[35%] text-sm text-ink/[0.05]"
          animate={reduceMotion ? undefined : { x: [0, 4, 0], y: [0, 6, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          +
        </motion.span>
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
              className="group relative inline-flex items-center justify-center px-1 py-2 text-[22px] font-medium leading-[1.8] tracking-normal text-[#7a7a7a] opacity-65 transition-[color,opacity,transform,font-weight] duration-[400ms] ease-out hover:-translate-y-[3px] hover:scale-[1.04] hover:font-semibold hover:text-black hover:opacity-100 focus-visible:-translate-y-[3px] focus-visible:scale-[1.04] focus-visible:font-semibold focus-visible:text-black focus-visible:opacity-100 focus-visible:outline-none md:text-[26px] lg:text-[34px]"
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
                  activeIndex === index ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
                )}
                aria-hidden="true"
              />
              <span>{value.title}</span>
              {index < values.length - 1 ? <span className="ml-4 text-[#c5c5c5] opacity-70 md:ml-5" aria-hidden="true">•</span> : null}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-[2px] w-full -translate-x-1/2 origin-center bg-[var(--value-accent)] transition-transform duration-300 ease-out",
                  activeIndex === index ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                )}
                aria-hidden="true"
              />
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
  const driftX = decoration.delay % 2 > 1 ? 14 : -14;
  const driftY = decoration.delay % 3 > 1 ? 12 : -12;
  const isAccent = "accent" in decoration && decoration.accent === true;
  const isFilled = decoration.shape === "filled-circle" || decoration.shape === "dot";
  const isLineShape = decoration.shape === "plus" || decoration.shape === "cross";
  const sizeClass = decoration.shape === "dot" ? "h-1.5 w-1.5" : decoration.shape === "filled-circle" || decoration.shape === "outline-circle" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <motion.div className={cn("absolute", decoration.position)} style={{ y: reduceMotion ? 0 : parallaxY }} aria-hidden="true">
      <motion.span
        className={cn(
          "block",
          sizeClass,
          decoration.shape === "filled-circle" || decoration.shape === "dot" ? "rounded-full" : "",
          decoration.shape === "outline-circle" ? "rounded-full border" : "",
          decoration.shape === "square" ? "rounded-sm border" : "",
          decoration.shape === "plus" || decoration.shape === "cross" ? "relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-current after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-current" : "",
          decoration.shape === "cross" ? "rotate-45" : ""
        )}
        whileHover={reduceMotion ? undefined : { x: driftX, y: driftY }}
        animate={reduceMotion ? undefined : { x: [-4, 4, -4], y: [-8, 8, -8], rotate: decoration.shape === "cross" ? [37, 53, 37] : [-8, 8, -8] }}
        transition={reduceMotion ? undefined : { duration: decoration.duration, delay: decoration.delay, repeat: Infinity, ease: "easeInOut" }}
        style={isLineShape ? { color: isAccent ? accent : "rgba(17, 17, 17, 0.16)" } : { backgroundColor: isFilled ? (isAccent ? accent : "rgba(17, 17, 17, 0.14)") : "transparent", borderColor: !isFilled ? (isAccent ? accent : "rgba(17, 17, 17, 0.16)") : undefined }}
      />
    </motion.div>
  );
}

function EditorialStats() {
  const reduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section ref={statsRef} className="border-b border-hairline bg-canvas px-6 py-24 md:py-32" aria-labelledby="numbers-heading">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={statsInView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-mute">By The Numbers</p>
          <h2 id="numbers-heading" className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
            Engineering at scale.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-body md:text-lg">
            Our team may be compact, but our impact spans multiple industries, countries and technologies.
          </p>
        </motion.header>

        <div className="mt-20 grid grid-cols-1 gap-x-20 gap-y-20 sm:grid-cols-2 md:mt-24 md:gap-y-24">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.96 }}
              animate={statsInView || reduceMotion ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group border-t border-black/[0.08] pt-7",
                index === 0 && "sm:mr-10",
                index === 1 && "sm:mt-12",
                index === 2 && "sm:ml-12 md:ml-20",
                index === 3 && "sm:mr-8"
              )}
            >
              <motion.p
                className="tabular-nums text-[clamp(4.5rem,8vw,6.875rem)] font-bold leading-[0.9] tracking-[-0.07em] text-ink"
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={1350}
                  initialValue={stat.isYear ? 1900 : 0}
                  start={statsInView}
                />
              </motion.p>
              <p className="mt-5 text-[11px] font-mono font-medium uppercase tracking-[0.35em] text-mute">
                {stat.label}
              </p>
              <motion.div
                className="mt-4 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: stat.accent }}
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={statsInView || reduceMotion ? { scaleX: 1 } : undefined}
                whileHover={reduceMotion ? undefined : { scaleX: 1.625 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.25 + index * 0.15, ease: "easeOut" }}
              />
              <div className="mt-5 text-[17px] leading-[1.7] text-body/75 transition-opacity duration-300 group-hover:text-body">
                {stat.supporting.map((line) => <span key={line} className="block">{line}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyStats() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.35 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setShowDetails(true);
      return;
    }

    const timeout = window.setTimeout(() => setShowDetails(true), 1850);
    return () => window.clearTimeout(timeout);
  }, [isInView, reduceMotion]);

  return (
    <section ref={timelineRef} className="border-b border-hairline bg-canvas px-6 py-24 md:py-32" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-mute">By The Numbers</p>
          <h2 id="journey-heading" className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
            A journey of engineering excellence.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-body md:text-lg">
            Every milestone represents the growth of our team, our clients and our global reach.
          </p>
        </motion.header>

        <div className="relative mt-16 md:mt-20">
          <motion.div
            className="absolute left-[12.5%] right-[12.5%] top-3 hidden h-px origin-left bg-[#eaeaea] lg:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={isInView || reduceMotion ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-8 left-3 top-3 h-auto w-px origin-top bg-[#eaeaea] lg:hidden"
            initial={reduceMotion ? false : { scaleY: 0 }}
            animate={isInView || reduceMotion ? { scaleY: 1 } : undefined}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-12 pl-11 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-4 lg:gap-0 lg:pl-0">
            {stats.map((stat, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <motion.article
                  key={stat.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.48, delay: reduceMotion ? 0 : 1.75 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative cursor-pointer text-left lg:text-center"
                >
                  <div className="absolute -left-11 top-0 flex lg:static lg:justify-center">
                    <motion.span
                      className="relative z-10 block h-6 w-6 rounded-full border-4 border-canvas"
                      style={{ backgroundColor: stat.accent }}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                      animate={isInView || reduceMotion ? { opacity: 1, scale: isHovered ? 1.15 : [1, 1.04, 1] } : undefined}
                      transition={isHovered ? { duration: 0.3, ease: "easeOut" } : { duration: 4, delay: reduceMotion ? 0 : 1.2 + index * 0.15, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
                    >
                      {isHovered ? (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: `0 0 0 7px ${stat.accent}28` }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.25 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      ) : null}
                    </motion.span>
                  </div>

                  <motion.div
                    className="mt-1 h-12 w-px origin-top bg-[#eaeaea] lg:mx-auto lg:mt-0"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    animate={isInView || reduceMotion ? { scaleY: 1 } : undefined}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : 1.5 + index * 0.15, ease: "easeOut" }}
                    aria-hidden="true"
                  />

                  <motion.p whileHover={reduceMotion ? undefined : { scale: 1.05 }} className="mt-4 text-5xl font-semibold tracking-[-0.045em] text-ink tabular-nums md:text-6xl lg:text-7xl">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1350}
                      initialValue={stat.isYear ? 1900 : 0}
                      start={showDetails}
                    />
                  </motion.p>
                  <motion.p
                    className="mt-2 text-[11px] font-mono uppercase tracking-[0.3em] text-mute"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={showDetails || reduceMotion ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.42, delay: reduceMotion ? 0 : index * 0.08, ease: "easeOut" }}
                  >
                    {stat.label}
                  </motion.p>
                  <motion.div
                    className="mt-4 h-px w-14 origin-center lg:mx-auto"
                    style={{ backgroundColor: stat.accent }}
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    animate={showDetails || reduceMotion ? { scaleX: isHovered ? 1 : 0.45 } : undefined}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                  <div className="mt-4 min-h-12 text-sm leading-relaxed text-mute transition-colors duration-300 group-hover:text-body md:text-base">
                    {stat.supporting.map((line) => <span key={line} className="block lg:text-center">{line}</span>)}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PeopleStats() {
  const reduceMotion = useReducedMotion();
  const statsRef = useRef<HTMLElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.45 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [languageIndex, setLanguageIndex] = useState(0);

  useEffect(() => {
    if (hoveredIndex !== 2 || reduceMotion) return;

    const interval = window.setInterval(() => {
      setLanguageIndex((index) => (index + 1) % stats[2].supporting.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, [hoveredIndex, reduceMotion]);

  return (
    <section ref={statsRef} className="border-b border-hairline bg-canvas px-6 py-20 md:py-24" aria-label="People statistics">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-mute md:text-left">
          Trusted By Businesses Across Regions
        </p>

        <div className="relative mt-10 md:mt-12">
          <motion.div
            className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-[#eaeaea] lg:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={statsInView || reduceMotion ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-0 left-[11px] top-0 h-full w-px origin-top bg-[#eaeaea] lg:hidden"
            initial={reduceMotion ? false : { scaleY: 0 }}
            animate={statsInView || reduceMotion ? { scaleY: 1 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-10 pl-9 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-0 lg:pl-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={statsInView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-pointer text-left lg:text-center"
              >
                <div className="absolute -left-9 top-0 flex lg:static lg:justify-center">
                  <motion.span
                    className="relative z-10 block h-[23px] w-[23px] rounded-full border-4 border-canvas"
                    style={{ backgroundColor: stat.accent }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                    animate={statsInView || reduceMotion ? { opacity: 1, scale: hoveredIndex === index ? 1.12 : 1 } : undefined}
                    transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.14 + index * 0.08, ease: "easeOut" }}
                  >
                    {hoveredIndex === index && !reduceMotion ? (
                      <motion.span className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 0 7px ${stat.accent}22` }} animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.35, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
                    ) : null}
                  </motion.span>
                </div>

                <div className="hidden h-9 w-px bg-[#eaeaea] lg:mx-auto lg:block" aria-hidden="true" />
                <motion.p whileHover={reduceMotion ? undefined : { scale: 1.05 }} className="font-variant-numeric mt-4 text-4xl font-semibold tracking-tight text-ink lg:mt-0">
                  {stat.isYear ? stat.value : <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1300} start={statsInView} />}
                </motion.p>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-mute">{stat.label}</p>
                <motion.div className="mt-4 h-px w-12 origin-left lg:mx-auto" style={{ backgroundColor: stat.accent }} initial={reduceMotion ? false : { scaleX: 0 }} animate={statsInView || reduceMotion ? { scaleX: hoveredIndex === index ? 1 : 0.45 } : undefined} transition={{ duration: 0.3, ease: "easeOut" }} />

                <div className="mt-3 min-h-11 text-xs leading-relaxed text-mute transition-colors duration-250 group-hover:text-body">
                  {index === 1 ? (
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 lg:justify-center">
                      {stat.supporting.map((country, countryIndex) => (
                        <motion.span key={country} animate={hoveredIndex === index && !reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 0 }} initial={{ opacity: 0, y: 8 }} transition={{ duration: 0.28, delay: hoveredIndex === index ? countryIndex * 0.08 : 0 }}>
                          {country}{countryIndex < stat.supporting.length - 1 ? " ·" : ""}
                        </motion.span>
                      ))}
                    </div>
                  ) : index === 2 ? (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={hoveredIndex === index ? stat.supporting[languageIndex] : "all-languages"} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: "easeOut" }} className="block lg:text-center">
                        {hoveredIndex === index ? stat.supporting[languageIndex] : stat.supporting.join(" · ")}
                      </motion.span>
                    </AnimatePresence>
                  ) : (
                    stat.supporting.map((line) => <span key={line} className="block lg:text-center">{line}</span>)
                  )}
                </div>

                {index === 3 ? (
                  <motion.div className="mt-2 h-px overflow-hidden bg-[#eaeaea] lg:mx-auto lg:max-w-28" aria-hidden="true">
                    <motion.span className="block h-full origin-left" style={{ backgroundColor: stat.accent }} animate={{ scaleX: hoveredIndex === index ? 1 : 0.15 }} transition={{ duration: 0.7, ease: "easeOut" }} />
                  </motion.div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PeopleClient() {
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

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
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
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 text-xs font-mono uppercase tracking-[0.2em] text-mute"
          >
            ZABNIX · OUR PEOPLE
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-1 text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:text-7xl"
          >
            Meet our team of
          </motion.h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 h-[1.15em] overflow-hidden text-5xl font-bold leading-[1.08] tracking-[-0.04em] md:text-7xl"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={currentWord.text}
                initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0, color: currentWord.accent }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -42 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 block text-balance"
              >
                {currentWord.text}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[700px] text-pretty text-lg leading-relaxed text-body md:text-xl"
          >
            Behind every product is a team of passionate engineers, designers, architects, and problem-solvers building software that businesses trust every day.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}

      {/* ── Team grid ────────────────────────────────────────────────────────── */}
      <section className="border-b border-hairline px-6 pb-16 pt-20 md:pb-20 md:pt-24" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="team-heading"
            className="text-xs font-mono font-semibold text-mute uppercase tracking-[0.2em] text-center mb-16"
          >
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

          <p className="text-center text-xs text-mute font-mono mt-16 opacity-60">
            Profiles are representative and will be updated with real data.
          </p>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────────── */}
      <ValuesSection />

      {/* ── Join CTA ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-canvas px-6 pb-28 pt-16 text-center md:pt-20">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink mb-4 tracking-tight"
            style={{ textWrap: "balance" } as CSSProperties}
          >
            Join the team.
          </h2>
          <p className="text-body mb-10 leading-relaxed">
            We&apos;re always looking for sharp engineers, designers, and
            problem&#8209;solvers who want to build something meaningful.
          </p>
          <LetterRevealLink href="/careers" label="View Open Roles" />
        </div>
      </section>
    </div>
  );
}
