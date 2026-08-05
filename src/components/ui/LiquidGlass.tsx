"use client";

import {
  CSSProperties,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export interface LiquidGlassOptions {
  scale?: number;
  chroma?: number;
  border?: number;
  blur?: number;
  mapBlur?: number;
  radius?: number | null;
  saturate?: number;
  fallbackBlur?: number;
}

type LiquidGlassController = {
  destroy: () => void;
  refresh: () => void;
  supported: boolean;
};

type LiquidGlassInitializer = (
  element: HTMLElement,
  options?: LiquidGlassOptions
) => LiquidGlassController;

declare global {
  interface Window {
    liquidGlass?: LiquidGlassInitializer;
  }
}

const DEFAULT_OPTIONS: Required<LiquidGlassOptions> = {
  scale: -180,
  chroma: 6,
  border: 0.08,
  blur: 4,
  mapBlur: 12,
  radius: null,
  saturate: 1.5,
  fallbackBlur: 18,
};

const SCRIPT_WAIT_MS = 4000;
const SCRIPT_POLL_INTERVAL_MS = 50;

export interface LiquidGlassProps
  extends ComponentPropsWithoutRef<"div"> {
  options?: LiquidGlassOptions;
}

function normalizeOptions(options?: LiquidGlassOptions): Required<LiquidGlassOptions> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

function optionsToKey(options: Required<LiquidGlassOptions>) {
  return [
    options.scale,
    options.chroma,
    options.border,
    options.blur,
    options.mapBlur,
    options.radius ?? "null",
    options.saturate,
    options.fallbackBlur,
  ].join("|");
}

const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  function LiquidGlass(
    {
      children,
      className = "",
      options,
      style,
      ...props
    },
    forwardedRef
  ) {
    const elementRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<LiquidGlassController | null>(null);
    const initializingRef = useRef(false);
    const resizeFrameRef = useRef<number | null>(null);
    const pollTimerRef = useRef<number | null>(null);
    const initFrameRef = useRef<number | null>(null);
    const resizeHandlerRef = useRef<(() => void) | null>(null);

    const mergedOptions = useMemo(() => normalizeOptions(options), [options]);
    const optionsKey = useMemo(() => optionsToKey(mergedOptions), [mergedOptions]);

    useImperativeHandle(forwardedRef, () => elementRef.current as HTMLDivElement, []);

    useEffect(() => {
      if (typeof window === "undefined") return;

      const element = elementRef.current;
      if (!element) return;

      let cancelled = false;
      const startedAt = Date.now();

      const clearPendingWork = () => {
        if (initFrameRef.current !== null) {
          window.cancelAnimationFrame(initFrameRef.current);
          initFrameRef.current = null;
        }

        if (pollTimerRef.current !== null) {
          window.clearTimeout(pollTimerRef.current);
          pollTimerRef.current = null;
        }

        if (resizeFrameRef.current !== null) {
          window.cancelAnimationFrame(resizeFrameRef.current);
          resizeFrameRef.current = null;
        }

        if (resizeHandlerRef.current) {
          window.removeEventListener("resize", resizeHandlerRef.current);
          resizeHandlerRef.current = null;
        }
      };

      const destroyInstance = () => {
        if (!instanceRef.current) return;

        try {
          instanceRef.current.destroy();
        } catch {
          // Fail silently so the component never throws during unmount/reinit.
        } finally {
          instanceRef.current = null;
        }
      };

      const attachResizeRefresh = () => {
        if (resizeHandlerRef.current) return;

        const handleResize = () => {
          if (resizeFrameRef.current !== null) {
            window.cancelAnimationFrame(resizeFrameRef.current);
          }

          resizeFrameRef.current = window.requestAnimationFrame(() => {
            try {
              instanceRef.current?.refresh();
            } catch {
              // Ignore refresh failures from unsupported or stale instances.
            }
          });
        };

        resizeHandlerRef.current = handleResize;
        window.addEventListener("resize", handleResize, { passive: true });
      };

      const initialize = () => {
        if (cancelled || !elementRef.current || instanceRef.current || initializingRef.current) {
          return;
        }

        const liquidGlass = window.liquidGlass;

        if (typeof liquidGlass !== "function") {
          if (Date.now() - startedAt >= SCRIPT_WAIT_MS) {
            return;
          }

          pollTimerRef.current = window.setTimeout(initialize, SCRIPT_POLL_INTERVAL_MS);
          return;
        }

        initializingRef.current = true;

        try {
          const controller = liquidGlass(elementRef.current, mergedOptions);
          instanceRef.current = controller;
          attachResizeRefresh();
        } catch {
          instanceRef.current = null;
        } finally {
          initializingRef.current = false;
        }
      };

      clearPendingWork();
      destroyInstance();

      initFrameRef.current = window.requestAnimationFrame(initialize);

      return () => {
        cancelled = true;
        clearPendingWork();
        destroyInstance();
        initializingRef.current = false;
      };
    }, [optionsKey, mergedOptions]);

    return (
      <div
        ref={elementRef}
        className={`liquid-glass ${className}`.trim()}
        style={style as CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default LiquidGlass;
