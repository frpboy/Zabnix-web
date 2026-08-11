"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MobileZerpAIShowcase } from "@/components/sections/MobileZerpAIShowcase";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileBarChart2,
  Grid2x2,
  LayoutGrid,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

const features = [
  "Inventory Management",
  "Procurement & Purchase Orders",
  "Finance & Accounting",
  "AI Demand Forecasting",
  "Role Based Access",
];

const summaryCards = [
  { title: "Total Receivables", value: 17877, prefix: "Rs", decimals: 2, icon: ArrowRight, tone: "blue" },
  { title: "Outstanding Payables (A/P)", value: 299759.98, prefix: "Rs", decimals: 2, icon: ArrowRight, tone: "rose" },
  { title: "Cash on Hand", value: 356916.8, prefix: "Rs", decimals: 2, icon: Wallet, tone: "emerald" },
  { title: "Purchase Receivables", value: 118081, prefix: "Rs", decimals: 2, icon: Truck, tone: "blue" },
  { title: "Bills Total", value: 573163.63, prefix: "Rs", decimals: 2, icon: Wallet, tone: "rose" },
  { title: "Picklists", value: 12, prefix: "", decimals: 0, icon: FileBarChart2, tone: "slate" },
  { title: "Packages", value: 4, prefix: "", decimals: 0, icon: Package, tone: "emerald" },
  { title: "Sales Invoices", value: 0, prefix: "Rs", decimals: 2, icon: FileBarChart2, tone: "blue" },
  { title: "Sales Orders Amount", value: 1457621.28, prefix: "Rs", decimals: 2, icon: ShoppingCart, tone: "slate" },
  { title: "Purchase Orders Amount", value: 411623.34, prefix: "Rs", decimals: 2, icon: Package, tone: "slate" },
] as const;

