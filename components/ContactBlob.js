"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  Morphing SVG blob that floats in a corner.
  - Desktop: cursor proximity makes it "excited" (grows, reveals "Let's talk!")
  - Mobile:  first tap → unravel text, second tap → mailto
*/

const BLOB_A =
  "M44.5,-51.2C56.3,-40.8,63.8,-25.5,66.1,-9.4C68.4,6.7,65.5,23.7,56.2,36.1C46.9,48.5,31.2,56.3,14.4,59.8C-2.4,63.3,-20.3,62.5,-34.5,54.8C-48.7,47.1,-59.2,32.5,-63.1,16.2C-67,-0.1,-64.3,-18.1,-55.4,-31.5C-46.5,-44.9,-31.4,-53.7,-15.8,-56.5C-0.2,-59.3,15.9,-56.1,29.6,-51.5Z";
const BLOB_B =
  "M39.8,-47.1C51.6,-38.2,61,-24.8,63.7,-10.1C66.4,4.6,62.4,20.6,53.3,33.1C44.2,45.6,30,54.6,14.1,58.9C-1.8,63.2,-19.4,62.8,-33.6,55.3C-47.8,47.8,-58.6,33.2,-62.4,17.1C-66.2,1,-63,-16.6,-54.1,-29.4C-45.2,-42.2,-30.6,-50.2,-15.8,-55.1C-1,-60,13.9,-61.8,27.1,-56.9Z";

const PROXIMITY_RADIUS = 200;
const EXCITED_SCALE = 1.3;

export default function ContactBlob() {
  const blobRef = useRef(null);
  const [excited, setExcited] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMove = (e) => {
      if (!blobRef.current) return;
      const rect = blobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      setExcited(dist < PROXIMITY_RADIUS);
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
      {/* whole blob scales on excitement */}
      <div
        className="relative flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          width: 80,
          height: 80,
          transform: showText ? `scale(${EXCITED_SCALE})` : "scale(1)",
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
              values={`${BLOB_A};${BLOB_B};${BLOB_A}`}
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
            />
          </path>
        </svg>

        {/* text label */}
        <span
          className="relative z-10 text-primary-foreground font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 pointer-events-none"
          style={{
            opacity: showText ? 1 : 0,
            transform: showText ? "scale(1)" : "scale(0.7)",
            letterSpacing: showText ? "0.1em" : "0",
          }}
        >
          Let&rsquo;s talk!
        </span>

        {/* mail icon when text is hidden */}
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
