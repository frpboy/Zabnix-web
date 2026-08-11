"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  Box,
  Grid2X2,
  Landmark,
  Package,
  ShoppingCart,
  Sparkles,
  Truck,
  Wallet,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/data";
import {
  zerpaiSalesTrendHeights,
  zerpaiWorkspaceAnimatedMetrics,
  zerpaiWorkspaceInventory,
  zerpaiWorkspaceOrders,
} from "./ERPWorkspace";

type DemoTabKey = "overview" | "inventory" | "finance" | "procurement" | "forecast";

type DemoTab = {
  key: DemoTabKey;
  label: string;
  icon: LucideIcon;
};

const DEMO_TABS: readonly DemoTab[] = [
  { key: "overview", label: "Overview", icon: Grid2X2 },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "finance", label: "Finance", icon: Landmark },
  { key: "procurement", label: "Procurement", icon: ShoppingCart },
  { key: "forecast", label: "AI Forecast", icon: Sparkles },
];

const OVERVIEW_METRICS = zerpaiWorkspaceAnimatedMetrics.slice(0, 4);
const FINANCE_METRICS = [
  zerpaiWorkspaceAnimatedMetrics[0],
  zerpaiWorkspaceAnimatedMetrics[1],
  zerpaiWorkspaceAnimatedMetrics[2],
  zerpaiWorkspaceAnimatedMetrics[4],
].filter(Boolean);
const PROCUREMENT_METRICS = [
  zerpaiWorkspaceAnimatedMetrics[3],
  zerpaiWorkspaceAnimatedMetrics[4],
].filter(Boolean);
const OVERVIEW_ORDERS = zerpaiWorkspaceOrders.slice(0, 2);
const PROCUREMENT_ORDERS = zerpaiWorkspaceOrders.filter(([id]) => id.startsWith("PO")).slice(0, 1);
const INVENTORY_ITEMS = zerpaiWorkspaceInventory.slice(0, 3);

function formatCompactCurrency(value: number) {
  if (value >= 100000) {
    return `\u20B9${(value / 100000).toFixed(2)}L`;
  }

  if (value >= 1000) {
    return `\u20B9${(value / 1000).toFixed(2)}K`;
  }

  return `\u20B9${new Intl.NumberFormat("en-IN").format(value)}`;
}

function normalizeCurrencyText(value: string) {
  return value.replaceAll("â‚¹", "\u20B9");
}

function MiniMetricCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "blue" | "red" | "green" | "slate";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-500",
    green: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-100 text-slate-500",
  };

  return (
    <div className="rounded-[18px] border border-[#dfe5ed] bg-white p-3 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
      <div className="flex items-start justify-between gap-2">
        <p className="max-w-[11ch] text-[0.72rem] font-medium leading-4 text-[#667085]">
          {label}
        </p>
        <span className={`rounded-xl p-2 ${tones[tone]}`}>
          <Icon size={14} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-[1.05rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
        {value}
      </p>
    </div>
  );
}

