"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, Database, Factory, Timer, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type CaseStudyVisualizationProps = {
  slug: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function MetricChip({ value, label, start }: { value: number; label: string; start: boolean }) {
  const percent = value === 85;
  const crore = value === 2;
  const appointments = value === 3000;

  return (
    <div className="min-w-0 rounded-xl border border-hairline bg-canvas px-2.5 py-2.5 text-center">
      <p className="font-variant-numeric tabular-nums text-lg font-semibold tracking-tight text-ink">
        {crore ? "₹" : ""}
        <AnimatedCounter value={value} prefix={appointments ? "" : ""} suffix={crore ? "Cr" : percent ? "%" : appointments ? "+" : ""} duration={1350} start={start} />
      </p>
      <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.12em] text-mute">{label}</p>
    </div>
  );
}

function InventoryPanel({ start }: { start: boolean }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const points = ["20,31", "82,45", "144,61", "207,79", "270,97", "340,119"];

  return (
    <div className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Inventory Holding Cost</p>
          <p className="mt-1 text-xs text-mute">Six-month optimization outlook</p>
        </div>
        <TrendingDown size={18} className="shrink-0 text-ink" aria-hidden="true" />
      </div>
      <div className="relative mt-3 rounded-xl border border-hairline bg-canvas px-3 pb-2 pt-5">
        <div className="absolute left-3 top-3 rounded-md border border-hairline bg-canvas px-2 py-1 text-[10px] leading-tight text-mute">
          <span className="block font-medium text-ink">Before</span>₹3.6Cr
        </div>
        <div className="absolute bottom-8 right-3 rounded-md border border-hairline bg-canvas px-2 py-1 text-[10px] leading-tight text-mute">
          <span className="block font-medium text-ink">After</span>₹1.6Cr
        </div>
        <svg viewBox="0 0 360 150" className="h-28 w-full" role="img" aria-label="Inventory holding cost declines from 3.6 crore to 1.6 crore over six months">
          {[38, 70, 102, 134].map((y) => <line key={y} x1="18" x2="342" y1={y} y2={y} stroke="#ececec" strokeWidth="1" />)}
          <motion.path d="M20 31 C52 37 61 41 82 45 S123 55 144 61 S185 72 207 79 S249 90 270 97 S319 111 340 119" fill="none" stroke="#171717" strokeLinecap="round" strokeWidth="2.5" initial={start ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: easeOut }} />
          {points.map((point, index) => {
            const [cx, cy] = point.split(",");
            return <motion.circle key={point} cx={cx} cy={cy} r="4" fill="#171717" initial={start ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25, delay: 0.3 + index * 0.1, ease: easeOut }} />;
          })}
        </svg>
        <div className="grid grid-cols-6 text-center text-[10px] font-mono uppercase tracking-wide text-mute">{months.map((month) => <span key={month}>{month}</span>)}</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <MetricChip value={2} label="Annual Savings" start={start} />
        <MetricChip value={85} label="Stockout Reduction" start={start} />
        <MetricChip value={5} label="Supplier Integrations" start={start} />
      </div>
    </div>
  );
}

function RolloutPanel({ start }: { start: boolean }) {
  const milestones = [
    { week: "Week 1", width: "18%" },
    { week: "Week 4", width: "42%" },
    { week: "Week 8", width: "68%" },
    { week: "Week 12", width: "100%" },
  ];

  return (
    <div className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5">
      <p className="text-sm font-semibold text-ink">Deployment Progress</p>
      <p className="mt-1 text-xs text-mute">A controlled rollout across the manufacturing network</p>
      <div className="relative mt-6 px-2">
        <div className="absolute left-4 right-4 top-[21px] h-px bg-hairline" />
        <motion.div className="absolute left-4 top-[21px] h-px origin-left bg-ink" initial={start ? { scaleX: 0 } : false} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: easeOut }} style={{ right: "1rem" }} />
        <div className="relative grid grid-cols-4 gap-2">
          {milestones.map((milestone, index) => (
            <motion.div key={milestone.week} initial={start ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.12, ease: easeOut }} className="min-w-0 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-canvas text-xs font-semibold text-ink">{index === 3 ? "✓" : String(index + 1).padStart(2, "0")}</div>
              <p className="mt-2 text-xs font-medium text-ink">{milestone.week}</p>
              <div className="mx-auto mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hairline"><motion.div className="h-full bg-ink" initial={start ? { width: 0 } : false} animate={{ width: milestone.width }} transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease: easeOut }} /></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <ReportMetric icon={Factory} value={3} suffix="" label="Plants" start={start} />
        <ReportMetric icon={Database} value={1} suffix="M+" label="Records Migrated" start={start} />
        <ReportMetric icon={Timer} value={90} suffix=" Days" label="Deployment Time" start={start} />
      </div>
    </div>
  );
}

