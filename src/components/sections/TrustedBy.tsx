"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Pill,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IndustryItem = {
  label: string;
  Icon: LucideIcon;
};

const industries: IndustryItem[] = [
  { label: "Healthcare", Icon: HeartPulse },
  { label: "Pharmaceuticals", Icon: Pill },
  { label: "Retail & E-Commerce", Icon: ShoppingBag },
  { label: "Education", Icon: GraduationCap },
  { label: "Manufacturing", Icon: Factory },
  { label: "Logistics", Icon: Truck },
  { label: "Finance", Icon: Landmark },
  { label: "Real Estate", Icon: Building2 },
];

const marqueeItems = [...industries, ...industries];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function MobileTrustedIndustries() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const changeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const intervalId = window.setInterval(() => {
      setIsEntering(false);

      changeTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % industries.length);
        setIsEntering(true);
      }, 220);
    }, 2600);

    return () => {
      window.clearInterval(intervalId);

      if (changeTimeoutRef.current !== null) {
        window.clearTimeout(changeTimeoutRef.current);
      }
    };
  }, [isPaused, prefersReducedMotion]);

  const activeIndustry = industries[activeIndex];
  const ActiveIcon = activeIndustry.Icon;

  if (prefersReducedMotion) {
    return (
      <div className="md:hidden">
        <div className="space-y-3" aria-live="polite">
          {industries.map((industry) => {
            const Icon = industry.Icon;

            return (
              <div
                key={industry.label}
                className="flex items-center justify-center gap-3 text-center text-neutral-700"
              >
                <Icon
                  size={16}
                  strokeWidth={1.75}
                  className="shrink-0 text-neutral-500"
                  aria-hidden="true"
                />
                <span className="text-[0.98rem] font-medium tracking-[0.01em] text-ink">
                  {industry.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col items-center"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex min-h-[2.5rem] items-center justify-center gap-3 px-2 text-center"
          aria-live="polite"
        >
          <ActiveIcon
            size={16}
            strokeWidth={1.75}
            className={cn(
              "shrink-0 text-neutral-500 transition-all duration-300 ease-out",
              isEntering ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "text-[1rem] font-medium tracking-[0.01em] text-ink transition-all duration-300 ease-out min-[390px]:text-[1.06rem]",
              isEntering ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"
            )}
          >
            {activeIndustry.label}
          </span>
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          {industries.map((industry, index) => (
            <span
              key={industry.label}
              className={cn(
                "h-1 rounded-full bg-neutral-300 transition-all duration-300 ease-out",
                index === activeIndex ? "w-6 bg-neutral-900" : "w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopTrustedIndustries() {
  return (
    <div className="hidden md:block">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-track trusted-industries-track"
          style={{ animationDuration: "52s", willChange: "transform" }}
        >
          {marqueeItems.map((industry, index) => {
            const Icon = industry.Icon;

            return (
              <div
                key={`${industry.label}-${index}`}
                className="group trusted-industry-item mr-[72px] flex shrink-0 items-center gap-[10px] whitespace-nowrap text-neutral-600 transition-transform duration-300 ease-out hover:scale-[1.03]"
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-900"
                  aria-hidden="true"
                />
                <span className="text-[15px] font-medium tracking-[0.01em] text-neutral-600 transition-colors duration-300 ease-out group-hover:text-neutral-900">
                  {industry.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section
      className="overflow-hidden bg-canvas-soft py-12 md:py-16"
      aria-label="Trusted by industries"
    >
      <div className="mx-auto mb-7 max-w-7xl px-6 md:mb-9">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400">
          Trusted Across Industries
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <MobileTrustedIndustries />
        <DesktopTrustedIndustries />
      </div>
    </section>
  );
}
