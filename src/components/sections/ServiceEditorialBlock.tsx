"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Code2,
  FileCode2,
  GitBranch,
  Globe,
  LockKeyhole,
  MonitorSmartphone,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const serviceIcons = {
  software: Code2,
  mobile: Smartphone,
  erp: BarChart3,
  ai: Brain,
  consulting: Globe,
  security: Shield,
} as const;

export type ServiceEditorialIcon = keyof typeof serviceIcons;

export type ServiceEditorialItem = {
  id: string;
  title: string;
  description: string;
  deliverables: readonly string[];
  icon: ServiceEditorialIcon;
};

type ServiceEditorialBlockProps = {
  service: ServiceEditorialItem;
  index: number;
};

const previewLabels: Record<string, string> = {
  software: "Application architecture preview",
  mobile: "Mobile application preview",
  erp: "ERP dashboard preview",
  ai: "Automation workflow preview",
  consulting: "Technology roadmap preview",
  security: "Security monitoring preview",
};

type PreviewShellProps = {
  children: ReactNode;
  label: string;
  title: string;
  Icon: LucideIcon;
};

function PreviewShell({ children, label, title, Icon }: PreviewShellProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { damping: 24, stiffness: 180, mass: 0.35 });
  const y = useSpring(pointerY, { damping: 24, stiffness: 180, mass: 0.35 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
  };

  return (
    <div aria-label={label} onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="h-full overflow-hidden rounded-[24px] border-2 border-black bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.035)] transition-[border-color,box-shadow] duration-[250ms] ease-out group-hover/preview:border-neutral-700 group-hover/preview:shadow-[0_16px_36px_rgba(15,23,42,0.07)]">
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#e5e5e5] text-black transition-transform duration-300 ease-out group-hover/preview:rotate-3">
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <p className="text-sm font-black uppercase tracking-[0.1em] text-black">{title}</p>
      </div>
      <motion.div style={reduceMotion ? undefined : { x, y }} className="pt-5">
        {children}
      </motion.div>
    </div>
  );
}

