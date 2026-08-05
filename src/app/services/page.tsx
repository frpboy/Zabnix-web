import type { Metadata } from "next";
import Link from "next/link";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ServiceEditorialBlock, type ServiceEditorialItem } from "@/components/sections/ServiceEditorialBlock";
import { ServicesTechnologyShowcase } from "@/components/sections/ServicesTechnologyShowcase";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack software development, mobile applications, ERP systems, AI automation, and more — engineered for enterprise growth.",
};

const services = [
  {
    icon: "software",
    title: "Software Development",
    description:
      "Full-stack web and enterprise applications built with Next.js, React, Node.js, and modern cloud infrastructure. We specialize in high-throughput systems that scale.",
    deliverables: [
      "Custom web applications",
      "API design & microservices",
      "Legacy system modernization",
      "SaaS platform development",
      "DevOps & CI/CD pipelines",
    ],
    id: "software",
  },
  {
    icon: "mobile",
    title: "Mobile Applications",
    description:
      "Cross-platform iOS and Android apps built with Flutter. Single codebase, native performance, and a polished UI that converts users into advocates.",
    deliverables: [
      "Flutter cross-platform apps",
      "Native iOS & Android",
      "App Store / Play Store submission",
      "Push notifications & analytics",
      "Offline-first architecture",
    ],
    id: "mobile",
  },
  {
    icon: "erp",
    title: "ERP Solutions",
    description:
      "Purpose-built enterprise resource planning for healthcare, retail, manufacturing, and logistics. ZerpAI ERP or custom-built — your data, your workflow.",
    deliverables: [
      "Inventory & procurement",
      "Finance & accounting modules",
      "HR & payroll integration",
      "Multi-branch management",
      "Real-time dashboards & reports",
    ],
    id: "erp",
  },
  {
    icon: "ai",
    title: "AI & Automation",
    description:
      "LLM integrations, intelligent document processing, and end-to-end workflow automation. We eliminate repetitive work so your team can focus on what matters.",
    deliverables: [
      "LLM-powered chatbots & assistants",
      "Document extraction & classification",
      "Predictive analytics pipelines",
      "RPA & workflow automation",
      "AI model fine-tuning",
    ],
    id: "ai",
  },
  {
    icon: "consulting",
    title: "Business Consulting",
    description:
      "Technology strategy, architecture reviews, and digital transformation consulting. We help leadership teams make gains, and make faster, better-informed decisions.",
    deliverables: [
      "Technical due diligence",
      "Architecture design sprints",
      "Technology stack selection",
      "Build vs. buy analysis",
      "Team augmentation",
    ],
    id: "consulting",
  },
  {
    icon: "security",
    title: "Security & Compliance",
    description:
      "HIPAA, GDPR, and SOC 2 compliance engineering. Secure-by-default architecture and penetration testing for regulated industries.",
    deliverables: [
      "HIPAA compliance audits",
      "GDPR data mapping & controls",
      "Penetration testing",
      "Security code review",
      "Access control architecture",
    ],
    id: "security",
  },
] satisfies readonly ServiceEditorialItem[];

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline bg-canvas px-6 pb-6 pt-28 grid-bg">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05),rgba(168,85,247,0.025)_40%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="fade-in-up mb-5 text-xs font-mono uppercase tracking-[0.22em] text-mute">
            Our Services
          </p>
          <h1 className="fade-in-up fade-in-up-delay-1 text-pretty font-semibold tracking-[-0.045em] text-ink">
            <span className="block text-5xl leading-[1.04] md:text-6xl">From idea to production.</span>
            <span className="mt-2 block text-4xl leading-[1.08] text-ink/70 md:text-5xl">Enterprise engineering without compromise.</span>
          </h1>
          <p className="fade-in-up fade-in-up-delay-2 mx-auto mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-body md:text-xl">
            Whether you&apos;re launching a new platform, modernizing existing software, or automating complex workflows, our team delivers scalable digital solutions designed for long-term growth.
          </p>
          <div className="fade-in-up fade-in-up-delay-3 mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2.5" aria-label="Service categories">
            {["Custom Software", "Enterprise ERP", "AI Automation", "Mobile Apps", "Cloud Solutions"].map((service) => (
              <span
                key={service}
                className="rounded-full border border-hairline bg-white/70 px-4 py-2 text-sm font-medium text-body transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white hover:text-ink hover:shadow-[0_8px_20px_rgba(17,17,17,0.08)]"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork />

      {/* Services */}
      <section className="bg-canvas-soft px-6 pb-24 pt-8" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">
          Our Services
        </h2>
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-12">
          {services.map((service, index) => (
            <ServiceEditorialBlock key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      <ServicesTechnologyShowcase />

      {/* Bottom CTA */}
      <section className="pb-24 pt-14 px-6 border-t border-hairline text-center bg-canvas">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-4">
            Not sure where to start?
          </h2>
          <p className="text-body mb-8">
            Book a free consultation and we&#39;ll help you figure out exactly
            what you need — and what you don&#39;t.
          </p>
          <Link
            href="/contact#consultation"
            aria-label="Book Free Consultation"
            className="consultation-reveal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
          >
            <span className="consultation-reveal__original">Book Free Consultation</span>
            <span className="consultation-reveal__letters" aria-hidden="true">
              {"BOOK FREE CONSULTATION".split("").map((letter, index) => (
                <span key={`${letter}-${index}`} className="consultation-reveal__letter">
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
