"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/data/sections";

export function Section4({ section }: { section: Section }) {
  const poems = section.poems ?? [];
  return (
    <div className="py-24 space-y-32">
      {poems.map((poem, i) => (
        <div key={i} className="min-h-[60vh] flex items-center px-8 md:px-16">
          <div
            className={
              poem.textPosition === "right"
                ? "ml-auto max-w-lg"
                : poem.textPosition === "left"
                  ? "mr-auto max-w-lg"
                  : "mx-auto max-w-lg text-center"
            }
          >
            {poem.lines.map((line, li) => (
              <p
                key={li}
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: poem.textColor }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
