"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "./motion/FadeIn";
import type {
  CaseStudy as CaseStudyData,
  CaseStudyScreen,
} from "@/data/case-studies";

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <section className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
        <FadeIn direction="left" delay={delay + 0.1}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground pt-1 lg:sticky lg:top-8">
            {title}
          </h3>
        </FadeIn>
        <div className="max-w-[70ch] space-y-5 text-base md:text-lg leading-relaxed text-foreground">
          {children}
        </div>
      </section>
    </FadeIn>
  );
}

function ParallaxScreen({
  screen,
  index,
}: {
  screen: CaseStudyScreen;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // middle items drift a little faster for a layered feel
  const speed = index % 2 === 1 ? -35 : -20;
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex flex-col gap-3">
      <div className="relative overflow-hidden border border-border transition-transform duration-300 hover:-translate-y-1">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={390}
          height={844}
          className="w-full h-auto"
        />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
        {screen.caption}
      </span>
    </motion.div>
  );
}

export default function CaseStudy({
  caseStudy,
}: {
  caseStudy: CaseStudyData;
}) {
  const { screens, sections } = caseStudy;

  return (
    <>
      {screens && screens.length > 0 && (
        <div className="px-[clamp(1rem,4vw,4rem)] pb-16">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {screens.map((screen, i) => (
              <ParallaxScreen key={screen.src} screen={screen} index={i} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <div className="px-[clamp(1rem,4vw,4rem)] py-16 space-y-16">
        <div className="space-y-20">
          {sections.map((section, i) => (
            <Section
              key={section.title}
              title={section.title}
              delay={i === 0 ? 0 : 0.05}
            >
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </Section>
          ))}
        </div>
      </div>
    </>
  );
}
