import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InteractiveHeroTitle from "@/components/ui/InteractiveHeroTitle";

export function Hero() {
  return (
    <section className="relative flex min-h-[74vh] items-center justify-center overflow-hidden bg-canvas-soft grid-bg lg:min-h-[80vh]">
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
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 text-center lg:pt-24">
        <InteractiveHeroTitle
          title="Build faster."
          highlightText="Automate smarter."
        />

        <p
          className="fade-in-up fade-in-up-delay-2 text-lg md:text-xl text-body max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textWrap: "pretty" }}
        >
          From startups to enterprises, we create custom digital solutions that
          streamline operations, enhance customer experiences, and drive
          business growth.
        </p>

        <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact#consultation"
            className="neu-button neu-button-dark inline-flex items-center justify-center gap-2"
          >
            Book Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/products"
            className="neu-button neu-button-light inline-flex items-center justify-center gap-2"
          >
            View Products
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-canvas-soft to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
