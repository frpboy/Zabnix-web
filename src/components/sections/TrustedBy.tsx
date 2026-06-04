const industries = [
  "Healthcare",
  "Pharmaceuticals",
  "Retail & E-Commerce",
  "Education",
  "Manufacturing",
  "Logistics",
  "Finance",
  "Real Estate",
  "Healthcare",
  "Pharmaceuticals",
  "Retail & E-Commerce",
  "Education",
  "Manufacturing",
  "Logistics",
  "Finance",
  "Real Estate",
];

export function TrustedBy() {
  return (
    <section className="py-16 border-t border-b border-white/8 overflow-hidden" aria-label="Trusted by industries">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-600 uppercase">
          Trusted Across Industries
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #000000 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, #000000 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="overflow-hidden" aria-hidden="true">
          <div className="marquee-track">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="flex items-center gap-3 mr-12 whitespace-nowrap"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
                <span className="text-sm font-medium text-gray-500 tracking-wide">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
