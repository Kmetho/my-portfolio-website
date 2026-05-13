"use client";

import FadeIn from "../motion/FadeIn";

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
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground pt-1 lg:sticky lg:top-8">
            {title}
          </h3>
        </FadeIn>
        <div className="font-serif max-w-[70ch] space-y-5 text-base md:text-lg leading-relaxed text-foreground">
          {children}
        </div>
      </section>
    </FadeIn>
  );
}

export default function WebfolioCaseStudy() {
  return (
    <>
      <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

      <div className="px-[clamp(1rem,4vw,4rem)] py-16 space-y-16">
        <div className="space-y-20">
          <Section title="The problem">
            <p>
              Most portfolios I admired did one of two things really well.
              Either they were obviously a developer's site — clean, precise,
              slightly intimidating in the GitHub-y way — or obviously an
              artist's site, with the weird cursor and the moodboard energy. I
              am both, which sounds good in a cover letter and looks like a mess
              on a homepage.
            </p>
            <p>
              My first attempt was the kitchen sink: Blender renders, analog
              photos, code projects, sound experiments, all jostling for
              attention on the same page. It was a disaster. It looked like I
              couldn't decide what I wanted.
            </p>
          </Section>

          <Section title="Design decisions">
            <p>
              The site is split into <em>/work</em> and <em>/experiments</em>,
              doing different jobs. /work is where the deployable, clienty
              things live — proper case studies, tech stack, the whole
              pitch. /experiments is where I get to be weird without it counting
              against me. A scroll-driven zine doesn't need to justify
              itself the way a SaaS tool does.
            </p>
            <p>
              No shadcn anywhere on the case study pages. I love shadcn for
              actual products, but on a creative-agency-facing portfolio it
              reads like "I know how to ship a SaaS dashboard."
              That's not what I'm selling here. So the typography, the
              motion, the spacing, the hover states — all custom, all on
              me to get right.
            </p>
            <p>
              The motion language is restrained on purpose. Sections fade up as
              you scroll, sticky labels anchor section titles, and that's
              most of it. When you can do GSAP and Three.js, there's a
              temptation to put GSAP and Three.js on every page. I wanted the
              case studies themselves to be readable first, expressive second.
              The expressive lives one click deeper, in /experiments, where it
              belongs.
            </p>
          </Section>

          <Section title="The hardest part">
            <p>
              The actual hardest part wasn't technical — it was
              deleting things. I had a Blender showcase page mostly built. I had
              a sound-design demo. I had a TouchDesigner experiment I was proud
              of. Cutting them out of the navigation felt like throwing away
              parts of myself.
            </p>
            <p>
              What helped was reframing it: a portfolio isn't an inventory
              of everything I can do. It's an argument for one specific
              thing. The other skills can show up inside the work — in the
              textures, the typographic choices, the pacing — without
              needing their own front-page real estate.
            </p>
          </Section>

          <Section title="What it taught me">
            <p>
              That focus is more impressive than range. Studios don't hire
              multidisciplinary in the abstract; they hire
              frontend developers who happen to have weird useful side skills.
              The fine arts background still does the work I want it to —
              it shows up in the typography, the comfort with negative space,
              the willingness to sit on a problem until it feels right —
              but it does that quietly, in service of the main story.
            </p>
            <p>
              Also: ship the imperfect version. There's an /experiments
              page with one and a half things on it. There are case studies
              still in draft. But it's live, and it's better than the
              polished-forever-unreleased version that lived in my head for six
              months.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}
