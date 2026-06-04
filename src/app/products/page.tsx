import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ZerpAI ERP and Healthcare Suite — purpose-built platforms for enterprise operations.",
};

export default function ProductsPage() {
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
            left: "60%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            Our Products
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Built for real business problems.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
            Purpose-built platforms that go live fast and grow with your
            operations. No bloated features, no unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="products-list-heading">
        <h2 id="products-list-heading" className="sr-only">
          Product Catalog
        </h2>
        <div className="max-w-7xl mx-auto space-y-20">
          {products.map((product) => (
            <article
              key={product.slug}
              className="border border-hairline bg-canvas rounded-2xl overflow-hidden shadow-level-3"
            >
              {/* Product header */}
              <div className="p-8 md:p-12 border-b border-hairline">
                <span className="inline-block text-xs font-mono uppercase tracking-widest text-mute mb-3">
                  {product.tag}
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink tracking-tight mb-3">
                  {product.name}
                </h2>
                <p className="text-lg font-medium text-body mb-4">
                  {product.tagline}
                </p>
                <p className="text-body leading-relaxed max-w-3xl mb-8">
                  {product.description}
                </p>

                {/* Industry tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.industries.map((ind) => (
                    <span
                      key={ind}
                      className="text-xs border border-hairline bg-canvas-soft rounded-full px-3 py-1 text-body"
                    >
                      {ind}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    View Full Product
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href={`/contact?product=${product.slug}#demo`}
                    className="inline-flex items-center gap-2 border border-hairline bg-canvas text-ink text-sm font-medium px-5 py-2.5 rounded-full hover:bg-canvas-soft transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Features grid */}
              <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-canvas-soft-2/50">
                {product.features.map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={15}
                        className="text-link shrink-0"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold text-ink">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-body leading-relaxed pl-[23px]">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-hairline text-center bg-canvas">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-4">
            Need something custom?
          </h2>
          <p className="text-body mb-8">
            We build bespoke solutions tailored to your exact workflow.
            Let&#39;s define what you need together.
          </p>
          <Link
            href="/contact#consultation"
            className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Book a Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
