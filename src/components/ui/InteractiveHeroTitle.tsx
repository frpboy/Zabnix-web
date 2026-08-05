"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type InteractiveHeroTitleProps = {
  title: string;
  highlightText: string;
  className?: string;
};

type MotionState = {
  beamX: number;
  beamY: number;
  beamOpacity: number;
  refractX: number;
  refractY: number;
  refractOpacity: number;
  saturate: number;
  brightness: number;
  contrast: number;
};

const DEFAULT_MOTION: MotionState = {
  beamX: 50,
  beamY: 50,
  beamOpacity: 0,
  refractX: 0,
  refractY: 0,
  refractOpacity: 0,
  saturate: 1,
  brightness: 1,
  contrast: 1,
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

export default function InteractiveHeroTitle({
  title,
  highlightText,
  className,
}: InteractiveHeroTitleProps) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentRef = useRef<MotionState>(DEFAULT_MOTION);
  const targetRef = useRef<MotionState>(DEFAULT_MOTION);
  const hoveredRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const applyMotion = (motion: MotionState) => {
      element.style.setProperty("--hero-beam-x", `${motion.beamX.toFixed(2)}%`);
      element.style.setProperty("--hero-beam-y", `${motion.beamY.toFixed(2)}%`);
      element.style.setProperty("--hero-beam-opacity", `${motion.beamOpacity.toFixed(3)}`);
      element.style.setProperty("--hero-refract-x", `${motion.refractX.toFixed(2)}px`);
      element.style.setProperty("--hero-refract-y", `${motion.refractY.toFixed(2)}px`);
      element.style.setProperty("--hero-refract-opacity", `${motion.refractOpacity.toFixed(3)}`);
      element.style.setProperty("--hero-saturate", `${motion.saturate.toFixed(3)}`);
      element.style.setProperty("--hero-brightness", `${motion.brightness.toFixed(3)}`);
      element.style.setProperty("--hero-contrast", `${motion.contrast.toFixed(3)}`);
    };

    applyMotion(DEFAULT_MOTION);

    if (prefersReducedMotion) {
      return;
    }

    const isTrackingAllowed = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 1024;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      const next: MotionState = {
        beamX: lerp(current.beamX, target.beamX, 0.14),
        beamY: lerp(current.beamY, target.beamY, 0.14),
        beamOpacity: lerp(current.beamOpacity, target.beamOpacity, 0.1),
        refractX: lerp(current.refractX, target.refractX, 0.08),
        refractY: lerp(current.refractY, target.refractY, 0.08),
        refractOpacity: lerp(
          current.refractOpacity,
          target.refractOpacity,
          0.1
        ),
        saturate: lerp(current.saturate, target.saturate, 0.08),
        brightness: lerp(current.brightness, target.brightness, 0.08),
        contrast: lerp(current.contrast, target.contrast, 0.08),
      };

      currentRef.current = next;
      applyMotion(next);

      const isSettled =
        Math.abs(next.beamX - target.beamX) < 0.05 &&
        Math.abs(next.beamY - target.beamY) < 0.05 &&
        Math.abs(next.beamOpacity - target.beamOpacity) < 0.01 &&
        Math.abs(next.refractX - target.refractX) < 0.01 &&
        Math.abs(next.refractY - target.refractY) < 0.01 &&
        Math.abs(next.refractOpacity - target.refractOpacity) < 0.01 &&
        Math.abs(next.saturate - target.saturate) < 0.001 &&
        Math.abs(next.brightness - target.brightness) < 0.001 &&
        Math.abs(next.contrast - target.contrast) < 0.001;

      if (!isSettled || hoveredRef.current) {
        frameRef.current = window.requestAnimationFrame(animate);
      } else {
        frameRef.current = null;
      }
    };

    const ensureAnimation = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const resetMotion = () => {
      hoveredRef.current = false;
      targetRef.current = { ...DEFAULT_MOTION };
      ensureAnimation();
    };

    const handlePointerEnter = () => {
      if (!isTrackingAllowed()) return;

      hoveredRef.current = true;
      targetRef.current = {
        ...targetRef.current,
        beamOpacity: 0.06,
        refractOpacity: 0.03,
        saturate: 1.018,
        brightness: 1.012,
        contrast: 1.01,
      };
      ensureAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isTrackingAllowed()) return;

      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const normalizedX = (x - 0.5) * 2;
      const normalizedY = (y - 0.5) * 2;
      const effectScale = window.innerWidth < 1280 ? 0.72 : 1;

      hoveredRef.current = true;
      targetRef.current = {
        beamX: x * 100,
        beamY: y * 100,
        beamOpacity: 0.085,
        refractX: normalizedX * 0.85 * effectScale,
        refractY: normalizedY * 0.35 * effectScale,
        refractOpacity: 0.05,
        saturate: 1.04,
        brightness: 1.03,
        contrast: 1.02,
      };
      ensureAnimation();
    };

    const handlePointerLeave = () => {
      resetMotion();
    };

    element.addEventListener("pointerenter", handlePointerEnter);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointerenter", handlePointerEnter);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const style = {
    "--hero-beam-x": "50%",
    "--hero-beam-y": "50%",
    "--hero-beam-opacity": "0",
    "--hero-refract-x": "0px",
    "--hero-refract-y": "0px",
    "--hero-refract-opacity": "0",
    "--hero-saturate": "1",
    "--hero-brightness": "1",
    "--hero-contrast": "1",
  } as CSSProperties;

  return (
    <h1
      className={cn(
        "mb-6 text-5xl font-semibold leading-none tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl lg:text-8xl",
        className
      )}
      style={{ textWrap: "balance" }}
    >
      <span className="block">{title}</span>
      <span
        ref={wrapperRef}
        className={cn(
          "interactive-hero-title interactive-hero-title-reveal interactive-hero-line-highlight mt-0 block bg-clip-text text-transparent",
          prefersReducedMotion && "opacity-100 transition-opacity duration-300 hover:opacity-90"
        )}
        style={style}
        translate="no"
      >
        <span className="interactive-hero-highlight-fill">{highlightText}</span>
        <span className="interactive-hero-highlight-beam" aria-hidden="true">
          {highlightText}
        </span>
        <span
          className="interactive-hero-highlight-refract interactive-hero-highlight-refract-blue"
          aria-hidden="true"
        >
          {highlightText}
        </span>
        <span
          className="interactive-hero-highlight-refract interactive-hero-highlight-refract-pink"
          aria-hidden="true"
        >
          {highlightText}
        </span>
      </span>
    </h1>
  );
}
