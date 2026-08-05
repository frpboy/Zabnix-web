import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CaseStudyCtaProps = {
  href: string;
  label?: string;
};

export function CaseStudyCta({ href, label = "Read Full Case Study" }: CaseStudyCtaProps) {
  return (
    <Link
      href={href}
      className="group relative inline-flex touch-manipulation items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/30 bg-black px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-[transform,border-color,box-shadow] duration-300 ease-in-out hover:scale-105 hover:border-white/60 hover:shadow-[0_14px_24px_rgba(0,0,0,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
    >
      <span
        className="pointer-events-none absolute inset-y-0 -left-28 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 transition-transform duration-700 ease-out group-hover:translate-x-[360px]"
        aria-hidden="true"
      />
      <span className="relative z-10">{label}</span>
      <ArrowRight
        size={18}
        className="relative z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
