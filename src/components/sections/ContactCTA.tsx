import Link from "next/link";
import { ArrowRight, Calendar, Mail, Phone, MapPin } from "lucide-react";

export function ContactCTA() {
  return (
    <section
      className="py-32 px-6 border-t border-hairline relative overflow-hidden bg-canvas-soft"
      aria-labelledby="cta-heading"
    >
      {/* Background orbs */}
      <div
        className="orb orb-purple pulse-glow"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translate(-80px, 0px)",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA text */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
              Get Started
            </p>
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-semibold text-ink tracking-[-0.03em] mb-6"
              style={{ textWrap: "balance" }}
            >
              Ready to transform your business?
            </h2>
            <p className="text-lg text-body leading-relaxed mb-10">
              Let&#39;s talk about your project. We&#39;ll review your
              requirements, suggest an architecture, and give you a realistic
              timeline and budget estimate — no strings attached.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Calendar,
                  label: "Book a free 30-min consultation",
                  href: "/contact#consultation",
                },
                {
                  icon: Mail,
                  label: "hello@zabnix.com",
                  href: "mailto:hello@zabnix.com",
                },
                {
                  icon: Phone,
                  label: "+91 98765 43210",
                  href: "tel:+919876543210",
                },
                {
                  icon: MapPin,
                  label: "Hyderabad, India",
                  href: "#",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-sm text-body hover:text-ink transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-hairline bg-canvas flex items-center justify-center group-hover:border-hairline-strong transition-colors duration-200 shrink-0">
                    <Icon size={15} className="text-body group-hover:text-ink" aria-hidden="true" />
                  </div>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Quick contact card (ex-auth-form-card style) */}
          <div className="relative">
            <div className="border border-hairline bg-canvas rounded-2xl p-8 shadow-level-3">
              <h3 className="text-xl font-semibold text-ink mb-6">
                Send us a message
              </h3>
              <form
                aria-label="Quick contact form"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-body mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Rahul Sharma…"
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-body mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="you@company.com…"
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-body mb-2"
                  >
                    What are you building?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Describe your project or requirements…"
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-semibold px-6 py-3.5 rounded-[6px] hover:bg-ink/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  Send Message
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Glow */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-5 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
