"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Code2, LifeBuoy, PencilRuler, Rocket, Route, Search } from "lucide-react";
import { useState } from "react";

const steps = [
  { title: "Discovery", caption: "We learn", description: "Understand business goals", details: ["Requirements gathering", "Stakeholder meetings", "Workflow analysis"], icon: Search },
  { title: "Strategy", caption: "We plan", description: "Plan the solution", details: ["Architecture", "Technology stack", "Delivery timeline"], icon: Route },
  { title: "Design", caption: "We shape", description: "Create the experience", details: ["Wireframes", "UI design", "Validation"], icon: PencilRuler },
  { title: "Build", caption: "We deliver", description: "Develop in milestones", details: ["Agile sprints", "Weekly demos", "Continuous testing"], icon: Code2 },
  { title: "Launch", caption: "We ship", description: "Production deployment", details: ["Quality assurance", "Monitoring", "Go-live support"], icon: Rocket },
  { title: "Support", caption: "We improve", description: "Long-term partnership", details: ["Maintenance", "Optimizations", "New features"], icon: LifeBuoy },
] as const;

export function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const progress = activeIndex === null ? 0 : (Math.min(activeIndex + 1, steps.length - 1) / (steps.length - 1)) * 100;

  return (
    <section className="overflow-visible border-b border-hairline bg-canvas px-6 pb-20 pt-12" aria-label="How we work">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-4 px-3 text-left"
        >
          <p className="text-sm font-mono uppercase tracking-[0.22em] text-[#8a8a8a]">How We Work</p>
        </motion.header>

        <div className="mt-6 overflow-visible pb-2 [scrollbar-width:none] max-md:overflow-x-auto">
          <div className="relative min-w-[760px] px-3 pt-20">
            <motion.div
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute left-[8.333%] right-[8.333%] top-[7rem] h-px origin-left bg-[#d9d9d9]"
            />
            <div aria-hidden="true" className="absolute left-[8.333%] right-[8.333%] top-[6.95rem] h-0.5">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="h-full bg-[#111111]"
              />
            </div>
            <ol className="relative z-10 grid grid-cols-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeIndex === index;
                const isComplete = activeIndex !== null && index <= activeIndex;
                const tooltipId = `process-detail-${index}`;
                const tooltipPosition = index === 0
                  ? "left-0 before:left-8 before:translate-x-0"
                  : index === steps.length - 1
                    ? "right-0 before:left-auto before:right-8 before:translate-x-0"
                    : "left-1/2 before:left-1/2 before:-translate-x-1/2";

                return (
                  <li key={step.title} className="flex min-w-0 justify-center">
                    <motion.button
                      type="button"
                      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 23, delay: index * 0.12 }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(null)}
                      aria-describedby={isActive ? tooltipId : undefined}
                      className="group relative flex w-full max-w-[128px] flex-col items-center text-center focus-visible:outline-none"
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            id={tooltipId}
                            role="tooltip"
                            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                            className={`absolute bottom-[calc(100%+16px)] z-20 w-52 rounded-2xl border border-[#e5e5e5] bg-white/95 p-3.5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur-sm before:absolute before:-bottom-1.5 before:h-3 before:w-3 before:rotate-45 before:border-b before:border-r before:border-[#e5e5e5] before:bg-white/95 ${tooltipPosition}`}
                          >
                            <p className="text-sm font-semibold text-ink">{step.title}</p>
                            <p className="mt-1 text-sm leading-5 text-body">{step.description}</p>
                            <ul className="mt-3 space-y-1.5 text-xs text-body">{step.details.map((detail) => <li key={detail} className="flex items-center gap-2"><span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#111111]" />{detail}</li>)}</ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.span
                        animate={isActive && !reduceMotion ? { y: -6, scale: 1.06 } : { y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className={`grid h-16 w-16 place-items-center rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ease-out ${isComplete ? "border-[#111111] bg-[#111111] text-white shadow-[0_10px_22px_rgba(17,17,17,0.14)]" : "border-[#dadada] bg-white text-[#555555]"}`}
                      >
                        <motion.span animate={isActive && !reduceMotion ? { rotate: 4 } : { rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}><Icon size={20} strokeWidth={1.75} aria-hidden="true" /></motion.span>
                      </motion.span>
                      <span className="mt-4 font-mono text-[11px] tracking-[0.16em] text-[#8a8a8a]">{String(index + 1).padStart(2, "0")}</span>
                      <span className={`mt-1.5 text-[22px] leading-tight transition-[font-weight,color] duration-300 ${isActive ? "font-semibold text-ink" : "font-medium text-ink"}`}>{step.title}</span>
                      <span className={`mt-1 text-[15px] transition-colors duration-300 ${isActive ? "text-ink" : "text-[#8a8a8a]"}`}>{step.caption}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
