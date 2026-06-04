import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

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
    <footer className="border-t border-white/8 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Zabnix home">
              <Image
                src="/logo.jpeg"
                alt="Zabnix Logo"
                width={32}
                height={32}
                className="rounded-lg object-cover"
              />
              <span className="text-white font-semibold text-lg tracking-tight" translate="no">
                Zabnix
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[200px]">
              Build Faster. Automate Smarter. Engineering excellence for modern enterprises.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/zabnix"
                aria-label="Zabnix on Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                <Twitter size={14} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/zabnix"
                aria-label="Zabnix on GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                <Github size={14} aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/zabnix"
                aria-label="Zabnix on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                <Linkedin size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
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
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Zabnix. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
