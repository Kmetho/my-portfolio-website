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
          className={`overflow-hidden rounded-[var(--radius)] border border-border bg-card transition-colors duration-300 group-hover:border-primary/30 ${
            project.featured ? "col-span-full" : ""
          }`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={project.thumbnail}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Case Study
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {project.year}
              </span>
            </div>

            <h2 className="italic text-xl md:text-2xl tracking-tight mb-2">
              {project.title}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
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
