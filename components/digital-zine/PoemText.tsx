"use client";

import { useEffect, useRef } from "react";
import { Poem } from "@/data/poems";

export function PoemText({ poem, index }: { poem: Poem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const lines = el.querySelectorAll(".poem-line");
          lines.forEach((line, i) => {
            (line as HTMLElement).style.transitionDelay = `${i * 120}ms`;
            line.classList.add("revealed");
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full px-8 md:px-16 ${
        poem.textPosition === "right"
          ? "ml-auto max-w-lg"
          : poem.textPosition === "left"
            ? "mr-auto max-w-lg"
            : "mx-auto max-w-lg text-center"
      }`}
    >
      {poem.lines.map((line, i) => (
        <p
          key={i}
          className="poem-line text-lg md:text-xl leading-relaxed
                     opacity-0 translate-y-4 transition-all duration-700 ease-out
                     [&.revealed]:opacity-100 [&.revealed]:translate-y-0"
          style={{ textAlign: poem.textAlign, color: poem.textColor }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
