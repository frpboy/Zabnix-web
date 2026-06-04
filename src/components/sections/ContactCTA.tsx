import Link from "next/link";
import { ArrowRight, Calendar, Mail, Phone, MapPin } from "lucide-react";

export function ContactCTA() {
  return (
    <section
      className="py-32 px-6 border-t border-white/8 relative overflow-hidden"
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
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA text */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
              Get Started
            </p>
            <h2
              id="cta-heading"
              className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
              style={{ textWrap: "balance" }}
            >
              Ready to transform your business?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
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
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-violet-500/40 transition-colors duration-200 shrink-0">
                    <Icon size={15} aria-hidden="true" />
                  </div>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Quick contact card */}
          <div className="relative">
            <div className="border border-white/10 bg-[#0a0a0a] rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Send us a message
              </h3>
              <form
                aria-label="Quick contact form"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Rahul Sharma…"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
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
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                  >
                    What are you building?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Describe your project or requirements…"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Send Message
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Glow */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-10 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
