import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2 } from "lucide-react";
import { getJobRoles } from "@/sanity/lib/loaders";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Zabnix — build impactful software for real businesses and grow alongside a talented team of engineers and designers.",
};

const perks = [
  { emoji: "🌍", title: "Remote First", desc: "Work from anywhere, with async-friendly processes." },
  { emoji: "📈", title: "Equity Options", desc: "Meaningful ownership in a fast-growing company." },
  { emoji: "🏥", title: "Health Insurance", desc: "Comprehensive coverage for you and your family." },
  { emoji: "📚", title: "Learning Budget", desc: "₹50K/yr for courses, books, and conferences." },
  { emoji: "🖥️", title: "Home Office Setup", desc: "MacBook Pro + home office budget on day one." },
  { emoji: "⚡", title: "Flexible Hours", desc: "Own your schedule. We care about output, not hours." },
];

export default async function CareersPage() {
  const openRoles = await getJobRoles();

  return (
    <div className="pt-24 min-h-screen bg-canvas-soft">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
        <div
          className="orb orb-purple pulse-glow"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            Careers at Zabnix
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Build the future of enterprise software.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
            Join a team of sharp engineers and designers shipping real products
            that transform how businesses operate.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 px-6 bg-canvas-soft-2/10" aria-labelledby="perks-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="perks-heading"
            className="text-xs font-mono uppercase tracking-[0.2em] text-center text-mute mb-12"
          >
            Why Join Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="border border-hairline bg-canvas rounded-2xl p-6 shadow-level-2 hover:shadow-level-3 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{perk.emoji}</div>
                <h3 className="text-sm font-semibold text-ink mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-body">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-24 px-6 bg-canvas-soft" aria-labelledby="roles-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="roles-heading"
            className="text-3xl font-semibold text-ink mb-12 tracking-tight"
          >
            Open Roles
          </h2>
          <div className="space-y-4">
            {openRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-hairline bg-canvas hover:bg-canvas-soft-2/50 rounded-xl px-6 py-5 transition-all duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-ink group-hover:text-link transition-colors duration-200 truncate">
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-mute font-mono">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-mute shrink-0" aria-hidden="true" />
                      {role.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-mute shrink-0" aria-hidden="true" />
                      {role.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-mute shrink-0" aria-hidden="true" />
                      {role.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-mute group-hover:text-ink transition-colors duration-200 shrink-0 font-medium">
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
      <section className="py-24 px-6 border-t border-hairline text-center bg-canvas">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-ink mb-4 tracking-tight">
            Don&#39;t see your role?
          </h2>
          <p className="text-body mb-8">
            We love meeting talented people. Send us your portfolio and tell us
            how you&#39;d contribute to Zabnix.
          </p>
          <a
            href="mailto:careers@zabnix.com"
            className="inline-flex items-center gap-2 border border-hairline bg-canvas text-ink text-sm font-medium px-6 py-3.5 rounded-full hover:bg-canvas-soft transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
          >
            Email careers@zabnix.com
          </a>
        </div>
      </section>
    </div>
  );
}
