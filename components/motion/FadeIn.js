"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  className = "",
  as = "div",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  const d = directionMap[direction] || directionMap.up;

  const MotionTag = motion.create(as);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