function ReportMetric({ icon: Icon, value, suffix, label, start }: { icon: typeof Building2; value: number; suffix: string; label: string; start: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline bg-canvas px-3 py-3">
      <Icon size={18} className="shrink-0 text-ink" aria-hidden="true" />
      <div className="min-w-0"><p className="font-variant-numeric tabular-nums text-base font-semibold text-ink"><AnimatedCounter value={value} suffix={suffix} duration={1300} start={start} /></p><p className="text-[10px] font-mono uppercase tracking-[0.1em] text-mute">{label}</p></div>
    </div>
  );
}

function HealthcarePanel({ start }: { start: boolean }) {
  const points = ["18,31", "78,44", "138,66", "198,84", "258,103", "334,119"];
  return (
    <div className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr] md:items-center">
        <div className="rounded-xl border border-hairline bg-canvas p-3.5">
          <p className="text-sm font-semibold text-ink">Average Wait Time</p>
          <div className="mt-4"><p className="text-[10px] font-mono uppercase tracking-[0.12em] text-mute">Before</p><p className="mt-1 text-2xl font-semibold text-ink">2 Hours</p></div>
          <motion.div initial={start ? { opacity: 0, y: -8 } : false} animate={{ opacity: 1, y: 8 }} transition={{ duration: 0.55, delay: 0.35, ease: easeOut }} className="my-3 text-xl text-ink" aria-hidden="true">↓</motion.div>
          <div><p className="text-[10px] font-mono uppercase tracking-[0.12em] text-mute">After</p><p className="mt-1 text-2xl font-semibold text-ink">18 Minutes</p></div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Patient Wait Trend</p>
          <p className="mt-1 text-xs text-mute">Wait time decreases across the rollout period</p>
          <svg viewBox="0 0 360 145" className="mt-2 h-28 w-full" role="img" aria-label="Patient wait time trend decreasing over several weeks">
            {[35, 67, 99, 131].map((y) => <line key={y} x1="18" x2="340" y1={y} y2={y} stroke="#ececec" strokeWidth="1" />)}
            <motion.path d="M18 31 C55 34 60 39 78 44 S120 58 138 66 S179 75 198 84 S240 94 258 103 S310 114 334 119" fill="none" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" initial={start ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: 1.15, ease: easeOut }} />
            {points.map((point, index) => { const [cx, cy] = point.split(","); return <motion.circle key={point} cx={cx} cy={cy} r="3.75" fill="#171717" initial={start ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.3 + index * 0.1 }} />; })}
          </svg>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><MetricChip value={60} label="Reduction" start={start} /><MetricChip value={3000} label="Daily Appointments" start={start} /><MetricChip value={8} label="Hospital Branches" start={start} /></div>
    </div>
  );
}

