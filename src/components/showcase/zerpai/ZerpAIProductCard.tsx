"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Box,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  FileBarChart2,
  Grid2X2,
  Landmark,
  Menu,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { ZerpAIMiniPreview } from "./ERPWorkspace";

const features = [
  { label: "Inventory & warehouse control", icon: Package },
  { label: "Procurement & purchase orders", icon: ShoppingCart },
  { label: "Finance & GST accounting", icon: Landmark },
  { label: "AI demand forecasting", icon: Sparkles },
];

const industries = ["Healthcare", "Retail", "Manufacturing", "Distribution"];

const erpModules = [
  { key: "dashboard", label: "Home", icon: Grid2X2 },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "sales", label: "Sales", icon: ShoppingCart },
  { key: "crm", label: "CRM", icon: Users },
  { key: "finance", label: "Finance", icon: Wallet },
  { key: "reports", label: "Reports", icon: FileBarChart2 },
  { key: "analytics", label: "Analytics", icon: SlidersHorizontal },
  { key: "settings", label: "Settings", icon: Settings },
];

function MobileModuleView({ activeModule, search }: { activeModule: string; search: string }) {
  if (activeModule === "inventory") {
    const items = [
      { code: "MED-650", name: "Paracetamol 650mg", stock: "12,000", price: "₹24.50", tax: "GST 12%" },
      { code: "MED-500", name: "Amoxicillin 500mg", stock: "8,500", price: "₹74.00", tax: "GST 12%" },
      { code: "SUP-102", name: "Nitrile Gloves", stock: "1,180", price: "₹265.00", tax: "GST 5%" },
      { code: "LAB-044", name: "Diagnostic Kit", stock: "64", price: "₹1,240.00", tax: "GST 12%" },
    ];
    const filtered = search ? items.filter(i => (i.name + i.code).toLowerCase().includes(search.toLowerCase())) : items;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Inventory Control</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Live stock across warehouses.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 border border-slate-200">
            {filtered.length} Items
          </span>
        </div>
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.code} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{item.name}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.code} • Stock: <span className="font-semibold text-slate-800">{item.stock}</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">{item.price}</p>
                <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">{item.tax}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "sales") {
    const orders = [
      { id: "SO-2026-148", client: "Aster Healthcare", amount: "₹1,84,500", status: "Packed" },
      { id: "PO-2026-087", client: "Medline Supplies", amount: "₹94,280", status: "Approved" },
      { id: "INV-2026-526", client: "Zenith Retail", amount: "₹3,42,990", status: "Paid" },
    ];

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Sales & Orders</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Recent order stream.</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-200">
            Live Stream
          </span>
        </div>
        <div className="space-y-2">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{order.id}</p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">{order.client}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">{order.amount}</p>
                <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "crm") {
    const customers = [
      { name: "Aster Healthcare", loc: "Kochi, India", bal: "₹4,50,000", status: "Active" },
      { name: "Globex Distributors", loc: "Mumbai, India", bal: "₹3,10,000", status: "Active" },
      { name: "Zenith Retail", loc: "Bengaluru, India", bal: "₹1,84,500", status: "Follow-up" },
    ];

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">CRM & Accounts</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Client accounts directory.</p>
          </div>
        </div>
        <div className="space-y-2">
          {customers.map((c) => (
            <div key={c.name} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{c.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{c.loc}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">{c.bal}</p>
                <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeModule === "finance") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">Finance & GST</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Automated tax ledgers & filing.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-3">
            <p className="text-[10px] font-medium text-slate-500">GST Output Liability</p>
            <p className="mt-1 text-sm font-bold text-slate-900">₹2,84,000</p>
          </div>
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-3">
            <p className="text-[10px] font-medium text-slate-500">Input Tax Credit</p>
            <p className="mt-1 text-sm font-bold text-emerald-600">₹1,12,000</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeModule === "reports" || activeModule === "analytics") {
    const title = activeModule === "reports" ? "Reports & Statements" : "AI Demand Analytics";
    return (
      <div className="space-y-3">
        <div className="border-b border-[#f1f5f9] pb-2.5">
          <h3 className="text-base font-bold text-slate-900 leading-tight">{title}</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Automated intelligence summaries.</p>
        </div>
        <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/60 p-4 text-center">
          <Sparkles size={24} className="mx-auto text-slate-700 mb-2" />
          <p className="text-xs font-bold text-slate-800">Demand Forecasting Active</p>
          <p className="text-[11px] text-slate-500 mt-1">Paracetamol demand projected +24% next week.</p>
        </div>
      </div>
    );
  }

  if (activeModule === "settings") {
    return (
      <div className="space-y-3">
        <div className="border-b border-[#f1f5f9] pb-2.5">
          <h3 className="text-base font-bold text-slate-900 leading-tight">Workspace Settings</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage system preferences.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Organization", "Users & Roles", "Taxes & Compliance", "Automations"].map((s) => (
            <div key={s} className="rounded-xl border border-[#e2e8f0] bg-white p-3 text-xs font-semibold text-slate-800 shadow-2xs">
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default "dashboard"
  return (
    <>
      {/* Business Overview Header */}
      <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Business Overview
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            A real-time view of Starlex Healthcare operations.
          </p>
        </div>
        <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 border border-emerald-200 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* 2-Column Metrics Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card 1: Total Receivables */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet size={16} aria-hidden="true" />
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Total Receivables
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              ₹12,45,890
            </p>
          </div>
        </div>

        {/* Card 2: Outstanding Payables */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <ArrowDownLeft size={16} aria-hidden="true" />
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ArrowDownLeft size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Outstanding Payables
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              ₹4,12,300
            </p>
          </div>
        </div>

        {/* Card 3: Cash on Hand */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet size={16} aria-hidden="true" />
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Cash on Hand
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              ₹18,50,000
            </p>
          </div>
        </div>

        {/* Card 4: Purchase Receivables */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Truck size={16} aria-hidden="true" />
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowUpRight size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Purchase Receivables
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              ₹8,24,000
            </p>
          </div>
        </div>

        {/* Card 5: Bills Total */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <CircleDollarSign size={16} aria-hidden="true" />
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <ArrowDownLeft size={13} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Bills Total
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              ₹2,10,000
            </p>
          </div>
        </div>

        {/* Card 6: Picklists */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Box size={16} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">
              Picklists
            </p>
            <p className="mt-1 text-sm font-extrabold text-slate-900 tracking-tight font-variant-numeric tabular-nums">
              34
            </p>
          </div>
        </div>
      </div>

      {/* Healthcare Suite Card */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-black border border-slate-200">
            <Activity size={18} aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Healthcare Suite
            </h4>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Built for healthcare providers and distributors.
            </p>
          </div>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 shrink-0">
          <ChevronRight size={14} aria-hidden="true" />
        </div>
      </div>
    </>
  );
}

export function ZerpAIProductCard() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  return (
    <>
      {/* Desktop Version (Untouched) */}
      <article className="hidden lg:block relative overflow-hidden rounded-[32px] border border-hairline bg-canvas p-6 shadow-level-3 md:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(0,112,243,0.07),transparent_70%)]"
        />
        <div className="relative grid items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-mute">
              Operations Intelligence
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-ink md:text-5xl">
              ZerpAI ERP
            </h2>
            <p className="mt-4 text-lg font-medium text-body">
              The intelligent ERP for modern operations.
            </p>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-body">
              One operational workspace for finance, procurement, inventory and
              fulfilment, designed for Indian businesses that need real-time
              visibility without complexity.
            </p>
            <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  suppressHydrationWarning
                  onClick={() =>
                    setActiveIndustry((current) =>
                      current === industry ? null : industry
                    )
                  }
                  aria-pressed={activeIndustry === industry}
                  className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.02em] transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                    activeIndustry === industry
                      ? "bg-[#d7e2ec] text-black shadow-[inset_-2px_-1px_8px_0_#ffffff,inset_2px_1px_8px_0_rgba(95,157,231,0.32)]"
                      : "bg-[#e0e8ef] text-black shadow-[-4px_-2px_16px_0_#ffffff,4px_2px_16px_0_rgba(95,157,231,0.32)] hover:bg-[#e5edf5] hover:text-black hover:shadow-[-2px_-1px_8px_0_#ffffff,2px_1px_8px_0_rgba(95,157,231,0.32)] active:shadow-none"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
            <ul className="mt-7 space-y-4">
              {features.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-body">
                  <Icon
                    size={21}
                    strokeWidth={2}
                    className="shrink-0 text-black"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 truncate">{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/zerpai/demo"
                className="inline-flex rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                View Full Product
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Request Demo
              </button>
            </div>
          </div>
          <div className="min-w-0">
            <ZerpAIMiniPreview />
          </div>
        </div>
      </article>

      {/* Mobile Version (Reference Design Target) */}
      <article className="block lg:hidden space-y-4">
        {/* Top White Section */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#e5e9f0] bg-white p-5 shadow-sm">
          {/* Subtle Organic Background Wave Graphic */}
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-30"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
              <path
                d="M40 0 C 100 80, 120 40, 200 120 L 200 0 Z"
                fill="url(#mobileWaveGrad)"
              />
              <defs>
                <linearGradient
                  id="mobileWaveGrad"
                  x1="0"
                  y1="0"
                  x2="200"
                  y2="200"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#000000" stopOpacity="0.06" />
                  <stop offset="1" stopColor="#000000" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Eyebrow Badge */}
          <span className="mb-3 inline-block rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 font-mono text-[10px] font-bold tracking-widest uppercase text-slate-900">
            OPERATIONS INTELLIGENCE
          </span>

          {/* Title */}
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            ZerpAI ERP
          </h2>

          {/* Subtitle & Description */}
          <p className="mt-2 text-sm font-semibold text-slate-800">
            The intelligent ERP for modern operations.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            One operational workspace for finance, procurement, inventory and
            fulfilment, designed for Indian businesses that need real-time
            visibility without complexity.
          </p>

          {/* Industry Tags */}
          <div className="mt-4 flex flex-wrap gap-2 pb-1">
            {industries.slice(0, 3).map((industry) => (
              <button
                key={industry}
                type="button"
                suppressHydrationWarning
                onClick={() =>
                  setActiveIndustry((current) =>
                    current === industry ? null : industry
                  )
                }
                aria-pressed={activeIndustry === industry}
                className={`inline-flex shrink-0 items-center justify-center rounded-full border px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase transition-colors ${
                  activeIndustry === industry
                    ? "border-black bg-black text-white"
                    : "border-slate-300 bg-slate-100 text-black hover:bg-slate-200"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Feature List Box */}
          <div className="my-4 space-y-3 rounded-2xl border border-[#f1f5f9] bg-[#f8fafc] p-4">
            {features.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-black">
                  <Icon size={16} aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-slate-800">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-1">
            <Link
              href="/products/zerpai/demo"
              className="flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-full border border-black bg-white px-3 text-xs font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>View Full Product</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-full border border-black bg-white px-3 text-xs font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <Calendar size={14} aria-hidden="true" />
              <span>Request Demo</span>
            </button>
          </div>
        </div>

        {/* Lower Dashboard Section (In-Section Overlay Container) */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#e5e9f0] bg-white p-4 shadow-sm space-y-3.5 min-h-[380px]">
          {/* Header Bar / Search Row */}
          <div className="flex items-center gap-2">
            {/* Top-Left 3 Bars Hamburger Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open ERP navigation menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Menu size={18} aria-hidden="true" />
            </button>

            <div className="relative flex-1">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customers, invoices, orders..."
                className="w-full rounded-xl border border-[#e2e8f0] bg-white py-2 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#4f46e5] focus:outline-none"
              />
            </div>
            <button
              aria-label="Add new"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
            <button
              aria-label="Notifications"
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600"
            >
              <Bell size={16} aria-hidden="true" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-xs font-bold text-white">
              SK
            </div>
          </div>

          {/* Module Content View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              <MobileModuleView activeModule={activeModule} search={search} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile In-Section ERP Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Backdrop scoped inside section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-black/40 backdrop-blur-xs rounded-[28px]"
                  onClick={() => setSidebarOpen(false)}
                />

                {/* Slide-out Sidebar Panel scoped inside section */}
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 280 }}
                  className="absolute left-0 top-0 bottom-0 z-30 w-[220px] bg-[#1f2633] text-white p-4 flex flex-col justify-between shadow-2xl rounded-l-[28px]"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#27c59a] text-white">
                          <Grid2X2 size={14} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-bold text-white">
                          Zerpai ERP
                        </span>
                      </div>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar menu"
                        className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Module Links */}
                    <nav className="space-y-0.5" aria-label="Mobile ERP modules">
                      {erpModules.map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => {
                            setActiveModule(key);
                            setSidebarOpen(false);
                          }}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                            activeModule === key
                              ? "bg-[#30415f] text-white"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon size={15} aria-hidden="true" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom Alert Card */}
                  <div className="rounded-lg border border-white/15 bg-white/5 p-2.5 text-[11px] text-slate-300 mt-2">
                    <p className="font-bold text-white flex items-center gap-1.5 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Inventory Alert
                    </p>
                    <p className="mt-0.5 text-[10px] leading-3 text-slate-300">
                      4 items below reorder level.
                    </p>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </div>
      </article>

      {/* Demo Modal (Shared) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/35 p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-hairline bg-canvas p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-dialog-title"
            >
              <div className="flex items-center justify-between">
                <h3 id="demo-dialog-title" className="text-lg font-semibold text-ink">
                  Request a ZerpAI demo
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close demo request"
                  className="rounded-md p-2 hover:bg-canvas-soft"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-2 text-sm text-body">
                Tell us where to reach you and we&apos;ll arrange a tailored walkthrough.
              </p>
              <form className="mt-5 space-y-3" suppressHydrationWarning>
                <input
                  aria-label="Work email"
                  type="email"
                  autoComplete="email"
                  defaultValue=""
                  suppressHydrationWarning
                  placeholder="you@company.com…"
                  className="h-10 w-full rounded-md border border-hairline bg-white px-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white"
                >
                  Request Demo
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
