import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world results from Zabnix's software, AI, and ERP implementations across healthcare, retail, and manufacturing.",
};

import { caseStudies } from "@/lib/data";

const iconMap = {
  Clock: Clock,
  TrendingUp: TrendingUp,
  Users: Users,
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-blue"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Our Work
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Real outcomes for real businesses
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            From hospital scheduling to ERP migrations — here&#39;s how we&#39;ve
            helped enterprises transform their operations.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-16 px-6 border-t border-white/8" aria-labelledby="casestudies-list-heading">
        <h2 id="casestudies-list-heading" className="sr-only">
          Case Studies
        </h2>
        <div className="max-w-5xl mx-auto space-y-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.slug}
              className={`border ${cs.border} bg-gradient-to-br ${cs.gradient} rounded-2xl overflow-hidden`}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    {cs.industry}
                  </span>
                  <span className="text-gray-700">·</span>
                  <span className="text-xs text-gray-600">{cs.company}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight" style={{ textWrap: "balance" }}>
                  {cs.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
                      The Problem
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
                      Our Solution
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/8 mb-6">
                  {cs.results.map((result) => {
                    const Icon = iconMap[result.iconName] || Clock;
                    return (
                      <div key={result.label} className="text-center">
                        <Icon
                          size={16}
                          className="text-gray-600 mx-auto mb-2"
                          aria-hidden="true"
                        />
                        <div
                          className="text-2xl font-bold text-white"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {result.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {result.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/10 bg-white/5 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  Read Full Case Study
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to write your own success story?
          </h2>
          <p className="text-gray-400 mb-8">
            Tell us what you&#39;re building and we&#39;ll help you get there.
          </p>
          <Link
            href="/contact#consultation"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            Start a Project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
