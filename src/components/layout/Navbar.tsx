"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/company", label: "Company" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Zabnix home"
        >
          <div className="bg-white border border-hairline rounded-[6px] p-1 flex items-center justify-center shrink-0 w-8 h-8 shadow-level-1">
            <Image
              src="/zabnix-logo.svg"
              alt="Zabnix Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span
            className="text-ink font-semibold text-lg tracking-tight"
            translate="no"
          >
            Zabnix
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-body hover:text-ink transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm text-body hover:text-ink transition-colors duration-200 px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Contact
          </Link>
          <Link
            href="/contact#consultation"
            className="text-sm font-medium bg-ink text-white px-4 py-2 rounded-[6px] hover:bg-ink/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-body hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden glass-nav border-t border-hairline px-6 py-6 flex flex-col gap-4"
          style={{ overscrollBehavior: "contain" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-body hover:text-ink py-2 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact#consultation"
            className="mt-2 w-full text-center text-sm font-medium bg-ink text-white px-4 py-3 rounded-[6px] hover:bg-ink/90 transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
