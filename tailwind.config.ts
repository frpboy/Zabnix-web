import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        canvas: "var(--canvas)",
        "canvas-soft": "var(--canvas-soft)",
        "canvas-soft-2": "var(--canvas-soft-2)",
        ink: "var(--ink)",
        body: "var(--body)",
        mute: "var(--mute)",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        link: "#0070f3",
        "develop-start": "#007cf0",
        "develop-end": "#00dfd8",
        "preview-start": "#7928ca",
        "preview-end": "#ff0080",
        "ship-start": "#ff4d4d",
        "ship-end": "#f9cb28",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        "250": "250ms",
        "fast": "250ms",
        "instant": "150ms",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
