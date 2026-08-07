"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
};

const isExternalLink = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("//") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#");

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#171717",
  pillColor = "rgba(255, 255, 255, 0.88)",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = false,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const radius = ((w * w) / 4 + h * h) / (2 * h);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta =
          Math.ceil(
            radius - Math.sqrt(Math.max(0, radius * radius - (w * w) / 4))
          ) + 1;
        const originY = diameter - delta;

        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });

        timeline.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: 2,
            ease,
            overwrite: "auto",
          },
          0
        );

        if (label) {
          timeline.to(
            label,
            {
              y: -(h + 8),
              duration: 2,
              ease,
              overwrite: "auto",
            },
            0
          );
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          timeline.to(
            hoverLabel,
            {
              y: 0,
              opacity: 1,
              duration: 2,
              ease,
              overwrite: "auto",
            },
            0
          );
        }

        tlRefs.current[index] = timeline;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    document.fonts?.ready?.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      if (logoRef.current) {
        gsap.set(logoRef.current, { scale: 0 });
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
        gsap.to(navItemsRef.current, {
          width: "auto",
          duration: 0.6,
          ease,
        });
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
      tlRefs.current.forEach((timeline) => timeline?.kill());
      activeTweenRefs.current.forEach((tween) => tween?.kill());
      logoTweenRef.current?.kill();
    };
  }, [ease, initialLoadAnimation, items]);

  const handleEnter = (index: number) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(timeline.duration(), {
      duration: 0.5,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (index: number) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(0, {
      duration: 0.4,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const image = logoImgRef.current;
    if (!image) return;
    logoTweenRef.current?.kill();
    gsap.set(image, { rotate: 0 });
    logoTweenRef.current = gsap.to(image, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (nextState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (nextState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: "top center",
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  } as CSSProperties;

  const renderNavLink = (item: PillNavItem, index: number, mobile = false) => {
    const classes = mobile
      ? `mobile-menu-link${activeHref === item.href ? " is-active" : ""}`
      : `pill${activeHref === item.href ? " is-active" : ""}`;

    const content = mobile ? (
      item.label
    ) : (
      <>
        <span
          className="hover-circle"
          aria-hidden="true"
          ref={(element) => {
            circleRefs.current[index] = element;
          }}
        />
        <span className="label-stack">
          <span className="pill-label">{item.label}</span>
          <span className="pill-label-hover" aria-hidden="true">
            {item.label}
          </span>
        </span>
      </>
    );

    const sharedProps = mobile
      ? {
          onClick: () => setIsMobileMenuOpen(false),
        }
      : {
          onMouseEnter: () => handleEnter(index),
          onMouseLeave: () => handleLeave(index),
          onFocus: () => handleEnter(index),
          onBlur: () => handleLeave(index),
        };

    if (isExternalLink(item.href)) {
      return (
        <a
          href={item.href}
          className={classes}
          aria-label={item.ariaLabel || item.label}
          {...sharedProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        className={classes}
        aria-label={item.ariaLabel || item.label}
        {...sharedProps}
      >
        {content}
      </Link>
    );
  };

  return (
    <div className="pill-nav-container">
      <nav
        className={`pill-nav ${className}`.trim()}
        aria-label="Primary"
        style={cssVars}
      >
        {logo ? (
          <Link
            className="pill-logo"
            href="/"
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(element) => {
              logoRef.current = element as HTMLElement | null;
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              width="120"
              height="32"
              ref={logoImgRef}
            />
          </Link>
        ) : null}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, index) => (
              <li key={item.href || `item-${index}`} role="none">
                {renderNavLink(item, index)}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="pill-nav-mobile-menu"
          ref={hamburgerRef}
          type="button"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div
        className="mobile-menu-popover mobile-only"
        ref={mobileMenuRef}
        style={cssVars}
        id="pill-nav-mobile-menu"
      >
        <ul className="mobile-menu-list">
          {items.map((item, index) => (
            <li key={item.href || `mobile-item-${index}`}>
              {renderNavLink(item, index, true)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
