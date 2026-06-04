"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 grid-bg relative overflow-hidden">
        <div
          className="orb orb-purple"
          style={{
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4">
            Contact Us
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6"
            style={{ textWrap: "balance" }}
          >
            Let&#39;s talk about your project
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We&#39;ll review your requirements, suggest an architecture, and
            give you a realistic timeline and budget estimate — no strings
            attached.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-24 px-6 border-t border-white/8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-6">
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
                    value: "Hyderabad, Telangana, India",
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
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-violet-500/40 transition-colors duration-200 shrink-0 mt-0.5">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-0.5">
                        {label}
                      </div>
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/8 pt-8">
              <h2 className="text-sm font-semibold text-white mb-4">
                What happens next?
              </h2>
              <div className="space-y-4">
                {[
                  "We review your submission within 24 hours",
                  "Schedule a free 30-min discovery call",
                  "Receive a scoped proposal & timeline",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4" role="alert" aria-live="polite">
                <CheckCircle2
                  size={48}
                  className="text-emerald-400"
                  aria-hidden="true"
                />
                <h2 className="text-2xl font-bold text-white">
                  Message sent!
                </h2>
                <p className="text-gray-400 max-w-md">
                  Thanks for reaching out. We&#39;ll get back to you within 24
                  hours with next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-gray-500 hover:text-white transition-colors duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                id="consultation"
                onSubmit={handleSubmit}
                aria-label="Contact form"
                className="border border-white/8 bg-[#0a0a0a] rounded-2xl p-8 space-y-6"
              >
                <h2 className="text-xl font-bold text-white">
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cf-name"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
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
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-company"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      name="company"
                      autoComplete="organization"
                      placeholder="Acme Corp…"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cf-email"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
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
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cf-service"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                  >
                    Service Needed
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="">Select a service…</option>
                    <option value="software">Software Development</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="erp">ERP Solution</option>
                    <option value="ai">AI & Automation</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cf-message"
                    className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe what you&#x27;re building, your timeline, and budget range…"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-6 py-4 rounded-xl hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
