"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface VisitWebsiteButtonProps {
  href?: string;
}

export function VisitWebsiteButton({ href = "https://zerpai.pages.dev/login" }: VisitWebsiteButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit the official ZerpAI website in a new tab"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative z-0 inline-flex w-[90%] items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 py-2 text-lg font-semibold text-black shadow-xl isolate transition-colors duration-300 before:absolute before:-left-full before:top-1/2 before:-z-10 before:aspect-square before:w-full before:-translate-y-1/2 before:rounded-full before:bg-black before:transition-[left,transform] before:duration-700 hover:text-white hover:before:left-0 hover:before:scale-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 sm:w-auto"
    >
      <span>Launch</span>
      <ArrowUp size={18} strokeWidth={2} aria-hidden="true" className="rounded-full border border-black p-0.5 text-black transition-[transform,background-color,border-color] duration-300 ease-linear group-hover:rotate-90 group-hover:border-white group-hover:bg-white" />
    </motion.a>
  );
}
