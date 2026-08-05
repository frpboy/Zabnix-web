"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LiquidGlass from "@/components/ui/LiquidGlass";
import PillNav from "@/components/ui/PillNav";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/people", label: "People" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-0 transition-all duration-300"
      )}
    >
      <LiquidGlass
        className={cn(
          "border-b",
          scrolled ? "border-white/50" : "border-transparent"
        )}
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.64) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(255, 255, 255, 0.52) 100%)",
          borderColor: scrolled
            ? "rgba(255, 255, 255, 0.68)"
            : "rgba(255, 255, 255, 0.44)",
          boxShadow: scrolled
            ? "inset 0 1px 0 rgba(255, 255, 255, 0.72), inset 0 -1px 0 rgba(255, 255, 255, 0.22), 0 14px 32px rgba(15, 23, 42, 0.1)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.62), inset 0 -1px 0 rgba(255, 255, 255, 0.16), 0 12px 28px rgba(15, 23, 42, 0.07)",
        }}
        options={{
          scale: -175,
          chroma: 6,
          blur: 5,
          mapBlur: 14,
          border: 0.08,
          saturate: 1.45,
          fallbackBlur: 22,
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-1 sm:px-2 md:px-3 lg:px-4 h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="-ml-6 flex items-center group sm:-ml-8 md:-ml-10"
            aria-label="Zabnix home"
          >
            <Image
              src="/zabnix-logo.png"
              alt="Zabnix Logo"
              width={120}
              height={32}
              className="object-contain shrink-0"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 justify-center px-6 md:pl-24 lg:pl-32">
            <PillNav
              items={navLinks}
              activeHref={pathname}
              className="custom-nav"
              ease="power2.out"
              baseColor="#171717"
              pillColor="rgba(255, 255, 255, 0.92)"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#4d4d4d"
            />
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3 lg:translate-x-16">
            <Link
              href="/contact"
              className="nav-contact-reveal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <span>Contact</span>
            </Link>
            <Link
              href="/contact#consultation"
              className="nav-consultation-reveal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <span>Book Consultation</span>
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
      </LiquidGlass>

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
            className="mt-2 w-full text-center text-sm font-medium bg-ink text-white dark:bg-white dark:text-black px-4 py-3 rounded-[6px] hover:bg-ink/90 dark:hover:bg-white/90 transition-colors duration-200"
            onClick={() => setMobileOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
