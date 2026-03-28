"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroTypography() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // skip on touch devices
    if ("ontouchstart" in window) return;

    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 3;
      const ny = (e.clientY / window.innerHeight - 0.5) * 3;
      setTilt({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // subtle rotation + translate following cursor
  const rotateX = -tilt.y * 3; // degrees
  const rotateY = tilt.x * 3;
  const tx = tilt.x * 12; // pixels
  const ty = tilt.y * 8;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-grad)" }}
    >
      {/* overlay — light in light mode, dark in dark mode */}
      <div className="absolute inset-0 hero-overlay" />

      <div
        className="relative z-10 text-center px-6 select-none"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${tx}px, ${ty}px)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        <h1 className="obvi-extended-super-italic text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-foreground/90 leading-[0.9] mb-4">
          wercche
        </h1>
        <p className="obvi-wide-bold text-sm sm:text-base md:text-lg uppercase tracking-[0.3em] text-foreground/50">
          Creative technologist
        </p>
      </div>
    </div>
  );
}