function FeatureList({ start }: { start: boolean }) {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <motion.li
          key={feature}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 12 }}
          transition={{ duration: 0.35, delay: 0.46 + index * 0.08, ease: "easeOut" }}
          className="flex items-center gap-3 text-sm text-body"
        >
          <CheckCircle2
            size={16}
            className="shrink-0 text-link"
            aria-hidden="true"
          />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function MobileFeatureList() {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-3 text-sm text-ink">
          <CheckCircle2 size={16} className="shrink-0 text-ink" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function SidebarItem({
  label,
  icon: Icon,
  active = false,
}: {
  label: string;
  icon: typeof LayoutGrid;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-[#30415f] text-white font-semibold"
          : "text-white opacity-90 hover:bg-white/10 hover:opacity-100"
      }`}
    >
      <Icon size={16} className="text-white shrink-0" aria-hidden="true" />
      <span className="text-white font-medium">{label}</span>
      {!active && label === "Items" ? (
        <ChevronRight size={14} className="ml-auto text-white opacity-70" aria-hidden="true" />
      ) : null}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  prefix,
  decimals,
  icon: Icon,
  tone,
  start,
}: {
  title: string;
  value: number;
  prefix: string;
  decimals: number;
  icon: typeof ArrowRight;
  tone: "blue" | "rose" | "emerald" | "slate";
  start: boolean;
}) {
  const toneClasses = {
    blue: "bg-blue-50 text-[#2b74ea]",
    rose: "bg-rose-50 text-[#f25d66]",
    emerald: "bg-emerald-50 text-[#38b26d]",
    slate: "bg-slate-100 text-slate-500",
  }[tone];

  return (
    <div className="rounded-[18px] border border-black/8 bg-white px-4 py-4 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.02em] text-neutral-500">
          {title}
        </p>
        <div className={`rounded-xl p-2 ${toneClasses}`}>
          <Icon size={14} aria-hidden="true" />
        </div>
      </div>
      <p className="text-[13px] font-bold tracking-[-0.025em] text-slate-800">
        <AnimatedCounter value={value} prefix={prefix} decimals={decimals} start={start} />
      </p>
    </div>
  );
}

function SalesTrend({ start }: { start: boolean }) {
  const bars = [34, 52, 40, 64, 46, 78, 72];

  return (
    <div className="rounded-[20px] border border-black/8 bg-white px-4 py-4 shadow-[0_6px_20px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Sales Trend (Last 30 Days)
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Order value across the last month
          </p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
          Live
        </span>
      </div>

      <div className="flex h-[116px] items-end gap-2 rounded-[18px] bg-neutral-50 px-3 py-3">
        {bars.map((bar, index) => (
          <div key={bar} className="flex flex-1 items-end">
            <motion.div
              className="w-full rounded-t-[12px] bg-gradient-to-t from-[#007cf0] via-[#6d3df5] to-[#ff4d4d]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: start ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.85 + index * 0.06, ease: "easeOut" }}
              style={{ height: `${bar}%`, transformOrigin: "bottom" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceOverview({ start }: { start: boolean }) {
  const rows = [
    ["North America", 84],
    ["APAC", 67],
    ["Europe", 72],
  ] as const;

  return (
    <div className="rounded-[20px] border border-[#ececec] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-[22px] font-semibold tracking-[-0.03em] text-slate-800">
            Finance Overview
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Multi-entity revenue performance
          </p>
        </div>
        <Wallet size={17} className="text-neutral-400" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        {rows.map(([region, value]) => (
          <div key={region}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-neutral-600">{region}</span>
              <span className="font-semibold text-slate-800">{value}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#007cf0] via-[#6d3df5] to-[#ff4d4d]"
                initial={{ width: "0%" }}
                animate={{ width: start ? `${value}%` : "0%" }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderStream() {
  const rows = [
    ["SO-1984", "Packed", "Rs96K"],
    ["PO-1042", "Approved", "Rs2.4L"],
    ["INV-2008", "Settled", "Rs4.8L"],
  ] as const;

  return (
    <div className="rounded-[20px] border border-[#ececec] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">Order Stream</p>
          <p className="mt-1 text-xs text-neutral-500">
            Real-time transaction updates
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          Live
        </span>
      </div>

      <div className="space-y-2.5">
        {rows.map(([id, status, value]) => (
          <div
            key={id}
            className="flex items-center justify-between rounded-[16px] border border-[#ececec] bg-neutral-50 px-3.5 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">{id}</p>
              <p className="mt-1 text-xs text-neutral-500">{status}</p>
            </div>
            <p className="text-sm font-semibold text-slate-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZerpAIDashboardPreview({ start }: { start: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20, scale: start ? 1 : 0.98 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[22px] border border-[#ececec] bg-white p-3 shadow-[0_20px_44px_rgba(15,23,42,0.06)]">
        <div className="relative overflow-hidden rounded-[18px] border border-[#ececec] bg-[#f8f9fb]">
          <div
            className="absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 68% 34%, rgba(0,124,240,1), transparent 28%), radial-gradient(circle at 82% 82%, rgba(109,61,245,1), transparent 26%), radial-gradient(circle at 92% 54%, rgba(255,77,77,1), transparent 22%)",
            }}
          />

          <div className="grid h-[518px] grid-cols-[174px_minmax(0,1fr)] items-stretch">
            <motion.aside initial={{ opacity: 0 }} animate={{ opacity: start ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }} className="flex h-full flex-col overflow-hidden border-r border-black/6 bg-[#242c3f] px-3 py-4">
              <div className="mb-4 flex items-center gap-3 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f7a52] text-white">
                  <Grid2x2 size={15} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">Zerpai</p>
                </div>
              </div>

              <div className="space-y-2">
                <SidebarItem label="Home" icon={LayoutGrid} active />
                <SidebarItem label="Inventory" icon={Package} />
                <SidebarItem label="Procurement" icon={Truck} />
                <SidebarItem label="Sales" icon={ShoppingCart} />
                <SidebarItem label="Reports" icon={FileBarChart2} />
              </div>

              <div className="mt-5 rounded-xl border border-white/8 bg-white/5 px-3 py-3 text-[12px] text-slate-300">
                <p className="font-medium text-white">Business Sync</p>
                <p className="mt-1 leading-5 text-slate-300/80">
                  Unified procurement, sales and finance in one workspace.
                </p>
              </div>

              <div className="mt-auto rounded-xl border border-white/6 bg-white/[0.03] px-3 py-3">
                <div className="h-2 rounded-full bg-white/10" />
                <div className="mt-2 h-2 w-4/5 rounded-full bg-white/10" />
              </div>
            </motion.aside>

            <div className="min-w-0 overflow-hidden bg-[#fbfbfc]">
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : -8 }} transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }} className="flex items-center justify-between gap-3 border-b border-[#ececec] bg-white px-5 py-3.5">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-10 w-[74px] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-xl border border-[#ececec] bg-[#fbfbfd] px-3 text-sm text-neutral-400">
                    Search
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-[13px] font-medium text-[#24b15c]">Upgrade</span>
                  <div className="flex items-center gap-2 rounded-xl border border-[#ececec] bg-white px-3 py-2 text-sm text-neutral-600">
                    <span>Starlex Healthcare</span>
                    <ChevronDown size={14} aria-hidden="true" />
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22b15b] text-white">
                    <Plus size={16} aria-hidden="true" />
                  </div>
                  <Users size={17} className="text-neutral-500" aria-hidden="true" />
                  <Bell size={17} className="text-neutral-500" aria-hidden="true" />
                  <Settings size={17} className="text-neutral-500" aria-hidden="true" />
                </div>
              </motion.div>

              <div className="space-y-5 px-5 py-5">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : 12 }} transition={{ duration: 0.35, delay: 0.38, ease: "easeOut" }}>
                  <h4 className="text-[28px] font-semibold tracking-[-0.03em] text-slate-800">
                    Business Overview
                  </h4>
                </motion.div>

                <div className="grid grid-cols-3 gap-4">
                  {summaryCards.slice(0, 3).map((card, index) => (
                    <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }} transition={{ duration: 0.4, delay: 0.48 + index * 0.08, ease: "easeOut" }}><SummaryCard {...card} start={start} /></motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {summaryCards.slice(3, 6).map((card, index) => (
                    <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }} transition={{ duration: 0.4, delay: 0.72 + index * 0.08, ease: "easeOut" }}><SummaryCard {...card} start={start} /></motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-[1.2fr_0.95fr_0.95fr] gap-4">
                  {[<SalesTrend key="sales" start={start} />, <FinanceOverview key="finance" start={start} />, <OrderStream key="orders" />].map((widget, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }} transition={{ duration: 0.45, delay: 1.05 + index * 0.1, ease: "easeOut" }}>{widget}</motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileZerpAIDashboardPreview({ start }: { start: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full mt-6 space-y-3.5"
    >
      {/* 1. Header Card (Zerpai ERP) */}
      <div className="rounded-[22px] border border-[#ececec] bg-white p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f765e] text-white shadow-xs">
            <Grid2x2 size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Zerpai ERP</h3>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">Live Operations</p>
          </div>
        </div>
        <div className="rounded-full bg-[#e6f7f0] px-3 py-1 text-xs font-bold text-[#0f765e] flex items-center gap-1.5 border border-[#bbf7d0]">
          <span className="w-2 h-2 rounded-full bg-[#0f765e] animate-pulse" />
          Active
        </div>
      </div>

      {/* 2. Highlight Hero Card (Total Receivables Featured Card) */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#184e4f] via-[#154445] to-[#0e2c2d] p-5 text-white shadow-md">
        {/* Subtle background wave graphic overlay */}
        <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-15" aria-hidden="true">
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
            <path d="M0 80 Q 50 20 100 60 T 200 40" stroke="white" strokeWidth="12" fill="none" />
            <path d="M0 100 Q 50 40 100 80 T 200 60" stroke="white" strokeWidth="8" fill="none" />
          </svg>
        </div>

        <div className="flex items-start justify-between">
          <p className="text-xs font-medium tracking-wide text-[#9ebac0]">
            Total Receivables
          </p>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-105">
            <ArrowRight size={16} aria-hidden="true" />
          </div>
        </div>

        <p className="my-2.5 text-3xl font-extrabold tracking-tight text-white font-variant-numeric tabular-nums">
          <AnimatedCounter value={17877} prefix="₹" decimals={2} start={start} />
        </p>

        <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#34d399]">
          <span>↑ 12.5%</span>
          <span className="text-[#9ebac0] font-normal">vs last month</span>
        </div>
      </div>

      {/* 3. 2x2 Grid of Small Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: Outstanding Payables (A/P) */}
        <div className="rounded-[22px] border border-[#ececec] bg-white p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowRight size={16} className="rotate-45" aria-hidden="true" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <ArrowRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug">
              Outstanding Payables<br />(A/P)
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              <AnimatedCounter value={299759.98} prefix="₹" decimals={2} start={start} />
            </p>
          </div>
        </div>

        {/* Card 2: Purchase Receivables */}
        <div className="rounded-[22px] border border-[#ececec] bg-white p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <ShoppingCart size={16} aria-hidden="true" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <ArrowRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug">
              Purchase<br />Receivables
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              <AnimatedCounter value={118081.00} prefix="₹" decimals={2} start={start} />
            </p>
          </div>
        </div>

        {/* Card 3: Cash on Hand */}
        <div className="rounded-[22px] border border-[#ececec] bg-white p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet size={16} aria-hidden="true" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ArrowRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug">
              Cash on Hand
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              <AnimatedCounter value={356916.80} prefix="₹" decimals={2} start={start} />
            </p>
          </div>
        </div>

        {/* Card 4: Total Receivables */}
        <div className="rounded-[22px] border border-[#ececec] bg-white p-3.5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileBarChart2 size={16} aria-hidden="true" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <ArrowRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-700 leading-snug">
              Total Receivables
            </p>
            <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              <AnimatedCounter value={17877.00} prefix="₹" decimals={2} start={start} />
            </p>
          </div>
        </div>
      </div>

      {/* 4. Sales Trend (Last 30 Days) Card */}
      <div className="rounded-[24px] border border-[#ececec] bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Sales Trend (Last 30 Days)
            </h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Order value across the last month
            </p>
          </div>
          <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 flex items-center gap-1 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* Smooth Curved Line Chart */}
        <div className="relative mt-4">
          <div className="grid grid-cols-[28px_1fr] items-stretch gap-1">
            {/* Y-Axis */}
            <div className="flex flex-col justify-between text-[10px] text-neutral-400 font-medium py-1 select-none">
              <span>150K</span>
              <span>100K</span>
              <span>50K</span>
              <span>0</span>
            </div>

            {/* SVG Curved Chart Container */}
            <div className="relative h-28 w-full overflow-visible">
              {/* Floating Badge on chart peak */}
              <div className="absolute top-1 right-2 z-10 rounded-md bg-[#10b981] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs flex items-center gap-1">
                <span>₹96.8K</span>
              </div>

              <svg viewBox="0 0 300 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mobileSalesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                <line x1="0" y1="5" x2="300" y2="5" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="35" x2="300" y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="65" x2="300" y2="65" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="95" x2="300" y2="95" stroke="#f8fafc" strokeWidth="1" />

                {/* Filled Gradient path */}
                <path
                  d="M0 80 Q 25 60, 45 75 T 90 70 T 135 60 T 180 75 T 225 55 T 270 25 L 270 95 L 0 95 Z"
                  fill="url(#mobileSalesGrad)"
                />

                {/* Smooth Curve Path */}
                <motion.path
                  d="M0 80 Q 25 60, 45 75 T 90 70 T 135 60 T 180 75 T 225 55 T 270 25"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={start ? { pathLength: 0 } : false}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Peak point circle */}
                <circle cx="270" cy="25" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* X-Axis dates */}
          <div className="flex justify-between pl-8 pr-1 pt-2 text-[10px] text-neutral-400 font-medium">
            <span>May 23</span>
            <span>May 30</span>
            <span>Jun 06</span>
            <span>Jun 13</span>
            <span>Jun 20</span>
          </div>
        </div>
      </div>

      {/* 5. Order Stream Card */}
      <div className="rounded-[24px] border border-[#ececec] bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              Order Stream
            </h4>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Real-time transaction updates
            </p>
          </div>
          <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 flex items-center gap-1 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Item 1 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#f0f0f0] bg-neutral-50/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ShoppingCart size={16} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">SO-1984</p>
                <p className="text-[11px] text-neutral-500 font-medium">Packed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 font-variant-numeric tabular-nums">₹96K</p>
              <p className="text-[10px] text-neutral-400 font-medium">Today, 10:24 AM</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#f0f0f0] bg-neutral-50/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={16} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">PO-1042</p>
                <p className="text-[11px] text-neutral-500 font-medium">Approved</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 font-variant-numeric tabular-nums">₹2.4L</p>
              <p className="text-[10px] text-neutral-400 font-medium">Today, 09:15 AM</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between rounded-2xl border border-[#f0f0f0] bg-neutral-50/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Truck size={16} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">INV-2008</p>
                <p className="text-[11px] text-neutral-500 font-medium">Completed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900 font-variant-numeric tabular-nums">₹1.8L</p>
              <p className="text-[10px] text-neutral-400 font-medium">Yesterday, 06:45 PM</p>
            </div>
          </div>
        </div>

        {/* View All Orders CTA */}
        <Link
          href="/products/zerpai#orders"
          className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#ececec] bg-neutral-50 py-3 text-xs font-bold text-slate-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <span>View All Orders</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}

function DesktopProductShowcase({ start }: { start: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-[32px] border border-[#ececec] bg-white px-8 py-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:px-10 lg:px-12 lg:py-9"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.24em] text-mute">
            Operations Intelligence
          </p>

          <h2
            id="products-heading"
            className="text-4xl font-semibold tracking-[-0.05em] text-ink md:text-[3.25rem]"
            style={{ textWrap: "balance" }}
          >
            ZerpAI ERP
          </h2>

          <p className="mt-4 text-xl font-medium tracking-[-0.02em] text-body">
            The intelligent ERP for modern operations.
          </p>

          <p className="mt-5 max-w-[42ch] text-base leading-7 text-body">
            A unified operations workspace for finance, procurement,
            inventory and fulfillment, designed to give teams real-time
            visibility without operational clutter.
          </p>

          <div className="mt-7">
            <FeatureList start={start} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="neu-button neu-button-dark inline-flex items-center justify-center gap-2"
            >
              View Product
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/products/zerpai#demo"
              className="neu-button neu-button-light inline-flex items-center justify-center gap-2"
            >
              Request Demo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <ZerpAIDashboardPreview start={start} />
        </div>
      </div>
    </motion.article>
  );
}

function MobileProductShowcase({ start }: { start: boolean }) {
  return (
    <MobileZerpAIShowcase
      start={start}
      features={features}
      summaryCards={summaryCards}
    />
  );
}

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const start = reduceMotion || isInView;

  return (
    <section
      ref={sectionRef}
      className="border-t border-hairline bg-canvas px-4 py-12 md:px-6 md:py-20"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="hidden lg:block">
          <DesktopProductShowcase start={start} />
        </div>
        <div className="block lg:hidden">
          <MobileProductShowcase start={start} />
        </div>
      </div>
    </section>
  );
}
