"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ZABNIX_LETTERS = ["Z", "A", "B", "N", "I", "X"];

export function Careers3DRingsVisual() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Cycle through letters Z -> A -> B -> N -> I -> X
  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setLetterIndex((prev) => (prev + 1) % ZABNIX_LETTERS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setTilt({
      x: y * -10,
      y: x * 10,
    });
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm h-72 flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: "400px" }}
    >
      {/* 3D Scene Container */}
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative flex items-center justify-center w-full h-full"
      >
        {/* Ring 1 (Outer) - Uiverse 3D Keyframe Motion */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateX: [24, 16, 28, 24],
                  rotateY: [20, 28, 12, 20],
                  rotateZ: [0, 60, 120, 180, 240, 300, 360],
                  translateZ: [-35, 10, -20, -35],
                  borderColor: [
                    "rgba(148, 163, 184, 0.4)",
                    "rgba(51, 65, 85, 0.8)",
                    "rgba(148, 163, 184, 0.4)",
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 5,
                  repeat: Infinity,
                  ease: [0.49, 0.06, 0.43, 0.85],
                }
          }
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
          className="absolute h-52 w-52 rounded-full border-[10px] border-slate-400/50 bg-transparent shadow-[inset_0_0_20px_rgba(0,0,0,0.06)]"
        />

        {/* Ring 2 (Middle) - Uiverse 3D Keyframe Motion */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateX: [24, 28, 14, 24],
                  rotateY: [20, 10, 30, 20],
                  rotateZ: [360, 300, 240, 180, 120, 60, 0],
                  translateZ: [-20, 15, -10, -20],
                  borderColor: [
                    "rgba(100, 116, 139, 0.5)",
                    "rgba(15, 23, 42, 0.9)",
                    "rgba(100, 116, 139, 0.5)",
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.2,
                  delay: 0.15,
                  repeat: Infinity,
                  ease: [0.49, 0.06, 0.43, 0.85],
                }
          }
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
          className="absolute h-40 w-40 rounded-full border-[12px] border-slate-600/60 bg-transparent shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]"
        />

        {/* Ring 3 (Inner Ring) - Uiverse 3D Keyframe Motion */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateX: [24, 18, 30, 24],
                  rotateY: [20, 32, 14, 20],
                  rotateZ: [0, 90, 180, 270, 360],
                  translateZ: [-10, 20, -5, -10],
                  borderColor: [
                    "rgba(30, 41, 59, 0.7)",
                    "rgba(0, 0, 0, 0.95)",
                    "rgba(30, 41, 59, 0.7)",
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 3.5,
                  delay: 0.3,
                  repeat: Infinity,
                  ease: [0.49, 0.06, 0.43, 0.85],
                }
          }
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
          className="absolute h-28 w-28 rounded-full border-[14px] border-slate-800/80 bg-transparent shadow-[inset_0_0_15px_rgba(0,0,0,0.15)]"
        />

        {/* Central Circular Core Node Cycling through Z-A-B-N-I-X */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateX: [24, 18, 30, 24],
                  rotateY: [20, 32, 14, 20],
                  rotateZ: [0, 90, 180, 270, 360],
                  translateZ: [10, 35, 15, 10],
                  borderColor: [
                    "rgba(15, 23, 42, 0.9)",
                    "rgba(0, 0, 0, 1)",
                    "rgba(15, 23, 42, 0.9)",
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 3.5,
                  delay: 0.45,
                  repeat: Infinity,
                  ease: [0.49, 0.06, 0.43, 0.85],
                }
          }
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
          }}
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-slate-900 bg-white shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={ZABNIX_LETTERS[letterIndex]}
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-3xl font-extrabold text-slate-900 tracking-tighter select-none"
            >
              {ZABNIX_LETTERS[letterIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
