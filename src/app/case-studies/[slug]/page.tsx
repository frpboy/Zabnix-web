import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { getCaseStudy, getCaseStudySlugs } from "@/sanity/lib/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

const iconMap = {
  Clock: Clock,
  TrendingUp: TrendingUp,
  Users: Users,
};

export async function generateStaticParams() {
  return getCaseStudySlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};

  return {
    title: `${cs.company} | Case Study`,
    description: cs.title,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);

  if (!cs) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Header Section */}
      <section className="py-20 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className={`orb absolute opacity-5 bg-gradient-to-br ${cs.gradient} blur-3xl`}
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            Back to Case Studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-semibold tracking-widest text-mute uppercase">
              {cs.industry}
            </span>
            <span className="text-hairline-strong" aria-hidden="true">·</span>
            <span className="text-xs text-mute font-mono">{cs.company}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-semibold text-ink tracking-[-0.03em] mb-8 leading-tight"
            style={{ textWrap: "balance" }}
          >
            {cs.title}
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-6 border-t border-hairline pt-8 max-w-2xl">
            {cs.results.map((result) => {
              const Icon = iconMap[result.iconName] || Clock;
              return (
                <div key={result.label} className="text-left">
                  <Icon size={16} className="text-mute mb-2" aria-hidden="true" />
                  <div className="text-2xl md:text-3xl font-semibold text-ink font-variant-numeric tabular-nums">
                    {result.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-mute mt-1 uppercase tracking-wider font-semibold font-mono">
                    {result.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Case Body */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="text-xs font-mono font-semibold text-mute uppercase tracking-widest mb-4">
                The Business Challenge
              </h2>
              <div className="space-y-4 text-body leading-relaxed text-sm md:text-base">
                {cs.detailedProblem.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-8">
              <h2 className="text-xs font-mono font-semibold text-mute uppercase tracking-widest mb-4">
                Our Engineering Approach
              </h2>
              <div className="space-y-4 text-body leading-relaxed text-sm md:text-base">
                {cs.detailedSolution.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-8">
              <h2 className="text-xs font-mono font-semibold text-mute uppercase tracking-widest mb-4">
                Business Outcomes &amp; Impact
              </h2>
              <div className="space-y-4 text-body leading-relaxed text-sm md:text-base">
                {cs.detailedResults.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 border border-hairline bg-canvas rounded-2xl p-6 space-y-6 shadow-level-3">
              <h3 className="text-sm font-semibold text-ink">
                Interested in similar outcomes?
              </h3>
              <p className="text-xs text-body leading-relaxed">
                Contact our engineering team to explore architectures and automation systems that fit your operations.
              </p>
              <Link
                href="/contact#consultation"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold px-4 py-3 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                Book Consultation
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