function ServicePreview({ id, title, Icon }: { id: string; title: string; Icon: LucideIcon }) {
  const sharedClass = "h-full min-h-[300px]";
  const reduceMotion = useReducedMotion();
  const loopTransition = reduceMotion ? { duration: 0 } : { duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 };

  if (id === "software") {
    return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} rounded-2xl border border-[#e6e6e6] bg-white`}><div className="flex items-center gap-2 border-b border-[#ececec] px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" /><span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" /><span className="h-2.5 w-2.5 rounded-full bg-[#d4d4d4]" /><span className="ml-3 text-xs font-medium text-[#737373]">order-service.ts</span></div><div className="grid h-[calc(100%-45px)] grid-cols-[96px_1fr]"><aside className="border-r border-[#ececec] p-3"><div className="mb-5 flex items-center gap-2 text-xs font-medium text-[#171717]"><FileCode2 size={14} />src</div>{["api", "orders", "schema", "tests"].map((item, index) => <motion.div key={item} animate={reduceMotion ? undefined : { opacity: index === 1 ? [0.45, 1, 0.45] : 1 }} transition={{ ...loopTransition, delay: index * 0.2 }} className="mb-3 text-[11px] text-[#8a8a8a]">{item}</motion.div>)}</aside><div className="p-5 font-mono text-xs leading-7 text-[#737373]"><p><span className="text-[#171717]">export async function</span> createOrder()<motion.span animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0] }} transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.8 }} className="ml-0.5 text-[#171717]">|</motion.span></p><p className="pl-4">const order = await validate(payload)</p><p className="pl-4">return inventory.reserve(order)</p><motion.p animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }} transition={loopTransition} className="mt-6 flex items-center gap-2 font-sans text-xs text-[#404040]"><GitBranch size={14} />main / deployed</motion.p></div></div></div></PreviewShell>;
  }

  if (id === "mobile") {
    return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} flex items-center justify-center gap-5 bg-[#f5f5f5]`}><motion.div animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={loopTransition} className="relative h-[254px] w-[126px] rounded-[24px] border-[5px] border-[#171717] bg-white p-2 shadow-[0_14px_30px_rgba(15,23,42,0.12)]"><div className="mb-3 h-16 rounded-xl bg-[#171717] p-3 text-[10px] text-white">Good morning<br /><span className="text-[#bdbdbd]">Your workspace</span></div><div className="space-y-2">{["Tasks", "Analytics", "Messages"].map((item, index) => <motion.div key={item} animate={reduceMotion ? undefined : { x: index === 0 ? [0, 3, 0] : 0 }} transition={{ ...loopTransition, delay: index * 0.25 }} className="rounded-lg border border-[#e5e5e5] px-2 py-2 text-[9px] text-[#525252]">{item}</motion.div>)}</div><motion.span initial={{ opacity: 0, y: 4 }} animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 1, 1, 0], y: [4, 0, 0, 4] }} transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 2 }} className="absolute -right-12 top-8 rounded-full border border-[#e5e5e5] bg-white px-2 py-1 text-[8px] text-[#525252] shadow-sm">New task</motion.span></motion.div><div className="h-[220px] w-[110px] rounded-[22px] border-[4px] border-[#404040] bg-[#fafafa] p-2"><MonitorSmartphone size={16} className="mb-4 text-[#525252]" /><div className="space-y-2">{Array.from({ length: 5 }).map((_, index) => <motion.div key={index} animate={reduceMotion ? undefined : { opacity: index === 0 ? [1, 0.45, 1] : 1 }} transition={{ ...loopTransition, delay: index * 0.15 }} className={`h-3 rounded-full ${index === 0 ? "bg-[#171717]" : "bg-[#e5e5e5]"}`} />)}</div></div></div></PreviewShell>;
  }

  if (id === "erp") {
    return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white`}><div className="flex h-full"><aside className="w-20 bg-[#1f2633] p-3"><div className="mb-7 grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white"><Server size={15} /></div>{Array.from({ length: 5 }).map((_, index) => <span key={index} className={`mb-4 block h-7 rounded-md ${index === 0 ? "bg-white/15" : "bg-transparent"}`} />)}</aside><div className="min-w-0 flex-1 p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-lg font-semibold text-[#1f2933]">Business Overview</p><p className="text-[11px] text-[#737373]">Starlux Healthcare</p></div><span className="rounded-full bg-[#f5f5f5] px-3 py-1 text-[10px] text-[#525252]">Today</span></div><div className="grid grid-cols-3 gap-3">{["Receivables", "Payables", "Inventory"].map((item, index) => <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }} className="rounded-xl border border-[#e5e5e5] p-3"><p className="text-[10px] text-[#737373]">{item}</p><p className="mt-3 text-sm font-semibold text-[#1f2933]">{index === 2 ? "98%" : "₹12.4L"}</p></motion.div>)}</div><div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-3"><div className="rounded-xl border border-[#e5e5e5] p-4"><p className="text-xs font-medium text-[#404040]">Sales Trend</p><div className="mt-5 flex h-20 items-end gap-2">{[35, 54, 42, 76, 64, 92, 78].map((height, index) => <motion.span key={index} initial={reduceMotion ? false : { height: "0%" }} animate={{ height: `${height}%` }} transition={{ duration: 0.65, delay: 0.25 + index * 0.07, ease: "easeOut" }} className="flex-1 rounded-t bg-[#171717]" />)}</div></div><div className="rounded-xl border border-[#e5e5e5] p-4"><p className="text-xs font-medium text-[#404040]">Recent Orders</p>{["PO-1042", "SO-892", "INV-132"].map((item, index) => <motion.p key={item} initial={reduceMotion ? false : { opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.42 + index * 0.1, ease: "easeOut" }} className="mt-3 text-[10px] text-[#737373]">{item}</motion.p>)}</div></div></div></div></div></PreviewShell>;
  }

  if (id === "ai") {
    return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} relative overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-6`}><p className="text-xs font-medium text-[#525252]">Invoice approval workflow</p><motion.div animate={reduceMotion ? undefined : { opacity: [0.35, 1, 1, 0.35] }} transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }} className="absolute left-10 right-10 top-[42%] h-px bg-[#171717]" /><div className="relative mt-12 flex items-center justify-between before:absolute before:left-10 before:right-10 before:top-1/2 before:h-px before:bg-[#d4d4d4]">{[["Input", FileCode2], ["Classify", Activity], ["Route", GitBranch], ["Approve", CheckCircle2]].map(([label, Icon], index) => { const NodeIcon = Icon as LucideIcon; return <motion.div key={label as string} animate={reduceMotion ? undefined : { y: index === 2 ? [0, -3, 0] : 0, scale: index === 2 ? [1, 1.04, 1] : 1 }} transition={{ ...loopTransition, delay: index * 0.16 }} className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-[#dcdcdc] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.06)]"><NodeIcon size={18} className="text-[#171717]" /><span className="absolute -bottom-6 whitespace-nowrap text-[10px] text-[#737373]">{label as string}</span></motion.div>; })}</div><motion.div animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }} transition={loopTransition} className="mt-20 rounded-xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-xs text-[#525252]">Automation active <span className="float-right font-medium text-[#171717]">12 runs today</span></motion.div></div></PreviewShell>;
  }

  if (id === "consulting") {
    return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} rounded-2xl border border-[#e5e5e5] bg-white p-6`}><div className="flex items-center justify-between"><p className="text-sm font-semibold text-[#171717]">Transformation Roadmap</p><span className="text-[11px] text-[#737373]">Q1 - Q3</span></div><div className="mt-9 space-y-5">{[["Discovery", "Complete"], ["Architecture", "In review"], ["Delivery", "Planned"]].map(([phase, status], index) => <motion.div key={phase} initial={reduceMotion ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.12, ease: "easeOut" }} className="grid grid-cols-[90px_1fr_72px] items-center gap-3"><span className="text-xs font-medium text-[#404040]">{phase}</span><span className="h-2 rounded-full bg-[#ececec]"><motion.span initial={reduceMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.25 + index * 0.12, ease: "easeOut" }} style={{ width: `${[100, 64, 28][index]}%`, transformOrigin: "left" }} className="block h-full rounded-full bg-[#171717]" /></span><span className="text-right text-[10px] text-[#737373]">{status}</span></motion.div>)}</div><div className="mt-10 grid grid-cols-2 gap-3">{["Technology audit", "Operating model"].map((item, index) => <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.5 + index * 0.1, ease: "easeOut" }} className="rounded-xl border border-[#e5e5e5] p-4 text-xs text-[#525252]">{item}</motion.div>)}</div></div></PreviewShell>;
  }

  return <PreviewShell label={previewLabels[id]} title={title} Icon={Icon}><div className={`${sharedClass} relative overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#171717] p-6 text-white`}><motion.span animate={reduceMotion ? undefined : { y: ["-110%", "110%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.8, ease: "linear" }} className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/65" /><div className="flex items-center justify-between"><motion.div animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }} transition={loopTransition} className="grid h-10 w-10 place-items-center rounded-xl border border-white/20"><ShieldCheck size={19} /></motion.div><motion.span animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }} transition={loopTransition} className="rounded-full bg-white/10 px-3 py-1 text-[10px]">Protected</motion.span></div><p className="mt-8 text-xl font-semibold">Security posture</p><p className="mt-1 text-xs text-white/60">Continuous compliance monitoring</p><div className="mt-8 grid grid-cols-3 gap-3">{["98", "14", "0"].map((metric, index) => <motion.div key={metric} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.1, ease: "easeOut" }} className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-lg font-semibold">{metric}{index === 0 ? "%" : ""}</p><p className="mt-1 text-[9px] uppercase tracking-wider text-white/55">{["Score", "Controls", "Risks"][index]}</p></motion.div>)}</div><motion.div animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }} transition={{ ...loopTransition, delay: 0.4 }} className="mt-7 flex items-center gap-2 text-xs text-white/70"><LockKeyhole size={14} />SOC 2 controls synchronized</motion.div></div></PreviewShell>;
}

export function ServiceEditorialBlock({ service, index }: ServiceEditorialBlockProps) {
  const reduceMotion = useReducedMotion();
  const Icon = serviceIcons[service.icon];
  const content = (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: 0.1, ease: "easeOut" }}
      className="min-w-0"
    >
      <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-[#e5e5e5] bg-white text-[#171717]">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h2 className="text-pretty text-3xl font-semibold tracking-tight text-ink md:text-4xl">{service.title}</h2>
      <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-body">{service.description}</p>
      <h3 className="mt-8 text-xs font-mono font-medium uppercase tracking-[0.2em] text-mute">What We Deliver</h3>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {service.deliverables.map((item) => <li key={item} className="flex min-w-0 items-center gap-2.5 text-sm text-body"><CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0 text-[#171717]" aria-hidden="true" /><span>{item}</span></li>)}
      </ul>
      <Link href="/contact#consultation" className="group/link mt-9 inline-flex items-center gap-2 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
        <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 group-hover/link:after:w-full">Start Project</span>
        <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover:translate-x-1" aria-hidden="true">→</span>
      </Link>
    </motion.div>
  );

  const preview = (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
      className="group/preview min-h-[340px]"
    >
      <ServicePreview id={service.id} title={service.title} Icon={Icon} />
    </motion.div>
  );

  return (
    <motion.article
      id={service.id}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
      className="group cursor-pointer scroll-mt-24 rounded-[28px] border border-[#ececec] bg-white px-6 py-10 shadow-[0_12px_32px_rgba(15,23,42,0.035)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-neutral-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.07)] md:px-12 md:py-14 lg:px-20 lg:py-[70px]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        {index % 2 === 0 ? <>{preview}{content}</> : <>{content}{preview}</>}
      </div>
    </motion.article>
  );
}
