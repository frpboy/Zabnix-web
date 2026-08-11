"use client";

import Link from "next/link";
import {
  BarChart3,
  Brain,
  Code2,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { cn } from "@/lib/utils";
import type {
  HomeServiceIconKey,
  HomeServiceItem,
} from "@/components/sections/ServicesGrid";

type MobileServicesShowcaseProps = {
  services: HomeServiceItem[];
};

const serviceIcons: Record<HomeServiceIconKey, typeof Code2> = {
  software: Code2,
  mobile: Smartphone,
  erp: BarChart3,
  ai: Brain,
  consulting: Globe,
  security: Shield,
};

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

export function MobileServicesShowcase({
  services,
}: MobileServicesShowcaseProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isIconEntering, setIsIconEntering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const iconEnterStartTimeoutRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const pendingIndexRef = useRef<number | null>(null);

  const commitIndexChange = (nextIndex: number) => {
    if (nextIndex === activeIndex && nextIndex === displayIndex) return;

    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    pendingIndexRef.current = nextIndex;

    if (prefersReducedMotion) {
      setActiveIndex(nextIndex);
      setDisplayIndex(nextIndex);
      setIsIconEntering(false);
      setIsTransitioning(false);
      return;
    }

    setIsTransitioning(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      const resolvedIndex = pendingIndexRef.current ?? nextIndex;
      setDisplayIndex(resolvedIndex);
      setActiveIndex(resolvedIndex);
      setIsTransitioning(false);
      setIsIconEntering(true);

      iconEnterStartTimeoutRef.current = window.setTimeout(() => {
        setIsIconEntering(false);
        iconEnterStartTimeoutRef.current = null;
      }, 32);

      transitionTimeoutRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
      }

      if (iconEnterStartTimeoutRef.current !== null) {
        window.clearTimeout(iconEnterStartTimeoutRef.current);
      }
    };
  }, []);

  const totalServices = services.length;
  const currentService = services[displayIndex];
  const CurrentIcon = serviceIcons[currentService.icon];

  const scheduleIndexChange = (nextIndex: number) => {
    const normalized = (nextIndex + totalServices) % totalServices;
    commitIndexChange(normalized);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    scheduleIndexChange(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  const handleProgressSelect = (index: number) => {
    if (interactionTimeoutRef.current !== null) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      interactionTimeoutRef.current = null;
    }, 2400);

    scheduleIndexChange(index);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="max-w-[15rem]">
        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.24em] text-mute">
          What We Build
        </p>
        <h2
          id="services-heading"
          className="text-[2rem] font-semibold tracking-[-0.04em] text-ink min-[390px]:text-[2.2rem]"
          style={{ textWrap: "balance" }}
        >
          Everything your enterprise needs.
        </h2>
      </div>

      <Link
        href={currentService.href}
        className="mt-8 block py-5 transition-colors duration-200 hover:bg-black/[0.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 min-[390px]:py-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-end gap-4 px-1">
          <p className="text-[0.82rem] font-medium tabular-nums tracking-[0.08em] text-neutral-500">
            {(displayIndex + 1).toString().padStart(2, "0")} / {totalServices.toString().padStart(2, "0")}
          </p>
        </div>

        <div className="-mt-1 min-h-[13.5rem] min-[390px]:min-h-[14.5rem]">
          <div
            className={cn(
              "flex flex-col items-center text-center transition-[opacity,transform] duration-500 ease-out",
              prefersReducedMotion
                ? "opacity-100"
                : isTransitioning
                  ? "translate-y-1 opacity-0"
                  : "translate-y-0 opacity-100"
            )}
            aria-live="polite"
          >
            <div className="relative -mt-3 grid h-24 w-24 place-items-center text-ink min-[390px]:-mt-4 min-[390px]:h-28 min-[390px]:w-28">
              <CurrentIcon
                size={56}
                strokeWidth={1.8}
                className={cn(
                  "absolute transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  prefersReducedMotion
                    ? "opacity-100"
                    : isTransitioning
                      ? "opacity-0 -translate-y-2 scale-[0.85] rotate-[2deg]"
                      : isIconEntering
                        ? "opacity-0 translate-y-2.5 scale-[0.8] -rotate-[4deg]"
                        : "opacity-100 translate-y-0 scale-100 rotate-0"
                )}
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-3 text-[1.38rem] font-semibold tracking-[-0.035em] text-ink min-[390px]:text-[1.56rem]">
              {currentService.title}
            </h3>

            <p className="mt-3 max-w-[31ch] text-[0.95rem] leading-7 text-body min-[390px]:text-[0.98rem]">
              {currentService.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2.5 min-[390px]:mt-6">
          {services.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => handleProgressSelect(index)}
              onTouchStart={(event) => event.stopPropagation()}
              aria-label={`Show ${service.title}`}
              aria-pressed={index === displayIndex}
              className="flex min-h-[32px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <span
                className={cn(
                  "block h-1 rounded-full bg-neutral-300 transition-all duration-300 ease-out",
                  index === displayIndex ? "w-8 bg-neutral-900" : "w-3"
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </Link>
    </div>
  );
}
