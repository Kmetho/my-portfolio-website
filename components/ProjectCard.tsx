"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "./motion/FadeIn";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/work/${project.slug}`} className="group block">
        <motion.article
          className="overflow-hidden border-t border-border"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative aspect-16/10 overflow-hidden bg-background">
            <Image
              src={project.thumbnail}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] loading-eager"
            />
          </div>

          <div className="py-6 md:py-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                Case Study
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                {project.year}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05] mb-3 text-foreground">
              {project.title}
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-foreground max-w-[70ch] mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium text-foreground"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="text-[11px] font-medium text-foreground">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </FadeIn>
  );
}
