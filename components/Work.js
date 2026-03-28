"use client";

import Image from "next/image";

const briefedScreens = [
  {
    src: "/homepage-no-user.jpg",
    alt: "Briefed landing page — Stop losing briefs in your DMs",
    caption: "Landing",
  },
  {
    src: "/homepage-user.jpg",
    alt: "Briefed logged-in homepage — Your briefs, all in one place",
    caption: "Home",
  },
  {
    src: "/dashboard.jpg",
    alt: "Briefed dashboard — My Briefs with status filters and brief cards",
    caption: "Dashboard",
  },
];

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Supabase",
  "Clerk",
  "UploadThing",
  "shadcn/ui v4",
  "Tailwind v4",
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
      {/* ── hero ── */}
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

          {/* meta row */}
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
                {["Next.js", "TypeScript", "Supabase", "Tailwind"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── screenshots ── */}
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

      {/* ── case study body ── */}
      <div className="px-8 py-16 md:px-16 lg:px-24 space-y-16">
        <div className="max-w-6xl space-y-20">
          {/* The problem */}
          <Section title="The problem">
            <p>
              Every freelance creative project starts the same way: a string of
              DMs, a voice note, maybe a screenshot of a Pinterest board. The
              client knows what they want but can&rsquo;t articulate it. You know
              what you need to know but don&rsquo;t want to send a 12-question
              email that feels like a tax form.
            </p>
            <p>
              I&rsquo;d been on both sides of this. As a student taking on small
              commissions, I was piecing together briefs from half-finished
              conversations and filling in the gaps myself&nbsp;&mdash; which
              meant misaligned expectations, scope creep, and unpaid revision
              rounds.
            </p>
            <p>
              The fix felt obvious: a tool that sends clients a guided form and
              gives you back a clean PDF. Nothing radical. But everything that
              existed was either too enterprise (Notion databases, Airtable
              forms) or too shallow (Google Forms with no structure). I wanted
              something that felt like it was built specifically for
              creatives&nbsp;&mdash; not adapted from a generic SaaS template.
            </p>
          </Section>

          {/* What changed */}
          <Section title="What changed">
            <p>
              Briefed didn&rsquo;t start as what it is now. The first version
              was built with a different architectural approach and a UI that was
              functional but felt generic&nbsp;&mdash; the kind of thing you
              build when you&rsquo;re still figuring out what the product
              actually is.
            </p>
            <p>
              The rebuild was both a full architectural rewrite and a visual
              overhaul. I rethought the data model, replaced the component
              library approach, moved to shadcn/ui v4 with Tailwind v4, and
              redesigned the UI from scratch. The core idea stayed the same;
              almost everything else changed.
            </p>
            <p>
              The visual direction shifted toward something more editorial and
              deliberate. Less &ldquo;SaaS starter kit,&rdquo; more &ldquo;tool
              made by someone who actually thinks about aesthetics.&rdquo; That
              distinction matters when your target users are designers,
              photographers, and creative directors&nbsp;&mdash; people who will
              notice if your product looks like it was built from a tutorial.
            </p>
          </Section>

          {/* Design decisions */}
          <Section title="Design decisions">
            <p>
              The client-facing brief form needed to feel light and guided, not
              like an intake questionnaire. I chose a multi-step layout
              deliberately&nbsp;&mdash; one question cluster per screen, clear
              progress, no wall of fields. Clients (especially non-technical
              ones) abandon long forms. Breaking it up was a UX decision with a
              real effect on completion rate.
            </p>
            <p>
              The public brief view (what the freelancer shares or references
              throughout the project) is intentionally minimal. Just the
              information, cleanly typeset, no chrome. It needed to be
              printable, screenshot-able, and readable in a Zoom call. The PDF
              export mirrors this&nbsp;&mdash; jsPDF generates it client-side,
              no server round trip.
            </p>
            <p>
              For the dashboard I kept the information density low on purpose.
              Freelancers don&rsquo;t manage hundreds of briefs&nbsp;&mdash;
              they manage a handful of active projects at a time. A clean list
              with search and archive is enough. I resisted adding more features
              here specifically because feature creep is how tools stop feeling
              like tools and start feeling like software.
            </p>
          </Section>

          {/* Tech choices */}
          <Section title="Tech choices">
            <p>
              <strong>Next.js 16 + React 19</strong>&nbsp;&mdash; App Router,
              server components where they make sense. Next.js was a deliberate
              portfolio choice too: it&rsquo;s what Warsaw digital studios
              actually use, and I wanted to demonstrate I can work in that
              ecosystem.
            </p>
            <p>
              <strong>Supabase</strong>&nbsp;&mdash; Postgres with Row Level
              Security for data isolation between users. Simple enough to get
              running fast, real enough to show I understand relational data and
              auth-gated queries.
            </p>
            <p>
              <strong>Clerk</strong>&nbsp;&mdash; Auth. The developer experience
              is genuinely good and the UI components are customizable enough to
              match the product&rsquo;s visual language without looking bolted
              on.
            </p>
            <p>
              <strong>UploadThing</strong>&nbsp;&mdash; File uploads for client
              moodboard images. This is where I hit the most friction (more on
              that below).
            </p>
            <p>
              <strong>shadcn/ui v4 + Tailwind v4</strong>&nbsp;&mdash; Component
              primitives I actually control, not a black-box UI kit. Tailwind v4
              is a meaningful shift from v3 and I wanted experience with it. The
              CSS variable approach also made implementing a consistent design
              system significantly easier.
            </p>
            <p>
              <strong>jsPDF</strong>&nbsp;&mdash; Client-side PDF generation. It
              does what it needs to do. It&rsquo;s not elegant to work
              with&nbsp;&mdash; the coordinate system is manual and layout is
              fiddly&nbsp;&mdash; but it keeps the feature dependency-light and
              serverless.
            </p>
          </Section>

          {/* The hardest part */}
          <Section title="The hardest part">
            <p>
              Getting Clerk and UploadThing to work together cleanly was the
              most frustrating part of the build. UploadThing needs to verify
              that the uploading user is authenticated&nbsp;&mdash; which means
              threading Clerk&rsquo;s auth context through UploadThing&rsquo;s
              server-side route handler correctly.
            </p>
            <p>
              The issue wasn&rsquo;t that either library was badly documented.
              It was that their integration examples assumed slightly different
              setups than mine, and the error messages when auth failed were
              opaque enough that I spent a significant amount of time debugging
              something that turned out to be a middleware configuration issue.
              Clerk&rsquo;s middleware needs to be explicitly configured to not
              intercept UploadThing&rsquo;s API routes, or uploads silently
              fail.
            </p>
            <p>
              Once I understood the problem it was a one-line fix. Getting there
              was not.
            </p>
          </Section>

          {/* What I'd do differently */}
          <Section title="What I'd change">
            <p>
              <strong>Scope it smaller from the start.</strong> The first version
              tried to do too much before the core was solid. A brief form that
              generates a PDF&nbsp;&mdash; that&rsquo;s the product. Everything
              else (dashboard, archive, search, moodboard uploads) is useful,
              but building those before the core experience was airtight meant I
              was maintaining complexity I hadn&rsquo;t earned yet.
            </p>
            <p>
              If I started today I&rsquo;d ship the form-to-PDF flow first, get
              it in front of real users, and let actual feedback drive what came
              next. I built features I assumed people would want. That&rsquo;s
              different from building features people asked for.
            </p>
            <p>
              <strong>I&rsquo;d audit my dependencies before shipping.</strong>
              {" "}Honest admission: <code>react-hook-form</code> and{" "}
              <code>dotenv</code> are still sitting in my{" "}
              <code>package.json</code> as I write this. They&rsquo;re not
              used&nbsp;&mdash; they&rsquo;re leftovers from an earlier approach
              that I didn&rsquo;t clean up. In a production codebase those would
              get flagged in a PR review immediately. It&rsquo;s a small thing,
              but it matters&nbsp;&mdash; dead dependencies add noise and, in
              the case of something like dotenv in a Next.js project, signal
              that you&rsquo;re not thinking carefully about your environment
              config. I&rsquo;m fixing it. But I&rsquo;m leaving this paragraph
              in because pretending the mess doesn&rsquo;t exist would make this
              a worse case study.
            </p>
          </Section>

          {/* What it taught me */}
          <Section title="What it taught me">
            <p>
              Building a full-stack product solo&nbsp;&mdash; from data model to
              auth to file uploads to PDF export to deployment&nbsp;&mdash; is a
              different kind of learning than following a tutorial. Things break
              in ways tutorials don&rsquo;t cover. You make decisions with
              incomplete information and have to live with them. You find out
              what you actually understand versus what you could reproduce.
            </p>
            <p>
              Briefed is the project where I stopped feeling like I was learning
              to code and started feeling like I was building software. That
              distinction is hard to explain but very easy to feel.
            </p>
          </Section>
        </div>
      </div>

      {/* ── tech footer ── */}
      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />
      <footer className="px-8 py-12 md:px-16 lg:px-24">
        <div className="max-w-6xl flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border"
            >
              {t}
            </span>
          ))}
        </div>
      </footer>

      <div className="h-20" />
    </article>
  );
}
