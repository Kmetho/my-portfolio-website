"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Nav({ current }) {
  const links = [
    { label: "Work", href: "/work" },
    { label: "Experiments", href: "/experiments" },
    { label: "About", href: "/about" },
  ];

  const [hovered, setHovered] = useState(null);

  const activeKey = hovered || current;

  return (
    <nav className="glass sticky top-0 z-40 flex items-center justify-between px-6 py-4 md:px-16 lg:px-24 md:py-5 border-b">
      <a
        href="/"
        className="font-display text-lg font-black tracking-tight hover:text-primary transition-colors duration-200 hidden md:block"
      >
        wercche
      </a>
      <a
        href="/"
        className="font-display text-sm font-black tracking-tight hover:text-primary transition-colors duration-200 md:hidden"
      >
        w.
      </a>
      <div
        className="flex items-center gap-4 md:gap-6"
        onMouseLeave={() => setHovered(null)}
      >
        {links.map((link) => {
          const key = link.label.toLowerCase();
          const isActive = activeKey === key;

          return (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHovered(key)}
              className={`relative text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-200 py-1 ${
                current === key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
