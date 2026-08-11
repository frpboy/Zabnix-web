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
import { MobileServicesShowcase } from "@/components/sections/MobileServicesShowcase";

const serviceIcons = {
  software: Code2,
  mobile: Smartphone,
  erp: BarChart3,
  ai: Brain,
  consulting: Globe,
  security: Shield,
} as const;

export type HomeServiceIconKey = keyof typeof serviceIcons;

export type HomeServiceItem = {
  icon: HomeServiceIconKey;
  title: string;
  description: string;
  href: string;
};

export const services: HomeServiceItem[] = [
  {
    icon: "software",
    title: "Software Development",
    description:
      "Full-stack web and enterprise applications built with modern frameworks, clean architecture, and scalable infrastructure.",
    href: "/services#software",
  },
  {
    icon: "mobile",
    title: "Mobile Applications",
    description:
      "Cross-platform iOS and Android apps built with Flutter — single codebase, native performance, beautiful UI.",
    href: "/services#mobile",
  },
  {
    icon: "erp",
    title: "ERP Solutions",
    description:
      "End-to-end enterprise resource planning systems tailored for healthcare, retail, manufacturing, and beyond.",
    href: "/services#erp",
  },
  {
    icon: "ai",
    title: "AI & Automation",
    description:
      "Intelligent workflows, LLM integrations, and process automation that reduce overhead and unlock new efficiencies.",
    href: "/services#ai",
  },
  {
    icon: "consulting",
    title: "Business Consulting",
    description:
      "Technology strategy and architecture consulting to help leadership teams make faster, better-informed decisions.",
    href: "/services#consulting",
  },
  {
    icon: "security",
    title: "Security & Compliance",
    description:
      "HIPAA, GDPR, and SOC 2 compliance engineering. Secure-by-default architecture for regulated industries.",
    href: "/services#security",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-canvas-soft px-6 pb-6 pt-10 md:pt-20 md:pb-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 h-px w-full bg-neutral-200 md:hidden" aria-hidden="true" />

        {/* Header */}
        <div className="hidden max-w-2xl mb-16 md:block">
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

        <div className="md:hidden">
          <MobileServicesShowcase services={services} />
        </div>

        {/* Grid */}
        <div className="hidden grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative flex min-h-[320px] flex-col rounded-[24px] border border-hairline bg-canvas text-foreground shadow-level-3 transition-all duration-250 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-level-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
              >
                <div
                  className="relative mx-4 -mt-6 rounded-[22px] border border-white/45 bg-[linear-gradient(135deg,#f7f7f8_0%,#ececec_45%,#f8f8f8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_30px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow,transform] duration-250 group-hover:border-indigo-500/25 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_16px_32px_rgba(0,0,0,0.07)]"
                  aria-hidden="true"
                >
                  <div className="relative h-40 overflow-hidden rounded-[21px] bg-[linear-gradient(135deg,#f7f7f8_0%,#ececec_45%,#f8f8f8_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04)_58%,rgba(255,255,255,0)_100%)]" />
                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/24 bg-black transition-transform duration-250 group-hover:rotate-[2deg]">
                      <Icon size={22} className="text-white" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="text-[12px] font-normal uppercase tracking-[0.25em] text-neutral-500">
                        Service
                      </p>
                      <p className="mt-2 text-xl font-semibold leading-none text-[#171717]">
                        <span className="relative inline-block">
                          <span className="transition-opacity duration-250 ease-out group-hover:opacity-0">
                            {service.title}
                          </span>
                          <span
                            className="absolute inset-0 bg-gradient-to-r from-develop-start via-preview-start to-ship-start bg-clip-text text-transparent opacity-0 transition-opacity duration-250 ease-out [filter:saturate(0.8)] group-hover:opacity-100"
                            aria-hidden="true"
                          >
                            {service.title}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-semibold text-ink">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-body">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-0">
                    <span className="inline-flex items-center rounded-lg bg-ink px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all duration-300 group-hover:bg-ink/92 group-hover:shadow-lg">
                      Learn More
                      <ArrowRight
                        size={12}
                        className="ml-2 translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
