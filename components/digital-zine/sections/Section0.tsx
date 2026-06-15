"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/data/sections";

export function Section0({ section }: { section: Section }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-evenly pointer-events-none">
      <img
        src="/experiments/digital-zine/images/clp.svg"
        alt="Cyber Love Poems"
        className="w-100 h-auto"
      />
      <p className="mt-16 text-xs text-foreground animate-pulse">
        scroll to enter
      </p>
    </div>
  );
}
