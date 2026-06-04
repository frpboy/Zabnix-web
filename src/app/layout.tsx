import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
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
