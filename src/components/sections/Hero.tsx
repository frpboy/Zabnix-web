import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Background orbs */}
      <div
        className="orb orb-purple pulse-glow"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translate(-100px, -80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="orb orb-blue pulse-glow"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translate(120px, 60px)",
          animationDelay: "1.5s",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <div className="fade-in-up inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 rounded-full px-4 py-1.5 mb-8">
          <Zap size={12} className="text-violet-400" aria-hidden="true" />
          <span className="text-xs text-violet-300 font-medium tracking-wide">
            Premium Product Engineering
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-in-up fade-in-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none"
          style={{ textWrap: "balance" }}
        >
          <span className="text-white">Build Faster.</span>
          <br />
          <span className="gradient-brand">Automate Smarter.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="fade-in-up fade-in-up-delay-2 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textWrap: "pretty" }}
        >
          Software Development, AI Solutions, ERP Systems, Mobile Apps &
          Business Automation — engineered for real enterprise growth.
        </p>

        {/* CTAs */}
        <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact#consultation"
            className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Book Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-white text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/25 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            View Products
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-in-up fade-in-up-delay-4 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "50+", label: "Clients Served" },
            { value: "3x", label: "Faster Delivery" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white font-variant-numeric tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
