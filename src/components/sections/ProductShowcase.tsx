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
    imageGradient: "from-violet-900/40 via-indigo-900/20 to-transparent",
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
    imageGradient: "from-blue-900/40 via-cyan-900/20 to-transparent",
  },
];

export function ProductShowcase() {
  return (
    <section
      className="py-32 px-6 border-t border-white/8"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Our Products
          </p>
          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
            style={{ textWrap: "balance" }}
          >
            Built for real business problems
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
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
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                  {product.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  {product.name}
                </h3>
                <p className="text-lg font-medium text-gray-300 mb-4">
                  {product.tagline}
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {product.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-violet-400 mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/15 bg-white/5 px-5 py-2.5 rounded-xl hover:bg-white/10 hover:border-white/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    View Product
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href={`${product.href}#demo`}
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Request Demo →
                  </Link>
                </div>
              </div>

              {/* Visual mockup */}
              <div className="relative">
                <div
                  className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${product.imageGradient}`}
                  style={{ aspectRatio: "16/10" }}
                >
                  {/* Fake dashboard UI */}
                  <div className="absolute inset-0 p-6">
                    {/* Top bar */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500/70" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                      <div className="w-2 h-2 rounded-full bg-green-500/70" />
                      <div className="flex-1 ml-2 h-5 bg-white/5 rounded" />
                    </div>
                    {/* Content blocks */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 bg-white/5 rounded-lg border border-white/8 flex flex-col justify-end p-2 gap-1"
                        >
                          <div
                            className={`h-1.5 rounded bg-gradient-to-r ${product.gradient} opacity-70`}
                            style={{ width: `${60 + i * 15}%` }}
                          />
                          <div className="h-1 bg-white/10 rounded w-3/4" />
                        </div>
                      ))}
                    </div>
                    <div className="h-24 bg-white/3 rounded-lg border border-white/8 mb-2 flex items-center px-4 gap-3">
                      <div
                        className={`w-8 h-8 rounded bg-gradient-to-br ${product.gradient} opacity-80 shrink-0`}
                      />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-1.5 bg-white/15 rounded w-3/4" />
                        <div className="h-1.5 bg-white/8 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="h-12 bg-white/3 rounded border border-white/8"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Glow behind */}
                <div
                  className={`absolute inset-0 -z-10 blur-3xl opacity-20 rounded-3xl bg-gradient-to-br ${product.gradient}`}
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
