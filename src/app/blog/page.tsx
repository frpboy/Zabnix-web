import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts as posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software engineering, AI automation, ERP implementation, and digital transformation from the Zabnix team.",
};

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className="orb orb-blue pulse-glow"
          style={{
            width: "400px",
            height: "400px",
            top: "60%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            The Zabnix Blog
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Engineering insights &amp; deep dives.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Practical perspectives from the engineers building production-grade
            software for real businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <div className="max-w-5xl mx-auto space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 border border-hairline bg-canvas rounded-2xl p-7 no-underline shadow-level-3 hover:shadow-level-4 hover:border-hairline-strong transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link block"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold tracking-widest text-mute uppercase">
                    {post.category}
                  </span>
                  <span className="text-hairline-strong">·</span>
                  <span className="flex items-center gap-1.5 text-xs text-mute font-mono">
                    <Clock size={12} className="text-mute" aria-hidden="true" />
                    <time dateTime={post.isoDate}>
                      {post.date}
                    </time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-ink leading-snug mb-3 group-hover:text-link transition-colors duration-200" style={{ textWrap: "balance" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm text-body leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-mute font-mono">
                    By {post.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-mute group-hover:text-ink transition-colors duration-200 font-medium">
                    Read article
                    <ArrowRight
                      size={12}
                      className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 border-t border-hairline bg-canvas">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-ink mb-3 tracking-tight">
            Stay updated
          </h2>
          <p className="text-body mb-8">
            Get new articles delivered to your inbox — no spam, just signal.
          </p>
          <form
            className="flex gap-2 max-w-sm mx-auto"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@company.com…"
              className="flex-1 bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
            />
            <button
              type="button"
              className="bg-ink text-white text-sm font-semibold px-5 py-3 rounded-[6px] hover:bg-ink/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
