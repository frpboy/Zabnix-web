"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock,
  Code2,
  Mail,
  Search,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  isoDate: string;
  readTime: number;
};

type BlogClientProps = {
  posts: BlogPost[];
};

const filters = [
  "All",
  "Engineering",
  "AI",
  "ERP",
  "Healthcare",
  "Mobile",
  "Architecture",
  "DevOps",
  "Case Studies",
] as const;

type BlogFilter = (typeof filters)[number];

const rotatingTopics = [
  { label: "Deep Dives", color: "text-sky-500" },
  { label: "Architecture", color: "text-violet-500" },
  { label: "AI Automation", color: "text-emerald-500" },
  { label: "ERP Systems", color: "text-pink-500" },
  { label: "Engineering Culture", color: "text-orange-500" },
  { label: "Scalable Software", color: "text-cyan-500" },
] as const;

const topicLinks = ["Engineering", "AI Automation", "Enterprise ERP", "Mobile", "Architecture", "Operations"] as const;

const topicFilterMap: Record<(typeof topicLinks)[number], BlogFilter> = {
  Engineering: "Engineering",
  "AI Automation": "AI",
  "Enterprise ERP": "ERP",
  Mobile: "Mobile",
  Architecture: "Architecture",
  Operations: "Case Studies",
};

function matchesFilter(post: BlogPost, filter: string) {
  if (filter === "All") return true;

  const text = `${post.category} ${post.title} ${post.excerpt}`.toLowerCase();
  const terms: Record<string, string[]> = {
    Engineering: ["engineering", "next.js", "software"],
    AI: ["ai", "automation", "machine learning"],
    ERP: ["erp", "enterprise resource"],
    Healthcare: ["healthcare", "patient", "clinical"],
    Mobile: ["mobile", "flutter", "react native"],
    Architecture: ["architecture", "app router", "microservice"],
    DevOps: ["devops", "deployment", "ci/cd"],
    "Case Studies": ["case study", "client story"],
  };

  return (terms[filter] ?? [filter.toLowerCase()]).some((term) => text.includes(term));
}

