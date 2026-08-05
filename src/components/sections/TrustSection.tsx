"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Client = {
  name: string;
  label: string;
  mark: ReactNode;
};

const logoColor = "#A3A3A3";

const clients: Client[] = [
  {
    name: "Northstar",
    label: "Northstar",
    mark: (
      <svg
        width="142"
        height="36"
        viewBox="0 0 142 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M17.5 4L20.7 13.3L30 16.5L20.7 19.7L17.5 29L14.3 19.7L5 16.5L14.3 13.3L17.5 4Z"
          stroke={logoColor}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M42 23V12.4H44.2L49.9 19.5V12.4H52.5V23H50.5L44.6 15.7V23H42Z" fill={logoColor} />
        <path d="M56.6 23V12.4H64.4V14.5H59.2V16.7H64V18.7H59.2V20.9H64.5V23H56.6Z" fill={logoColor} />
        <path d="M69.7 23L66 12.4H68.8L71.1 19.6L73.5 12.4H75.7L78.1 19.6L80.4 12.4H83.1L79.4 23H77L74.5 15.7L72 23H69.7Z" fill={logoColor} />
        <path d="M86.2 23V14.6H83.1V12.4H92V14.6H88.9V23H86.2Z" fill={logoColor} />
        <path d="M95 23V12.4H99.8C101 12.4 101.9 12.7 102.6 13.3C103.3 13.9 103.6 14.7 103.6 15.7C103.6 16.5 103.4 17.1 103 17.6C102.6 18.1 102 18.4 101.2 18.6L103.9 23H100.9L98.6 19H97.7V23H95ZM97.7 17H99.4C99.9 17 100.3 16.9 100.6 16.6C100.9 16.3 101 16 101 15.6C101 15.2 100.9 14.9 100.6 14.7C100.3 14.4 99.9 14.3 99.4 14.3H97.7V17Z" fill={logoColor} />
        <path d="M108.1 23L112.5 12.4H115L119.4 23H116.5L115.6 20.8H111.7L110.8 23H108.1ZM112.4 18.8H114.9L113.7 15.6L112.4 18.8Z" fill={logoColor} />
      </svg>
    ),
  },
  {
    name: "Meridian",
    label: "Meridian",
    mark: (
      <svg
        width="148"
        height="36"
        viewBox="0 0 148 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M7 27V9H11.2L17.1 18.2L23 9H27.2V27H24.4V13.9L18.2 23.2H15.8L9.8 14V27H7Z"
          fill={logoColor}
        />
        <path d="M35.2 27V9H48V11.4H38.1V16.6H46.8V18.8H38.1V24.6H48.2V27H35.2Z" fill={logoColor} />
        <path d="M56.4 27V9H63C65 9 66.6 9.8 67.8 11.3C69 12.8 69.6 14.8 69.6 17.9C69.6 21.1 69 23.2 67.8 24.7C66.6 26.2 64.9 27 62.9 27H56.4ZM59.3 24.5H62.5C64 24.5 65.1 23.9 65.9 22.8C66.7 21.7 67 20 67 17.9C67 15.9 66.6 14.4 65.8 13.3C65 12.2 63.9 11.5 62.5 11.5H59.3V24.5Z" fill={logoColor} />
        <path d="M77.3 27V9H80.2V27H77.3Z" fill={logoColor} />
        <path d="M87.8 27L95 9H98.4L105.5 27H102.4L100.8 22.8H92.3L90.8 27H87.8ZM93.2 20.4H100L96.6 11.8L93.2 20.4Z" fill={logoColor} />
        <path d="M111.6 27V9H114.5L123.8 22.2V9H126.7V27H123.9L114.4 13.6V27H111.6Z" fill={logoColor} />
      </svg>
    ),
  },
  {
    name: "Axis",
    label: "Axis",
    mark: (
      <svg
        width="116"
        height="36"
        viewBox="0 0 116 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18 6L28 12V24L18 30L8 24V12L18 6Z"
          stroke={logoColor}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M17.9 12.3L22.3 20.1H13.5L17.9 12.3Z" fill={logoColor} />
        <path d="M44.4 27L51.6 9H55L62.1 27H59L57.4 22.8H48.9L47.4 27H44.4ZM49.8 20.4H56.6L53.2 11.8L49.8 20.4Z" fill={logoColor} />
        <path d="M69 27V9H71.9V27H69Z" fill={logoColor} />
        <path d="M79 24.7L80.7 22.8C82 24.1 83.8 24.8 86 24.8C87 24.8 87.9 24.6 88.5 24.2C89.1 23.8 89.4 23.3 89.4 22.7C89.4 22.2 89.2 21.8 88.8 21.5C88.4 21.2 87.8 21 86.9 20.8L84.2 20.2C82.7 19.8 81.5 19.2 80.7 18.5C79.9 17.8 79.5 16.8 79.5 15.6C79.5 14.1 80.1 12.8 81.3 11.8C82.5 10.8 84.1 10.3 86 10.3C88.7 10.3 90.9 11.1 92.6 12.9L90.9 14.8C89.6 13.5 88 12.8 86.1 12.8C85.1 12.8 84.3 13 83.7 13.4C83.1 13.8 82.8 14.3 82.8 14.9C82.8 15.4 83 15.8 83.4 16.1C83.8 16.4 84.4 16.6 85.4 16.8L88.2 17.4C89.8 17.8 91 18.4 91.8 19.1C92.6 19.8 93 20.8 93 22.1C93 23.6 92.4 24.9 91.2 25.9C90 27 88.3 27.5 86.2 27.5C83.1 27.5 80.7 26.6 79 24.7Z" fill={logoColor} />
      </svg>
    ),
  },
  {
    name: "Vertex",
    label: "Vertex",
    mark: (
      <svg
        width="132"
        height="36"
        viewBox="0 0 132 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M18 7L29 27H7L18 7Z"
          stroke={logoColor}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M44 9L50.1 27H47.1L41 9H44Z" fill={logoColor} />
        <path d="M54.6 27V9H67.4V11.4H57.5V16.6H66.2V18.8H57.5V24.6H67.6V27H54.6Z" fill={logoColor} />
        <path d="M74.2 27V9H81.3C82.9 9 84.2 9.5 85.2 10.4C86.2 11.3 86.7 12.5 86.7 13.9C86.7 15 86.4 16 85.8 16.9C85.2 17.7 84.3 18.3 83.2 18.6L87.5 27H84.3L80.4 19.1H77.1V27H74.2ZM77.1 16.7H81C82 16.7 82.8 16.5 83.4 15.9C84 15.3 84.3 14.6 84.3 13.7C84.3 12.9 84 12.2 83.4 11.7C82.8 11.1 82 10.8 81 10.8H77.1V16.7Z" fill={logoColor} />
        <path d="M95.2 27V11.5H89.8V9H103.5V11.5H98.1V27H95.2Z" fill={logoColor} />
        <path d="M109.4 27V9H122.2V11.4H112.3V16.6H121V18.8H112.3V24.6H122.4V27H109.4Z" fill={logoColor} />
      </svg>
    ),
  },
  {
    name: "Nova",
    label: "Nova",
    mark: (
      <svg
        width="122"
        height="36"
        viewBox="0 0 122 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="10.5" stroke={logoColor} strokeWidth="1.7" />
        <path d="M9.5 18C11.4 13.2 15.3 10.7 21.2 10.3" stroke={logoColor} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24.5" cy="11.8" r="1.7" fill={logoColor} />
        <path d="M42 27V9H45L54.3 22.2V9H57.2V27H54.4L44.9 13.6V27H42Z" fill={logoColor} />
        <path d="M63.5 18C63.5 15.2 64.3 12.9 66 11.1C67.7 9.3 69.9 8.4 72.7 8.4C75.5 8.4 77.8 9.3 79.5 11.1C81.2 12.9 82 15.2 82 18C82 20.8 81.2 23.1 79.5 24.9C77.8 26.7 75.5 27.6 72.7 27.6C69.9 27.6 67.7 26.7 66 24.9C64.3 23.1 63.5 20.8 63.5 18ZM66.4 18C66.4 20.1 67 21.8 68.2 23.1C69.4 24.4 70.9 25 72.7 25C74.6 25 76.1 24.4 77.2 23.1C78.4 21.8 79 20.1 79 18C79 15.9 78.4 14.2 77.2 12.9C76.1 11.6 74.6 11 72.7 11C70.9 11 69.4 11.6 68.2 12.9C67 14.2 66.4 15.9 66.4 18Z" fill={logoColor} />
        <path d="M86.2 27L93.4 9H96.8L103.9 27H100.8L99.2 22.8H90.7L89.2 27H86.2ZM91.6 20.4H98.4L95 11.8L91.6 20.4Z" fill={logoColor} />
      </svg>
    ),
  },
];

function LogoMark({ client }: { client: Client }) {
  return (
    <div
      className="group flex shrink-0 items-center justify-center opacity-50 transition duration-300 ease-out hover:-translate-y-px hover:opacity-100"
      aria-label={client.label}
      title={client.label}
    >
      <div className="h-10 text-[#A3A3A3] transition-colors duration-300 group-hover:text-[#171717]">
        {client.mark}
      </div>
    </div>
  );
}

export function TrustSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-canvas-soft"
      aria-labelledby="trust-section-heading"
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-6 pt-12 pb-14 transition-all duration-[600ms] ease-out",
          !hasMounted || isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        )}
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="trust-section-heading"
            className="text-sm font-medium uppercase tracking-[0.08em] text-neutral-500 sm:text-base"
          >
            Trusted by
          </h2>
        </div>

        <div className="relative mt-5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-canvas-soft to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-canvas-soft to-transparent"
            aria-hidden="true"
          />

          <div className="hidden items-center justify-center gap-16 md:flex lg:gap-20">
            {clients.map((client) => (
              <LogoMark key={client.name} client={client} />
            ))}
          </div>

          <div className="overflow-x-auto [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center gap-10 px-2 py-1">
              {clients.map((client) => (
                <LogoMark key={client.name} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
