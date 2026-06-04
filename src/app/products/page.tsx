import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ZerpAI ERP and Healthcare Suite — purpose-built platforms for enterprise operations.",
};

import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-blue"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Our Products
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Built for real business problems
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Purpose-built platforms that go live fast and grow with your
            operations. No bloated features, no unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6" aria-labelledby="products-list-heading">
        <h2 id="products-list-heading" className="sr-only">
          Product Catalog
        </h2>
        <div className="max-w-7xl mx-auto space-y-20">
          {products.map((product) => (
            <article
              key={product.slug}
              className="border border-white/8 bg-[#0a0a0a] rounded-3xl overflow-hidden"
            >
              {/* Product header */}
              <div
                className={`bg-gradient-to-br ${product.gradient} p-px`}
              >
                <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                    {product.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {product.name}
                  </h2>
                  <p className="text-lg text-gray-300 mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-gray-500 leading-relaxed max-w-3xl mb-8">
                    {product.description}
                  </p>

                  {/* Industry tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.industries.map((ind) => (
                      <span
                        key={ind}
                        className="text-xs border border-white/10 bg-white/5 rounded-full px-3 py-1 text-gray-400"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      View Full Product
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/contact?product=${product.slug}#demo`}
                      className="inline-flex items-center gap-2 border border-white/15 bg-white/5 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors duration-200"
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
              </div>

              {/* Features grid */}
              <div className="p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={15}
                        className="text-violet-400 shrink-0"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed pl-[23px]">
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
      <section className="py-24 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need something custom?
          </h2>
          <p className="text-gray-400 mb-8">
            We build bespoke solutions tailored to your exact workflow.
            Let&#39;s define what you need together.
          </p>
          <Link
            href="/contact#consultation"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            Book a Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
