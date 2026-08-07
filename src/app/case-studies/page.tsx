import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/sanity/lib/loaders";
import { CaseStudiesHero } from "@/components/sections/CaseStudiesHero";
import { CaseStudyVisualization } from "@/components/sections/CaseStudyVisualization";
import { InteractiveCaseStudyCard } from "@/components/sections/InteractiveHealthcareCaseStudyCard";
import { CaseStudyCta } from "@/components/sections/CaseStudyCta";
import { LetterRevealLink } from "@/components/sections/LetterRevealLink";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world results from Zabnix's software, AI, and ERP implementations across healthcare, retail, and manufacturing.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      <CaseStudiesHero />
      {false && (
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
      )}

      {/* Case studies */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="casestudies-list-heading">
        <h2 id="casestudies-list-heading" className="sr-only">
          Case Studies
        </h2>
        <div className="max-w-5xl mx-auto space-y-6">
          {caseStudies.map((cs) => (
            <InteractiveCaseStudyCard key={cs.slug} caseStudy={cs} />
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
          <LetterRevealLink href="/contact#consultation" label="Start a Project" />
        </div>
      </section>
    </div>
  );
}
