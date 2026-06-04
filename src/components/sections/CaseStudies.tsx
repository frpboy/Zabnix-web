import Link from "next/link";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    industry: "Healthcare",
    company: "Regional Hospital Network",
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
    company: "E-Commerce Retailer",
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
    company: "Auto Parts Manufacturer",
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
      className="py-32 px-6 border-t border-hairline bg-canvas"
      aria-labelledby="casestudies-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
              Results That Speak
            </p>
            <h2
              id="casestudies-heading"
              className="text-4xl md:text-5xl font-semibold text-ink tracking-[-0.03em]"
              style={{ textWrap: "balance" }}
            >
              Real outcomes for real businesses.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors duration-200 shrink-0"
          >
            View all case studies
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.title}
              href={cs.href}
              className="group relative rounded-2xl border border-hairline bg-canvas p-6 flex flex-col gap-6 no-underline shadow-level-3 hover:border-hairline-strong hover:shadow-level-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-mute">
                    {cs.industry}
                  </span>
                  <span className="text-xs text-body border border-hairline bg-canvas-soft rounded-full px-2 py-0.5 font-medium">
                    {cs.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-ink leading-snug mb-3">
                  {cs.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {cs.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-hairline mt-auto">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div
                      className="text-lg font-semibold text-ink"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[10px] text-mute mt-0.5 leading-tight font-mono uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-xs text-mute group-hover:text-ink transition-colors duration-200">
                <span>Read case study</span>
                <ArrowRight
                  size={12}
                  className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
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
