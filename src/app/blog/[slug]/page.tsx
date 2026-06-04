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
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 grid-bg relative overflow-hidden border-b border-white/8">
        <div
          className={`orb absolute opacity-10 bg-gradient-to-br ${post.gradient}`}
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
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="translate-x-0 group-hover:-translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
              {post.category}
            </span>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={11} aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-tight"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h1>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">
                {post.author[0]}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-500" aria-hidden="true" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <article className="lg:col-span-8 space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
            <p className="text-white font-medium text-lg md:text-xl border-l-2 border-violet-500 pl-4 mb-8">
              {post.excerpt}
            </p>
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Consultation Card */}
            <div className="border border-white/8 bg-[#0a0a0a] rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">
                Have a project in mind?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Let&#39;s chat about how we can build, scale, and automate your operations with production-grade engineering.
              </p>
              <Link
                href="/contact#consultation"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                Book Consultation
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {/* Newsletter Card */}
            <div className="border border-white/8 bg-[#0a0a0a]/50 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </h3>
              <p className="text-xs text-gray-500">
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
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                />
                <button
                  type="button"
                  className="w-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 transition-colors duration-200"
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
