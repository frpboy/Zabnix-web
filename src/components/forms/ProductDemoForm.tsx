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
        className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-level-2"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle2 size={40} className="text-emerald-600" aria-hidden="true" />
        <h3 className="text-lg font-bold text-ink">Demo Requested</h3>
        <p className="text-xs text-body">
          We have received your demo request for <strong>{productName}</strong>. A product specialist will email you shortly to coordinate a time.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs text-mute hover:text-ink transition-colors duration-200 underline"
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
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Full Name
        </label>
        <input
          suppressHydrationWarning
          id="demo-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Rahul Sharma…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="demo-company"
            className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
          >
            Company
          </label>
          <input
            suppressHydrationWarning
            id="demo-company"
            type="text"
            name="company"
            autoComplete="organization"
            required
            placeholder="Acme Corp…"
            className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
          />
        </div>
        <div>
          <label
            htmlFor="demo-title"
            className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
          >
            Job Title
          </label>
          <input
            suppressHydrationWarning
            id="demo-title"
            type="text"
            name="jobTitle"
            placeholder="CTO / Operations Manager…"
            className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="demo-email"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Work Email
        </label>
        <input
          suppressHydrationWarning
          id="demo-email"
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="you@company.com…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
        />
      </div>

      <div>
        <label
          htmlFor="demo-phone"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Phone Number
        </label>
        <input
          suppressHydrationWarning
          id="demo-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder="+91 98765 43210…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
        />
      </div>

      <div>
        <label
          htmlFor="demo-notes"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Special Requirements / Notes
        </label>
        <textarea
          suppressHydrationWarning
          id="demo-notes"
          name="notes"
          rows={3}
          placeholder="Let us know what specific operational workflows you'd like to focus on…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link resize-none"
        />
      </div>

      <button
        suppressHydrationWarning
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold px-4 py-3.5 rounded-[6px] hover:bg-ink/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {submitting ? "Requesting Demo…" : "Request Demo"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}
