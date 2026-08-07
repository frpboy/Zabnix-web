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

function InteractiveMetricChip({ value, label, start, delay }: { value: number; label: string; start: boolean; delay: number }) {
  const percent = value === 85;
  const crore = value === 2;
  const appointments = value === 3000;

  return (
    <motion.div
      initial={start ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: easeOut }}
      whileHover={{ y: -3, scale: 1.03 }}
      className="min-w-0 rounded-xl border border-hairline bg-canvas px-2.5 py-2.5 text-center transition-all duration-300 hover:border-black/20 hover:shadow-sm"
    >
      <p className="font-variant-numeric tabular-nums text-lg font-semibold tracking-tight text-ink">
        {crore ? "₹" : ""}
        <AnimatedCounter value={value} prefix={appointments ? "" : ""} suffix={crore ? "Cr" : percent ? "%" : appointments ? "+" : ""} duration={1350} start={start} />
      </p>
      <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.12em] text-mute">{label}</p>
    </motion.div>
  );
}

function InteractiveInventoryPanel({ start }: { start: boolean }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const monthsData = [
    { month: "Jan", val: "₹3.6Cr", cx: 20, cy: 31 },
    { month: "Feb", val: "₹3.2Cr", cx: 82, cy: 45 },
    { month: "Mar", val: "₹2.7Cr", cx: 144, cy: 61 },
    { month: "Apr", val: "₹2.3Cr", cx: 207, cy: 79 },
    { month: "May", val: "₹1.9Cr", cx: 270, cy: 97 },
    { month: "Jun", val: "₹1.6Cr", cx: 340, cy: 119 },
  ];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="rounded-2xl border border-hairline bg-canvas-soft p-4 md:p-5 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-ink">Inventory Holding Cost</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-medium text-emerald-600 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              -55% REDUCTION
            </span>
          </div>
          <p className="mt-1 text-xs text-mute">Six-month optimization outlook</p>
        </div>
        <motion.div whileHover={{ rotate: -15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <TrendingDown size={18} className="shrink-0 text-emerald-600" aria-hidden="true" />
        </motion.div>
      </div>

      <div
        className="relative mt-3 rounded-xl border border-hairline bg-canvas px-3 pb-2 pt-5 select-none"
        onMouseLeave={() => {
          setHoveredPoint(null);
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute left-3 top-3 rounded-md border border-hairline bg-canvas px-2.5 py-1 text-[10px] leading-tight text-mute shadow-xs"
        >
          <span className="block font-semibold text-rose-600">Before</span>₹3.6Cr
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-8 right-3 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1 text-[10px] leading-tight text-emerald-700 shadow-xs"
        >
          <span className="block font-semibold text-emerald-600">After</span>₹1.6Cr
        </motion.div>

        <svg viewBox="0 0 360 150" className="h-28 w-full cursor-pointer overflow-visible" role="img" aria-label="Inventory holding cost declines from 3.6 crore to 1.6 crore over six months">
          <defs>
            <linearGradient id="invLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {[38, 70, 102, 134].map((y) => (
            <line key={y} x1="18" x2="342" y1={y} y2={y} stroke="#ececec" strokeWidth="1" />
          ))}
          <motion.path
            d="M20 31 C52 37 61 41 82 45 S123 55 144 61 S185 72 207 79 S249 90 270 97 S319 111 340 119"
            fill="none"
            stroke="url(#invLineGrad)"
            strokeLinecap="round"
            strokeWidth="3"
            initial={start ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: easeOut }}
          />
          {monthsData.map((pt, index) => {
            const isHovered = hoveredPoint === index;
            return (
              <g key={pt.month} className="cursor-pointer">
                <motion.circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r={isHovered ? 6.5 : 4}
                  fill={isHovered ? "#10b981" : "#171717"}
                  stroke="#ffffff"
                  strokeWidth="2"
                  initial={start ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.3 + index * 0.1, ease: easeOut }}
                  onMouseEnter={() => {
                    setHoveredPoint(index);
                  }}
                />
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-6 text-center text-[10px] font-mono uppercase tracking-wide text-mute">
          {monthsData.map((m, idx) => (
            <span
              key={m.month}
              className={`transition-colors duration-200 ${hoveredPoint === idx ? "font-bold text-ink" : ""}`}
            >
              {m.month}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <InteractiveMetricChip value={2} label="Annual Savings" start={start} delay={0.1} />
        <InteractiveMetricChip value={85} label="Stockout Reduction" start={start} delay={0.2} />
        <InteractiveMetricChip value={5} label="Supplier Integrations" start={start} delay={0.3} />
      </div>
    </motion.div>
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
            <motion.div key={milestone.week} initial={start ? { opacity: 0, y: 12, scale: 0.6 } : false} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, delay: index * 0.14, ease: easeOut }} className="relative min-w-0 text-center">
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
  const points = ["18,31", "78,44", "138,66", "198,84", "258,103", "334,119"];

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
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.35, ease: easeOut }} className="relative">
          <p className="text-sm font-semibold text-ink">Patient Wait Trend</p>
          <p className="mt-1 text-xs text-mute">Wait time decreases across the rollout period</p>
          <svg viewBox="0 0 360 145" className="mt-2 h-28 w-full" role="img" aria-label="Patient wait time trend decreasing over several weeks">
            {[35, 67, 99, 131].map((y) => <motion.line key={y} x1="18" x2="340" y1={y} y2={y} stroke="#ececec" strokeWidth="1" initial={start ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} />)}
            <motion.path d="M18 31 C55 34 60 39 78 44 S120 58 138 66 S179 75 198 84 S240 94 258 103 S310 114 334 119" fill="none" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" initial={start ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} whileHover={{ strokeWidth: 3.25 }} transition={{ duration: 1.15, ease: easeOut }} />
            {points.map((point, index) => { const [cx, cy] = point.split(","); return <motion.circle key={point} cx={cx} cy={cy} r="3.75" fill="#171717" initial={start ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: [1, 1.45, 1] }} whileHover={{ scale: 1.5 }} transition={{ duration: 0.35, delay: 0.3 + index * 0.1 }} />; })}
          </svg>
        </motion.div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2"><MetricChip value={60} label="Reduction" start={start} /><MetricChip value={3000} label="Daily Appointments" start={start} /><MetricChip value={8} label="Hospital Branches" start={start} /></div>
    </div>
  );
}

