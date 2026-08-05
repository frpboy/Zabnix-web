"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  ArrowRight,
  Bell,
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
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
        active
          ? "bg-[#30415f] text-white"
          : "text-slate-200/86 transition-colors duration-200 hover:bg-white/5"
      }`}
    >
      <Icon size={16} aria-hidden="true" />
      <span>{label}</span>
      {!active && label === "Items" ? (
        <ChevronRight size={14} className="ml-auto opacity-70" aria-hidden="true" />
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

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const start = reduceMotion || isInView;

  return (
    <section
      ref={sectionRef}
      className="border-t border-hairline bg-canvas px-6 py-20"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.article initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="rounded-[32px] border border-[#ececec] bg-white px-8 py-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:px-10 lg:px-12 lg:py-9">
          <div className="grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
            <div className="min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="mb-4 text-xs font-mono uppercase tracking-[0.24em] text-mute"
              >
                Operations Intelligence
              </motion.p>

              <motion.h2
                id="products-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
                transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                className="text-4xl font-semibold tracking-[-0.05em] text-ink md:text-[3.25rem]"
                style={{ textWrap: "balance" }}
              >
                ZerpAI ERP
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
                transition={{ duration: 0.45, delay: 0.28, ease: "easeOut" }}
                className="mt-4 text-xl font-medium tracking-[-0.02em] text-body"
              >
                The intelligent ERP for modern operations.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
                transition={{ duration: 0.45, delay: 0.36, ease: "easeOut" }}
                className="mt-5 max-w-[42ch] text-base leading-7 text-body"
              >
                A unified operations workspace for finance, procurement,
                inventory and fulfillment, designed to give teams real-time
                visibility without operational clutter.
              </motion.p>

              <div className="mt-7">
                <FeatureList start={start} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: start ? 1 : 0, y: start ? 0 : 16 }}
                transition={{ duration: 0.4, delay: 0.84, ease: "easeOut" }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href="/products/zerpai"
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
              </motion.div>
            </div>

            <div className="min-w-0">
              <ZerpAIDashboardPreview start={start} />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
