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
    <section className="py-16 border-t border-b border-hairline overflow-hidden bg-canvas-soft" aria-label="Trusted by industries">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-mute">
          Trusted Across Industries
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%)",
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
                <div className="w-1.5 h-1.5 rounded-full bg-link/60" />
                <span className="text-sm font-medium text-body tracking-wide">
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
