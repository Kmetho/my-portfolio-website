"use client";

import { useState } from "react";
import Image from "next/image";

const featured = {
  title: "Briefed",
  subtitle: "Your daily news, distilled.",
  tags: ["Next.js", "UI/UX", "Mobile-first", "API Integration"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nisl vel tincidunt luctus. Nunc sapien aliquet nunc, vitae bibendum nisi nisl vel lorem. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
  image: "/placeholder.png",
  link: "https://briefedapp.vercel.app/",
};

const otherProjects = [
  {
    id: 1,
    title: "Flower Finder",
    tags: ["Next.js", "Data Fetching", "CSS"],
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    image: "/placeholder.png",
    link: "https://flower-finder.netlify.app/",
  },
  {
    id: 2,
    title: "Crystal World",
    tags: ["Three.js", "Blender", "WebGL"],
    description:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    image: "/placeholder.png",
    link: "https://crystalssss.netlify.app/",
  },
  {
    id: 3,
    title: "Notes app",
    tags: ["React", "JSX", "UI"],
    description:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    image: "/placeholder.png",
    link: "#",
  },
];

function FeaturedProject({ project }) {
  return (
    <div className="group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card transition-all duration-500">
      <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
        <span className="w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
          Featured Project
        </span>

        <h2 className="font-display text-3xl font-extrabold tracking-tight lg:text-4xl">
          {project.title}
        </h2>

        <p className="text-lg font-medium -mt-2 text-muted-foreground">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed max-w-md text-muted-foreground">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-3 w-fit rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[0_8px_32px_var(--glow-primary)]"
        >
          View Case Study →
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--muted)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold tracking-tight">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
        >
          View project →
        </a>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section className="max-h-screen overflow-y-auto px-6 py-10 md:px-12 md:py-16">
      {/* ── page header ── */}
      <div className="mx-auto mb-12 max-w-6xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Work
        </h1>
        <p className="mt-3 max-w-lg text-base">
          A collection of projects spanning web, 3D, creative coding, and
          design. Each one a little experiment in making the screen feel alive.
        </p>
      </div>

      {/* ── FEATURED: Briefed ── */}
      <div className="mx-auto mb-14 max-w-6xl">
        <FeaturedProject project={featured} />
      </div>

      {/* ── other projects ── */}
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-xs font-bold uppercase tracking-widest">
          More Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* ── renders section ── */}
      <div className="mx-auto mt-16 max-w-6xl">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest">
          3D & Renders
        </h2>
        <p className="mb-8 max-w-lg text-sm">
          Blender experiments and visual explorations.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-[var(--radius-sm)] transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-xs font-medium">Render {i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll spacer */}
      <div className="h-20" />
    </section>
  );
}
