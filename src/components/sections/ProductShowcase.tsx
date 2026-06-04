import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    tag: "ERP Platform",
    name: "ZerpAI ERP",
    tagline: "The intelligent ERP built for modern operations.",
    description:
      "ZerpAI combines enterprise resource planning with AI-powered insights — giving operations teams real-time visibility, automated workflows, and predictive analytics out of the box.",
    features: [
      "Real-time inventory & procurement tracking",
      "AI-powered demand forecasting",
      "Multi-entity, multi-currency support",
      "Role-based access & audit trails",
      "REST API for third-party integrations",
    ],
    href: "/products/zerpai",
    gradient: "from-violet-600 to-indigo-600",
    imageGradient: "from-[#1a1325] via-[#121214] to-[#121212]",
    glowColor: "from-violet-500/20 to-indigo-500/20",
  },
  {
    tag: "Healthcare Suite",
    name: "Healthcare Solutions",
    tagline: "Digital transformation for healthcare providers.",
    description:
      "HIPAA-compliant patient management, appointment scheduling, billing, lab reports, and telemedicine — all in one integrated platform designed for clinics and hospitals.",
    features: [
      "Patient registration & EMR management",
      "Appointment scheduling & reminders",
      "Billing, insurance claims & pharmacy",
      "Lab & radiology report portal",
      "Telemedicine with video consultation",
    ],
    href: "/products/healthcare",
    gradient: "from-blue-600 to-cyan-600",
    imageGradient: "from-[#0e1726] via-[#121214] to-[#121212]",
    glowColor: "from-blue-500/20 to-cyan-500/20",
  },
];

export function ProductShowcase() {
  return (
    <section
      className="py-32 px-6 border-t border-hairline bg-canvas"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            Our Products
          </p>
          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-semibold text-ink tracking-[-0.03em] mb-4"
            style={{ textWrap: "balance" }}
          >
            Built for real business problems.
          </h2>
          <p className="text-lg text-body leading-relaxed">
            Purpose-built platforms that go live fast and scale with your
            operations.
          </p>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-24">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text */}
              <div>
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-mute mb-4">
                  {product.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-4">
                  {product.name}
                </h3>
                <p className="text-lg font-medium text-body mb-4">
                  {product.tagline}
                </p>
                <p className="text-body leading-relaxed mb-8 text-sm md:text-base">
                  {product.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-link mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-body">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink border border-hairline bg-canvas px-5 py-2.5 rounded-full hover:bg-canvas-soft-2 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                  >
                    View Product
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href={`${product.href}#demo`}
                    className="inline-flex items-center gap-2 text-sm text-body font-medium hover:text-ink transition-colors duration-200"
                  >
                    Request Demo →
                  </Link>
                </div>
              </div>

              {/* Visual mockup (Dark code-editor-mockup style band for depth cue) */}
              <div className="relative">
                <div
                  className={`relative rounded-2xl overflow-hidden border border-[#2e2e2e] bg-[#121212] p-6`}
                  style={{ aspectRatio: "16/10" }}
                >
                  {/* Fake dashboard UI */}
                  <div className="absolute inset-0 p-6 flex flex-col">
                    {/* Top bar */}
                    <div className="flex items-center gap-2 mb-6 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ee0000]/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f5a623]/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0070f3]/80" />
                      <div className="flex-1 ml-2 h-5 bg-white/5 rounded border border-white/5" />
                    </div>
                    {/* Content blocks */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-3">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-16 bg-[#1a1a1a] rounded-lg border border-[#2e2e2e] flex flex-col justify-end p-3 gap-2"
                          >
                            <div
                              className={`h-1.5 rounded bg-gradient-to-r ${product.gradient} opacity-70`}
                              style={{ width: `${60 + i * 15}%` }}
                            />
                            <div className="h-1 bg-white/10 rounded w-3/4" />
                          </div>
                        ))}
                      </div>
                      <div className="h-20 bg-[#1a1a1a] rounded-lg border border-[#2e2e2e] flex items-center px-4 gap-4">
                        <div
                          className={`w-8 h-8 rounded bg-gradient-to-br ${product.gradient} opacity-80 shrink-0`}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="h-1.5 bg-white/15 rounded w-3/4" />
                          <div className="h-1.5 bg-white/5 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[...Array(2)].map((_, i) => (
                          <div
                            key={i}
                            className="h-12 bg-[#161616] rounded border border-[#2e2e2e]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow behind */}
                <div
                  className={`absolute inset-0 -z-10 blur-3xl opacity-30 rounded-3xl bg-gradient-to-br ${product.glowColor}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
