"use client";

import ContactBlob from "./ContactBlob";
import FadeIn from "./motion/FadeIn";
import PageTransition from "./motion/PageTransition";
import StaggerChildren, { StaggerItem } from "./motion/StaggerChildren";

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "shadcn/ui",
  "Vercel",
  "Git",
  "Blender",
  "Adobe Creative Suite",
  "Figma",
  "TouchDesigner",
];

const links = [
  { label: "Email", href: "mailto:wercche@gmail.com" },
  { label: "GitHub", href: "https://github.com/Kmetho" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wercche/" },
];

export default function About() {
  return (
    <PageTransition>
      <div>
        <section className="px-8 pt-24 pb-20 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
                About
              </p>
            </FadeIn>
            <div className="max-w-6xl space-y-5 text-sm leading-relaxed text-foreground/85">
              <FadeIn delay={0.1}>
                <p>
                  Media Arts student working across the web, 3D, and other
                  visuals. Most of my time goes into building things that are
                  simply fun and functional. Both in real life and in
                  cyberspace.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  My studies sit at the intersection of art and technology. I'm
                  drawn to projects where those two things align.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>Open for freelance, collaborations or full-time position.</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="px-8 pb-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <div className="flex flex-row justify-between gap-1">
              {links.map((link, i) => (
                <FadeIn key={link.label} delay={i * 0.1}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-colors duration-200"
                  >
                    <span className="text-xs uppercase font-bold tracking-tight text-muted-foreground group-hover:text-primary transition-colors duration-200">
                      {link.label}
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
                <FadeIn direction="left" delay={0.1}>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
                    Tools & Technologies
                  </p>
                </FadeIn>
                <div>
                  <StaggerChildren
                    stagger={0.06}
                    className="flex flex-wrap gap-3"
                  >
                    {tools.map((tool) => (
                      <StaggerItem key={tool}>
                        <span className="inline-block text-sm text-foreground">
                          {tool}
                        </span>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <ContactBlob />
      </div>
    </PageTransition>
  );
}
