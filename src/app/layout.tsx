import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Zabnix — Build Faster. Automate Smarter.",
    template: "%s | Zabnix",
  },
  description:
    "Zabnix is a premium product engineering firm specializing in software development, AI automation, ERP systems, and mobile applications for healthcare, pharma, retail, and manufacturing enterprises.",
  keywords: [
    "software development",
    "AI automation",
    "ERP systems",
    "mobile apps",
    "business automation",
    "Zabnix",
  ],
  authors: [{ name: "Zabnix" }],
  creator: "Zabnix",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://zabnix.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zabnix.com",
    title: "Zabnix — Build Faster. Automate Smarter.",
    description:
      "Premium product engineering for enterprises. Software, AI, ERP & Mobile.",
    siteName: "Zabnix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zabnix — Build Faster. Automate Smarter.",
    description:
      "Premium product engineering for enterprises. Software, AI, ERP & Mobile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#fafafa" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {isProduction ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x1wa2stzts");
            `}
          </Script>
        ) : null}

        {/* Liquid Glass Library */}
        <Script
          src="/liquid-glass.js"
          strategy="afterInteractive"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
