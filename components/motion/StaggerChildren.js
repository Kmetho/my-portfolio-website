"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StaggerChildren({
  children,
  stagger = 0.08,
  duration = 0.5,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Use this as the child wrapper
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
