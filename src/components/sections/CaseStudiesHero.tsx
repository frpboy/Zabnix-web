"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CaseStudiesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-hairline bg-canvas px-6 py-24 grid-bg"
      aria-labelledby="case-studies-heading"
    >
      <div
        className="orb orb-blue pulse-glow absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
        aria-hidden="true"
      />
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto max-w-[800px] text-left"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.55, ease: easeOut } },
          }}
          className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-mute"
        >
          Our Work
        </motion.p>
        <motion.h1
          id="case-studies-heading"
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.08, ease: easeOut } },
          }}
          className="text-pretty text-5xl font-semibold tracking-[-0.03em] text-ink md:text-6xl"
        >
          Real projects. Real clients. Real results.
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.23, ease: easeOut } },
          }}
          className="mt-6 max-w-3xl text-xl leading-relaxed text-body"
        >
          Explore how we&apos;ve helped businesses modernize operations, automate workflows, and build software that creates lasting value.
        </motion.p>
      </motion.div>
    </section>
  );
}
