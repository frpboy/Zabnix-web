import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "ZerpAI ERP", href: "/products/zerpai" },
    { label: "Healthcare Suite", href: "/products/healthcare" },
    { label: "Retail Platform", href: "/products/retail" },
    { label: "All Products", href: "/products" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Team", href: "/company#team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Services: [
    { label: "Software Development", href: "/services#software" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "AI & Automation", href: "/services#ai" },
    { label: "ERP Solutions", href: "/services#erp" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Zabnix home">
              <div className="bg-white border border-hairline rounded-[6px] p-1 flex items-center justify-center shrink-0 w-8 h-8 shadow-level-1">
                <Image
                  src="/zabnix-logo.svg"
                  alt="Zabnix Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-ink font-semibold text-lg tracking-tight" translate="no">
                Zabnix
              </span>
            </Link>
            <p className="text-sm text-body leading-relaxed mb-6 max-w-[200px]">
              Build Faster. Automate Smarter. Engineering excellence for modern enterprises.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/zabnix"
                aria-label="Zabnix on X"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-hairline text-body hover:text-ink hover:border-hairline-strong transition-colors duration-200"
              >
                <Twitter size={14} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/zabnix"
                aria-label="Zabnix on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-hairline text-body hover:text-ink hover:border-hairline-strong transition-colors duration-200"
              >
                <Instagram size={14} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/zabnix"
                aria-label="Zabnix on GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-hairline text-body hover:text-ink hover:border-hairline-strong transition-colors duration-200"
              >
                <Github size={14} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/zabnix"
                aria-label="Zabnix on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-hairline text-body hover:text-ink hover:border-hairline-strong transition-colors duration-200"
              >
                <Linkedin size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-ink uppercase tracking-widest mb-4 font-mono">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-body hover:text-ink transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-mute">
            © {new Date().getFullYear()} Zabnix Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-mute">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
