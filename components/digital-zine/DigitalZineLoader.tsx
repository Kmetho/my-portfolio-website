"use client";

import dynamic from "next/dynamic";

import { sections } from "@/data/sections";
import { Section0 } from "./sections/Section0";
import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";
import { Section4 } from "./sections/Section4";
import { Section5 } from "./sections/Section5";
import { Section6 } from "./sections/Section6";
import { Section7 } from "./sections/Section7";
import { ZineLoaderOverlay } from "./ZineLoaderOverlay";

const Zine = dynamic(() => import("./ZineLogic"), { ssr: false });

const SECTIONS = [
  Section0,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7,
];

export default function DigitalZineLoader() {
  return (
    <div className="relative">
      <ZineLoaderOverlay />

      <Zine />

      <div className="relative z-10">
        {SECTIONS.map((SectionX, i) => (
          <section key={i} className="zine-section relative min-h-[250vh]">
            <SectionX section={sections[i]} />
          </section>
        ))}
      </div>
    </div>
  );
}
