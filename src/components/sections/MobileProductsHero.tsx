"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Box, HeartPulse, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";

type HeroProduct = {
  slug: string;
  name: string;
  tag?: string;
  tagline: string;
  description: string;
};

type MobileProductsHeroProps = {
  products: readonly HeroProduct[];
};

const iconMap = {
  zerpai: Box,
  healthcare: HeartPulse,
  retail: ShoppingBag,
} as const;

const MOBILE_PRODUCT_CYCLE_MS = 4200;

const stackVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function MobileProductsHero({ products }: MobileProductsHeroProps) {
  const reduceMotion = useReducedMotion();
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const zerpai = products.find((product) => product.slug === "zerpai");
  const healthcare = products.find((product) => product.slug === "healthcare");
  const retail = products.find((product) => product.slug === "retail");

  if (!zerpai || !healthcare || !retail) {
    return null;
  }

  const stackProducts = useMemo(() => [zerpai, healthcare, retail] as const, [healthcare, retail, zerpai]);
  const primaryProduct = stackProducts[activeIndex] ?? stackProducts[0];
  const secondaryProduct = stackProducts[(activeIndex + 1) % stackProducts.length] ?? stackProducts[1];
  const tertiaryProduct = stackProducts[(activeIndex + 2) % stackProducts.length] ?? stackProducts[2];
  const stack = [
    { product: tertiaryProduct, role: "tertiary" as const },
    { product: secondaryProduct, role: "secondary" as const },
    { product: primaryProduct, role: "primary" as const },
  ];

  useEffect(() => {
    if (reduceMotion || isInteracting) {
      return;
    }

    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % stackProducts.length);
    }, MOBILE_PRODUCT_CYCLE_MS);

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [activeIndex, isInteracting, reduceMotion, stackProducts.length]);

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

  const goNext = () => {
    pauseInteraction();
    setActiveIndex((current) => (current + 1) % stackProducts.length);
  };

  const goPrevious = () => {
    pauseInteraction();
    setActiveIndex((current) => (current - 1 + stackProducts.length) % stackProducts.length);
  };

  const handleSwipeStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
    suppressClickRef.current = false;
    pauseInteraction();
  };

  const handleSwipeEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    const touch = event.changedTouches[0];

    if (!start || !touch) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    swipeStartRef.current = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) {
      return;
    }

    suppressClickRef.current = true;

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrevious();
  };

  const handleSwipeCancel = () => {
    swipeStartRef.current = null;
  };

  const handleStackClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas px-4 pb-10 pt-10 md:hidden">
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -right-28 top-28 h-[22rem] w-[22rem] rounded-full border border-black/[0.05]" />
        <div className="absolute -right-12 top-48 h-[13rem] w-[13rem] rounded-full border border-black/[0.05]" />
        <div className="absolute right-7 top-48 grid grid-cols-5 gap-3 opacity-25">
          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} className="h-1 w-1 rounded-full bg-black/45" />
          ))}
        </div>
        <span className="absolute right-[4.9rem] top-[6.9rem] text-sm text-black/35">+</span>
        <span className="absolute right-[2.5rem] top-[14.8rem] text-sm text-black/35">+</span>
      </div>

      <div className="relative z-10 mx-auto max-w-[28rem]">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          className="text-xs font-mono uppercase tracking-[0.32em] text-mute"
        >
          Our Products
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[10ch] text-[3.25rem] font-semibold leading-[0.96] tracking-[-0.075em] text-ink min-[390px]:text-[3.55rem]"
          style={{ textWrap: "balance" }}
        >
          Built for real business problems.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.54, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[18ch] text-[1.1rem] leading-[1.75] text-body"
        >
          Purpose-built platforms that go live fast and grow with your operations. No
          bloated features, no unnecessary complexity.
        </motion.p>

        <div
          className="relative mt-9 h-[21.5rem] overflow-hidden min-[390px]:h-[22.5rem]"
          onTouchStart={handleSwipeStart}
          onTouchEnd={handleSwipeEnd}
          onTouchCancel={handleSwipeCancel}
          onClickCapture={handleStackClickCapture}
          style={{ touchAction: "pan-y" }}
        >
          {stack.map(({ product, role }) => {
            const isPrimary = role === "primary";
            const Icon = iconMap[product.slug as keyof typeof iconMap];
            const config = {
              primary: { left: "0%", top: "3.75rem", width: "78%", zIndex: 30, scale: 1 },
              secondary: { left: "48%", top: "2.9rem", width: "40%", zIndex: 20, scale: 1 },
              tertiary: { left: "66%", top: "2.1rem", width: "31%", zIndex: 10, scale: 1 },
            }[role];
            const cardPadding = isPrimary ? "p-5" : "px-4 pb-5 pt-4";

            return (
              <motion.div
                key={product.slug}
                custom={role === "primary" ? 0.22 : role === "secondary" ? 0.34 : 0.46}
                initial={reduceMotion ? false : "hidden"}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        scale: config.scale,
                        left: config.left,
                        top: config.top,
                      }
                }
                variants={stackVariants}
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 0.56,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                className="absolute rounded-[28px] border border-[#e5e5e5] bg-white shadow-[0_18px_34px_rgba(15,23,42,0.06)]"
                style={{ width: config.width, zIndex: config.zIndex }}
              >
                <div className={cardPadding}>
                  <div className={`flex items-start gap-3 ${isPrimary ? "mb-5" : "mb-4 flex-col"}`}>
                    <div className={`grid place-items-center rounded-[18px] border border-[#e5e5e5] bg-white ${isPrimary ? "h-14 w-14 bg-black text-white" : "h-12 w-12 text-black"}`}>
                      <Icon size={isPrimary ? 28 : 22} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h2 className={`${isPrimary ? "text-[2rem]" : "text-[1rem]"} font-semibold leading-[1.02] tracking-[-0.055em] text-ink`}>
                        {product.name}
                      </h2>
                      <p className={`${isPrimary ? "mt-1.5 text-base" : "mt-2 text-[0.78rem] leading-5"} text-body`}>
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  {isPrimary ? (
                    <>
                      <div className="border-t border-[#ececec] pt-5">
                        <p className="text-sm leading-8 text-body">
                          {product.description}
                        </p>
                      </div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-6 inline-flex items-center gap-3 rounded-full text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                      >
                        <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-[0_10px_18px_rgba(15,23,42,0.14)]">
                          <ArrowRight size={20} aria-hidden="true" />
                        </span>
                        <span>{`Explore ${product.name}`}</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-[#d9d9d9] bg-white text-black shadow-[0_8px_18px_rgba(15,23,42,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <span className="grid h-11 w-11 place-items-center">
                        <ArrowRight size={18} aria-hidden="true" />
                      </span>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.52, ease: "easeOut" }}
          className="mt-3 flex flex-col items-center"
        >
          <Link
            href="#products-list-heading"
            className="inline-flex flex-col items-center gap-3 text-[0.8rem] font-mono uppercase tracking-[0.28em] text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d8d8d8] bg-white text-ink shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
              <ArrowDown size={20} aria-hidden="true" />
            </span>
            <span>Scroll to Explore</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
