import Link from "next/link";
import {
  Code2,
  Smartphone,
  BarChart3,
  Brain,
  Globe,
  Shield,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Full-stack web and enterprise applications built with modern frameworks, clean architecture, and scalable infrastructure.",
    href: "/services#software",
    accent: "from-violet-500 to-purple-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Cross-platform iOS and Android apps built with Flutter — single codebase, native performance, beautiful UI.",
    href: "/services#mobile",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "ERP Solutions",
    description:
      "End-to-end enterprise resource planning systems tailored for healthcare, retail, manufacturing, and beyond.",
    href: "/services#erp",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description:
      "Intelligent workflows, LLM integrations, and process automation that reduce overhead and unlock new efficiencies.",
    href: "/services#ai",
    accent: "from-orange-500 to-amber-500",
  },
  {
    icon: Globe,
    title: "Business Consulting",
    description:
      "Technology strategy and architecture consulting to help leadership teams make faster, better-informed decisions.",
    href: "/services#consulting",
    accent: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "HIPAA, GDPR, and SOC 2 compliance engineering. Secure-by-default architecture for regulated industries.",
    href: "/services#security",
    accent: "from-indigo-500 to-violet-500",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-32 px-6 bg-canvas-soft" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            What We Build
          </p>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-semibold text-ink tracking-[-0.03em] mb-4"
            style={{ textWrap: "balance" }}
          >
            Everything your enterprise needs.
          </h2>
          <p className="text-lg text-body leading-relaxed">
            From custom software to AI-powered automation — we engineer the full
            stack so you can focus on growing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative border border-hairline bg-canvas rounded-2xl p-6 flex flex-col gap-4 no-underline shadow-level-3 hover:shadow-level-4 hover:border-hairline-strong transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
              >
                {/* Icon Container with subtle gradient border */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.accent} p-px`}
                >
                  <div className="w-full h-full rounded-xl bg-canvas flex items-center justify-center">
                    <Icon size={18} className="text-ink" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold text-ink mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-mute group-hover:text-link transition-colors duration-200">
                  <span>Learn more</span>
                  <ArrowRight
                    size={12}
                    className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
