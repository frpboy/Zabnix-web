"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Cloud,
  Code2,
  Database,
  GitBranch,
  LayoutGrid,
  LineChart,
  MousePointer2,
  PenTool,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { cn } from "@/lib/utils";

type ServiceCard = {
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  features: Array<{
    title: string;
    desc: string;
    icon: LucideIcon;
  }>;
};

const AUTO_CYCLE_MS = 6000;
const INTERACTION_PAUSE_MS = 2600;

const serviceCards: ServiceCard[] = [
  {
    id: "software",
    title: "Web Development",
    shortTitle: "Web",
    desc: "Fast, secure and scalable web applications built with modern technologies.",
    href: "#software",
    icon: Code2,
    features: [
      { title: "Modern Tech Stack", desc: "React, Next.js, Node.js and more.", icon: Code2 },
      { title: "Secure & Scalable", desc: "Built with performance and security in mind.", icon: Shield },
      { title: "High Performance", desc: "Optimized for speed and user experience.", icon: Sparkles },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    shortTitle: "Mobile",
    desc: "Native & cross-platform mobile apps built with Flutter that deliver exceptional user experiences.",
    href: "#mobile",
    icon: Smartphone,
    features: [
      { title: "Cross-Platform", desc: "Flutter and React Native expertise.", icon: Smartphone },
      { title: "Native Experience", desc: "Smooth, responsive interactions.", icon: MousePointer2 },
      { title: "App Performance", desc: "Optimized for real devices.", icon: Sparkles },
    ],
  },
  {
    id: "erp",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    desc: "Cloud architecture, deployment automation and infrastructure that scales with you.",
    href: "#erp",
    icon: Cloud,
    features: [
      { title: "Cloud Infrastructure", desc: "Secure, reliable and highly available.", icon: Cloud },
      { title: "CI/CD Automation", desc: "Faster releases with smarter pipelines.", icon: GitBranch },
      { title: "Scalable Deployment", desc: "Built to scale with business growth.", icon: Server },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    shortTitle: "AI",
    desc: "Intelligent solutions, LLM integrations and workflows that automate processes.",
    href: "#ai",
    icon: Sparkles,
    features: [
      { title: "AI Solutions", desc: "Custom models for real business problems.", icon: Sparkles },
      { title: "Smart Automation", desc: "Automate repetitive tasks with precision.", icon: LayoutGrid },
      { title: "Intelligent Workflows", desc: "Connect systems and make them smarter.", icon: GitBranch },
    ],
  },
  {
    id: "consulting",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    desc: "Beautiful, intuitive and conversion-focused designs for web and mobile.",
    href: "#consulting",
    icon: PenTool,
    features: [
      { title: "User-Centered", desc: "Designed with empathy and research.", icon: MousePointer2 },
      { title: "Modern Interfaces", desc: "Clean, intuitive and engaging design.", icon: LayoutGrid },
      { title: "Design Systems", desc: "Consistent, scalable and efficient.", icon: PenTool },
    ],
  },
  {
    id: "security",
    title: "Data & Analytics",
    shortTitle: "Data",
    desc: "Turn data into insights to make smarter decisions and drive business growth.",
    href: "#security",
    icon: BarChart3,
    features: [
      { title: "Data Intelligence", desc: "Collect, process and analyze with accuracy.", icon: Database },
      { title: "Business Insights", desc: "Actionable insights that drive growth.", icon: LineChart },
      { title: "Real-Time Analytics", desc: "Live dashboards for smarter decisions.", icon: BarChart3 },
    ],
  },
];

function useSectionVisibility(sectionRef: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionRef]);

  return isVisible;
}

function ServiceVisual({ service, activeIndex }: { service: ServiceCard; activeIndex: number }) {
  if (service.id === "mobile") return <MobileAppVisual activeIndex={activeIndex} />;
  if (service.id === "erp") return <CloudDevopsVisual activeIndex={activeIndex} />;
  if (service.id === "ai") return <AutomationVisual activeIndex={activeIndex} />;
  if (service.id === "consulting") return <DesignVisual activeIndex={activeIndex} />;
  if (service.id === "security") return <AnalyticsVisual activeIndex={activeIndex} />;
  return <WebDashboardVisual activeIndex={activeIndex} />;
}

