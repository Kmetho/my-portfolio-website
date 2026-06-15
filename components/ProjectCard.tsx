"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./motion/FadeIn";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  delay?: number;
  priority?: boolean;
}

export default function ProjectCard({
  project,
  delay = 0,
  priority = false,
}: ProjectCardProps) {
  const href = project.liveUrl || "#";

  const [warnOpen, setWarnOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!warnOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWarnOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [warnOpen]);

  return (
    <div className="glass rounded-4xl border border-border pt-8 pl-8 pr-8 z-10">
      <FadeIn delay={delay}>
        <motion.article
          className="group overflow-hidden border-t border-border"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative aspect-16/10 overflow-hidden bg-background">
            <Image
              src={project.thumbnail}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="py-6 md:py-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                {project.year}
              </span>
              {project.wip && (
                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
                  · WIP
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl tracking-tight leading-[1.05] mb-3 text-foreground">
              {project.title}
            </h2>

            <p className="text-base leading-relaxed text-foreground mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
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

            <div className="flex flex-wrap items-center gap-6">
              {project.liveUrl && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (project.wip) {
                      e.preventDefault();
                      setWarnOpen(true);
                    }
                  }}
                  className="inline-flex items-center gap-1 border-b border-foreground pb-0.5 text-sm font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-60"
                >
                  Try it live&ensp;&rarr;
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-60"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.article>
      </FadeIn>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {warnOpen && (
              <motion.div
                className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
                onClick={() => setWarnOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Work in progress warning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-md rounded-4xl border border-border bg-background p-8 text-center text-foreground"
                  initial={{ scale: 0.85, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 12 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                >
                  <motion.div
                    aria-hidden
                    className="mb-4 text-5xl"
                    animate={{ rotate: [-9, 9, -9] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  >
                    🚧
                  </motion.div>

                  <h3 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
                    Caution!
                  </h3>
                  <p className="text-lg font-bold text-foreground">
                    This is work in progress!
                  </p>
                  <p className="mt-2 mb-8 text-sm leading-relaxed text-foreground">
                    Here's where it's at right now, but beware, as it might
                    evolve…
                  </p>

                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                      onClick={() => setWarnOpen(false)}
                      className="rounded-full border border-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-foreground transition-opacity hover:opacity-60"
                    >
                      ✕ I'm scared…
                    </button>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.03]"
                      style={{ background: "var(--signal)", color: "#040404" }}
                    >
                      ✓ Enter anyway!
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
