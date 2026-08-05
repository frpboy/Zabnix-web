"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  initialValue?: number;
  start: boolean;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  decimals = 0,
  initialValue = 0,
  start,
}: AnimatedCounterProps) {
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : initialValue);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!start || hasStarted.current) return;

    hasStarted.current = true;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(initialValue + (value - initialValue) * eased);

      if (progress < 1) frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, initialValue, reduceMotion, start, value]);

  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return <>{prefix}{formatted}{suffix}</>;
}
