"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

const name = "wercche";

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.08,
      ease: "easeInOut",
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 1.1, ease: "easeInOut" },
  },
};

export default function HeroTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 3;
      const ny = (e.clientY / window.innerHeight - 0.5) * 3;
      setTilt({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const rotateX = -tilt.y * 3;
  const rotateY = tilt.x * 3;
  const tx = tilt.x * 12;
  const ty = tilt.y * 8;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-background"
    >
      <div
        className="relative z-10 text-center px-6 select-none"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${tx}px, ${ty}px)`,
          transition: "transform 0.15s ease-out",
          willChange: "transform",
        }}
      >
        <h1
          className="obvi-extended-super-italic text-4xl sm:text-7xl md:text-9xl lg:text-[10rem] text-foreground leading-[0.95] mb-4 flex justify-center"
          style={{
            perspective: "400px",
          }}
        >
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-sm sm:text-base md:text-lg text-foreground uppercase tracking-[0.3em]"
        >
          web developer & media artist
        </motion.p>
      </div>
    </div>
  );
}
