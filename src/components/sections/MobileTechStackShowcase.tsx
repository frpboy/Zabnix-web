"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MOBILE_TECH_CYCLE_MS = 2800;
const MOBILE_TECH_TRANSITION_MS = 500;

type TechItem = {
  name: string;
  category: string;
};

type MobileTechStackShowcaseProps = {
  techItems: readonly TechItem[];
};

export function MobileTechStackShowcase({
  techItems,
}: MobileTechStackShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const items = useMemo(() => techItems, [techItems]);
  const activeTech = items[activeIndex] ?? items[0];

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
      { threshold: 0.35 }
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

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, MOBILE_TECH_CYCLE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isDocumentVisible, isInteracting, isVisible, items.length, prefersReducedMotion]);

  const handleAdvance = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div
      ref={sectionRef}
      className="md:hidden"
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerCancel={() => setIsInteracting(false)}
      onPointerLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
    >
      <div className="mx-auto max-w-[28rem] px-4 min-[390px]:px-6">
        <div className="rounded-[28px] border border-[#e9e9e9] bg-white px-4 py-5 shadow-[0_12px_28px_rgba(15,23,42,0.035)] min-[390px]:px-5">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-mute">
            Active Technology
          </p>
          <button
            type="button"
            onClick={handleAdvance}
            className="mt-3 w-full rounded-[22px] border bg-[#fbfbfb] px-4 py-4 text-left touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            style={{
              borderColor: prefersReducedMotion ? "#e6e6e6" : "#171717",
              transition: prefersReducedMotion
                ? undefined
                : `transform ${MOBILE_TECH_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), border-color ${MOBILE_TECH_TRANSITION_MS}ms ease, background-color ${MOBILE_TECH_TRANSITION_MS}ms ease, box-shadow ${MOBILE_TECH_TRANSITION_MS}ms ease`,
              transform: prefersReducedMotion ? "none" : "scale(1.01)",
              boxShadow: prefersReducedMotion
                ? "none"
                : "0 12px 24px rgba(15, 23, 42, 0.05)",
            }}
          >
            <p className="text-[0.72rem] font-mono uppercase tracking-[0.18em] text-[#777]">
              {activeTech.category}
            </p>
            <h3
              className="mt-2 text-[1.65rem] font-semibold tracking-[-0.045em] text-ink"
              style={{
                transition: prefersReducedMotion
                  ? undefined
                  : `transform ${MOBILE_TECH_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${MOBILE_TECH_TRANSITION_MS}ms ease`,
              }}
            >
              {activeTech.name}
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
}
