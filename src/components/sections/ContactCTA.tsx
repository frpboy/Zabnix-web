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
                  label: "Kerala, India",
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

          {/* Right: monochrome contact form */}
          <div className="rounded-[25px] bg-[linear-gradient(135deg,#171717_0%,#737373_50%,#171717_100%)] p-px shadow-[0_18px_44px_rgba(0,0,0,0.12)] transition-[box-shadow] duration-300 ease-out hover:shadow-[0_24px_52px_rgba(0,0,0,0.18)]">
            <div className="rounded-[24px] bg-white px-8 pb-8 pt-7">
              <h3 className="mb-6 text-xl font-semibold text-black">Send us a message</h3>
              <form aria-label="Quick contact form" className="space-y-4" suppressHydrationWarning>
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-xs font-mono uppercase tracking-wider text-neutral-600">Your Name</label>
                  <input id="contact-name" type="text" name="name" autoComplete="name" defaultValue="" placeholder="Rahul Sharma…" suppressHydrationWarning className="w-full rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm text-black shadow-[inset_2px_3px_8px_rgba(0,0,0,0.06)] placeholder:text-neutral-400 transition-[border-color,background-color] duration-200 hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-xs font-mono uppercase tracking-wider text-neutral-600">Work Email</label>
                  <input id="contact-email" type="email" name="email" autoComplete="email" spellCheck={false} defaultValue="" placeholder="you@company.com…" suppressHydrationWarning className="w-full rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm text-black shadow-[inset_2px_3px_8px_rgba(0,0,0,0.06)] placeholder:text-neutral-400 transition-[border-color,background-color] duration-200 hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-xs font-mono uppercase tracking-wider text-neutral-600">What are you building?</label>
                  <textarea id="contact-message" name="message" rows={4} defaultValue="" placeholder="Describe your project or requirements…" suppressHydrationWarning className="w-full resize-none rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm text-black shadow-[inset_2px_3px_8px_rgba(0,0,0,0.06)] placeholder:text-neutral-400 transition-[border-color,background-color] duration-200 hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black" />
                </div>
                <button type="button" suppressHydrationWarning className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-neutral-800 hover:shadow-[0_10px_22px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
                  Send Message
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
