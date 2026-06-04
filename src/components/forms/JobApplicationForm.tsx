"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, X, CheckCircle2 } from "lucide-react";

interface JobApplicationFormProps {
  roleTitle: string;
}

export function JobApplicationForm({ roleTitle }: JobApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  }

  function handleRemoveFile() {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API upload & submission
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
        <h3 className="text-lg font-bold text-ink">Application Received</h3>
        <p className="text-xs text-body">
          Thank you for applying for the <strong>{roleTitle}</strong> position. Our recruiting team will review your profile and get in touch.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFileName(null);
          }}
          className="text-xs text-mute hover:text-ink transition-colors duration-200 underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label={`Apply for ${roleTitle}`}>
      <div>
        <label
          htmlFor="app-name"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Full Name
        </label>
        <input
          id="app-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Rahul Sharma…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
        />
      </div>

      <div>
        <label
          htmlFor="app-email"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Email Address
        </label>
        <input
          id="app-email"
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
          htmlFor="app-phone"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Phone Number
        </label>
        <input
          id="app-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          required
          placeholder="+91 98765 43210…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link"
        />
      </div>

      <div>
        <span className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5">
          Resume / CV
        </span>
        <div className="relative">
          <input
            id="app-resume"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required={!fileName}
            className="sr-only"
          />
          {!fileName ? (
            <label
              htmlFor="app-resume"
              className="flex flex-col items-center justify-center border border-dashed border-hairline bg-canvas hover:bg-canvas-soft p-5 cursor-pointer rounded-xl transition-colors duration-200"
            >
              <Upload size={20} className="text-mute mb-2" aria-hidden="true" />
              <span className="text-xs text-body font-medium">Upload PDF, DOC, or DOCX</span>
              <span className="text-[10px] text-mute mt-1">Drag &amp; drop or click to browse</span>
            </label>
          ) : (
            <div className="flex items-center justify-between border border-hairline bg-canvas-soft rounded-xl px-4 py-3 text-xs">
              <span className="text-ink truncate max-w-[200px]">{fileName}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-body hover:text-ink transition-colors p-1"
                aria-label="Remove uploaded resume"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="app-cover"
          className="block text-[10px] font-mono font-semibold text-body uppercase tracking-wider mb-1.5"
        >
          Message / Cover Letter
        </label>
        <textarea
          id="app-cover"
          name="coverLetter"
          rows={4}
          placeholder="Briefly tell us why you are a good fit for this role…"
          className="w-full bg-canvas border border-hairline rounded-[6px] px-4 py-2.5 text-sm text-ink placeholder:text-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-ink text-white text-xs font-semibold px-4 py-3.5 rounded-[6px] hover:bg-ink/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {submitting ? "Submitting Application…" : "Submit Application"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}
