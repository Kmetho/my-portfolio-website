"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/data/sections";

export function Section7({ section }: { section: Section }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-sm tracking-widest uppercase opacity-40 text-foreground">
        offf... that's it!
      </p>
    </div>
  );
}