function CoverArt({ category, index, featured = false }: { category: string; index: number; featured?: boolean }) {
  const visual = [
    { icon: Code2, label: "Deployment ready", accent: "bg-sky-500" },
    { icon: Sparkles, label: "Operational intelligence", accent: "bg-emerald-500" },
    { icon: BookOpen, label: "Systems thinking", accent: "bg-violet-500" },
    { icon: Search, label: "Performance notes", accent: "bg-orange-500" },
  ][index % 4];
  const Icon = visual.icon;

  return (
    <div
      className={`relative overflow-hidden border border-black/[0.06] bg-[#f7f7f6] ${featured ? "min-h-[300px] md:min-h-full" : "aspect-[16/10]"}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-[10%] top-[16%] h-2/3 w-[78%] rounded-2xl border border-black/[0.07] bg-white shadow-[0_18px_40px_rgba(17,17,17,.06)]" />
      <div className="absolute left-[16%] top-[25%] flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${visual.accent}`} />
        <span className="h-2.5 w-14 rounded-full bg-black/[0.10]" />
      </div>
      <div className="absolute left-[16%] top-[38%] h-2 w-[38%] rounded-full bg-black/[0.13]" />
      <div className="absolute left-[16%] top-[47%] h-2 w-[58%] rounded-full bg-black/[0.07]" />
      <div className="absolute bottom-[19%] left-[16%] right-[16%] flex items-end gap-2">
        {[34, 54, 42, 70, 48, 86].map((height, barIndex) => (
          <span
            key={height}
            className={`flex-1 rounded-t-sm ${barIndex === 5 ? visual.accent : "bg-black/[0.08]"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="absolute right-[10%] top-[12%] flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black shadow-sm">
        <Icon size={19} strokeWidth={1.75} />
      </div>
      <div className="absolute bottom-5 left-6 text-[10px] font-mono uppercase tracking-[0.2em] text-black/45">
        {category}
      </div>
    </div>
  );
}

function ArticleMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em] text-mute">
      <span>{post.category}</span>
      <span aria-hidden="true">•</span>
      <time dateTime={post.isoDate}>{post.date}</time>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1 normal-case tracking-normal">
        <Clock size={12} aria-hidden="true" />
        {post.readTime} min read
      </span>
    </div>
  );
}

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-[24px] border border-hairline bg-canvas shadow-level-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-level-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
      >
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <CoverArt category={post.category} index={index} />
        </div>
        <div className="space-y-4 p-6 md:p-7">
          <ArticleMeta post={post} />
          <div>
            <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink text-balance">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-body">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-hairline pt-4 text-sm">
            <span className="min-w-0 truncate text-mute">By {post.author}</span>
            <span className="inline-flex shrink-0 items-center gap-1 font-medium text-ink">
              Read <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogClient({ posts }: BlogClientProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [topicIndex, setTopicIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setTopicIndex((current) => (current + 1) % rotatingTopics.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const featuredPost = posts[0];
  const filteredPosts = useMemo(
    () => posts.filter((post) => matchesFilter(post, activeFilter)),
    [activeFilter, posts],
  );
  const articlePosts = filteredPosts.filter((post) => post.slug !== featuredPost?.slug);
  const displayedPosts = articlePosts.slice(0, visibleCount);

  function onFilterChange(filter: (typeof filters)[number]) {
    setActiveFilter(filter);
    setVisibleCount(4);
  }

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  return (
    <main className="min-h-screen bg-canvas pt-24">
      <section className="grid-bg relative overflow-hidden border-b border-hairline px-6 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-sky-100/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="mb-5 text-xs font-mono uppercase tracking-[0.24em] text-mute">The Zabnix Blog</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-ink md:text-7xl text-balance">
              Engineering insights &amp;{" "}
              <span className="relative inline-block min-w-[10ch] align-baseline">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingTopics[topicIndex].label}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className={rotatingTopics[topicIndex].color}
                  >
                    {rotatingTopics[topicIndex].label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-body md:text-xl">
              Practical perspectives from the engineers building production-grade software for businesses worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
              <span>120+ Articles</span><span aria-hidden="true">•</span><span>Weekly Newsletter</span><span aria-hidden="true">•</span><span>50+ Client Stories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {featuredPost ? (
        <section className="px-6 py-16 md:py-24" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex items-center justify-between gap-4">
              <h2 id="featured-heading" className="text-xs font-mono uppercase tracking-[0.22em] text-mute">Featured Article</h2>
              <span className="hidden text-sm text-mute sm:inline">A practical field note from Zabnix</span>
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-[30px] border border-hairline bg-canvas shadow-level-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-level-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 md:grid-cols-[1.1fr_.9fr]"
            >
              <div className="order-2 space-y-6 p-7 md:order-1 md:p-12">
                <ArticleMeta post={featuredPost} />
                <div>
                  <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-5xl text-balance">{featuredPost.title}</h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">{featuredPost.excerpt}</p>
                </div>
                <div className="flex items-center justify-between border-t border-hairline pt-5 text-sm">
                  <span className="text-mute">By {featuredPost.author}</span>
                  <span className="inline-flex items-center gap-2 font-medium text-ink">Read article <ArrowUpRight size={17} aria-hidden="true" /></span>
                </div>
              </div>
              <div className="order-1 min-h-[320px] overflow-hidden md:order-2">
                <div className="h-full transition-transform duration-500 group-hover:scale-[1.02]">
                  <CoverArt category={featuredPost.category} index={0} featured />
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-y border-hairline bg-canvas-soft px-6" aria-label="Article filters">
        <div className="mx-auto max-w-6xl">
          <div className="sticky top-20 z-10 -mx-6 overflow-x-auto bg-canvas-soft/95 px-6 py-5 backdrop-blur-sm">
            <div className="flex w-max gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilterChange(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${activeFilter === filter ? "border-ink bg-ink text-white" : "border-hairline bg-canvas text-body hover:-translate-y-0.5 hover:border-black/30 hover:text-ink"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" aria-labelledby="latest-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-mute">Latest Thinking</p>
              <h2 id="latest-heading" className="mt-3 text-4xl font-semibold tracking-tight text-ink">Built from real work.</h2>
            </div>
            <p className="text-sm text-mute">{filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"} found</p>
          </div>

          {displayedPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">{displayedPosts.map((post, index) => <ArticleCard key={post.slug} post={post} index={index} />)}</div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-hairline p-12 text-center">
              <p className="text-lg font-medium text-ink">No articles in this topic yet.</p>
              <p className="mt-2 text-sm text-body">Try another area of expertise or return to all articles.</p>
              <button type="button" onClick={() => onFilterChange("All")} className="mt-5 text-sm font-medium text-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">View all articles</button>
            </div>
          )}

          {articlePosts.length > visibleCount ? (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setVisibleCount((count) => count + 4)} className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">Load more articles</button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-y border-hairline bg-canvas-soft px-6 py-14 md:py-20">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-ink md:text-4xl text-balance">
            “Good engineering is visible in the outcomes, not the noise.”
          </blockquote>
          <figcaption className="mt-5 text-sm text-mute">Zabnix Engineering Principles</figcaption>
        </figure>
      </section>

      <section className="px-6 py-16 md:py-24" aria-labelledby="newsletter-heading">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[30px] border border-hairline bg-canvas-soft p-7 md:grid-cols-[1fr_.9fr] md:p-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-mute">The Weekly Signal</p>
            <h2 id="newsletter-heading" className="mt-4 text-4xl font-semibold tracking-tight text-ink text-balance">One useful engineering perspective, every week.</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-body">A concise digest on building reliable software, operations systems, and AI automation. No noise.</p>
          </div>
          <div className="self-center">
            {subscribed ? (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-600/20 bg-white p-5 text-sm text-ink" aria-live="polite">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><Check size={14} strokeWidth={2.5} aria-hidden="true" /></span>
                <span><strong className="block">You’re on the list.</strong><span className="mt-1 block text-body">Your first edition is on its way.</span></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3" aria-label="Newsletter signup">
                <label htmlFor="newsletter-email" className="sr-only">Work email address</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" size={17} aria-hidden="true" />
                    <input id="newsletter-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com…" className="w-full rounded-xl border border-hairline bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink" />
                  </div>
                  <button type="submit" className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">Subscribe</button>
                </div>
                <p className="text-xs text-mute">No spam. Unsubscribe whenever you want.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline px-6 py-16" aria-labelledby="topics-heading">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-mute">Explore By Topic</p>
            <h2 id="topics-heading" className="mt-3 text-3xl font-semibold tracking-tight text-ink">Find the work that matters to you.</h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {topicLinks.map((topic) => (
              <button key={topic} type="button" onClick={() => onFilterChange(topicFilterMap[topic])} className="group inline-flex items-center gap-1 text-sm font-medium text-body transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">
                {topic}<ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
