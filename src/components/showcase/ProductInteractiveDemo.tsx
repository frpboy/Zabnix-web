"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Bell, ArrowRight, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Product } from "@/lib/data";

export type ProductDemoTab = {
  key: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
};

type ProductInteractiveDemoProps = {
  product: Pick<Product, "name">;
  tabs: readonly ProductDemoTab[];
  viewHref: string;
  onRequestDemo: () => void;
};

export function ProductInteractiveDemo({
  product,
  tabs,
  viewHref,
  onRequestDemo,
}: ProductInteractiveDemoProps) {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");
  const activeContent =
    tabs.find((tab) => tab.key === activeTab)?.content ?? tabs[0]?.content ?? null;

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
          className="-mt-px overflow-hidden rounded-b-[24px] border border-[#d7dde5] border-t-0 bg-[#f8fafc] shadow-[0_18px_40px_rgba(15,23,42,0.06)] before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:w-px before:bg-[#d7dde5]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-white px-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[1rem] font-semibold tracking-[-0.03em] text-[#1f2933]">
                {product.name}
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
              {tabs.map(({ key, label, icon: Icon }) => {
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
                {activeContent}
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
            href={viewHref}
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
