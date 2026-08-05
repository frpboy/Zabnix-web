import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ProductDemoForm } from "@/components/forms/ProductDemoForm";
import { getProduct, getProductSlugs } from "@/sanity/lib/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProductSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Products`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Product Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className={`orb absolute opacity-5 bg-gradient-to-br ${product.gradient} blur-3xl`}
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            Back to Products
          </Link>

          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            {product.tag}
          </span>
          <h1
            className="text-4xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-4"
            style={{ textWrap: "balance" }}
          >
            {product.name}
          </h1>
          <p className="text-xl text-body max-w-3xl leading-relaxed mb-6">
            {product.tagline}
          </p>
          <p className="text-body max-w-4xl leading-relaxed text-sm md:text-base">
            {product.description}
          </p>
        </div>
      </section>

      {/* Product Details & Specs */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Features and Specs */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 gap-4">
                {product.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="border border-hairline bg-canvas rounded-xl p-5 flex gap-4 shadow-level-2"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-link shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-ink mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-body leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-ink mb-6">Technical Specifications</h2>
              <div className="border border-hairline bg-canvas rounded-xl overflow-hidden shadow-level-2">
                {product.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between p-4 text-xs ${
                      idx !== product.specs.length - 1 ? "border-b border-hairline" : ""
                    }`}
                  >
                    <span className="text-mute font-mono uppercase tracking-wider text-[10px]">
                      {spec.label}
                    </span>
                    <span className="text-ink font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Demo Form Sidebar */}
          <div id="demo" className="lg:col-span-5 scroll-margin-top" style={{ scrollMarginTop: "6rem" }}>
            <div className="sticky top-28 border border-hairline bg-canvas rounded-2xl p-6 md:p-8 space-y-6 shadow-level-3">
              <h2 className="text-lg font-semibold text-ink">Request a Demo</h2>
              <p className="text-xs text-body leading-relaxed">
                Schedule a custom walkthrough of {product.name} tailored to your business operations.
              </p>
              <ProductDemoForm productName={product.name} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