function DesktopCaseStudyVisualization({ slug, start }: { slug: string; start: boolean }) {
  return (
    <div className="group/report mt-2 transition-transform duration-500 ease-out hover:scale-[1.02]">
      {slug === "retail-inventory" && <InteractiveInventoryPanel start={start} />}
      {slug === "manufacturing-erp" && <InteractiveRolloutPanel start={start} />}
      {slug === "hospital-network" && <InteractiveHealthcarePanel start={start} />}
    </div>
  );
}

function MobileCaseStudyVisualization({ slug, start }: { slug: string; start: boolean }) {
  return (
    <div className="group/report mt-2 overflow-hidden">
      {slug === "retail-inventory" && <InteractiveInventoryPanel start={start} />}
      {slug === "manufacturing-erp" && <InteractiveRolloutPanel start={start} />}
      {slug === "hospital-network" && <InteractiveHealthcarePanel start={start} />}
    </div>
  );
}

export function CaseStudyVisualization({ slug }: CaseStudyVisualizationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const start = reduceMotion || inView;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, ease: easeOut }}
    >
      <div className="hidden lg:block">
        <DesktopCaseStudyVisualization slug={slug} start={start} />
      </div>
      <div className="block lg:hidden">
        <MobileCaseStudyVisualization slug={slug} start={start} />
      </div>
    </motion.div>
  );
}

