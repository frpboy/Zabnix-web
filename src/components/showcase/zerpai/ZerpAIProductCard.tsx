"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Landmark, Package, ShoppingCart, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { ZerpAIMiniPreview } from "./ERPWorkspace";

const features = [
  { label: "Inventory & warehouse control", icon: Package },
  { label: "Procurement & purchase orders", icon: ShoppingCart },
  { label: "Finance & GST accounting", icon: Landmark },
  { label: "AI demand forecasting", icon: Sparkles },
];
const industries = ["Healthcare", "Retail", "Manufacturing", "Distribution"];

export function ZerpAIProductCard() {
  const [open, setOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  return (
    <article className="relative overflow-hidden rounded-[32px] border border-hairline bg-canvas p-6 shadow-level-3 md:p-10 lg:p-12">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-[radial-gradient(circle,rgba(0,112,243,0.07),transparent_70%)]" />
      <div className="relative grid items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <div className="min-w-0">
          <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-mute">Operations Intelligence</p>
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-ink md:text-5xl">ZerpAI ERP</h2>
          <p className="mt-4 text-lg font-medium text-body">The intelligent ERP for modern operations.</p>
          <p className="mt-4 max-w-[42ch] text-sm leading-6 text-body">One operational workspace for finance, procurement, inventory and fulfilment, designed for Indian businesses that need real-time visibility without complexity.</p>
          <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {industries.map((industry) => (
              <button key={industry} onClick={() => setActiveIndustry((current) => current === industry ? null : industry)} aria-pressed={activeIndustry === industry} className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white/35 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.02em] transition-[color,background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${activeIndustry === industry ? "bg-[#d7e2ec] text-black shadow-[inset_-2px_-1px_8px_0_#ffffff,inset_2px_1px_8px_0_rgba(95,157,231,0.32)]" : "bg-[#e0e8ef] text-black shadow-[-4px_-2px_16px_0_#ffffff,4px_2px_16px_0_rgba(95,157,231,0.32)] hover:bg-[#e5edf5] hover:text-black hover:shadow-[-2px_-1px_8px_0_#ffffff,2px_1px_8px_0_rgba(95,157,231,0.32)] active:shadow-none"}`}>{industry}</button>
            ))}
          </div>
          <ul className="mt-7 space-y-4">{features.map(({ label, icon: Icon }) => <li key={label} className="flex items-center gap-3 text-sm text-body"><Icon size={21} strokeWidth={2} className="shrink-0 text-black" aria-hidden="true" /><span className="min-w-0 truncate">{label}</span></li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products/zerpai/demo" className="inline-flex rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">View Full Product</Link>
            <button onClick={() => setOpen(true)} className="rounded-full border border-black bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-none transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[2px_5px_0_0_#000] active:translate-x-px active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Request Demo</button>
          </div>
        </div>
        <div className="min-w-0"><ZerpAIMiniPreview /></div>
      </div>
      <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] grid place-items-center bg-black/35 p-6" onClick={() => setOpen(false)}><motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.2 }} className="w-full max-w-md rounded-2xl border border-hairline bg-canvas p-6 shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title"><div className="flex items-center justify-between"><h3 id="demo-dialog-title" className="text-lg font-semibold text-ink">Request a ZerpAI demo</h3><button onClick={() => setOpen(false)} aria-label="Close demo request" className="rounded-md p-2 hover:bg-canvas-soft"><X size={16} /></button></div><p className="mt-2 text-sm text-body">Tell us where to reach you and we&apos;ll arrange a tailored walkthrough.</p><form className="mt-5 space-y-3"><input aria-label="Work email" type="email" autoComplete="email" placeholder="you@company.com…" className="h-10 w-full rounded-md border border-hairline bg-white px-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link" /><button type="button" onClick={() => setOpen(false)} className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white">Request Demo</button></form></motion.div></motion.div>}</AnimatePresence>
    </article>
  );
}