function InteractiveRolloutMetric({ icon: Icon, value, suffix, label, start, delay }: { icon: typeof Building2; value: number; suffix: string; label: string; start: boolean; delay: number }) {
  return (
    <motion.div initial={start ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay, ease: easeOut }} whileHover={{ y: -5 }} className="flex items-center gap-3 rounded-xl border border-hairline bg-canvas px-3 py-3 transition-[border-color,box-shadow] duration-300 hover:border-hairline-strong hover:shadow-level-2">
      <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.25 }}><Icon size={18} className="shrink-0 text-ink" aria-hidden="true" /></motion.div>
      <div className="min-w-0"><motion.p whileHover={{ scale: 1.05 }} className="origin-left font-variant-numeric tabular-nums text-base font-semibold text-ink"><AnimatedCounter value={value} suffix={suffix} duration={1300} start={start} /></motion.p><p className="text-[10px] font-mono uppercase tracking-[0.1em] text-mute">{label}</p></div>
    </motion.div>
  );
}

function InteractiveRolloutPanel({ start }: { start: boolean }) {
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const milestones = [
    { week: "Week 1", detail: "Foundation Setup", width: "18%" },
    { week: "Week 4", detail: "Core Modules", width: "42%" },
    { week: "Week 8", detail: "Cross-Plant Inventory", width: "68%" },
    { week: "Week 12", detail: "Go-Live Complete", width: "100%" },
  ];

  return (
    <div className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5">
      <p className="text-sm font-semibold text-ink">Deployment Progress</p>
      <p className="mt-1 text-xs text-mute">A controlled rollout across the manufacturing network</p>
      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.35, ease: easeOut }} className="relative mt-6 px-2">
        <div className="absolute left-4 right-4 top-[21px] h-px bg-hairline" />
        <motion.div className="absolute left-4 right-4 top-[21px] h-px origin-left bg-ink" initial={start ? { scaleX: 0 } : false} animate={{ scaleX: 1 }} whileHover={{ scaleY: 1.8 }} transition={{ duration: 1.2, ease: easeOut }} />
        <div className="relative grid grid-cols-4 gap-2">
          {milestones.map((milestone, index) => (
            <motion.div key={milestone.week} initial={start ? { opacity: 0, y: 12, scale: 0.6 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, delay: index * 0.14, ease: easeOut }} onHoverStart={() => setHoveredMilestone(index)} onHoverEnd={() => setHoveredMilestone(null)} className="relative min-w-0 text-center">
              {hoveredMilestone === index && <motion.div initial={{ opacity: 0, y: 5, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="pointer-events-none absolute bottom-[76px] left-1/2 z-10 w-40 -translate-x-1/2 rounded-lg border border-hairline bg-canvas px-3 py-2 text-left text-xs shadow-level-3"><p className="font-medium text-ink">{milestone.week}</p><p className="mt-0.5 text-mute">{milestone.detail}<br />Completed</p></motion.div>}
              <motion.div whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }} transition={{ duration: 0.25 }} className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-canvas text-xs font-semibold text-ink">{index === 3 ? <motion.span initial={start ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.7 }}>✓</motion.span> : String(index + 1).padStart(2, "0")}</motion.div>
              <motion.p initial={start ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.12 + index * 0.14, ease: easeOut }} className="mt-2 text-xs font-medium text-ink">{milestone.week}</motion.p>
              <div className="mx-auto mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hairline"><motion.div className="h-full bg-ink" initial={start ? { width: 0 } : false} animate={{ width: milestone.width }} transition={{ duration: 0.7, delay: 0.25 + index * 0.14, ease: easeOut }} /></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <InteractiveRolloutMetric icon={Factory} value={3} suffix="" label="Plants" start={start} delay={0.55} />
        <InteractiveRolloutMetric icon={Database} value={1} suffix="M+" label="Records Migrated" start={start} delay={0.7} />
        <InteractiveRolloutMetric icon={Timer} value={90} suffix=" Days" label="Deployment Time" start={start} delay={0.85} />
      </div>
    </div>
  );
}

