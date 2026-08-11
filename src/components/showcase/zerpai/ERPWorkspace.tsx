"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  Bell, Box, CheckCircle2, ChevronDown, FileBarChart2, Grid2X2, Menu,
  Package, Plus, Search, Settings, ShoppingCart, Truck, Users, Wallet,
  X, ArrowUpRight, ArrowDownLeft, SlidersHorizontal, CircleDollarSign,
} from "lucide-react";

type ModuleKey = "dashboard" | "inventory" | "sales" | "crm" | "finance" | "reports" | "analytics" | "settings";
type WorkspaceProps = { compact?: boolean };

export const zerpaiWorkspaceModules: { key: ModuleKey; label: string; icon: typeof Grid2X2 }[] = [
  { key: "dashboard", label: "Home", icon: Grid2X2 },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "sales", label: "Sales", icon: ShoppingCart },
  { key: "crm", label: "CRM", icon: Users },
  { key: "finance", label: "Finance", icon: Wallet },
  { key: "reports", label: "Reports", icon: FileBarChart2 },
  { key: "analytics", label: "Analytics", icon: SlidersHorizontal },
  { key: "settings", label: "Settings", icon: Settings },
];

export const zerpaiWorkspaceMetrics = [
  ["Total Receivables", "₹12,45,890", ArrowUpRight, "blue"],
  ["Outstanding Payables", "₹4,12,300", ArrowDownLeft, "red"],
  ["Cash on Hand", "₹18,50,000", Wallet, "green"],
  ["Purchase Receivables", "₹8,24,000", Truck, "blue"],
  ["Bills Total", "₹2,10,000", CircleDollarSign, "red"],
  ["Picklists", "34", Box, "slate"],
] as const;

export const zerpaiWorkspaceAnimatedMetrics = [
  { label: "Total Receivables", value: 1245890, prefix: "\u20B9", icon: ArrowUpRight, tone: "blue" },
  { label: "Outstanding Payables", value: 412300, prefix: "\u20B9", icon: ArrowDownLeft, tone: "red" },
  { label: "Cash on Hand", value: 1850000, prefix: "\u20B9", icon: Wallet, tone: "green" },
  { label: "Purchase Receivables", value: 824000, prefix: "\u20B9", icon: Truck, tone: "blue" },
  { label: "Bills Total", value: 210000, prefix: "\u20B9", icon: CircleDollarSign, tone: "red" },
  { label: "Picklists", value: 34, prefix: "", icon: Box, tone: "slate" },
] as const;

export const zerpaiWorkspaceOrders = [
  ["SO-2026-148", "Aster Healthcare", "₹1,84,500", "Packed"],
  ["PO-2026-087", "Medline Supplies", "₹94,280", "Approved"],
  ["INV-2026-526", "Zenith Retail", "₹3,42,990", "Paid"],
] as const;

export const zerpaiWorkspaceInventory = [
  ["MED-650", "Paracetamol 650mg", "12,000", "₹24.50", "GST 12%"],
  ["MED-500", "Amoxicillin 500mg", "8,500", "₹74.00", "GST 12%"],
  ["SUP-102", "Nitrile Gloves", "1,180", "₹265.00", "GST 5%"],
  ["LAB-044", "Diagnostic Kit", "64", "₹1,240.00", "GST 12%"],
] as const;

export const zerpaiWorkspaceCustomerRows = [
  ["Aster Healthcare", "Kochi, India", "₹4,50,000", "Active"],
  ["Globex Distributors", "Mumbai, India", "₹3,10,000", "Active"],
  ["Zenith Retail", "Bengaluru, India", "₹1,84,500", "Follow-up"],
] as const;

const modules = zerpaiWorkspaceModules;
const metrics = zerpaiWorkspaceMetrics;
const animatedMetrics = zerpaiWorkspaceAnimatedMetrics;
const orders = zerpaiWorkspaceOrders;
const inventory = zerpaiWorkspaceInventory;
const customerRows = zerpaiWorkspaceCustomerRows;
export const zerpaiSalesTrendHeights = [28, 48, 42, 62, 46, 76, 70, 88, 68, 82, 94, 76] as const;

function MetricCard({
  metric,
  index,
  animateOnView,
}: {
  metric: typeof animatedMetrics[number];
  index: number;
  animateOnView: boolean;
}) {
  const [counterStarted, setCounterStarted] = useState(false);
  const { label, value, prefix, icon: Icon, tone } = metric;
  const tones = { blue: "bg-blue-50 text-blue-600", red: "bg-red-50 text-red-500", green: "bg-emerald-50 text-emerald-600", slate: "bg-slate-100 text-slate-500" };
  const displayValue = `${prefix}${new Intl.NumberFormat("en-IN").format(value)}`;

  return <motion.div initial={animateOnView ? { opacity: 0, y: 20 } : false} animate={animateOnView ? { opacity: 1, y: 0 } : undefined} onAnimationComplete={() => { if (animateOnView) setCounterStarted(true); }} whileHover={{ y: -2 }} transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }} className="rounded-xl border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
    <div className="flex items-start justify-between gap-2"><p className="max-w-[12ch] text-xs font-medium leading-4 text-[#6b7280]">{label}</p><span className={`rounded-lg p-2 ${tones[tone]}`}><Icon size={14} aria-hidden="true" /></span></div>
    <p className="mt-5 text-base font-semibold tracking-[-0.03em] text-[#1f2933]">{animateOnView ? <AnimatedCounter value={value} prefix={prefix} duration={1400} start={counterStarted} /> : displayValue}</p>
  </motion.div>;
}

