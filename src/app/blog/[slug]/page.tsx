import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero Section */}
      <section className="py-20 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className={`orb absolute opacity-5 bg-gradient-to-br ${post.gradient} blur-3xl`}
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-ink transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono font-semibold tracking-widest text-mute uppercase">
              {post.category}
            </span>
            <span className="text-hairline-strong" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-xs text-mute font-mono">
              <Clock size={12} className="text-mute" aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink tracking-[-0.03em] mb-8 leading-tight"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-mute pt-6 border-t border-hairline">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-canvas border border-hairline flex items-center justify-center text-ink font-semibold shadow-level-1 font-sans">
                {post.author[0]}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-mute" aria-hidden="true" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <article className="lg:col-span-8 space-y-6 text-body leading-relaxed text-base md:text-lg">
            <p className="text-ink font-medium text-lg md:text-xl border-l-2 border-link pl-4 mb-8">
              {post.excerpt}
            </p>
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Consultation Card */}
            <div className="border border-hairline bg-canvas rounded-2xl p-6 space-y-4 shadow-level-3">
              <h3 className="text-sm font-semibold text-ink">
                Have a project in mind?
              </h3>
              <p className="text-xs text-body leading-relaxed">
                Let&#39;s chat about how we can build, scale, and automate your operations with production-grade engineering.
              </p>
              <Link
                href="/contact#consultation"
                className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold px-4 py-3 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                Book Consultation
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {/* Newsletter Card */}
            <div className="border border-hairline bg-canvas rounded-2xl p-6 space-y-4 shadow-level-3">
              <h3 className="text-sm font-semibold text-ink">
                Subscribe to our newsletter
              </h3>
              <p className="text-xs text-body">
                Get more insights directly in your inbox. No spam.
              </p>
              <form
                className="space-y-2"
                aria-label="Sidebar newsletter signup"
              >
                <label htmlFor="sb-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="sb-email"
                  type="email"
                  placeholder="you@company.com…"
                  className="w-full bg-canvas border border-hairline rounded-[6px] px-3 py-2 text-xs text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                />
                <button
                  type="button"
                  className="w-full bg-canvas border border-hairline text-ink text-xs font-semibold px-4 py-2.5 rounded-[6px] hover:bg-canvas-soft transition-colors duration-200 shadow-level-2"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