function BrowserFrame({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={cn("h-full w-full overflow-hidden rounded-2xl border shadow-[0_14px_30px_rgba(15,23,42,0.08)]", dark ? "border-white/10 bg-[#111]" : "border-neutral-200 bg-white")}>
      <div className={cn("flex h-7 items-center gap-1.5 border-b px-3", dark ? "border-white/10" : "border-neutral-100")}>
        <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-white/30" : "bg-neutral-300")} />
        <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-white/20" : "bg-neutral-200")} />
        <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-white/20" : "bg-neutral-200")} />
      </div>
      {children}
    </div>
  );
}

function WebDashboardVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-7 -right-9 left-3">
      <BrowserFrame>
        <div className="grid h-[calc(100%-1.75rem)] grid-cols-[44px_1fr]">
          <aside className="bg-black p-2 text-white">
            <p className="mb-4 text-[8px] font-black">ZABNIX</p>
            {["Dash", "Users", "API", "Logs"].map((item, index) => (
              <span key={item} className={cn("mb-2 block rounded-md px-1.5 py-1 text-[7px]", index === activeIndex % 4 ? "bg-white/20" : "bg-white/5")}>{item}</span>
            ))}
          </aside>
          <div className="p-3">
            <p className="text-[9px] font-bold text-neutral-900">Overview</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {["24.8K", "98%", "12ms", "4.9"].map((item) => (
                <div key={item} className="rounded-lg border border-neutral-100 p-2">
                  <p className="text-[7px] text-neutral-500">Metric</p>
                  <p className="mt-1 text-[12px] font-black text-neutral-900">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 h-20 rounded-xl border border-neutral-100 p-2">
              <svg viewBox="0 0 160 62" className="h-full w-full" aria-hidden="true">
                <path d="M4 46 C26 12 41 49 60 29 S91 8 109 33 S137 55 156 20" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function MobileAppVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-4 inset-x-3 grid place-items-center">
      <div className="h-[88%] w-[clamp(6.3rem,54vw,8.2rem)] max-w-[86%] rounded-[1.65rem] border-[4px] border-black bg-white p-2.5 shadow-[0_16px_28px_rgba(0,0,0,0.16)]">
        <div className="mx-auto mb-4 h-2.5 w-10 rounded-full bg-black" />
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-bold text-neutral-900">Hi, Alex</p>
          <span className="h-3 w-3 rounded-full border border-neutral-500" aria-hidden="true" />
        </div>
        <div className="mt-4 rounded-xl border border-neutral-100 bg-white p-2.5 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
          <p className="text-[8px] text-neutral-500">Total Users</p>
          <p className="mt-1 text-[15px] font-black">{activeIndex + 12}.6K</p>
          <span className="mt-1 inline-flex rounded-full bg-neutral-100 px-1.5 py-0.5 text-[7px] font-bold text-neutral-800">+ 12.5%</span>
          <div className="mt-3 h-14">
            <svg viewBox="0 0 110 54" className="h-full w-full" aria-hidden="true">
              <path d="M4 42 C18 26 26 35 38 22 S58 39 72 20 S93 25 106 8" fill="none" stroke="#111" strokeWidth="3.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {["New Sign Up", "Subscription"].map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-lg bg-neutral-50 px-2 py-1.5">
              <span>
                <span className="block text-[7.5px] font-bold text-neutral-900">{item}</span>
                <span className="block text-[6.5px] text-neutral-500">{["2m ago", "15m ago"][index]}</span>
              </span>
              <span className="text-[10px] text-neutral-500" aria-hidden="true">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudDevopsVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-7 -right-7 left-4">
      <BrowserFrame dark>
        <div className="p-4 text-white">
          <p className="text-[9px] font-bold">Infrastructure</p>
          <div className="relative mt-5 grid grid-cols-3 gap-3">
            {[Server, Cloud, Shield, Database, GitBranch, Server].map((Icon, index) => (
              <div key={index} className={cn("grid h-10 place-items-center rounded-xl border", index === activeIndex % 6 ? "border-white bg-white text-black" : "border-white/10 bg-white/8 text-white")}>
                <Icon size={14} aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {["Production", "Staging", "Reserve"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-white/8 px-2 py-2 text-[8px]">
                <span>{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function AutomationVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-6 right-2 left-8 rounded-[1.4rem] border-[4px] border-black bg-[#111] p-4 text-white shadow-[0_14px_28px_rgba(0,0,0,0.16)]">
      <p className="text-[9px] font-bold">AI Workflow</p>
      <div className="mt-4 space-y-2">
        {["Data Input", "AI Agent", "Decision", "Automation", "Result"].map((item, index) => (
          <div key={item} className={cn("rounded-xl border px-3 py-2 text-[8px]", index === activeIndex % 5 ? "border-white/50 bg-white/14" : "border-white/10 bg-white/5")}>
            <p className="font-bold">{item}</p>
            <p className="mt-0.5 text-white/55">Analyze / Predict</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-7 -right-8 left-3 flex items-center">
      <BrowserFrame>
        <div className="grid h-[calc(100%-1.75rem)] grid-cols-[1fr_66px] gap-3 p-3">
          <div>
            <p className="text-[9px] font-bold text-neutral-900">Design System</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} className={cn("h-8 rounded-lg border", index === activeIndex ? "border-black bg-black" : "border-neutral-200 bg-neutral-50")} />
              ))}
            </div>
          </div>
          <div className="rounded-[1.2rem] border-[3px] border-black bg-white p-2">
            <div className="h-10 rounded-xl bg-neutral-100" />
            <p className="mt-3 text-[7px] font-bold">Discover</p>
            <span className="mt-8 block h-5 rounded-full bg-black" />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function AnalyticsVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-y-7 -right-7 left-4">
      <BrowserFrame dark>
        <div className="p-4 text-white">
          <p className="text-[9px] font-bold">Analytics Overview</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["$32.4K", "3.62%", "18K", "91%"].map((item) => (
              <div key={item} className="rounded-xl bg-white/8 p-2">
                <p className="text-[7px] text-white/50">Metric</p>
                <p className="mt-1 text-[12px] font-black">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-20 rounded-xl bg-white/5 p-2">
            <svg viewBox="0 0 160 62" className="h-full w-full" aria-hidden="true">
              <path d="M4 50 C23 28 34 40 48 26 S73 40 88 18 S112 25 126 12 S144 37 156 8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

export function MobileServicesInteractiveShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const isVisible = useSectionVisibility(sectionRef);
  const activeService = serviceCards[activeIndex];

  useEffect(() => {
    if (reduceMotion || !isVisible) return;

    const wait = Math.max(AUTO_CYCLE_MS, pausedUntil - Date.now());
    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % serviceCards.length);
    }, wait);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isVisible, pausedUntil, reduceMotion]);

  useEffect(() => {
    const activeButton = selectorRef.current?.querySelector<HTMLButtonElement>(`[data-service-index="${activeIndex}"]`);
    activeButton?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [activeIndex, reduceMotion]);

  const selectService = (index: number) => {
    setPausedUntil(Date.now() + INTERACTION_PAUSE_MS);
    setActiveIndex(index);
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

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    selectService((activeIndex + (deltaX < 0 ? 1 : -1) + serviceCards.length) % serviceCards.length);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-2" aria-labelledby="mobile-services-heading">
      <div className="relative z-10">
        <span className="mb-3 inline-block rounded-full border border-slate-200 bg-[#f1f5f9] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-slate-800">
          WHAT WE DO
        </span>
        <h2 id="mobile-services-heading" className="max-w-[11ch] text-[1.9rem] font-extrabold leading-[1.02] tracking-tight text-slate-950 min-[390px]:text-[2.08rem]" style={{ textWrap: "balance" }}>
          End-to-end digital services
        </h2>
        <p className="mt-3 max-w-[29ch] text-[0.72rem] leading-relaxed text-slate-600 min-[390px]:text-[0.76rem]">
          We design, build and scale digital products that drive growth and long-term value.
        </p>
      </div>

      <article
        className="relative z-10 mt-5 grid h-[24.25rem] overflow-hidden rounded-[1.35rem] border border-neutral-200 bg-white shadow-[0_16px_34px_rgba(15,23,42,0.08)] min-[390px]:h-[25rem]"
        style={{ gridTemplateColumns: "34% 66%" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative z-20 overflow-hidden bg-[#050709] px-2.5 py-4 text-white min-[390px]:px-3">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeService.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, ease: "easeInOut" }}
              className="flex h-full flex-col"
              aria-live="polite"
            >
              <p className="font-mono text-[0.58rem] font-bold tracking-[0.16em] text-white/75">
                {(activeIndex + 1).toString().padStart(2, "0")} / {serviceCards.length.toString().padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[0.98rem] font-black leading-[1.08] tracking-tight min-[390px]:text-[1.12rem]">
                {activeService.title}
              </h3>
              <p className="mt-3 text-[0.58rem] font-medium leading-[1.5] text-white/82 min-[390px]:text-[0.62rem]">
                {activeService.desc}
              </p>

              <div className="mt-4 space-y-2.5">
                {activeService.features.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={feature.title} className="flex min-w-0 items-start gap-2">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                        <FeatureIcon size={12} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.56rem] font-bold leading-tight min-[390px]:text-[0.6rem]">{feature.title}</span>
                        <span className="mt-0.5 block text-[0.49rem] leading-[1.32] text-white/62 min-[390px]:text-[0.53rem]">{feature.desc}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <Link
                href={activeService.href}
                className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full text-[0.58rem] font-bold text-white transition-[opacity,transform] duration-300 hover:translate-x-0.5 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black min-[390px]:text-[0.62rem]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-lg bg-white text-black min-[390px]:h-7 min-[390px]:w-7">
                  <ArrowUpRight size={12} aria-hidden="true" />
                </span>
                <span>Learn more</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_68%_15%,rgba(0,0,0,0.08),transparent_2px),radial-gradient(circle_at_82%_25%,rgba(0,0,0,0.08),transparent_2px)] bg-[length:18px_18px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeService.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985, x: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.85, ease: "easeInOut" }}
              className="absolute inset-0"
              aria-hidden="true"
            >
              <ServiceVisual service={activeService} activeIndex={activeIndex} />
            </motion.div>
          </AnimatePresence>
        </div>
      </article>

      <div
        ref={selectorRef}
        className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Select a service"
      >
        {serviceCards.map((service, index) => {
          const SelectorIcon = service.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={service.id}
              type="button"
              data-service-index={index}
              onClick={() => selectService(index)}
              aria-label={`Show ${service.title}`}
              aria-pressed={isActive}
              className={cn(
                "relative flex h-[5.35rem] w-[4.3rem] shrink-0 flex-col items-center justify-center rounded-xl border px-2 text-center transition-[background-color,border-color,color,transform,box-shadow] duration-700 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
                isActive
                  ? "border-black bg-black text-white shadow-[0_12px_22px_rgba(0,0,0,0.2)]"
                  : "border-neutral-200 bg-white text-black shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
              )}
            >
              <span className="font-mono text-[0.52rem] font-bold">{(index + 1).toString().padStart(2, "0")}</span>
              <SelectorIcon size={18} strokeWidth={1.9} className="mt-1.5" aria-hidden="true" />
              <span className="mt-1.5 text-[0.54rem] font-black leading-[1.1]">{service.shortTitle}</span>
            </button>
          );
        })}
      </div>

    </section>
  );
}
