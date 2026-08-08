"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, X, Send, Sparkles, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

const INITIAL_PROMPTS = [
  "What products does Zabnix offer?",
  "Tell me about ZerpAI ERP",
  "How can I book a free consultation?",
  "What services do you provide?",
];

const AUTOMATED_RESPONSES: Record<string, string> = {
  "What products does Zabnix offer?":
    "Zabnix offers enterprise-grade software products including ZerpAI ERP (an intelligent operational workspace for finance, procurement, and inventory), Healthcare Suites, and RetailOS.",
  "Tell me about ZerpAI ERP":
    "ZerpAI ERP is our flagship operational workspace designed for Indian and international enterprises. It unifies GST accounting, purchase orders, inventory forecasting, and real-time business metrics.",
  "How can I book a free consultation?":
    "You can schedule a free consultation directly on our Contact page or by emailing hello@zabnix.com. Our engineering team will review your business requirements and suggest a tailored solution.",
  "What services do you provide?":
    "We provide end-to-end digital engineering services including Custom Software Development, Mobile Apps (Flutter/React Native), AI & Workflow Automation, Cloud Architecture & DevOps, and IT Strategy Consulting.",
};

export function ZabnixChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [messages, isTyping, isOpen, reduceMotion]);

  // Focus input when opened & setup Escape key listener
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const sendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate response or query matching
    setTimeout(() => {
      let replyText =
        AUTOMATED_RESPONSES[query] ||
        "Thank you for reaching out to Zabnix. Our engineering team specializes in enterprise software, ZerpAI ERP, and custom AI solutions. For tailored advice, feel free to visit our Contact page or email hello@zabnix.com.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Global Floating Chatbot Launcher Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Zabnix AI assistant" : "Open Zabnix AI assistant"}
        aria-expanded={isOpen}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        className="fixed bottom-4 right-4 md:bottom-5 md:right-5 lg:bottom-6 lg:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#171717] text-white border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28)] transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot size={24} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Zabnix AI assistant conversation"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-3 left-3 md:left-auto md:right-5 lg:right-6 md:bottom-24 z-40 flex h-[520px] max-h-[calc(100dvh-100px)] w-auto md:w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >
            {/* Panel Header */}
            <div className="flex h-16 items-center justify-between border-b border-[#f1f5f9] bg-[#fafafa] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white border border-slate-800 shadow-xs">
                  <Bot size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      Zabnix AI
                    </h2>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    Product & Solutions Assistant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Zabnix AI assistant"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Messages / Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.length === 0 ? (
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 text-slate-700 space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <Sparkles size={16} className="text-black" />
                      <span>How can we help?</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600 font-normal">
                      Ask about our products (like ZerpAI ERP), services, engineering process, or how we can help build your next platform.
                    </p>
                  </div>

                  {/* Initial Prompts */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
                      Suggested Questions
                    </p>
                    <div className="space-y-1.5">
                      {INITIAL_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendMessage(prompt)}
                          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-left text-xs font-medium text-slate-800 transition-colors hover:border-black hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        >
                          <span>{prompt}</span>
                          <ChevronRight size={14} className="text-slate-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-black text-white rounded-br-xs"
                          : "bg-[#f1f5f9] text-slate-800 border border-slate-200 rounded-bl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 text-[9px] font-mono text-slate-400 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))
              )}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 bg-[#f1f5f9] border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-[#f1f5f9] bg-[#fafafa] p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
                suppressHydrationWarning
              >
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Zabnix..."
                  aria-label="Message to Zabnix AI"
                  className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-40 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <Send size={15} aria-hidden="true" />
                </button>
              </form>
              <div className="mt-2 text-center text-[9px] text-slate-400 font-mono">
                Need human support? <Link href="/contact" className="underline text-slate-600 hover:text-black">Contact us</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
