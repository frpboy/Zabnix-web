import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Meet the Zabnix team — a globally distributed group of engineers, designers, and strategists building the future of enterprise software.",
};

const stats = [
  { value: "50+", label: "Clients" },
  { value: "4", label: "Countries" },
  { value: "3", label: "Languages" },
  { value: "2021", label: "Founded" },
];

const team = [
  {
    name: "Rahul Kumar",
    handle: "@rahul_k",
    role: "Founder & CEO",
    location: "Hyderabad, India",
    initial: "R",
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    name: "Priya Sharma",
    handle: "@priya_s",
    role: "CTO",
    location: "Bangalore, India",
    initial: "P",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    name: "Aditya Menon",
    handle: "@adim",
    role: "Lead Engineer",
    location: "Kochi, India",
    initial: "A",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    name: "Sara Ahmed",
    handle: "@sara_ah",
    role: "Design Engineer",
    location: "Dubai, UAE",
    initial: "S",
    gradient: "from-orange-600 to-amber-600",
  },
  {
    name: "Vikram Nair",
    handle: "@vikr",
    role: "Backend Architect",
    location: "Mumbai, India",
    initial: "V",
    gradient: "from-pink-600 to-rose-600",
  },
  {
    name: "Fatima Al-Rashid",
    handle: "@fatima_r",
    role: "AI Engineer",
    location: "Riyadh, KSA",
    initial: "F",
    gradient: "from-indigo-600 to-violet-600",
  },
  {
    name: "Kiran Das",
    handle: "@kiran_d",
    role: "Mobile Engineer",
    location: "Hyderabad, India",
    initial: "K",
    gradient: "from-teal-600 to-emerald-600",
  },
  {
    name: "Mia Chen",
    handle: "@mia_c",
    role: "Product Manager",
    location: "Singapore",
    initial: "M",
    gradient: "from-sky-600 to-blue-600",
  },
];

export default function CompanyPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-purple"
          style={{
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.12,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Our Company
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Meet the people building Zabnix
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Designers, engineers, and strategists united by a belief that great
            software changes how businesses operate.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-b border-white/8" aria-label="Company statistics">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-4xl font-bold text-white mb-2"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Global presence */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed" style={{ textWrap: "balance" }}>
            Remote, but together. We speak{" "}
            <span className="gradient-brand">3 languages</span> and live in{" "}
            <span className="gradient-brand">4 countries</span>.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-8 px-6 pb-32" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <h2
            id="team-heading"
            className="text-xs font-semibold text-gray-600 uppercase tracking-widest text-center mb-12"
          >
            The Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group card-glow border border-white/8 bg-[#0a0a0a] rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-xl font-bold select-none group-hover:scale-105 transition-transform duration-300`}
                >
                  {member.initial}
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-1 truncate" translate="no">
                    {member.handle}
                  </p>
                  <p className="text-xs text-gray-400 font-medium truncate">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-gray-600">
                    <MapPin size={11} aria-hidden="true" />
                    <span className="text-xs truncate">{member.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Join the team</h2>
          <p className="text-gray-400 mb-8">
            We&#39;re always looking for sharp engineers, designers, and
            problem-solvers. See open roles.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            View Open Roles
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
