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
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-500/20",
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
    gradient: "from-violet-600/20 to-purple-600/20",
    border: "border-violet-500/20",
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
    gradient: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/20",
    href: "/case-studies/manufacturing-erp",
  },
];

export function CaseStudies() {
  return (
    <section
      className="py-32 px-6 border-t border-white/8"
      aria-labelledby="casestudies-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
              Results That Speak
            </p>
            <h2
              id="casestudies-heading"
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Real outcomes for real businesses
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 shrink-0"
          >
            View all case studies
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudies.map((cs) => (
            <Link
              key={cs.title}
              href={cs.href}
              className={`group relative rounded-2xl border ${cs.border} bg-gradient-to-br ${cs.gradient} p-6 flex flex-col gap-6 no-underline hover:border-opacity-40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    {cs.industry}
                  </span>
                  <span className="text-xs text-gray-600 border border-white/8 rounded-full px-2 py-0.5">
                    {cs.tag}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug mb-3">
                  {cs.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {cs.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/8">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div
                      className="text-lg font-bold text-white"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-xs text-gray-600 group-hover:text-white transition-colors duration-200">
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
