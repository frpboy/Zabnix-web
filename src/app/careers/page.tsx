import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Zabnix — build impactful software for real businesses and grow alongside a talented team of engineers and designers.",
};

import { openRoles } from "@/lib/data";

const perks = [
  { emoji: "🌍", title: "Remote First", desc: "Work from anywhere, with async-friendly processes." },
  { emoji: "📈", title: "Equity Options", desc: "Meaningful ownership in a fast-growing company." },
  { emoji: "🏥", title: "Health Insurance", desc: "Comprehensive coverage for you and your family." },
  { emoji: "📚", title: "Learning Budget", desc: "₹50K/yr for courses, books, and conferences." },
  { emoji: "🖥️", title: "Home Office Setup", desc: "MacBook Pro + home office budget on day one." },
  { emoji: "⚡", title: "Flexible Hours", desc: "Own your schedule. We care about output, not hours." },
];

export default function CareersPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-purple"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Careers at Zabnix
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Build the future of enterprise software
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Join a team of sharp engineers and designers shipping real products
            that transform how businesses operate.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 px-6 border-t border-white/8" aria-labelledby="perks-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="perks-heading"
            className="text-xs font-semibold text-gray-600 uppercase tracking-widest text-center mb-12"
          >
            Why Join Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="border border-white/8 bg-[#0a0a0a] rounded-2xl p-6"
              >
                <div className="text-3xl mb-4">{perk.emoji}</div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-gray-500">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-16 px-6 border-t border-white/8" aria-labelledby="roles-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="roles-heading"
            className="text-3xl font-bold text-white mb-12"
          >
            Open Roles
          </h2>
          <div className="space-y-3">
            {openRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/8 bg-[#0a0a0a] hover:bg-white/3 rounded-xl px-6 py-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors duration-200 truncate">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 size={11} aria-hidden="true" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} aria-hidden="true" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} aria-hidden="true" />
                      {role.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-violet-400 transition-colors duration-200 shrink-0">
                  Apply
                  <ArrowRight
                    size={14}
                    className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don&#39;t see your role?
          </h2>
          <p className="text-gray-400 mb-8">
            We love meeting talented people. Send us your portfolio and tell us
            how you&#39;d contribute to Zabnix.
          </p>
          <a
            href="mailto:careers@zabnix.com"
            className="inline-flex items-center gap-2 border border-white/15 bg-white/5 text-white text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors duration-200"
          >
            Email careers@zabnix.com
          </a>
        </div>
      </section>
    </div>
  );
}
