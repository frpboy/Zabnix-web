import type { Metadata } from "next";
import { ProductExperienceCard } from "@/components/showcase/ProductExperienceCard";
import { ZerpAIProductCard } from "@/components/showcase/zerpai/ZerpAIProductCard";
import { LetterRevealLink } from "@/components/sections/LetterRevealLink";
import { MobileProductsHero } from "@/components/sections/MobileProductsHero";
import { getProducts } from "@/sanity/lib/loaders";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ZerpAI ERP and Healthcare Suite — purpose-built platforms for enterprise operations.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      <MobileProductsHero products={products} />

      {/* Hero */}
      <section className="relative hidden overflow-hidden border-b border-hairline bg-canvas px-6 py-12 md:block md:py-24">
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
            className="text-4xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Built for real business problems.
          </h1>
          <p className="text-lg md:text-xl text-body leading-relaxed max-w-2xl mx-auto">
            Purpose-built platforms that go live fast and grow with your
            operations. No bloated features, no unnecessary complexity.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="bg-canvas-soft px-6 py-8 md:py-24" aria-labelledby="products-list-heading">
        <h2 id="products-list-heading" className="sr-only">
          Product Catalog
        </h2>
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-20">
          {products.map((product) => product.slug === "zerpai" ? (
            <ZerpAIProductCard key={product.slug} />
          ) : (
            <ProductExperienceCard key={product.slug} product={product} />
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
          <LetterRevealLink href="/contact#consultation" label="Book a Consultation" />
        </div>
      </section>
    </div>
  );
}