function SalesChart({ animateOnView }: { animateOnView: boolean }) {
  const heights = zerpaiSalesTrendHeights;
  return <section className="rounded-xl border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
    <div className="mb-4 flex items-start justify-between"><div><h3 className="text-sm font-semibold text-[#1f2933]">Sales Trend</h3><p className="mt-1 text-xs text-[#6b7280]">Revenue across the last 30 days</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">Live</span></div>
    <div className="flex h-28 items-end gap-1.5 rounded-lg bg-[#f8fafc] px-3 py-3">{heights.map((height, index) => <motion.div key={index} initial={animateOnView ? { height: 0 } : false} animate={animateOnView ? { height: `${height}%` } : undefined} transition={{ duration: 0.45, delay: 1 + index * 0.025, ease: "easeOut" }} className="flex-1 rounded-t bg-gradient-to-t from-[#2563eb] via-[#6d3df5] to-[#ec4899]" style={animateOnView ? undefined : { height: `${height}%` }} />)}</div>
  </section>;
}

function OrderStream() {
  return <section className="rounded-xl border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]"><div className="mb-3 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-[#1f2933]">Recent Orders</h3><p className="mt-1 text-xs text-[#6b7280]">Latest operational activity</p></div><Bell size={15} className="text-[#6b7280]" aria-hidden="true" /></div><div className="space-y-2">{orders.map(([id, customer, amount, status]) => <div key={id} className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-3 py-2"><div className="min-w-0"><p className="text-xs font-semibold text-[#1f2933]">{id}</p><p className="truncate text-[11px] text-[#6b7280]">{customer}</p></div><div className="text-right"><p className="text-xs font-semibold text-[#1f2933]">{amount}</p><p className="text-[10px] text-emerald-700">{status}</p></div></div>)}</div></section>;
}

function DataTable({ rows, headers }: { rows: readonly (readonly string[])[]; headers: readonly string[] }) {
  return <div className="overflow-x-auto rounded-xl border border-[#d3d9e3] bg-white"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-[#f5f5f5] text-[#6b7280]"><tr>{headers.map((header) => <th key={header} className="whitespace-nowrap px-4 py-3 font-semibold">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-t border-[#e2e8f0] hover:bg-[#f0f7ff]">{row.map((cell, index) => <td key={index} className="whitespace-nowrap px-4 py-3 text-[#1f2933]">{index === row.length - 1 ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>;
}

function ModuleContent({ active, compact, search, animateDashboard }: { active: ModuleKey; compact: boolean; search: string; animateDashboard: boolean }) {
  const heading = modules.find((item) => item.key === active)?.label ?? "Dashboard";
  if (active === "dashboard") return <><div className="mb-5"><h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2933]">Business Overview</h1><p className="mt-1 text-xs text-[#6b7280]">A real-time view of Starlex Healthcare operations.</p></div><div className="grid grid-cols-2 gap-3 xl:grid-cols-3">{animatedMetrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} animateOnView={animateDashboard} />)}</div><motion.div initial={animateDashboard ? { opacity: 0, y: 16 } : false} animate={animateDashboard ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.45, delay: 1, ease: "easeOut" }} className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]"><SalesChart animateOnView={animateDashboard} /><OrderStream /></motion.div></>;
  if (active === "settings") return <><h1 className="mb-5 text-2xl font-semibold text-[#1f2933]">Settings</h1><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Organization", "Users & Roles", "Taxes & Compliance", "Setup & Configurations", "Customization", "Automation", "Developer Settings"].map((item) => <button key={item} className="rounded-xl border border-[#dfe5ed] bg-white p-4 text-left text-sm font-semibold text-[#1f2933] transition-[border-color,box-shadow] duration-200 hover:border-[#3b7cff] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7cff]">{item}<span className="mt-1 block text-xs font-normal text-[#6b7280]">Manage workspace preferences</span></button>)}</div></>;
  const isInventory = active === "inventory";
  const rows = isInventory ? inventory : customerRows;
  const headers = isInventory ? ["Code", "Item Name", "Stock on Hand", "Retail Price", "Tax Treatment"] : ["Customer", "Location", "Outstanding Balance", "Status"];
  const filteredRows = search ? rows.filter((row) => row.join(" ").toLowerCase().includes(search.toLowerCase())) : rows;
  return <><div className="mb-5 flex items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2933]">{heading}</h1><p className="mt-1 text-xs text-[#6b7280]">Manage operational data for your organization.</p></div><button className="inline-flex h-9 items-center gap-2 rounded-md bg-[#3b7cff] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7cff]"><Plus size={14} aria-hidden="true" />Create</button></div>{!compact && <div className="mb-4 flex flex-wrap gap-2">{["All", "Active", "Low Stock", "Needs Review"].map((tag) => <button key={tag} className="rounded-full border border-[#d3d9e3] bg-white px-3 py-1.5 text-xs text-[#6b7280] hover:border-[#3b7cff] hover:text-[#2563eb]">{tag}</button>)}</div>}<DataTable rows={filteredRows} headers={headers} /></>;
}

export function ERPWorkspace({ compact = false }: WorkspaceProps) {
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(workspaceRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<ModuleKey>("dashboard");
  const [collapsed, setCollapsed] = useState(compact);
  const [search, setSearch] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);
  const visibleModules = compact ? modules.slice(0, 5) : modules;
  const animateDashboard = compact && (reduceMotion || isInView);
  return <motion.div ref={workspaceRef} initial={compact && !reduceMotion ? { opacity: 0, y: 20, scale: 0.98 } : false} animate={compact ? { opacity: animateDashboard ? 1 : 0, y: animateDashboard ? 0 : 20, scale: animateDashboard ? 1 : 0.98 } : undefined} transition={{ duration: 0.8, ease: "easeOut" }} className={`overflow-hidden rounded-[18px] border border-[#d3d9e3] bg-[#f8fafc] font-sans text-[#1f2933] shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${compact ? "h-[480px]" : "min-h-[calc(100vh-9rem)]"}`}>
    <div className="flex min-h-full"><aside className={`hidden shrink-0 bg-[#1f2633] p-3 text-white transition-[width] duration-200 md:flex md:flex-col ${collapsed ? "w-[60px]" : "w-[190px]"}`}><div className="mb-5 flex items-center gap-2 px-1"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#27c59a]"><Grid2X2 size={16} aria-hidden="true" /></span>{!collapsed && <span className="text-sm font-semibold">Zerpai</span>}</div><nav className="space-y-1" aria-label="ERP modules">{visibleModules.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActive(key)} title={collapsed ? label : undefined} className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-xs font-medium transition-colors ${active === key ? "bg-[#30415f] text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon size={16} aria-hidden="true" />{!collapsed && <span>{label}</span>}</button>)}</nav><div className="mt-auto rounded-lg border border-white/15 bg-white/5 p-3 text-xs text-slate-300">{!collapsed && <><p className="font-semibold text-white">Inventory Alert</p><p className="mt-1 leading-4">4 items are below reorder level.</p></>}</div></aside>
      <div className="min-w-0 flex-1"><header className="flex h-16 items-center gap-3 border-b border-[#e2e8f0] bg-white px-4"><button onClick={() => setCollapsed((value) => !value)} className="hidden rounded-md p-2 text-[#6b7280] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b7cff] md:inline-flex" aria-label="Toggle sidebar"><Menu size={17} /></button><div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" size={15} aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customers, invoices, products…" className="h-9 w-full max-w-md rounded-md border border-[#d3d9e3] bg-white pl-9 pr-3 text-xs outline-none transition-colors focus:border-[#3b7cff] focus:ring-1 focus:ring-[#3b7cff]" /></div><button className="hidden text-xs font-medium text-[#27a879] sm:block">Upgrade</button><button className="hidden items-center gap-1 rounded-md border border-[#d3d9e3] bg-white px-3 py-2 text-xs text-[#1f2933] sm:flex">Starlex Healthcare <ChevronDown size={13} /></button><button className="grid h-9 w-9 place-items-center rounded-md bg-[#27c59a] text-white transition-colors hover:bg-[#1fae84]" aria-label="Create new record"><Plus size={18} /></button><button onClick={() => setShowAlerts((value) => !value)} className="relative rounded-md p-2 text-[#6b7280] hover:bg-slate-100" aria-label="View notifications"><Bell size={17} /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" /></button><span className="grid h-8 w-8 place-items-center rounded-full bg-[#1f2633] text-xs font-semibold text-white">SK</span></header>
        <AnimatePresence>{showAlerts && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-5 top-16 z-20 w-72 rounded-xl border border-[#d3d9e3] bg-white p-4 shadow-xl"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Notifications</p><button onClick={() => setShowAlerts(false)} aria-label="Close notifications"><X size={15} /></button></div><p className="mt-3 text-xs text-[#6b7280]">Purchase order PO-2026-087 has been approved.</p><p className="mt-2 text-xs text-[#6b7280]">4 inventory items need replenishment.</p></motion.div>}</AnimatePresence>
        <main className="p-4 md:p-5"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}><ModuleContent active={active} compact={compact} search={search} animateDashboard={animateDashboard && active === "dashboard"} /></motion.div></AnimatePresence></main></div></div>
  </motion.div>;
}

export function ZerpAIMiniPreview() { return <ERPWorkspace compact />; }

export function DemoLaunchButton() { return <Link href="/products/zerpai/demo" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-ink/90 hover:shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">View Full Product <ArrowUpRight size={15} aria-hidden="true" /></Link>; }
