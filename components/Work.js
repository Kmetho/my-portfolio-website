"use client";

import Image from "next/image";
import ContactBlob from "./ContactBlob";

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

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Clerk Auth",
  "UploadThing",
  "shadcn/ui",
  "Tailwind",
  "jsPDF",
  "Vercel",
];

function Section({ title, children }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 items-baseline">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1 lg:sticky lg:top-8">
        {title}
      </h3>
      <div className="max-w-2xl space-y-5 text-base leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <article className="max-h-screen overflow-y-auto">
      <header className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
              Case Study
            </span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              2026
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            Briefed
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-2xl mb-10">
            A client brief tool for creative freelancers. Turn chaotic client
            messages into structured, actionable briefs. Send a guided form, get
            a clean PDF.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="https://briefedapp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[0_8px_32px_var(--glow-primary)]"
            >
              Try it live&ensp;&rarr;
            </a>
            <a
              href="https://github.com/Kmetho/briefed-shadcn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 border border-border text-foreground hover:bg-muted"
            >
              GitHub
            </a>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Role
              </p>
              <p className="text-foreground">Design, frontend, product</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 pb-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {briefedScreens.map((screen) => (
              <div key={screen.src} className="flex flex-col gap-3">
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
              </div>
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
              client knows what they want but can't articulate it. You know what
              you need to know but don't want to send a 12-question email that
              feels like a tax form.
            </p>
            <p>
              I'd been on both sides of this. As a student taking on small
              commissions, I was piecing together briefs from half-finished
              conversations and filling in the gaps myself - which meant
              misaligned expectations, scope creep, and unpaid revision rounds.
            </p>
            <p>
              The fix felt obvious: a tool that sends clients a guided form and
              gives you back a clean PDF. Nothing radical. But everything that
              existed was either too enterprise or too shallow. I wanted
              something that felt like it was built specifically for creatives.
            </p>
          </Section>

          <Section title="Design decisions">
            <p>
              The brief form needed to be simple. I chose a multi-step layout -
              one batch of inputs per one step, clear progress, no wall of
              fields. Clients tend to abandon long forms, so breaking it up was
              a much needed UX decision.
            </p>
            <p>
              The public brief view (what the freelancer shares/references) is
              intentionally minimal. It needed to be printable, screenshot-able,
              and readable in a Zoom call. The same goes for the PDF export.
            </p>
            <p>
              For the dashboard I kept the information density low. Freelancers
              don't manage hundreds of briefs, but a handful of active projects
              at a time. I think a clean list with search and archive is enough.
            </p>
          </Section>

          <Section title="The hardest part">
            <p>
              Due to the fact that I don't have any dev acquaintances, and I
              could only count on Calude Code to help me understand all of the
              back-end shenanigans, everything excluding the front was
              frustrating.
            </p>
            <p>
              Getting Clerk and UploadThing to work together cleanly for
              example. I waded through a quagmire only be humbled (it was a
              one-line fix).
            </p>
          </Section>

          <Section title="What it taught me">
            <p>A LOT.</p>
          </Section>
        </div>
      </div>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      <ContactBlob />
      <div className="h-20" />
    </article>
  );
}
