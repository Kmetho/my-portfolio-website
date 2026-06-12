"use client";

import ProjectCard from "@/components/ProjectCard";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import LazyVideo from "@/components/LazyVideo";
import { VisualWorkGrid } from "@/components/VisualWorkGrid";
import { projects } from "@/data/projects";
import { photos, renders } from "@/data/images";

export default function Experiments() {
  return (
    <PageTransition>
      <section className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-16">
        <FadeIn delay={0}>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
            Work
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
            Selected projects and things I've built
          </h1>
        </FadeIn>
      </section>

      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <section className="px-[clamp(1rem,4vw,4rem)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={0.1 * i} />
          ))}
        </div>
      </section>

      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <section className="px-[clamp(1rem,4vw,4rem)] py-16">
        <FadeIn delay={0}>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
            Visual work
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <VisualWorkGrid items={photos} />
        </FadeIn>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <FadeIn delay={0.2}>
          <VisualWorkGrid items={renders} />
        </FadeIn>
      </section>

      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <section className="px-[clamp(1rem,4vw,4rem)] py-16">
        <FadeIn delay={0}>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
            Generative visualization
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="overflow-hidden border border-border aspect-video max-w-3xl">
            <LazyVideo
              src="/experiments/vis-web.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-base md:text-lg text-foreground max-w-[70ch]">
            Audio-reactive visuals built in TouchDesigner, exploring real-time
            feedback between sound and geometry.
          </p>
        </FadeIn>
      </section>

      <ContactBlob />
      <div className="h-20" />
    </PageTransition>
  );
}
