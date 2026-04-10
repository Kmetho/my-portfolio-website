"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/data/sections";

export function Section0({ section }: { section: Section }) {
  return (
    <section className="zine-section h-screen flex items-center justify-center relative">
      <div className="relative z-10 text-center pointer-events-none">
        <Image
          src="/experiments/digital-zine/images/clp.svg"
          alt="Cyber Love Poems"
          width={600}
          height={300}
        />
        <p
          className="mt-16 text-xs animate-pulse"
          style={{ color: "rgba(90, 80, 100, 0.35)" }}
        >
          scroll to enter
        </p>
      </div>
    </section>
  );
}
