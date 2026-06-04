"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ProductDemoFormProps {
  productName: string;
}

export function ProductDemoForm({ productName }: ProductDemoFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API demo request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle2 size={40} className="text-emerald-400" aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">Demo Requested</h3>
        <p className="text-xs text-gray-400">
          We have received your demo request for <strong>{productName}</strong>. A product specialist will email you shortly to coordinate a time.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-gray-500 hover:text-white transition-colors duration-200"
        >
          Request another demo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label={`Request demo for ${productName}`}>
      <div>
        <label
          htmlFor="demo-name"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
        >
          Full Name
        </label>
        <input
          id="demo-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Rahul Sharma…"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="demo-company"
            className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
          >
            Company
          </label>
          <input
            id="demo-company"
            type="text"
            name="company"
            autoComplete="organization"
            required
            placeholder="Acme Corp…"
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          />
        </div>
        <div>
          <label
            htmlFor="demo-title"
            className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
          >
            Job Title
          </label>
          <input
            id="demo-title"
            type="text"
            name="jobTitle"
            placeholder="CTO / Operations Manager…"
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="demo-email"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
        >
          Work Email
        </label>
        <input
          id="demo-email"
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="you@company.com…"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <label
          htmlFor="demo-phone"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
        >
          Phone Number
        </label>
        <input
          id="demo-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder="+91 98765 43210…"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <label
          htmlFor="demo-notes"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
        >
          Special Requirements / Notes
        </label>
        <textarea
          id="demo-notes"
          name="notes"
          rows={3}
          placeholder="Let us know what specific operational workflows you'd like to focus on…"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold px-4 py-3.5 rounded-xl hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {submitting ? "Requesting Demo…" : "Request Demo"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}
