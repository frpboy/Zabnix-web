import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg relative">
      <div
        className="orb orb-purple"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.1,
        }}
        aria-hidden="true"
      />
      <div className="text-center relative z-10">
        <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
          404
        </p>
        <h1 className="text-5xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
        >
          Back to Home
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
