import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden bg-canvas-soft">
      {/* Vercel-Inspired Mesh Gradient Backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] rounded-full filter blur-[100px] opacity-40 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(0, 124, 240, 0.15) 0%, rgba(0, 223, 216, 0.03) 70%)",
            top: "10%",
            left: "20%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-35 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(121, 40, 202, 0.15) 0%, rgba(255, 0, 128, 0.03) 70%)",
            top: "20%",
            right: "10%",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-30 animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, rgba(255, 77, 77, 0.12) 0%, rgba(249, 203, 40, 0.02) 70%)",
            bottom: "10%",
            left: "40%",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Eyebrow Badge */}
        <div className="fade-in-up inline-flex items-center gap-2 border border-hairline bg-canvas rounded-full px-4 py-1.5 mb-8 shadow-level-1">
          <Zap size={12} className="text-link" aria-hidden="true" />
          <span className="text-xs text-body font-mono uppercase tracking-widest">
            Premium Product Engineering
          </span>
        </div>

        {/* Headline: Sentence-case, period-terminated, negatively tracked */}
        <h1
          className="fade-in-up fade-in-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-ink mb-6 leading-none"
          style={{ textWrap: "balance" }}
        >
          Build faster.
          <br />
          <span className="bg-gradient-to-r from-develop-start via-preview-start to-ship-start bg-clip-text text-transparent">
            Automate smarter.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="fade-in-up fade-in-up-delay-2 text-lg md:text-xl text-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textWrap: "pretty" }}
        >
          Software development, AI solutions, ERP systems, mobile apps &amp;
          business automation — engineered for real enterprise growth.
        </p>

        {/* CTAs: Pill shape for marketing scale */}
        <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact#consultation"
            className="inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-soft"
          >
            Book Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-hairline bg-canvas text-ink text-sm font-medium px-8 py-3.5 rounded-full hover:bg-canvas-soft-2 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
          >
            View Products
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-in-up fade-in-up-delay-4 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-hairline pt-10">
          {[
            { value: "50+", label: "Clients Served" },
            { value: "3x", label: "Faster Delivery" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-ink font-variant-numeric tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-mute mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas-soft to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
