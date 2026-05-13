"use client";

import ContactBlob from "./ContactBlob";
import FadeIn from "./motion/FadeIn";
import PageTransition from "./motion/PageTransition";
import { ExperimentCard } from "./ExperimentCard";
import { VisualWorkGrid } from "./VisualWorkGrid";
import {
  getInteractiveExperiments,
  getVisualWork,
} from "@/data/experiments";

export default function Experiments() {
  const interactive = getInteractiveExperiments();
  const visual = getVisualWork();

  return (
    <PageTransition>
      <section>
        <div className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
              Media Arts
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
              3D, generative & visual experiments
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-serif text-lg md:text-xl text-foreground max-w-[70ch]">
              My various explorations where code meets aesthetics.
            </p>
          </FadeIn>
        </div>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        {/* Interactive experiments */}
        <div className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn delay={0}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
              Interactive
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {interactive.map((exp) => (
              <FadeIn key={exp.id} delay={0.1}>
                <ExperimentCard experiment={exp} />
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        {/* Visual work */}
        <div className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn delay={0}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
              Visual work
            </h2>
          </FadeIn>
          <VisualWorkGrid items={visual} />
        </div>

        <ContactBlob />
        <div className="h-20" />
      </section>
    </PageTransition>
  );
}
