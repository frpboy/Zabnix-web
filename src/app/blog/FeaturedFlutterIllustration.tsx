"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./FeaturedFlutterIllustration.module.css";

type FeaturedFlutterIllustrationProps = {
  reduceMotion: boolean | null;
};

export function FeaturedFlutterIllustration({ reduceMotion }: FeaturedFlutterIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Parallax transform styles
  const calcStyle = (factor: number) => {
    if (reduceMotion) return {};
    return {
      transform: `translate3d(${mousePos.x * factor * 25}px, ${mousePos.y * factor * 25}px, 0) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
      transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
    };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={styles.container}
    >
      {/* Editorial Grid Background */}
      <div className={styles.gridBg} />

      {/* Soft Glow Elements */}
      <div className={styles.softGlowBlue} />
      <div className={styles.softGlowPurple} />

      {/* Main Interactive SVG Scene */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgScene}
      >
        {/* Connection Network */}
        <g style={calcStyle(0.3)}>
          {/* Main Ring paths */}
          <circle cx="250" cy="250" r="140" stroke="rgba(0,0,0,0.03)" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="190" stroke="rgba(0,0,0,0.02)" strokeWidth="1.5" />

          {/* Connection Lines (isometric paths) */}
          <path
            d="M 120 180 L 250 100 L 380 180 L 380 320 L 250 400 L 120 320 Z"
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            d="M 120 180 L 250 250 L 380 180 M 250 250 L 250 400"
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="1.5"
          />

          {/* Pulsing Energy Lines */}
          <path
            d="M 250 100 L 380 180 L 380 320"
            stroke="url(#purpleGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.energyPulse}
          />
          <path
            d="M 250 400 L 120 320 L 120 180"
            stroke="url(#blueGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.energyPulseSlow}
          />
        </g>

        {/* Floating Architecture Cubes */}
        {/* Top Cube */}
        <g style={calcStyle(0.8)} className={styles.cubeGroup}>
          <g transform="translate(250, 100)">
            {/* Top face */}
            <path d="M 0 -25 L 43 -10 L 0 5 L -43 -10 Z" fill="#ffffff" stroke="#171717" strokeWidth="2" />
            {/* Left face */}
            <path d="M -43 -10 L 0 5 L 0 45 L -43 30 Z" fill="#f5f5f5" stroke="#171717" strokeWidth="2" />
            {/* Right face */}
            <path d="M 0 5 L 43 -10 L 43 30 L 0 45 Z" fill="#e5e5e5" stroke="#171717" strokeWidth="2" />
            {/* Inner detail / Accent */}
            <circle cx="0" cy="-5" r="4" fill="#8b5cf6" />
          </g>
          <text x="250" y="60" textAnchor="middle" className={styles.engLabel}>CORE_LAYER_V1</text>
        </g>

        {/* Left Cube */}
        <g style={calcStyle(0.5)} className={styles.cubeGroup}>
          <g transform="translate(120, 250)">
            <path d="M 0 -20 L 34 -8 L 0 4 L -34 -8 Z" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
            <path d="M -34 -8 L 0 4 L 0 36 L -34 24 Z" fill="#f5f5f5" stroke="#171717" strokeWidth="1.5" />
            <path d="M 0 4 L 34 -8 L 34 24 L 0 36 Z" fill="#e5e5e5" stroke="#171717" strokeWidth="1.5" />
            <circle cx="0" cy="-4" r="3" fill="#3b82f6" />
          </g>
          <text x="120" y="215" textAnchor="middle" className={styles.engLabel}>DATA_NODE_09</text>
        </g>

        {/* Right Cube */}
        <g style={calcStyle(0.6)} className={styles.cubeGroup}>
          <g transform="translate(380, 250)">
            <path d="M 0 -20 L 34 -8 L 0 4 L -34 -8 Z" fill="#ffffff" stroke="#171717" strokeWidth="1.5" />
            <path d="M -34 -8 L 0 4 L 0 36 L -34 24 Z" fill="#f5f5f5" stroke="#171717" strokeWidth="1.5" />
            <path d="M 0 4 L 34 -8 L 34 24 L 0 36 Z" fill="#e5e5e5" stroke="#171717" strokeWidth="1.5" />
            <circle cx="0" cy="-4" r="3" fill="#ec4899" />
          </g>
          <text x="380" y="215" textAnchor="middle" className={styles.engLabel}>SYNC_WORKER</text>
        </g>

        {/* Center / System Hub */}
        <g style={calcStyle(0.4)} className={styles.cubeGroup}>
          <g transform="translate(250, 250)">
            {/* Outer wireframe ring */}
            <circle cx="0" cy="0" r="35" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Holographic grid lines inside */}
            <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            <line x1="0" y1="-25" x2="0" y2="25" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            <circle cx="0" cy="0" r="10" fill="#171717" />
            <circle cx="0" cy="0" r="5" fill="#ffffff" />
          </g>
          <text x="250" y="305" textAnchor="middle" className={styles.engLabel}>SYSTEM_HUB</text>
        </g>

        {/* Floating Data Packets */}
        <g style={calcStyle(0.7)}>
          <circle cx="185" cy="140" r="4" fill="#3b82f6" className={styles.dataPacket1} />
          <circle cx="315" cy="140" r="4.5" fill="#8b5cf6" className={styles.dataPacket2} />
          <circle cx="250" cy="325" r="3.5" fill="#ec4899" className={styles.dataPacket3} />
        </g>

        {/* Definitions */}
        <defs>
          <linearGradient id="purpleGradient" x1="250" y1="100" x2="380" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="250" y1="400" x2="120" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#171717" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative Specs overlay */}
      <div className={styles.specsOverlay}>
        <div className={styles.specItem}>
          <span className="font-mono text-[9px] text-[#8e8e93]">LATENCY</span>
          <span className="font-mono text-[10px] font-semibold text-black">1.2ms</span>
        </div>
        <div className={styles.specItem}>
          <span className="font-mono text-[9px] text-[#8e8e93]">BANDWIDTH</span>
          <span className="font-mono text-[10px] font-semibold text-black">9.8 GB/S</span>
        </div>
      </div>
    </div>
  );
}
