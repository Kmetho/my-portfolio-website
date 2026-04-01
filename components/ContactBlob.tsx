"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const blobA =
  "M54.3,-63.9C69.3,-52.2,79.4,-34,78.7,-17C78.1,0.1,66.6,16,57,33.1C47.4,50.3,39.6,68.8,25.6,76.5C11.6,84.3,-8.5,81.4,-23.9,72.7C-39.4,64.1,-50.2,49.6,-55.4,34.8C-60.6,19.9,-60.3,4.7,-60.8,-13.9C-61.3,-32.6,-62.8,-54.5,-52.8,-67.1C-42.8,-79.7,-21.4,-82.8,-0.8,-81.8C19.7,-80.8,39.4,-75.6,54.3,-63.9Z";
const blobB =
  "M47.7,-56.7C57.4,-48.6,57.8,-29.5,56.2,-13.6C54.5,2.2,50.6,14.6,44.6,26.5C38.6,38.4,30.5,49.8,19.3,54.5C8.1,59.3,-6,57.3,-22.5,54.4C-38.9,51.6,-57.7,47.9,-62.7,37.2C-67.6,26.5,-58.7,8.9,-53,-6.8C-47.2,-22.5,-44.6,-36.3,-36.3,-44.6C-28,-52.9,-14,-55.8,2.5,-58.8C19,-61.8,37.9,-64.8,47.7,-56.7Z";

const proximityRadius = 200;
const excitedScale = 1.5;

export default function ContactBlob() {
  const blobRef = useRef<HTMLButtonElement>(null);
  const [excited, setExcited] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const rect = blobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      setExcited(dist < proximityRadius);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouchDevice]);

  const handleClick = useCallback(() => {
    if (isTouchDevice) {
      if (!tapped) {
        setTapped(true);
      } else {
        window.location.href = "mailto:wercche@gmail.com";
      }
    } else {
      window.location.href = "mailto:wercche@gmail.com";
    }
  }, [isTouchDevice, tapped]);

  useEffect(() => {
    if (!isTouchDevice || !tapped) return;
    const timeout = setTimeout(() => setTapped(false), 4000);
    return () => clearTimeout(timeout);
  }, [tapped, isTouchDevice]);

  const showText = excited || tapped;

  return (
    <button
      ref={blobRef}
      onClick={handleClick}
      aria-label="Contact — Let's talk!"
      className="fixed bottom-6 right-6 z-50 cursor-pointer blob-float"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <div
        className="relative flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          width: 80,
          height: 80,
          transform: showText ? `scale(${excitedScale})` : "scale(1)",
        }}
      >
        <svg
          viewBox="-80 -80 160 160"
          className="absolute inset-0 w-full h-full"
          style={{
            filter: showText
              ? "drop-shadow(0 4px 20px var(--glow-primary))"
              : "drop-shadow(0 2px 8px oklch(0 0 0 / 0.15))",
          }}
        >
          <path fill="var(--primary)" opacity="0.9">
            <animate
              attributeName="d"
              values={`${blobA};${blobB};${blobA}`}
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
            />
          </path>
        </svg>

        <span
          className="relative z-10 text-primary-foreground font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 pointer-events-none"
          style={{
            opacity: showText ? 1 : 0,
            transform: showText ? "scale(1)" : "scale(0.7)",
            letterSpacing: showText ? "0.1em" : "0",
          }}
        >
          Let's talk!
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute w-5 h-5 transition-all duration-300 pointer-events-none"
          style={{
            opacity: showText ? 0 : 0.8,
            transform: showText ? "scale(0.5)" : "scale(1)",
          }}
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
    </button>
  );
}