function CompactSalesTrend() {
  const path = useMemo(() => {
    return zerpaiSalesTrendHeights
      .map((height, index) => {
        const x = (index / (zerpaiSalesTrendHeights.length - 1)) * 100;
        const y = 100 - height;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, []);

  return (
    <section className="rounded-[18px] border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
            Sales Trend
          </h4>
          <p className="mt-1 text-[0.72rem] text-[#667085]">
            Revenue across the last 30 days
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
          Live
        </span>
      </div>
      <div className="mt-4 rounded-[16px] bg-[#f8fafc] p-3">
        <svg viewBox="0 0 100 100" className="h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 0 100 L 0 72" fill="none" stroke="transparent" />
          <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#trendFill)" opacity="0.18" />
          <path
            d={path}
            fill="none"
            stroke="#27a879"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="100" cy={100 - zerpaiSalesTrendHeights[zerpaiSalesTrendHeights.length - 1]} r="3.5" fill="#27a879" />
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27a879" />
              <stop offset="100%" stopColor="#27a879" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-2 flex justify-between text-[0.68rem] text-[#667085]">
          <span>01</span>
          <span>08</span>
          <span>15</span>
          <span>22</span>
          <span>30</span>
        </div>
      </div>
    </section>
  );
}

function CompactOrders({ rows }: { rows: readonly (readonly string[])[] }) {
  return (
    <section className="rounded-[18px] border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
            Recent Orders
          </h4>
          <p className="mt-1 text-[0.72rem] text-[#667085]">
            Latest operational activity
          </p>
        </div>
        <Bell size={15} className="text-[#667085]" aria-hidden="true" />
      </div>
      <div className="mt-4 space-y-2.5">
        {rows.map(([id, customer, amount, status]) => (
          <div key={id} className="rounded-[14px] bg-[#f8fafc] px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.8rem] font-semibold text-[#1f2933]">{id}</p>
                <p className="mt-1 truncate text-[0.72rem] text-[#667085]">{customer}</p>
              </div>
              <div className="text-right">
                <p className="text-[0.8rem] font-semibold text-[#1f2933]">
                  {normalizeCurrencyText(amount)}
                </p>
                <p className="mt-1 text-[0.68rem] text-emerald-700">{status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InventoryState() {
  return (
    <div className="space-y-3.5">
      <div>
        <h4 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
          Inventory Overview
        </h4>
        <p className="mt-1 text-[0.76rem] text-[#667085]">
          Real-time stock across warehouses, suppliers, and branches.
        </p>
      </div>
      <div className="space-y-2.5">
        {INVENTORY_ITEMS.map(([code, name, stock, price, tax]) => (
          <div key={code} className="rounded-[16px] border border-[#dfe5ed] bg-white p-3 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[0.8rem] font-semibold text-[#1f2933]">{name}</p>
                <p className="mt-1 text-[0.68rem] text-[#667085]">{code}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.66rem] font-medium text-[#475467]">
                {tax}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-[0.72rem] text-[#667085]">
              <span>Stock: {stock}</span>
              <span className="font-medium text-[#1f2933]">{normalizeCurrencyText(price)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceState() {
  return (
    <div className="space-y-3.5">
      <div>
        <h4 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
          Finance Overview
        </h4>
        <p className="mt-1 text-[0.76rem] text-[#667085]">
          Live receivables, payables, cash, and bills from one workspace.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {FINANCE_METRICS.map((metric) => (
          <MiniMetricCard
            key={metric.label}
            label={metric.label}
            value={formatCompactCurrency(metric.value)}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </div>
    </div>
  );
}

function ProcurementState() {
  return (
    <div className="space-y-3.5">
      <div>
        <h4 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
          Procurement Overview
        </h4>
        <p className="mt-1 text-[0.76rem] text-[#667085]">
          Purchase receivables, bills, and active order flow.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PROCUREMENT_METRICS.map((metric) => (
          <MiniMetricCard
            key={metric.label}
            label={metric.label}
            value={formatCompactCurrency(metric.value)}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </div>
      <CompactOrders rows={PROCUREMENT_ORDERS.length ? PROCUREMENT_ORDERS : OVERVIEW_ORDERS.slice(0, 1)} />
    </div>
  );
}

function ForecastState({ summary }: { summary: string }) {
  const forecastHeights = zerpaiSalesTrendHeights.slice(4);

  return (
    <div className="space-y-3.5">
      <div>
        <h4 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
          AI Forecast
        </h4>
        <p className="mt-1 text-[0.76rem] text-[#667085]">{summary}</p>
      </div>
      <div className="rounded-[18px] border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.8rem] font-semibold text-[#1f2933]">Forecast Trend</p>
          <Sparkles size={16} className="text-[#667085]" aria-hidden="true" />
        </div>
        <div className="mt-4 flex h-28 items-end gap-2 rounded-[16px] bg-[#f8fafc] px-3 py-3">
          {forecastHeights.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t bg-[#1f2933]/85"
              style={{ height: `${Math.max(24, height - 12)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ZerpAIInteractiveProductDemoProps = {
  product: Product;
  onRequestDemo: () => void;
};

export function ZerpAIInteractiveProductDemo({
  product,
  onRequestDemo,
}: ZerpAIInteractiveProductDemoProps) {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<DemoTabKey>("overview");
  const forecastFeature =
    product.features.find((feature) =>
      feature.title.toLowerCase().includes("forecast")
    )?.desc ?? product.description;

  const overviewContent = (
    <div className="space-y-3.5">
      <div>
        <h4 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
          Business Overview
        </h4>
        <p className="mt-1 text-[0.76rem] text-[#667085]">
          A real-time view of your operations.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {OVERVIEW_METRICS.map((metric) => (
          <MiniMetricCard
            key={metric.label}
            label={metric.label}
            value={formatCompactCurrency(metric.value)}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </div>
      <CompactSalesTrend />
      <CompactOrders rows={OVERVIEW_ORDERS} />
    </div>
  );

  const stateContent: Record<DemoTabKey, ReactNode> = {
    overview: overviewContent,
    inventory: <InventoryState />,
    finance: <FinanceState />,
    procurement: <ProcurementState />,
    forecast: <ForecastState summary={forecastFeature} />,
  };

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-transparent p-0 shadow-none"
    >
      <div className="relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.04 }}
          className="overflow-hidden rounded-[24px] border border-[#d7dde5] bg-[#f8fafc] shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white px-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[1rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
                ZerpAI ERP
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#475467]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Live
              </span>
              <Bell size={18} className="text-[#667085]" aria-hidden="true" />
            </div>
          </div>

          <div className="border-b border-[#e2e8f0] bg-white">
            <div
              className="flex gap-2 overflow-x-auto px-3 py-2.5 [scrollbar-width:none]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {DEMO_TABS.map(({ key, label, icon: Icon }) => {
                const isActive = key === activeTab;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    aria-pressed={isActive}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[0.8rem] font-medium transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                      isActive
                        ? "border-black bg-white text-[#1f2933] shadow-[inset_0_-2px_0_0_#000000]"
                        : "border-transparent bg-transparent text-[#667085]"
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[31rem] overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.995 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.995 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {stateContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.22 }}
          className="mt-5 space-y-3"
        >
          <Link
            href="/products/zerpai/demo"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-black px-5 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span>View Full Product</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={onRequestDemo}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[18px] border border-black bg-white px-5 text-base font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span>Request Demo</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
