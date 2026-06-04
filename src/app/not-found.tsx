import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg relative bg-canvas-soft">
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
      <div className="text-center relative z-10">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
          404
        </p>
        <h1 className="text-5xl font-semibold text-ink tracking-tight mb-4">Page not found</h1>
        <p className="text-body mb-8 max-w-md mx-auto">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-ink/90 transition-colors duration-200 shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          Back to Home
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
