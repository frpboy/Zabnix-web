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
        className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle2 size={40} className="text-emerald-400" aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">Application Received</h3>
        <p className="text-xs text-gray-400">
          Thank you for applying for the <strong>{roleTitle}</strong> position. Our recruiting team will review your profile and get in touch.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFileName(null);
          }}
          className="text-xs text-gray-500 hover:text-white transition-colors duration-200"
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
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
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
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <label
          htmlFor="app-email"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
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
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <label
          htmlFor="app-phone"
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
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
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        />
      </div>

      <div>
        <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
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
              className="flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-violet-500/50 bg-black hover:bg-white/[0.02] rounded-xl p-5 cursor-pointer transition-colors duration-200"
            >
              <Upload size={20} className="text-gray-500 mb-2" aria-hidden="true" />
              <span className="text-xs text-gray-400">Upload PDF, DOC, or DOCX</span>
              <span className="text-[10px] text-gray-600 mt-1">Drag & drop or click to browse</span>
            </label>
          ) : (
            <div className="flex items-center justify-between border border-white/10 bg-white/5 rounded-xl px-4 py-3 text-xs">
              <span className="text-gray-300 truncate max-w-[200px]">{fileName}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-white transition-colors p-1"
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
          className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
        >
          Message / Cover Letter
        </label>
        <textarea
          id="app-cover"
          name="coverLetter"
          rows={4}
          placeholder="Briefly tell us why you are a good fit for this role…"
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-white text-black text-xs font-semibold px-4 py-3.5 rounded-xl hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {submitting ? "Submitting Application…" : "Submit Application"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}
