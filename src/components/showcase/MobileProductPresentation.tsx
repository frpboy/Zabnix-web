"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { Product } from "@/lib/data";

const MOBILE_CAPABILITY_CYCLE_MS = 2800;
const MOBILE_CAPABILITY_TRANSITION_MS = 520;

export type MobileProductCapability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type MobileProductPresentationProps = {
  category: string;
  product: Pick<Product, "slug" | "name" | "tagline" | "description" | "industries">;
  capabilities: readonly MobileProductCapability[];
  onRequestDemo: () => void;
  viewHref: string;
};

export function MobileProductPresentation({
  category,
  product,
  capabilities,
  onRequestDemo,
  viewHref,
}: MobileProductPresentationProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const visibleCapabilities = useMemo(
    () => capabilities.slice(0, 4),
    [capabilities]
  );
  if (visibleCapabilities.length === 0) {
    return null;
  }

  const activeCapability = visibleCapabilities[activeIndex] ?? visibleCapabilities[0];

  useEffect(() => {
    if (
      reduceMotion ||
      !isInView ||
      isInteracting ||
      visibleCapabilities.length < 2
    ) {
      return;
    }

    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % visibleCapabilities.length);
    }, MOBILE_CAPABILITY_CYCLE_MS);

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [activeIndex, isInView, isInteracting, reduceMotion, visibleCapabilities.length]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const pauseInteraction = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 2200);
  };

  const handleSelectCapability = (index: number) => {
    pauseInteraction();
    setActiveIndex(index);
  };

  return (
    <motion.article
      ref={sectionRef}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-[#e5e9f0] bg-white p-5 shadow-sm"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute right-4 top-8 grid grid-cols-5 gap-3 opacity-20">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} className="h-1 w-1 rounded-full bg-black/45" />
          ))}
        </div>
        <span className="absolute right-[4.25rem] top-[4.75rem] text-sm text-black/30">+</span>
        <span className="absolute right-[7rem] top-[10.25rem] text-sm text-black/30">+</span>
        <span className="absolute right-[1.5rem] top-[15.9rem] text-sm text-black/30">+</span>
      </div>

      <div className="relative z-10">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.42 }}
          className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900"
        >
          {category}
        </motion.span>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.05 }}
          className="mt-4 text-[2.95rem] font-extrabold tracking-[-0.07em] text-ink min-[390px]:text-[3.15rem]"
        >
          {product.name}
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12 }}
          className="mt-5 max-w-[32ch] text-[0.97rem] leading-7 text-body"
        >
          {product.description}
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : 0.22 }}
          className="mt-6 overflow-hidden rounded-[24px] border border-[#dde3ea] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
        >
          <div className="bg-white">
            <button
              type="button"
              onClick={() => handleSelectCapability(activeIndex)}
              aria-pressed="true"
              className="w-full px-4 py-4 text-left transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <div className="flex items-start gap-3.5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] border border-black bg-black text-white">
                  <activeCapability.icon size={20} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[1rem] font-semibold leading-6 tracking-[-0.035em] text-ink">
                    {activeCapability.title}
                  </p>
                  <p className="mt-1.5 max-w-[28ch] text-[0.82rem] leading-6 text-body line-clamp-2">
                    {activeCapability.description}
                  </p>
                </div>
              </div>
            </button>

            <div className="border-y border-[#edf1f5] bg-[#fcfcfc] px-4 py-5">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Live Overview
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapability.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : MOBILE_CAPABILITY_TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4"
                >
                  <div className="rounded-[22px] border border-[#dde3ea] bg-white p-4">
                    <div className="relative mx-auto flex h-28 w-full items-center justify-center rounded-[20px] border border-[#e4e8ed] bg-[#fbfbfb] text-black">
                      <span className="absolute left-3 top-3 h-4 w-4 rounded-tl-[0.35rem] border-l border-t border-slate-400" />
                      <span className="absolute right-3 top-3 h-4 w-4 rounded-tr-[0.35rem] border-r border-t border-slate-400" />
                      <span className="absolute bottom-3 left-3 h-4 w-4 rounded-bl-[0.35rem] border-b border-l border-slate-400" />
                      <span className="absolute bottom-3 right-3 h-4 w-4 rounded-br-[0.35rem] border-b border-r border-slate-400" />
                      <activeCapability.icon size={48} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                          Active Capability
                        </p>
                        <p className="mt-1 text-[0.95rem] font-semibold leading-6 tracking-[-0.03em] text-ink">
                          {activeCapability.title}
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.article>
  );
}
