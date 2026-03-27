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

export default function Work() {
  return (
    <section className="max-h-screen overflow-y-auto">
      {/* ── page header ── */}
      <div className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
            Selected work
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl">
            Things I&rsquo;ve built, shipped & put out into the world.
          </h1>
        </div>
      </div>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      {/* ── BRIEFED ── */}
      <div className="px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          {/* project header — asymmetric two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                  Featured
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  2026
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-6">
                Briefed
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-lg">
                Turn chaotic client messages into structured, actionable briefs.
                Send a guided form, get a clean PDF.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:pt-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Tailwind", "Vercel"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Role
                </p>
                <p className="text-sm text-foreground">
                  Design, frontend, product
                </p>
              </div>
              <a
                href="https://briefedapp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[0_8px_32px_var(--glow-primary)]"
              >
                Try it live →
              </a>
            </div>
          </div>

          {/* screens */}
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

      {/* ── 3D & renders ── */}
      <div className="px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
              3D & Renders
            </p>
            <p className="text-lg text-muted-foreground max-w-md">
              Blender experiments and visual explorations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-[var(--radius-sm)] transition-all duration-300 hover:shadow-lg bg-muted border border-border"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {String(i).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20" />
    </section>
  );
}
