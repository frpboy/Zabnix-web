"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  FileBarChart2,
  Grid2x2,
  LayoutGrid,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type SummaryCardItem = {
  title: string;
  value: number;
  prefix: string;
  decimals: number;
  icon: LucideIcon;
  tone: "blue" | "rose" | "emerald" | "slate";
};

type MobileZerpAIShowcaseProps = {
  start: boolean;
  features: readonly string[];
  summaryCards: readonly SummaryCardItem[];
};

export function MobileZerpAIShowcase({
  start,
  features,
  summaryCards,
}: MobileZerpAIShowcaseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <article className="rounded-[28px] border border-[#ececec] bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] min-[390px]:p-6">
      <div>
        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.24em] text-mute">
          Operations Intelligence
        </p>

        <h2 className="text-[2.45rem] font-semibold tracking-[-0.05em] text-ink min-[390px]:text-[2.7rem]">
          ZerpAI ERP
        </h2>

        <p className="mt-3 max-w-[12ch] text-[1.05rem] font-medium leading-8 tracking-[-0.03em] text-ink min-[390px]:text-[1.12rem]">
          The intelligent ERP for modern operations.
        </p>

        <p className="mt-4 max-w-[34ch] text-[0.97rem] leading-7 text-body">
          A unified operations workspace for finance, procurement, inventory and
          fulfillment, designed to give teams real-time visibility without
          operational clutter.
        </p>

        <div className="mt-6 border-t border-[#ececec] pt-5">
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-ink">
                <CheckCircle2 size={16} className="shrink-0 text-ink" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/products"
            className="neu-button neu-button-dark inline-flex w-full min-h-[50px] items-center justify-center gap-2 text-sm font-semibold"
          >
            View Product
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/products/zerpai#demo"
            className="neu-button neu-button-light inline-flex w-full min-h-[50px] items-center justify-center gap-2 border border-black/20 text-sm font-semibold"
          >
            Request Demo
            <Calendar size={16} aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: start ? 1 : 0, y: start ? 0 : 20, scale: start ? 1 : 0.98 }
          }
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
          className="mt-7 w-full"
        >
          <div className="overflow-hidden rounded-[26px] border border-[#dbe3ed] bg-white p-2.5 shadow-[0_16px_34px_rgba(15,23,42,0.07)]">
            <div className="overflow-hidden rounded-[22px] border border-[#dbe3ed] bg-[#f8fafc]">
              <div className="grid min-h-[360px] grid-cols-[52px_minmax(0,1fr)]">
                <div className="flex flex-col items-center gap-3 bg-[#172033] px-2 py-3">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#1f7a52] text-white">
                    <Grid2x2 size={15} aria-hidden="true" />
                  </div>
                  {[LayoutGrid, Package, Truck, ShoppingCart, FileBarChart2].map(
                    (Icon, index) => (
                      <div
                        key={index}
                        className={`grid h-8 w-8 place-items-center rounded-xl ${
                          index === 0 ? "bg-[#30415f] text-white" : "text-slate-300"
                        }`}
                      >
                        <Icon size={15} aria-hidden="true" />
                      </div>
                    )
                  )}
                  <div className="mt-auto w-full rounded-xl border border-white/10 bg-white/[0.04] p-2">
                    <div className="h-1.5 rounded-full bg-white/10" />
                    <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-white/10" />
                  </div>
                </div>

                <div className="min-w-0 bg-[#fbfcfe]">
                  <div className="flex items-center gap-2 border-b border-[#e6edf5] bg-white px-3 py-2.5">
                    <div className="relative min-w-0 flex-1">
                      <div className="flex h-9 items-center truncate rounded-xl border border-[#e2e8f0] bg-white pl-8 pr-2 text-[10px] text-slate-400">
                        Search items
                      </div>
                      <Search
                        size={12}
                        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-[#22a45a]">
                      Upgrade
                    </span>
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#22b15b] text-white">
                      <Plus size={15} aria-hidden="true" />
                    </div>
                    <Bell size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                    <Settings size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
                  </div>

                  <div className="space-y-4 px-3 py-3">
                    <div>
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.03em] text-slate-800">
                        Business Overview
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-500">
                        A real-time view of Starlex Healthcare operations.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {summaryCards.slice(0, 6).map((card, index) => {
                        const Icon = card.icon;
                        const toneClasses = {
                          blue: "bg-blue-50 text-[#2b74ea]",
                          rose: "bg-rose-50 text-[#f25d66]",
                          emerald: "bg-emerald-50 text-[#38b26d]",
                          slate: "bg-slate-100 text-slate-500",
                        }[card.tone];

                        return (
                          <motion.div
                            key={card.title}
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                            animate={reduceMotion ? undefined : { opacity: start ? 1 : 0, y: start ? 0 : 12 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.4,
                              delay: 0.16 + index * 0.05,
                              ease: "easeOut",
                            }}
                            className="rounded-[18px] border border-[#dfe5ed] bg-white p-3 shadow-[0_3px_12px_rgba(31,41,51,0.035)]"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="max-w-[11ch] text-[10px] font-medium leading-4 text-[#6b7280]">
                                {card.title}
                              </p>
                              <div className={`rounded-lg p-1.5 ${toneClasses}`}>
                                <Icon size={13} aria-hidden="true" />
                              </div>
                            </div>
                            <p className="mt-4 text-[13px] font-bold tracking-[-0.025em] text-slate-800 font-variant-numeric tabular-nums">
                              <AnimatedCounter
                                value={card.value}
                                prefix={card.prefix === "Rs" ? "\u20B9" : card.prefix}
                                decimals={card.decimals}
                                start={start}
                              />
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
