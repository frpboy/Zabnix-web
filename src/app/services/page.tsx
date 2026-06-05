import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  BarChart3,
  Brain,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack software development, mobile applications, ERP systems, AI automation, and more — engineered for enterprise growth.",
};

const services = [
  {
    icon: Code2,
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
    icon: Smartphone,
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
    icon: BarChart3,
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
    icon: Brain,
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
    icon: Globe,
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
    icon: Shield,
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
];

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className="orb orb-purple pulse-glow"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            What We Do
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Engineering services for modern enterprises.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
            From a single feature to a complete digital transformation — we
            ship high-quality software at the speed your business demands.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">
          Our Services
        </h2>
        <div className="max-w-7xl mx-auto space-y-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="group border border-hairline bg-canvas rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 scroll-margin-top shadow-level-3 hover:shadow-level-4 hover:border-hairline-strong transition-all duration-300"
                style={{ scrollMarginTop: "6rem" }}
              >
                {/* Left */}
                <div className="md:w-80 shrink-0">
                  <div className="w-12 h-12 rounded-xl border border-hairline group-hover:border-hairline-strong bg-canvas flex items-center justify-center transition-colors duration-300 mb-6">
                    <Icon size={20} className="text-ink" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-semibold text-ink mb-4">
                    {service.title}
                  </h2>
                  <p className="text-body leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <Link
                    href="/contact#consultation"
                    className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-ink bg-canvas border border-hairline px-4 py-2.5 rounded-full hover:bg-canvas-soft transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                  >
                    Get Started
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px bg-hairline self-stretch" aria-hidden="true" />

                {/* Right: deliverables */}
                <div className="flex-1">
                  <h3 className="text-xs font-mono font-semibold text-mute uppercase tracking-widest mb-5">
                    What You Get
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          size={15}
                          className="text-link mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 border-t border-hairline text-center bg-canvas">
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
            className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Book Free Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
