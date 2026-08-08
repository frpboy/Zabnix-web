"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="pt-24 bg-canvas-soft min-h-screen">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden border-b border-hairline bg-canvas">
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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-mute mb-4">
            Contact Us
          </p>
          <h1
            className="text-5xl md:text-6xl font-semibold text-ink tracking-[-0.03em] mb-6"
            style={{ textWrap: "balance" }}
          >
            Let&#39;s talk about your project.
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl mx-auto">
            We&#39;ll review your requirements, suggest an architecture, and
            give you a realistic timeline and budget estimate — no strings
            attached.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-24 px-6" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">Contact Details and Form</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-semibold text-ink mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@zabnix.com",
                    href: "mailto:hello@zabnix.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Kerala, India",
                    href: "#",
                  },
                  {
                    icon: Calendar,
                    label: "Business Hours",
                    value: "Mon–Fri, 9AM–6PM IST",
                    href: "#",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 border border-hairline rounded-xl flex items-center justify-center text-body bg-canvas group-hover:text-ink group-hover:border-hairline-strong transition-colors duration-200 shrink-0 mt-0.5 shadow-level-1">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-mute mb-0.5 font-mono uppercase tracking-wider">
                        {label}
                      </div>
                      <div className="text-sm text-body group-hover:text-ink transition-colors duration-200">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-8">
              <h2 className="text-sm font-semibold text-ink mb-4 font-mono uppercase tracking-wider">
                What happens next?
              </h2>
              <div className="space-y-4">
                {[
                  "We review your submission within 24 hours.",
                  "Schedule a free 30-min discovery call.",
                  "Receive a scoped proposal &amp; timeline.",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-link/10 text-link text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {i + 1}
                    </div>
                    <span className="text-sm text-body">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="border border-emerald-200 bg-emerald-50/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4 shadow-level-3" role="alert" aria-live="polite">
                <CheckCircle2
                  size={48}
                  className="text-emerald-600"
                  aria-hidden="true"
                />
                <h2 className="text-2xl font-semibold text-ink tracking-tight">
                  Message sent!
                </h2>
                <p className="text-body max-w-md">
                  Thanks for reaching out. We&#39;ll get back to you within 24
                  hours with next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-mute hover:text-ink transition-colors duration-200 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                id="consultation"
                onSubmit={handleSubmit}
                aria-label="Contact form"
                suppressHydrationWarning
                className="border border-hairline bg-canvas rounded-2xl p-8 space-y-6 shadow-level-3"
              >
                <h2 className="text-xl font-semibold text-ink">
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cf-name"
                      className="block text-xs font-mono font-semibold text-body uppercase tracking-wider mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Rahul Sharma…"
                      suppressHydrationWarning
                      className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-company"
                      className="block text-xs font-mono font-semibold text-body uppercase tracking-wider mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      name="company"
                      autoComplete="organization"
                      placeholder="Acme Corp…"
                      suppressHydrationWarning
                      className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cf-email"
                    className="block text-xs font-mono font-semibold text-body uppercase tracking-wider mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    placeholder="you@company.com…"
                    suppressHydrationWarning
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link transition-colors duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cf-service"
                    className="block text-xs font-mono font-semibold text-body uppercase tracking-wider mb-2"
                  >
                    Service Needed
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
                    style={{ colorScheme: "light" }}
                  >
                    <option value="">Select a service…</option>
                    <option value="software">Software Development</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="erp">ERP Solution</option>
                    <option value="ai">AI &amp; Automation</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cf-message"
                    className="block text-xs font-mono font-semibold text-body uppercase tracking-wider mb-2"
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe what you&#x27;re building, your timeline, and budget range…"
                    className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-3 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-semibold px-6 py-4 rounded-[6px] hover:bg-ink/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  {submitting ? "Sending…" : "Send Message"}
                  {!submitting && <ArrowRight size={16} aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
