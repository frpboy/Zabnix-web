"use client";

import type { CSSProperties, PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/lib/data";
import { CaseStudyVisualization } from "@/components/sections/CaseStudyVisualization";
import { CaseStudyCta } from "@/components/sections/CaseStudyCta";

const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function InteractiveCaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <motion.article
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.14 } } }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.5, ease: easeOut }}
      onPointerMove={handlePointerMove}
      className="group relative overflow-hidden rounded-[28px] border border-hairline bg-canvas shadow-level-3 transition-[border-color,box-shadow] duration-500 ease-out hover:border-hairline-strong hover:shadow-level-4"
      style={{ "--cursor-x": "50%", "--cursor-y": "50%" } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(280px circle at var(--cursor-x) var(--cursor-y), rgba(23,23,23,0.035), transparent 70%)" }} aria-hidden="true" />
      <div className="relative p-6 md:p-7">
        <motion.div variants={reveal} transition={{ duration: 0.55, ease: easeOut }} className="mb-4 flex items-center gap-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-mute">{caseStudy.industry}</span>
          <span className="text-hairline-strong" aria-hidden="true">·</span>
          <span className="text-xs font-mono text-mute">{caseStudy.company}</span>
        </motion.div>

        <motion.h2 variants={reveal} transition={{ duration: 0.6, ease: easeOut }} className="mb-4 text-2xl font-semibold leading-tight text-ink md:text-3xl" style={{ textWrap: "balance" }}>
          {caseStudy.title}
        </motion.h2>

        <motion.div variants={reveal} transition={{ duration: 0.6, ease: easeOut }} className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-mute">The Problem</h3>
            <p className="text-sm leading-relaxed text-body">{caseStudy.problem}</p>
          </div>
          <div>
            <h3 className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-widest text-mute">Our Solution</h3>
            <p className="text-sm leading-relaxed text-body">{caseStudy.solution}</p>
          </div>
        </motion.div>

        <motion.div variants={reveal} transition={{ duration: 0.65, ease: easeOut }} className="mb-6">
          <CaseStudyVisualization slug={caseStudy.slug} />
        </motion.div>

        <motion.div variants={reveal} transition={{ duration: 0.55, ease: easeOut }}>
          <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
            <CaseStudyCta href={`/case-studies/${caseStudy.slug}`} />
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}
