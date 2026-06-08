"use client";

import ContactBlob from "./ContactBlob";
import FadeIn from "./motion/FadeIn";
import PageTransition from "./motion/PageTransition";
import StaggerChildren, { StaggerItem } from "./motion/StaggerChildren";

const links = [
  { label: "Email", href: "mailto:wercche@gmail.com" },
  { label: "GitHub", href: "https://github.com/Kmetho" },
  { label: "Tumblr", href: "https://wercche.tumblr.com/" },
];

export default function About() {
  return (
    <PageTransition>
      <div>
        <section className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-12">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
              About
            </p>
          </FadeIn>
          <div className="font-sans max-w-[70ch] space-y-6 text-lg md:text-xl leading-relaxed text-foreground">
            <FadeIn delay={0.1}>
              <p>
                Creative technologist working across the web, 3D, and other
                visuals. Most of my time goes into building things that are
                simply fun and functional.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p>I'm drawn to projects where art meets technology.</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p>Open for freelance, collaborations or full-time position.</p>
            </FadeIn>
          </div>
        </section>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <section className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
              <FadeIn direction="left" delay={0.1}>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground pt-1">
                  Contact/socials
                </p>
              </FadeIn>
              <div>
                <StaggerChildren
                  stagger={0.06}
                  className="flex flex-wrap gap-x-6 gap-y-2"
                >
                  {links.map((link) => (
                    <StaggerItem key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <span className="text-xs uppercase tracking-widest text-foreground transition-opacity duration-200 group-hover:opacity-60">
                          {link.label}
                        </span>
                      </a>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </FadeIn>
        </section>

        <ContactBlob />
      </div>
    </PageTransition>
  );
}
