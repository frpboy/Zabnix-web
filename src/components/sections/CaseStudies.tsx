import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MobileCaseStudiesShowcase } from "@/components/sections/MobileCaseStudiesShowcase";

const caseStudies = [
  {
    industry: "Healthcare",
    title: "Reduced patient wait time by 60% with intelligent scheduling",
    description:
      "Deployed a custom patient management system with AI-driven appointment optimization across 8 hospital branches, processing 3,000+ appointments per day.",
    metrics: [
      { label: "Wait time reduction", value: "60%" },
      { label: "Daily appointments", value: "3K+" },
      { label: "Branches integrated", value: "8" },
    ],
    tag: "Case Study",
    href: "/case-studies/hospital-network",
  },
  {
    industry: "Retail",
    title: "Automated inventory replenishment saving ₹2Cr per year",
    description:
      "Built a predictive inventory system integrated with 5 supplier APIs, reducing stockouts by 85% and eliminating manual reorder processes entirely.",
    metrics: [
      { label: "Annual savings", value: "₹2Cr" },
      { label: "Stockout reduction", value: "85%" },
      { label: "Supplier integrations", value: "5" },
    ],
    tag: "Case Study",
    href: "/case-studies/retail-inventory",
  },
  {
    industry: "Manufacturing",
    title: "ERP rollout across 3 plants in under 90 days",
    description:
      "Migrated a legacy manufacturing firm from spreadsheet-driven operations to ZerpAI ERP, with full data migration, staff training, and go-live support.",
    metrics: [
      { label: "Rollout time", value: "90 days" },
      { label: "Plants onboarded", value: "3" },
      { label: "Data records migrated", value: "1M+" },
    ],
    tag: "Case Study",
    href: "/case-studies/manufacturing-erp",
  },
];

export function CaseStudies() {
  return (
    <section
      className="border-t border-hairline bg-canvas px-6 pb-9 pt-14 md:py-32"
      aria-labelledby="casestudies-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-mute">
              Results That Speak
            </p>
            <h2
              id="casestudies-heading"
              className="text-[2.85rem] font-semibold tracking-[-0.05em] text-ink min-[390px]:text-[3.1rem] md:text-5xl"
              style={{ textWrap: "balance" }}
            >
              Real outcomes for real businesses.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="group relative hidden h-11 w-[15.5rem] shrink-0 items-center justify-start overflow-hidden rounded-full bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link md:inline-flex"
          >
            <span className="absolute left-2 top-1/2 block h-9 w-9 -translate-y-1/2 rounded-full bg-[#1f1f1f] transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-[calc(100%-0.5rem)]" />
            <span className="absolute left-[1.15rem] top-1/2 z-10 block h-[2px] w-[14px] -translate-y-1/2 bg-transparent transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-4 group-hover:bg-white before:absolute before:right-px before:top-[-4px] before:h-[9px] before:w-[9px] before:rotate-45 before:border-r-2 before:border-t-2 before:border-white before:content-['']" />
            <span className="relative z-10 w-full pl-12 pr-4 text-center text-sm font-semibold text-[#1f1f1f] transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white">
              View all case studies
            </span>
          </Link>
        </div>

        <MobileCaseStudiesShowcase caseStudies={caseStudies} />

        <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-3">
          {caseStudies.map((cs) => (
            <Link
              key={cs.title}
              href={cs.href}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[linear-gradient(180deg,#171717_0%,#101010_100%)] p-6 text-white no-underline shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
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
                className="absolute -bottom-10 -right-10 h-28 w-28 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.08))] shadow-[0_12px_26px_rgba(0,0,0,0.28)] transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4"
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/55">
                    {cs.industry}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-white/80">
                    {cs.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-base font-semibold leading-snug text-white">
                  {cs.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/72">
                  {cs.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                {cs.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div
                      className="text-lg font-semibold text-white"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-mono uppercase leading-tight text-white/42">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex items-center gap-1 text-xs text-white/68 transition-colors duration-200 group-hover:text-white">
                <span>Read case study</span>
                <ArrowRight
                  size={12}
                  className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
