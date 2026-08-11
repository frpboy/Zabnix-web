"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, PointerEvent, TouchEvent } from "react";

const MOBILE_CASE_STUDY_CYCLE_MS = 4500;
const MOBILE_CASE_STUDY_TRANSITION_MS = 620;

type CaseStudyMetric = {
  label: string;
  value: string;
};

type CaseStudyItem = {
  industry: string;
  title: string;
  description: string;
  metrics: readonly CaseStudyMetric[];
  tag: string;
  href: string;
};

type MobileCaseStudiesShowcaseProps = {
  caseStudies: readonly CaseStudyItem[];
};

export function MobileCaseStudiesShowcase({
  caseStudies,
}: MobileCaseStudiesShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const items = useMemo(() => caseStudies, [caseStudies]);
  const activeStudy = items[activeIndex] ?? items[0];
  const nextStudy = items[(activeIndex + 1) % items.length] ?? items[0];

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      !isVisible ||
      isInteracting ||
      !isDocumentVisible ||
      items.length < 2
    ) {
      return;
    }

    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(true);
      setActiveIndex((current) => (current + 1) % items.length);
    }, MOBILE_CASE_STUDY_CYCLE_MS);

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [activeIndex, isDocumentVisible, isInteracting, isVisible, items.length, prefersReducedMotion]);

  useEffect(() => {
    if (!isTransitioning || prefersReducedMotion) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false);
    }, MOBILE_CASE_STUDY_TRANSITION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isTransitioning, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  const pauseInteraction = () => {
    setIsInteracting(true);
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 2200);
  };

  const jumpTo = (index: number) => {
    pauseInteraction();
    setIsTransitioning(true);
    setActiveIndex(index);
  };

  const goPrevious = () => {
    jumpTo((activeIndex - 1 + items.length) % items.length);
  };

  const goNext = () => {
    jumpTo((activeIndex + 1) % items.length);
  };

  const handleCardPointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
    suppressClickRef.current = false;
    pauseInteraction();
  };

  const handleCardPointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    const start = swipeStartRef.current;

    if (!start) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    swipeStartRef.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) {
      return;
    }

    suppressClickRef.current = true;

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrevious();
  };

  const handleCardPointerCancel = () => {
    swipeStartRef.current = null;
  };

  const handleCardTouchStart = (event: TouchEvent<HTMLAnchorElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
    suppressClickRef.current = false;
    pauseInteraction();
  };

  const handleCardTouchEnd = (event: TouchEvent<HTMLAnchorElement>) => {
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

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    suppressClickRef.current = false;
  };

  return (
    <div
      ref={sectionRef}
      className="md:hidden"
      onFocusCapture={pauseInteraction}
    >
      <div className="relative mt-8 overflow-hidden px-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-6.5rem] top-4 h-[84%] w-[8.25rem] rounded-[28px] border border-[#2b2b2b] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] opacity-95 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        >
          <div className="px-5 py-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/45">
              {nextStudy.industry}
            </p>
            <p className="mt-5 line-clamp-4 text-lg font-semibold leading-snug text-white/88">
              {nextStudy.title}
            </p>
          </div>
        </div>

        <Link
          key={activeStudy.href}
          href={activeStudy.href}
          onPointerDown={handleCardPointerDown}
          onPointerUp={handleCardPointerUp}
          onPointerCancel={handleCardPointerCancel}
          onTouchStart={handleCardTouchStart}
          onTouchEnd={handleCardTouchEnd}
          onClick={handleCardClick}
          className="group relative block min-h-[32rem] overflow-hidden rounded-[28px] border border-[#2a2a2a] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] p-6 text-white no-underline shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
          style={{
            opacity: prefersReducedMotion ? 1 : isTransitioning ? 0.92 : 1,
            transform: prefersReducedMotion
              ? "none"
              : isTransitioning
                ? "translateY(-12px) scale(0.98)"
                : "translateY(0) scale(1)",
            transition: prefersReducedMotion
              ? undefined
              : `opacity ${MOBILE_CASE_STUDY_TRANSITION_MS}ms ease, transform ${MOBILE_CASE_STUDY_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            touchAction: "pan-y",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-white/12"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_45%,rgba(255,255,255,0)_75%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 h-28 w-28 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08))] shadow-[0_12px_26px_rgba(0,0,0,0.28)]"
          />

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/55">
                {activeStudy.industry}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-white/80">
                {activeStudy.tag}
              </span>
            </div>

            <h3 className="text-[2rem] font-semibold leading-[1.12] tracking-[-0.05em] text-white">
              {activeStudy.title}
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/72">
              {activeStudy.description}
            </p>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className={`grid gap-3 ${activeStudy.metrics.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {activeStudy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-w-0 border-l border-white/12 pl-3 first:border-l-0 first:pl-0"
                  >
                    <div
                      className="text-[2.15rem] font-semibold tracking-[-0.05em] text-white"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-2 text-[10px] font-mono uppercase leading-[1.55] text-white/45">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-base font-semibold text-white">
                <span>Read case study</span>
                <ArrowRight size={18} aria-hidden="true" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 px-1">
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous case study"
          className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-[0_8px_20px_rgba(15,23,42,0.05)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>

        <div className="flex flex-1 justify-center gap-3">
          {items.map((study, index) => (
            <button
              key={study.title}
              type="button"
              onClick={() => jumpTo(index)}
              aria-label={`Go to ${study.industry} case study`}
              aria-pressed={index === activeIndex}
              className="h-2.5 rounded-full touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              style={{
                width: index === activeIndex ? "4.5rem" : "2.4rem",
                backgroundColor: index === activeIndex ? "#111111" : "#dddddd",
                transition: prefersReducedMotion
                  ? undefined
                  : `width 320ms ease, background-color 320ms ease`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next case study"
          className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-ink shadow-[0_8px_20px_rgba(15,23,42,0.05)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
