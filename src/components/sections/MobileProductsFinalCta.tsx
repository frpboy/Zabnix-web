"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const STEP_DURATION_MS = 2200;
const CTA_STEPS = [
  "Tell us what you're building.",
  "We'll design a solution around it.",
  "Built to fit. Built to scale.",
] as const;

function StepRing({
  index,
  activeIndex,
  cycleCount,
  reduceMotion,
}: {
  index: number;
  activeIndex: number;
  cycleCount: number;
  reduceMotion: boolean | null;
}) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const isActive = index === activeIndex;

  return (
    <div className="relative h-11 w-11 shrink-0">
      <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden="true">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(15,23,42,0.12)"
          strokeWidth="1.5"
        />
        <motion.circle
          key={`${index}-${isActive ? cycleCount : "idle"}`}
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(15,23,42,0.95)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: isActive && !reduceMotion ? circumference : circumference,
            opacity: isActive ? 1 : 0.24,
          }}
          animate={{
            strokeDashoffset: isActive && !reduceMotion ? 0 : circumference,
            opacity: isActive ? 1 : 0.24,
          }}
          transition={{
            duration: isActive && !reduceMotion ? STEP_DURATION_MS / 1000 : 0.2,
            ease: "linear",
          }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[0.95rem] font-semibold tracking-[-0.03em] text-ink">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function DottedWave({ reduceMotion }: { reduceMotion: boolean | null }) {
  const layers = useMemo(
    () => [
      {
        duration: 12,
        opacity: 0.2,
        paths: [
          "M0 96 C30 76 60 66 90 80 C120 94 150 112 180 106 C210 100 240 74 270 78 C300 82 330 110 360 104",
          "M0 118 C34 104 68 86 102 94 C136 102 170 122 204 118 C238 114 272 92 306 90 C330 88 346 92 360 98",
        ],
      },
      {
        duration: 14,
        opacity: 0.15,
        paths: [
          "M0 104 C24 88 54 82 84 92 C114 102 144 120 174 116 C204 112 234 92 264 88 C294 84 324 92 360 108",
          "M0 128 C28 118 58 108 88 112 C118 116 148 130 178 128 C208 126 238 112 268 110 C300 108 330 112 360 120",
        ],
      },
      {
        duration: 16,
        opacity: 0.11,
        paths: [
          "M0 112 C36 96 72 92 108 102 C144 112 180 128 216 122 C252 116 288 92 324 94 C338 95 350 98 360 102",
          "M0 136 C24 130 52 122 80 124 C108 126 136 136 164 138 C192 140 220 132 248 128 C286 123 324 124 360 132",
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
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="h-[11.5rem] w-full"
      >
        <svg viewBox="0 0 360 150" className="h-full w-[200%] min-w-[44rem]" preserveAspectRatio="none">
          {layers.map((layer, layerIndex) => (
            <motion.g
              key={layerIndex}
              animate={reduceMotion ? undefined : { x: [0, -180] }}
              transition={reduceMotion ? undefined : { duration: layer.duration, repeat: Infinity, ease: "linear" }}
              opacity={layer.opacity}
            >
              {Array.from({ length: 2 }).map((_, repeatIndex) => (
                <g key={repeatIndex} transform={`translate(${repeatIndex * 180} 0)`}>
                  {layer.paths.map((path, pathIndex) => (
                    <path
                      key={pathIndex}
                      d={path}
                      fill="none"
                      stroke="rgba(15,23,42,0.48)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="0.2 5.8"
                    />
                  ))}
                  <circle cx="44" cy="102" r="1.9" fill="rgba(15,23,42,0.92)" />
                  <circle cx="172" cy="118" r="1.9" fill="rgba(15,23,42,0.92)" />
                  <circle cx="302" cy="96" r="1.9" fill="rgba(15,23,42,0.92)" />
                </g>
              ))}
            </motion.g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

export function MobileProductsFinalCta() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % CTA_STEPS.length);
      setCycleCount((current) => current + 1);
    }, STEP_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden border-t border-hairline bg-canvas px-4 py-10 md:hidden">
      <div className="mx-auto">
        <div className="relative overflow-hidden rounded-[30px] border border-[#e5e9f0] bg-white px-6 pb-36 pt-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
          <div className="relative z-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.36 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9dde4] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink"
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Custom Solutions</span>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.08 }}
              className="mt-5 font-mono text-[0.78rem] lowercase tracking-[0.08em] text-[#667085]"
            >
              /custom-solution
            </motion.p>

            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.14 }}
              className="mt-4 max-w-[9.5ch] text-[2.85rem] font-bold leading-[0.92] tracking-[-0.06em] text-ink min-[390px]:text-[3.1rem]"
              style={{ textWrap: "balance" }}
            >
              Need something custom?
            </motion.h2>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0.65 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.22 }}
              className="mt-6 h-px w-16 origin-left bg-[#202938]"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.28 }}
              className="mt-8 space-y-5"
            >
              {CTA_STEPS.map((statement, index) => {
                const isActive = reduceMotion ? true : activeStep === index;

                return (
                  <div key={statement} className="flex items-start gap-4">
                    <StepRing
                      index={index}
                      activeIndex={activeStep}
                      cycleCount={cycleCount}
                      reduceMotion={reduceMotion}
                    />
                    <p
                      className={`pt-1 text-[1rem] leading-7 transition-[color,opacity] duration-300 ${
                        isActive ? "text-ink opacity-100" : "text-[#667085] opacity-80"
                      }`}
                    >
                      <span className="mr-2 font-mono text-ink">&gt;</span>
                      {statement}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.38 }}
              className="mt-10"
            >
              <Link
                href="/contact#consultation"
                className="group inline-flex min-h-[56px] w-full touch-manipulation items-center justify-center gap-3 overflow-hidden rounded-[18px] bg-black px-5 text-[0.98rem] font-semibold uppercase tracking-[0.14em] text-white [-webkit-tap-highlight-color:transparent] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.14)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight
                  size={19}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>

          <DottedWave reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
