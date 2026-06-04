import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on software engineering, AI automation, ERP implementation, and digital transformation from the Zabnix team.",
};

import { blogPosts as posts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-blue"
          style={{
            width: "400px",
            height: "400px",
            top: "60%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            The Zabnix Blog
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Engineering insights & deep dives
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
            Practical perspectives from the engineers building production-grade
            software for real businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-6 border-t border-white/8" aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <div className="max-w-5xl mx-auto space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={`group flex flex-col gap-4 border ${post.border} bg-gradient-to-br ${post.gradient} rounded-2xl p-7 no-underline hover:border-opacity-40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 block`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    {post.category}
                  </span>
                  <span className="text-gray-700">·</span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock size={11} aria-hidden="true" />
                    <time dateTime={post.isoDate}>
                      {post.date}
                    </time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-violet-200 transition-colors duration-200" style={{ textWrap: "balance" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    By {post.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-600 group-hover:text-violet-400 transition-colors duration-200">
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
      <section className="py-24 px-6 border-t border-white/8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Stay updated
          </h2>
          <p className="text-gray-400 mb-8">
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
              className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            />
            <button
              type="button"
              className="bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
