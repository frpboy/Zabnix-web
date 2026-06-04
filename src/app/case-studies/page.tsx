import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world results from Zabnix's software, AI, and ERP implementations across healthcare, retail, and manufacturing.",
};

const iconMap = {
  Clock: Clock,
  TrendingUp: TrendingUp,
  Users: Users,
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className="orb orb-blue pulse-glow"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            Our Work
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Real outcomes for real businesses.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
            From hospital scheduling to ERP migrations — here&#39;s how we&#39;ve
            helped enterprises transform their operations.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="casestudies-list-heading">
        <h2 id="casestudies-list-heading" className="sr-only">
          Case Studies
        </h2>
        <div className="max-w-5xl mx-auto space-y-8">
          {caseStudies.map((cs) => (
            <article
              key={cs.slug}
              className="border border-hairline bg-canvas rounded-2xl overflow-hidden shadow-level-3 hover:border-hairline-strong hover:shadow-level-4 transition-all duration-300"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono font-semibold tracking-widest text-mute uppercase">
                    {cs.industry}
                  </span>
                  <span className="text-hairline-strong">·</span>
                  <span className="text-xs text-mute font-mono">{cs.company}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-6 leading-tight" style={{ textWrap: "balance" }}>
                  {cs.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-[10px] font-mono font-semibold text-mute uppercase tracking-widest mb-3">
                      The Problem
                    </h3>
                    <p className="text-sm text-body leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-mono font-semibold text-mute uppercase tracking-widest mb-3">
                      Our Solution
                    </h3>
                    <p className="text-sm text-body leading-relaxed">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-hairline mb-8">
                  {cs.results.map((result) => {
                    const Icon = iconMap[result.iconName] || Clock;
                    return (
                      <div key={result.label} className="text-center">
                        <Icon
                          size={16}
                          className="text-mute mx-auto mb-2"
                          aria-hidden="true"
                        />
                        <div
                          className="text-2xl font-bold text-ink font-variant-numeric tabular-nums"
                        >
                          {result.value}
                        </div>
                        <div className="text-[10px] text-mute mt-1 uppercase tracking-wider font-mono">
                          {result.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink border border-hairline bg-canvas px-5 py-2.5 rounded-full hover:bg-canvas-soft transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
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
      <section className="py-24 px-6 border-t border-hairline text-center bg-canvas">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-ink mb-4 tracking-tight">
            Ready to write your own success story?
          </h2>
          <p className="text-body mb-8">
            Tell us what you&#39;re building and we&#39;ll help you get there.
          </p>
          <Link
            href="/contact#consultation"
            className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Start a Project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
