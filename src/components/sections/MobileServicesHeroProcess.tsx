"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Headset,
  Rocket,
  Search,
  SquarePen,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ProcessStep = {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const PROCESS_STEPS: readonly ProcessStep[] = [
  { num: "01", title: "Research & Discovery", desc: "We explore", icon: Search },
  { num: "02", title: "Strategy & Planning", desc: "We strategize", icon: Target },
  { num: "03", title: "Design & Experience", desc: "We craft", icon: SquarePen },
  { num: "04", title: "Engineering & Build", desc: "We build", icon: Code2 },
  { num: "05", title: "Launch & Scale", desc: "We launch", icon: Rocket },
  { num: "06", title: "Support & Evolve", desc: "We care", icon: Headset },
] as const;

const HOLD_MS = 1850;
const CARD_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1];
const CARD_TRANSITION = {
  duration: 0.7,
  ease: CARD_EASE,
};

function ProcessWave({ reduceMotion }: { reduceMotion: boolean | null }) {
  const layers = useMemo(
    () => [
      {
        duration: 12,
        opacity: 0.16,
        paths: [
          "M0 98 C30 84 60 82 90 90 C120 98 150 116 180 122 C210 128 240 120 270 108 C300 96 330 88 360 92",
          "M0 126 C28 116 56 108 84 112 C112 116 140 130 168 138 C196 146 224 146 252 138 C290 128 326 116 360 114",
        ],
      },
      {
        duration: 15,
        opacity: 0.11,
        paths: [
          "M0 110 C36 94 72 90 108 98 C144 106 180 124 216 130 C252 136 288 128 324 116 C338 112 350 110 360 112",
          "M0 138 C30 132 60 126 90 128 C120 130 150 140 180 146 C210 152 240 152 270 144 C300 136 330 126 360 124",
        ],
      },
      {
        duration: 18,
        opacity: 0.08,
        paths: [
          "M0 118 C32 108 64 104 96 110 C128 116 160 130 192 136 C224 142 256 140 288 130 C320 120 344 116 360 118",
          "M0 146 C26 144 52 140 78 142 C104 144 130 150 156 154 C182 158 208 158 234 154 C276 148 318 138 360 136",
        ],
      },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="h-[8.75rem] w-full"
      >
        <svg viewBox="0 0 360 160" className="h-full w-[200%] min-w-[42rem]" preserveAspectRatio="none">
          {layers.map((layer, layerIndex) => (
            <motion.g
              key={layerIndex}
              animate={reduceMotion ? undefined : { x: [0, -180] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: layer.duration, ease: "linear", repeat: Infinity }
              }
              opacity={layer.opacity}
            >
              {Array.from({ length: 2 }).map((_, repeatIndex) => (
                <g key={repeatIndex} transform={`translate(${repeatIndex * 180} 0)`}>
                  {layer.paths.map((path, pathIndex) => (
                    <path
                      key={pathIndex}
                      d={path}
                      fill="none"
                      stroke="rgba(15,23,42,0.42)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="0.2 5.2"
                    />
                  ))}
                </g>
              ))}
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

function ProcessCard({
  step,
  isActive,
  reduceMotion,
}: {
  step: ProcessStep;
  isActive: boolean;
  reduceMotion: boolean | null;
}) {
  const Icon = step.icon;
  const transition = reduceMotion
    ? { duration: 0 }
    : CARD_TRANSITION;

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{
        width: isActive ? 140 : "100%",
        height: isActive ? 140 : 108,
        backgroundColor: isActive ? "#000000" : "#ffffff",
        borderColor: isActive ? "rgba(0,0,0,0.1)" : "#e5e7eb",
        borderRadius: isActive ? 26 : 26,
        boxShadow: isActive
          ? "0 20px 45px rgba(15,23,42,0.28)"
          : "0 12px 28px rgba(15,23,42,0.07)",
      }}
      transition={{
        layout: transition,
        width: transition,
        height: transition,
        backgroundColor: transition,
        borderColor: transition,
        boxShadow: transition,
        opacity: { duration: reduceMotion ? 0 : 0.35 },
        y: { duration: reduceMotion ? 0 : 0.35 },
      }}
      className={`relative z-10 mx-auto overflow-hidden border px-4 ${
        isActive
          ? "flex flex-col items-center justify-center py-4 text-center opacity-100"
          : "flex items-center gap-4 text-left opacity-[0.97]"
      }`}
    >
      <motion.div
        layout
        animate={{
          width: isActive ? 55 : 80,
          height: isActive ? 55 : 80,
          backgroundColor: isActive ? "rgba(255,255,255,0)" : "#fcfcfd",
          borderColor: isActive ? "rgba(255,255,255,0)" : "#eceef2",
          boxShadow: isActive
            ? "0 0 0 rgba(0,0,0,0)"
            : "inset 0 1px 0 rgba(255,255,255,0.8), 0 10px 20px rgba(15,23,42,0.05)",
        }}
        transition={transition}
        className="flex shrink-0 items-center justify-center rounded-[22px] border"
      >
        <motion.span
          animate={{ color: isActive ? "#ffffff" : "#000000", scale: isActive ? 0.84 : 1 }}
          transition={transition}
          className="flex items-center justify-center"
        >
          <Icon size={34} strokeWidth={1.7} aria-hidden="true" />
        </motion.span>
      </motion.div>
      <motion.div layout className={isActive ? "mt-2 min-w-0" : "min-w-0"}>
        <motion.p
          animate={{ color: isActive ? "rgba(255,255,255,0.8)" : "#64748b" }}
          transition={transition}
          className={`font-mono font-semibold ${
            isActive ? "text-[0.8rem] tracking-[0.06em]" : "text-[0.9rem] tracking-[0.04em]"
          }`}
        >
          {step.num}
        </motion.p>
        <motion.h3
          animate={{ color: isActive ? "#ffffff" : "#000000" }}
          transition={transition}
          className={`font-semibold ${
            isActive
              ? "mt-1 text-[0.96rem] leading-[1.06] tracking-[-0.03em]"
              : "mt-1 text-[1.45rem] leading-[1.08] tracking-[-0.04em]"
          }`}
        >
          {step.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}

export function MobileServicesHeroProcess() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setActiveIndex(0);
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % PROCESS_STEPS.length);
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, reduceMotion]);

  return (
    <section className="relative overflow-hidden space-y-7 pt-4 text-left">
      <div className="relative z-10">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          className="mb-3 inline-flex rounded-full border border-[#d9dde4] bg-[#f8fafc] px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-800"
        >
          Our Services
        </motion.span>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.06 }}
          className="max-w-[10.5ch] text-[3rem] font-semibold leading-[0.94] tracking-[-0.07em] text-black min-[390px]:text-[3.2rem]"
          style={{ textWrap: "balance" }}
        >
          Technology solutions that drive real impact.
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.12 }}
          className="mt-4 max-w-[18ch] text-[1.1rem] leading-[1.55] text-slate-600 min-[390px]:text-[1.14rem]"
        >
          We build, scale and modernize digital products with sharp engineering and user-first design.
        </motion.p>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.18 }}
        className="relative pb-20"
      >
        <div className="relative mx-auto max-w-[25rem]">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-10 z-0 w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.35),rgba(148,163,184,0.2))]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(148,163,184,0.42) 0 3px, transparent 3px 8px)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-5 pt-10">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessCard
                key={step.num}
                step={step}
                isActive={activeIndex === index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        <ProcessWave reduceMotion={reduceMotion} />
      </motion.div>
    </section>
  );
}
