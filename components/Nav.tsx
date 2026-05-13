"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

interface NavProps {
  current?: string;
}

export default function Nav({ current }: NavProps) {
  const links = [
    { label: "Work", href: "/work" },
    { label: "Experiments", href: "/experiments" },
    { label: "About", href: "/about" },
  ];

  const [hovered, setHovered] = useState<string | null>(null);

  const activeKey = hovered || current;

  return (
    <nav className="z-40 flex items-center justify-between px-[clamp(1rem,4vw,4rem)] py-4 md:py-5 border-b border-border">
      <a
        href="/"
        className="font-sans text-lg font-black tracking-tight text-foreground hidden md:block"
      >
        wercche
      </a>
      <a
        href="/"
        className="font-sans text-sm font-black tracking-tight text-foreground md:hidden"
      >
        w.
      </a>
      <div
        className="flex items-center gap-4 md:gap-6"
        onMouseLeave={() => setHovered(null)}
      >
        <ThemeToggle />
        {links.map((link) => {
          const key = link.label.toLowerCase();
          const isActive = activeKey === key;

          return (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHovered(key)}
              className={`relative text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground py-1 ${
                current === key ? "font-black" : ""
              }`}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-signal rounded-full"
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
