"use client";

import { useState } from "react";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  { category: "Creative", items: ["p5.js", "Three.js", "Blender", "GLSL"] },
  {
    category: "Design",
    items: ["Figma", "UI/UX", "Typography", "Motion Design"],
  },
  {
    category: "Other",
    items: ["Git", "Node.js", "REST APIs", "Responsive Design"],
  },
];

const experience = [
  {
    role: "Your Role Here",
    company: "Company / Freelance",
    period: "2024 – Present",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nisl vel tincidunt luctus.",
  },
  {
    role: "Another Role",
    company: "Studio / Agency",
    period: "2023 – 2024",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    role: "Internship / Project",
    company: "Organization",
    period: "2022 – 2023",
    description:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo.",
  },
];

const funFacts = [
  "Lorem ipsum dolor sit amet — swap for a real fun fact",
  "Consectetur adipiscing elit — or a hobby you love",
  "Sed do eiusmod tempor — something that makes you, you",
];

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div
      className="max-h-screen overflow-y-auto"
    >
      <section className="px-8 pt-20 pb-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* photo placeholder */}
          <div
            className="aspect-[3/4] w-full max-w-[280px] mx-auto lg:mx-0 rounded-[var(--radius-lg)] overflow-hidden"

          >
            <div className="flex h-full w-full items-center justify-center">
              <span
                className="text-xs font-medium"
              >
                Your photo here
              </span>
            </div>
          </div>


          <div className="lg:col-span-2 flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
              About
            </h1>

            <div className="space-y-5 text-base leading-relaxed max-w-xl text-foreground">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. I am a
                creative technologist working across web development, generative
                motion, and 3D.
              </p>
              <p className="text-muted-foreground">
                Sed euismod nisl vel tincidunt luctus. I design interfaces where
                code defines behavior and rhythm, not just layout. Nunc sapien
                aliquet nunc, vitae bibendum nisi.
              </p>
              <p className="text-muted-foreground">
                Currently focused on interactive web experiences and expressive
                systems. Vivamus magna justo, lacinia eget consectetur sed.
              </p>
            </div>

            {/* quick contact links */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: "Email", href: "mailto:wercche@gmail.com" },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/wercche/",
                },
                { label: "GitHub", href: "https://github.com/Kmetho" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/wercche/",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 bg-muted text-muted-foreground radius-border border-solid hover:bg-accent hover:text-accent-foreground Hover:border-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="mx-auto max-w-5xl h-px" />

      {/* ── SKILLS ── */}
      <section className="px-8 py-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <h2 className="mb-8 text-xs font-bold uppercase tracking-widest">
          Skills & Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-display text-sm font-bold mb-3">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-all duration-200 cursor-default"
                    // style={{
                    //   background:
                    //     hoveredSkill === skill
                    //       ? "var(--accent)"
                    //       : "var(--muted)",
                    //   color:
                    //     hoveredSkill === skill
                    //       ? "var(--accent-foreground)"
                    //       : "var(--muted-foreground)",
                    //   border: `1px solid ${
                    //     hoveredSkill === skill
                    //       ? "var(--accent)"
                    //       : "var(--border)"
                    //   }`,
                    // }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div
        className="mx-auto max-w-5xl h-px"
      />

      <section className="px-8 py-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <h2 className="mb-8 text-xs font-bold uppercase tracking-widest">
          Experience
        </h2>

        <div className="flex flex-col gap-6">
          {experience.map((item, i) => (
            <div
              key={i}
              className="group rounded-[var(--radius)] p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium">{item.company}</p>
                </div>
                <span className="text-xs font-medium rounded-full px-3 py-1 w-fit">
                  {item.period}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl h-px" />

      <section className="px-8 py-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <h2 className="mb-8 text-xs font-bold uppercase tracking-widest">
          Beyond the Screen
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {funFacts.map((fact, i) => (
            <div
              key={i}
              className="rounded-[var(--radius)] p-6 text-sm leading-relaxed transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="block font-display text-2xl font-extrabold mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              {fact}
            </div>
          ))}
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
