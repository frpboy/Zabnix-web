"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROTATING_WORDS = [
  { text: "engineers", colorClass: "from-develop-start to-develop-end" },
  { text: "designers", colorClass: "from-preview-start to-preview-end" },
  { text: "builders",  colorClass: "from-ship-start to-ship-end" },
  { text: "strategists", colorClass: "from-blue-600 to-indigo-500" },
] as const;

const stats = [
  { value: "50+",  label: "Clients Served" },
  { value: "4",    label: "Countries" },
  { value: "3",    label: "Languages" },
  { value: "2021", label: "Founded" },
] as const;

const team = [
  {
    name: "Rahul Kumar",
    handle: "@rahulk",
    role: "Founder & CEO",
    location: "Hyderabad, India",
    initial: "R",
    from: "#7928ca",
    to: "#5a67d8",
  },
  {
    name: "Priya Sharma",
    handle: "@priya_s",
    role: "Chief Technology Officer",
    location: "Bangalore, India",
    initial: "P",
    from: "#0070f3",
    to: "#00dfd8",
  },
  {
    name: "Aditya Menon",
    handle: "@adim",
    role: "Lead Engineer",
    location: "Kochi, India",
    initial: "A",
    from: "#10b981",
    to: "#0ea5e9",
  },
  {
    name: "Sara Ahmed",
    handle: "@sara_ah",
    role: "Design Engineer",
    location: "Dubai, UAE",
    initial: "S",
    from: "#f59e0b",
    to: "#ef4444",
  },
  {
    name: "Vikram Nair",
    handle: "@vikr",
    role: "Backend Architect",
    location: "Mumbai, India",
    initial: "V",
    from: "#ec4899",
    to: "#8b5cf6",
  },
  {
    name: "Fatima Al-Rashid",
    handle: "@fatima_r",
    role: "AI Engineer",
    location: "Riyadh, KSA",
    initial: "F",
    from: "#6366f1",
    to: "#a78bfa",
  },
  {
    name: "Kiran Das",
    handle: "@kiran_d",
    role: "Mobile Engineer",
    location: "Hyderabad, India",
    initial: "K",
    from: "#14b8a6",
    to: "#0ea5e9",
  },
  {
    name: "Mia Chen",
    handle: "@mia_c",
    role: "Product Manager",
    location: "Singapore",
    initial: "M",
    from: "#0ea5e9",
    to: "#6366f1",
  },
] satisfies TeamMember[];

const values = [
  "Innovation",
  "Integrity",
  "Customer Success",
  "Quality Engineering",
  "Continuous Learning",
  "Transparency",
  "Reliability",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  handle: string;
  role: string;
  location: string;
  initial: string;
  from: string;
  to: string;
}

// ─── Team Card ────────────────────────────────────────────────────────────────

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="group relative bg-canvas border border-hairline rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-level-4 hover:border-hairline-strong cursor-default shadow-level-2"
      aria-label={`${member.name}, ${member.role}, ${member.location}`}
    >
      {/* Portrait avatar */}
      <div className="relative w-full" style={{ paddingBottom: "120%" }}>
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold select-none transition-transform duration-500 group-hover:scale-[1.03]"
          style={{
            background: `linear-gradient(145deg, ${member.from} 0%, ${member.to} 100%)`,
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
          }}
          aria-hidden="true"
        >
          {member.initial}
        </div>
        {/* Bottom gradient veil for legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Info */}
      <div className="p-4 pt-3">
        <p className="text-sm font-semibold text-ink truncate leading-tight">
          {member.name}
        </p>
        <p
          className="text-xs text-mute font-mono truncate mt-0.5"
          translate="no"
        >
          {member.handle}
        </p>
        <p className="text-xs text-body font-medium truncate mt-1">
          {member.role}
        </p>
        <div className="flex items-center gap-1 mt-2 text-mute">
          <MapPin size={10} aria-hidden="true" />
          <span className="text-xs truncate font-mono">{member.location}</span>
        </div>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CompanyClient() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      const swap = setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 300);
      return () => clearTimeout(swap);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentWord = ROTATING_WORDS[wordIdx];

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-hairline bg-canvas grid-bg py-28 px-6">
        {/* Ambient orb */}
        <div
          className="orb orb-purple pulse-glow"
          style={{
            width: 640,
            height: 640,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.07,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-7 fade-in-up">
            Zabnix — The Team
          </p>

          <h1
            className="text-5xl md:text-7xl font-semibold text-ink tracking-[-0.04em] leading-[1.1] mb-7 fade-in-up fade-in-up-delay-1"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Meet our team of{" "}
            <span
              className={cn(
                "inline-block bg-gradient-to-r bg-clip-text text-transparent",
                currentWord.colorClass,
                "transition-opacity transition-transform duration-300 ease-out",
                wordVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              )}
              style={{ minWidth: "10ch" }}
              aria-live="polite"
              aria-atomic="true"
            >
              {currentWord.text}
            </span>
            .
          </h1>

          <p className="text-lg md:text-xl text-body leading-relaxed max-w-2xl mx-auto fade-in-up fade-in-up-delay-2">
            Zabnix has brought together engineers, designers, and strategists
            who believe that great software changes how businesses operate.
          </p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="border-b border-hairline bg-canvas" aria-label="Company statistics">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "py-10 flex flex-col items-center justify-center gap-1",
                i < stats.length - 1 && "md:border-r border-hairline",
                i % 2 === 0 && i < 2 && "border-r border-hairline md:border-r-0"
              )}
            >
              <span
                className="text-4xl font-semibold text-ink tracking-tight"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-mute font-mono uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Global presence ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-hairline bg-canvas">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-3xl md:text-4xl font-semibold text-ink leading-[1.3]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Remote, but together. We speak{" "}
            <span className="bg-gradient-to-r from-develop-start to-develop-end bg-clip-text text-transparent">
              3&nbsp;languages
            </span>{" "}
            and live in{" "}
            <span className="bg-gradient-to-r from-preview-start to-preview-end bg-clip-text text-transparent">
              4&nbsp;countries
            </span>
            .
          </p>
          <p className="mt-6 text-body max-w-xl mx-auto leading-relaxed">
            Our work spans India, the UAE, KSA, and Singapore — building
            software that works for businesses everywhere.
          </p>
        </div>
      </section>

      {/* ── Team grid ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 pb-32" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="team-heading"
            className="text-xs font-mono font-semibold text-mute uppercase tracking-[0.2em] text-center mb-12"
          >
            The People
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>

          {/* Replace placeholder notice */}
          <p className="text-center text-xs text-mute font-mono mt-10 opacity-60">
            Team profiles are representative and will be updated with real data.
          </p>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-b border-hairline bg-canvas">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs font-mono font-semibold text-mute uppercase tracking-[0.2em] mb-8">
            What We Stand For
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="px-4 py-2 bg-canvas-soft border border-hairline rounded-full text-sm text-body font-medium shadow-level-1 hover:border-hairline-strong hover:shadow-level-2 transition-all duration-200 cursor-default"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center bg-canvas-soft">
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-semibold text-ink mb-4 tracking-tight"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Join the team.
          </h2>
          <p className="text-body mb-10 leading-relaxed">
            We&apos;re always looking for sharp engineers, designers, and
            problem&#8209;solvers who want to build something meaningful.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-soft"
          >
            View Open Roles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
