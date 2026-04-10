"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/data/sections";

gsap.registerPlugin(ScrollTrigger);

export function Section1({ section }: { section: Section }) {
  const poems = section.poems ?? [];
  if (poems.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const left = el.querySelector(".left");
    const right = el.querySelector(".right");
    const texts = el.querySelectorAll("text");

    const tl = gsap.timeline({
      defaults: { duration: 3, ease: "power2.inOut" },
    });
    tl.fromTo(
      [left, right],
      {
        svgOrigin: "640 500",
        skewY: (i: number) => [-30, 15][i],
        scaleX: (i: number) => [0.6, 0.85][i],
        x: 200,
      },
      {
        skewY: (i: number) => [-15, 30][i],
        scaleX: (i: number) => [0.85, 0.6][i],
        x: -200,
      },
    );
    tl.pause();

    const tl2 = gsap.timeline();
    texts.forEach((t, i) => {
      tl2.add(
        gsap.fromTo(
          t,
          { xPercent: -100, x: 500 },
          { duration: 1, xPercent: 0, x: 375, ease: "sine.inOut" },
        ),
        (i % poems[0].lines.length) * 0.05,
      );
    });
    tl2.pause();

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 1,
      onUpdate: (self) => {
        tl.progress(self.progress);
        tl2.progress(self.progress);
      },
    });
  }, []);

  const allLines = poems.flatMap((p) => p.lines);

  return (
    <div ref={containerRef} className="min-h-[60vh] flex items-center">
      <svg viewBox="0 0 1280 720" className="w-full h-full">
        <mask id="maskLeft">
          <rect x="-50%" width="100%" height="100%" fill="#fff" />
        </mask>
        <mask id="maskRight">
          <rect x="50%" width="100%" height="100%" fill="#fff" />
        </mask>
        <g fontSize={Math.min(100, 300 / allLines.length)}>
          <g
            mask="url(#maskLeft)"
            fill={poems[0]?.textColor ?? "#fff"}
            className="left"
          >
            {allLines.map((line, i) => (
              <text key={`l-${i}`} y={120 + i * (400 / allLines.length)}>
                {line}
              </text>
            ))}
          </g>
          <g mask="url(#maskRight)" fill="#aaa" className="right">
            {allLines.map((line, i) => (
              <text key={`r-${i}`} y={120 + i * (400 / allLines.length)}>
                {line}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