function InteractiveHealthcarePanel({ start }: { start: boolean }) {
  const [waitHovered, setWaitHovered] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const points = ["18,31", "78,44", "138,66", "198,84", "258,103", "334,119"];

  const updateTooltip = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTooltip({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  return (
    <div className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr] md:items-center">
        <motion.div onHoverStart={() => setWaitHovered(true)} onHoverEnd={() => setWaitHovered(false)} whileHover={{ y: -3 }} transition={{ duration: 0.35, ease: easeOut }} className="rounded-xl border border-hairline bg-canvas p-3.5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-hairline-strong hover:bg-white hover:shadow-level-2">
          <p className="text-sm font-semibold text-ink">Average Wait Time</p>
          <motion.div initial={start ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12, ease: easeOut }} className="mt-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-mute">Before</p>
            <motion.p animate={waitHovered ? { scale: 1.03 } : { scale: 1 }} className="mt-1 origin-left text-2xl font-semibold text-ink"><AnimatedCounter value={2} suffix=" Hours" duration={950} start={start} /></motion.p>
          </motion.div>
          <motion.div initial={start ? { opacity: 0, y: -8 } : false} animate={waitHovered ? { opacity: 1, y: [0, 6, 0] } : { opacity: 1, y: 8 }} transition={{ duration: waitHovered ? 0.45 : 0.55, delay: waitHovered ? 0 : 0.35, ease: easeOut }} className="my-3 text-xl text-ink" aria-hidden="true">↓</motion.div>
          <motion.div initial={start ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6, ease: easeOut }}>
            <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-mute">After</p>
            <motion.p animate={waitHovered ? { scale: 1.03 } : { scale: 1 }} className="mt-1 origin-left text-2xl font-semibold text-ink"><AnimatedCounter value={18} suffix=" Minutes" duration={1100} start={start} /></motion.p>
          </motion.div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.35, ease: easeOut }} onPointerMove={updateTooltip} onPointerLeave={() => setTooltip(null)} className="relative">
          <p className="text-sm font-semibold text-ink">Patient Wait Trend</p>
          <p className="mt-1 text-xs text-mute">Wait time decreases across the rollout period</p>
          <svg viewBox="0 0 360 145" className="mt-2 h-28 w-full" role="img" aria-label="Patient wait time trend decreasing over several weeks">
            {[35, 67, 99, 131].map((y) => <motion.line key={y} x1="18" x2="340" y1={y} y2={y} stroke="#ececec" strokeWidth="1" initial={start ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} />)}
            <motion.path d="M18 31 C55 34 60 39 78 44 S120 58 138 66 S179 75 198 84 S240 94 258 103 S310 114 334 119" fill="none" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" initial={start ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} whileHover={{ strokeWidth: 3.25 }} transition={{ duration: 1.15, ease: easeOut }} />
            {points.map((point, index) => { const [cx, cy] = point.split(","); return <motion.circle key={point} cx={cx} cy={cy} r="3.75" fill="#171717" initial={start ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: [1, 1.45, 1] }} whileHover={{ scale: 1.5 }} transition={{ duration: 0.35, delay: 0.3 + index * 0.1 }} />; })}
          </svg>
          {tooltip && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-none absolute z-10 rounded-lg border border-hairline bg-canvas px-3 py-2 text-xs shadow-level-3" style={{ left: Math.min(tooltip.x + 12, 220), top: Math.max(tooltip.y - 56, 8) }}><p className="font-medium text-ink">Week 6</p><p className="mt-0.5 text-mute">Average Wait: 18 Minutes</p></motion.div>}
        </motion.div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><MetricChip value={60} label="Reduction" start={start} /><MetricChip value={3000} label="Daily Appointments" start={start} /><MetricChip value={8} label="Hospital Branches" start={start} /></div>
    </div>
  );
}

export function CaseStudyVisualization({ slug }: CaseStudyVisualizationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const start = reduceMotion || inView;

  return (
    <motion.div ref={ref} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={start ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.65, ease: easeOut }} className="group/report mt-2 transition-transform duration-500 ease-out hover:scale-[1.02]">
      {slug === "retail-inventory" && <InventoryPanel start={start} />}
      {slug === "manufacturing-erp" && <InteractiveRolloutPanel start={start} />}
      {slug === "hospital-network" && <InteractiveHealthcarePanel start={start} />}
    </motion.div>
  );
}
