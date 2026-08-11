"use client";

import { useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Building2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  mobileLabel: string;
  Icon: typeof BriefcaseBusiness;
};

const stats: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Successful Projects",
    mobileLabel: "Projects",
    Icon: BriefcaseBusiness,
  },
  {
    value: 20,
    suffix: "+",
    label: "Business Partners",
    mobileLabel: "Partners",
    Icon: Building2,
  },
  {
    value: 5,
    suffix: "+",
    label: "Years of Innovation",
    mobileLabel: "Years",
    Icon: Sparkles,
  },
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function AnimatedNumber({
  target,
  suffix,
  isVisible,
  prefersReducedMotion,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!isVisible) return;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const duration = 1800;
    const startTime = performance.now();

    let frameId = 0;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(target * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, prefersReducedMotion, target]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

function StatCard({
  stat,
  isVisible,
  prefersReducedMotion,
  index,
}: {
  stat: StatItem;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  index: number;
}) {
  const Icon = stat.Icon;

  return (
    <div
      className={cn(
        "group text-center transition-all duration-250 hover:-translate-y-1",
        "hover:shadow-level-2 rounded-xl",
        prefersReducedMotion
          ? "opacity-100 translate-y-0"
          : isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
      )}
      style={
        prefersReducedMotion
          ? undefined
          : {
              transitionProperty: "opacity, transform, box-shadow",
              transitionDelay: `${index * 120}ms`,
            }
      }
    >
        <div className="flex justify-center mb-4">
        <div className="flex h-7 w-7 items-center justify-center">
          <Icon
            size={22}
            className="text-mute transition-all duration-250 group-hover:text-body"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-semibold text-ink font-variant-numeric tabular-nums tracking-tight">
        <AnimatedNumber
          target={stat.value}
          suffix={stat.suffix}
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      <div className="text-xs text-mute mt-1 font-mono uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setHasMounted(true);

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-canvas-soft border-t border-b border-hairline"
      aria-label="Company statistics"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="mx-auto grid max-w-lg grid-cols-3 divide-x divide-neutral-200 md:hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 px-2 text-center first:pl-0 last:pr-0"
              aria-label={stat.label}
            >
              <div className="text-[1.7rem] font-semibold tracking-[-0.04em] text-ink font-variant-numeric tabular-nums min-[390px]:text-[1.85rem]">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={!hasMounted || isVisible}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
              <div className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-neutral-500 min-[390px]:text-[0.72rem]">
                {stat.mobileLabel}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 md:grid max-w-lg mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isVisible={!hasMounted || isVisible}
              prefersReducedMotion={prefersReducedMotion}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
