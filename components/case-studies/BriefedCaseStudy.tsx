"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "../motion/FadeIn";

const briefedScreens = [
  {
    src: "/homepage-no-user.jpg",
    alt: "Briefed landing page - Stop losing briefs in your DMs",
    caption: "Landing",
  },
  {
    src: "/homepage-user.jpg",
    alt: "Briefed logged-in homepage - Your briefs, all in one place",
    caption: "Home",
  },
  {
    src: "/dashboard.jpg",
    alt: "Briefed dashboard - My Briefs with status filters and brief cards",
    caption: "Dashboard",
  },
];

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <section className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
        <FadeIn direction="left" delay={delay + 0.1}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1 lg:sticky lg:top-8">
            {title}
          </h3>
        </FadeIn>
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/85">
          {children}
        </div>
      </section>
    </FadeIn>
  );
}

function ParallaxScreen({ screen, index }: { screen: typeof briefedScreens[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const speeds = [-20, -35, -20];
  const y = useTransform(scrollYProgress, [0, 1], [0, speeds[index] || -20]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={390}
          height={844}
          className="w-full h-auto"
        />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {screen.caption}
      </span>
    </motion.div>
  );
}

export default function BriefedCaseStudy() {
  return (
    <>
      <div className="px-8 pb-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {briefedScreens.map((screen, i) => (
              <ParallaxScreen key={screen.src} screen={screen} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      <div className="px-8 py-16 md:px-16 lg:px-24 space-y-16">
        <div className="max-w-6xl space-y-20">
          <Section title="The problem">
            <p>
              Every freelance creative project starts the same way: a string of
              DMs, a voice note, maybe a screenshot of a Pinterest board. The
              client knows what they want but can&apos;t articulate it. You know
              what you need to know but don&apos;t want to send a 12-question
              email that feels like a tax form.
            </p>
            <p>
              Thus I pondered about a tool that sends clients a guided form and
              gives back a clean PDF. Nothing radical. But everything that
              existed was either too enterprise or too shallow. I wanted
              something that felt like it was built specifically for creatives.
            </p>
          </Section>

          <Section title="Design decisions">
            <p>
              The brief form needed to be simple. I chose a multi-step layout -
              one batch of inputs per step, clear progress, no wall of fields.
              Clients tend to abandon long forms, so breaking it up was a much
              needed UX decision.
            </p>
            <p>
              The public brief view (what the freelancer shares/references) is
              intentionally minimal. It needed to be printable,
              screenshottable, and readable in a Zoom call. The same goes for
              the PDF export.
            </p>
            <p>
              For the dashboard I kept the information density low. Freelancers
              don&apos;t manage hundreds of briefs, but a handful of active
              projects at a time. I think a clean list with search and archive
              is enough.
            </p>
          </Section>

          <Section title="The hardest part">
            <p>
              Because I don&apos;t have any dev acquaintances, and I could only
              count on Claude Code to help me understand all of the back-end
              shenanigans, everything excluding the front was frustrating.
            </p>
            <p>
              Getting Clerk and UploadThing to work together cleanly for
              example. I waded through a quagmire only to be humbled (it was a
              one-line fix).
            </p>
          </Section>

          <Section title="What it taught me">
            <p>A LOT.</p>
          </Section>
        </div>
      </div>
    </>
  );
}
