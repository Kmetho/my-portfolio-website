"use client";

import ProjectCard from "@/components/ProjectCard";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import { projects } from "@/data/projects";

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
          <h1 className="text-2xl md:text-4xl lg:text-5xl tracking-tight leading-[0.95] text-foreground">
            Selected projects and things I've built
          </h1>
        </FadeIn>
      </section>

      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <section className="px-[clamp(1rem,4vw,4rem)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={0.1 * i}
              priority={i < 2}
            />
          ))}
        </div>
      </section>

      <ContactBlob />
      <div className="h-20" />
    </PageTransition>
  );
}
