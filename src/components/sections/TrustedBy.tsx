import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Pill,
  ShoppingBag,
  Truck,
} from "lucide-react";

type IndustryItem = {
  label: string;
  Icon: LucideIcon;
};

const industries: IndustryItem[] = [
  { label: "Healthcare", Icon: HeartPulse },
  { label: "Pharmaceuticals", Icon: Pill },
  { label: "Retail & E-Commerce", Icon: ShoppingBag },
  { label: "Education", Icon: GraduationCap },
  { label: "Manufacturing", Icon: Factory },
  { label: "Logistics", Icon: Truck },
  { label: "Finance", Icon: Landmark },
  { label: "Real Estate", Icon: Building2 },
];

const marqueeItems = [...industries, ...industries];

export function TrustedBy() {
  return (
    <section
      className="overflow-hidden bg-canvas-soft py-16"
      aria-label="Trusted by industries"
    >
      <div className="mx-auto mb-9 max-w-7xl px-6">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400">
          Trusted Across Industries
        </p>
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-track trusted-industries-track"
          style={{ animationDuration: "52s", willChange: "transform" }}
        >
          {marqueeItems.map((industry, index) => {
            const Icon = industry.Icon;

            return (
              <div
                key={`${industry.label}-${index}`}
                className="group trusted-industry-item mr-[72px] flex shrink-0 items-center gap-[10px] whitespace-nowrap text-neutral-600 transition-transform duration-300 ease-out hover:scale-[1.03]"
              >
                <Icon
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-neutral-500 transition-colors duration-300 ease-out group-hover:text-neutral-900"
                  aria-hidden="true"
                />
                <span className="text-[15px] font-medium tracking-[0.01em] text-neutral-600 transition-colors duration-300 ease-out group-hover:text-neutral-900">
                  {industry.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
