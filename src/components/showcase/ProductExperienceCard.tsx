"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  CalendarDays,
  Check,
  HeartPulse,
  PackageCheck,
  ReceiptText,
  ScanBarcode,
  ShoppingBag,
  Store,
  Stethoscope,
  Tags,
  X,
} from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";

const previewConfig = {
  healthcare: {
    appName: "Careflow",
    title: "Clinical Overview",
    subtitle: "Today at Starline Clinic",
    metrics: [["Appointments", "46"], ["Open Reports", "18"], ["Collection", "₹2.8L"]],
    activityTitle: "Upcoming appointments",
    rows: ["Dr. Nair · 10:30 AM", "Anjali Menon · 11:15 AM", "Ravi Kumar · 12:00 PM"],
  },
  retail: {
    appName: "RetailOS",
    title: "Store Performance",
    subtitle: "All locations · live sales",
    metrics: [["Today’s Sales", "₹4.6L"], ["Orders", "328"], ["Low Stock", "7"]],
    activityTitle: "Live order stream",
    rows: ["ORD-1048 · Completed", "POS-226 · Payment received", "WEB-071 · Ready to pack"],
  },
} as const;

const featureIcons = {
  healthcare: [HeartPulse, CalendarDays, ReceiptText, Stethoscope],
  retail: [Store, ScanBarcode, Tags, PackageCheck],
} as const;

function ProductPreview({ slug }: { slug: "healthcare" | "retail" }) {
  const config = previewConfig[slug];
  const NavIcon = slug === "healthcare" ? HeartPulse : ShoppingBag;

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#d3d9e3] bg-[#f8fafc] shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="flex min-h-[410px]">
        <aside className="hidden w-[64px] shrink-0 flex-col items-center gap-4 bg-[#1f2633] py-4 text-white sm:flex">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#27c59a]"><NavIcon size={16} aria-hidden="true" /></span>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#30415f]"><Activity size={16} aria-hidden="true" /></span>
          <span className="grid h-9 w-9 place-items-center rounded-lg text-slate-300"><CalendarDays size={16} aria-hidden="true" /></span>
          <span className="grid h-9 w-9 place-items-center rounded-lg text-slate-300"><ReceiptText size={16} aria-hidden="true" /></span>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex h-14 items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white px-4">
            <p className="text-sm font-semibold text-[#1f2933]">{config.appName}</p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">Live</span>
          </header>
          <div className="p-4 md:p-5">
            <div className="mb-5">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1f2933]">{config.title}</h3>
              <p className="mt-1 text-xs text-[#6b7280]">{config.subtitle}</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5 md:gap-3">
              {config.metrics.map(([label, value], index) => (
                <div key={label} className="rounded-xl border border-[#dfe5ed] bg-white p-3 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
                  <p className="text-[10px] font-medium leading-4 text-[#6b7280]">{label}</p>
                  <p className="mt-4 text-sm font-semibold tracking-[-0.03em] text-[#1f2933]">{value}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} whileInView={{ width: `${65 + index * 11}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="h-full rounded-full bg-gradient-to-r from-[#2563eb] via-[#6d3df5] to-[#ec4899]" /></div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-xl border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
                <div className="flex items-center justify-between"><div><h4 className="text-sm font-semibold text-[#1f2933]">Activity trend</h4><p className="mt-1 text-[11px] text-[#6b7280]">Last 7 days</p></div><Activity size={15} className="text-[#2563eb]" aria-hidden="true" /></div>
                <div className="mt-5 flex h-24 items-end gap-2 rounded-lg bg-slate-50 px-3 py-3">{[35, 58, 44, 74, 61, 88, 76].map((height, index) => <motion.span key={index} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }} className="flex-1 rounded-t bg-gradient-to-t from-[#2563eb] via-[#6d3df5] to-[#ec4899]" />)}</div>
              </section>
              <section className="rounded-xl border border-[#dfe5ed] bg-white p-4 shadow-[0_3px_12px_rgba(31,41,51,0.035)]">
                <h4 className="text-sm font-semibold text-[#1f2933]">{config.activityTitle}</h4>
                <div className="mt-3 space-y-2">{config.rows.map((row) => <div key={row} className="rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] font-medium text-[#4b5563]">{row}</div>)}</div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductExperienceCard({ product }: { product: Product }) {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const slug = product.slug === "healthcare" ? "healthcare" : "retail";
  const icons = featureIcons[slug];

  return (
    <article className="relative overflow-hidden rounded-[32px] border border-hairline bg-canvas p-6 shadow-level-3 md:p-10 lg:p-12">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(0,112,243,0.07),transparent_70%)]" />
      <div className="relative grid items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-mute">{product.tag}</p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-ink md:text-5xl">{product.name}</h2>
          <p className="mt-4 text-lg font-medium text-body">{product.tagline}</p>
          <p className="mt-4 max-w-[42ch] text-sm leading-6 text-body">{product.description}</p>
          <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {product.industries.map((industry) => (
              <button key={industry} type="button" onClick={() => setActiveIndustry((current) => current === industry ? null : industry)} aria-pressed={activeIndustry === industry} className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.02em] transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${activeIndustry === industry ? "bg-[#d7e2ec] text-black shadow-[inset_-2px_-1px_8px_0_#ffffff,inset_2px_1px_8px_0_rgba(95,157,231,0.32)]" : "bg-[#e0e8ef] text-black shadow-[-4px_-2px_16px_0_#ffffff,4px_2px_16px_0_rgba(95,157,231,0.32)] hover:bg-[#e5edf5] hover:text-black hover:shadow-[-2px_-1px_8px_0_#ffffff,2px_1px_8px_0_rgba(95,157,231,0.32)] active:shadow-none"}`}>{industry}</button>
            ))}
          </div>
          <ul className="mt-7 space-y-4">
            {product.features.slice(0, 4).map((feature, index) => {
              const Icon = icons[index];
              return <li key={feature.title} className="flex items-center gap-3 text-sm text-body"><Icon size={21} strokeWidth={2} className="shrink-0 text-black" aria-hidden="true" /><span className="min-w-0 truncate">{feature.title}</span></li>;
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/products/${product.slug}`} className="inline-flex rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">View Full Product</Link>
            <button type="button" onClick={() => setIsDialogOpen(true)} className="rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Request Demo</button>
          </div>
        </div>
        <div className="min-w-0"><ProductPreview slug={slug} /></div>
      </div>
      <AnimatePresence>{isDialogOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-black/35 p-6" onClick={() => setIsDialogOpen(false)}><motion.section initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2 }} className="w-full max-w-md rounded-2xl border border-hairline bg-canvas p-6 shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby={`${product.slug}-demo-title`}><div className="flex items-center justify-between"><h3 id={`${product.slug}-demo-title`} className="text-lg font-semibold text-ink">Request a {product.name} demo</h3><button type="button" onClick={() => setIsDialogOpen(false)} aria-label="Close demo request" className="rounded-md p-2 transition-colors duration-200 hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"><X size={16} aria-hidden="true" /></button></div><p className="mt-2 text-sm text-body">We&apos;ll arrange a walkthrough tailored to your operations.</p><Link href={`/contact?product=${product.slug}#demo`} className="mt-5 inline-flex w-full justify-center rounded-full bg-ink py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">Continue to Request</Link></motion.section></motion.div>}</AnimatePresence>
    </article>
  );
}
