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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
        <FadeIn direction="left" delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
            {title}
          </p>
        </FadeIn>
        <div>{children}</div>
      </div>
    </FadeIn>
  );
}

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
            <div className="max-w-2xl space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
              <FadeIn delay={0.1}>
                <p>
                  I'm a Media Arts student based in Poland, working across web
                  development and design, 3D, and other visuals. Most of my time
                  goes into building things that are simply fun and functional.
                  Both in real life and in cyberspace.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  My studies sit at the intersection of art and technology,
                  which is how I ended up caring equally about clean code and
                  beautiful craft. I'm drawn to projects where those two things
                  aren't separate.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p>
                  Currently taking on freelance work and looking for
                  collaborations with studios and teams.
                  <br />
                  Also open to a full-time position.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <Section title="Tools & Tech">
              <StaggerChildren stagger={0.06} className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <StaggerItem key={tool}>
                    <span className="inline-block rounded-full px-5 py-2.5 text-sm font-medium bg-muted text-foreground border border-border transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                      {tool}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </Section>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <Section title="Get in touch">
              <div className="flex flex-col gap-4">
                {links.map((link, i) => (
                  <FadeIn key={link.label} delay={i * 0.1}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 border-b border-border transition-colors duration-200 hover:border-primary"
                    >
                      <span className="font-display text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                        {link.label}
                      </span>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200 text-lg">
                        &rarr;
                      </span>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </Section>
          </div>
        </section>
        <ContactBlob />
        <div className="h-20" />
      </div>
    </PageTransition>
  );
}
