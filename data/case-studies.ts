export interface CaseStudyScreen {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudySection {
  title: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  screens?: CaseStudyScreen[];
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "briefed",
    screens: [
      {
        src: "/homepage-no-user.png",
        alt: "Briefed landing page - Stop losing briefs in your DMs",
        caption: "Landing",
      },
      {
        src: "/homepage-user.png",
        alt: "Briefed logged-in homepage - Your briefs, all in one place",
        caption: "Home",
      },
      {
        src: "/dashboard.png",
        alt: "Briefed dashboard - My Briefs with status filters and brief cards",
        caption: "Dashboard",
      },
    ],
    sections: [
      {
        title: "The problem",
        paragraphs: [
          "Every freelance creative project starts the same way: a string of DMs, a voice note, maybe a screenshot of a Pinterest board. The client knows what they want but can't articulate it. You know what you need to know but don't want to send a 12-question email that feels like a tax form.",
          "Thus I pondered about a tool that sends clients a guided form and gives back a clean PDF. Nothing radical. But everything that existed was either too enterprise or too shallow. I wanted something that felt like it was built specifically for creatives.",
        ],
      },
      {
        title: "Design decisions",
        paragraphs: [
          "The brief form needed to be simple. I chose a multi-step layout — one batch of inputs per step, clear progress, no wall of fields. Clients tend to abandon long forms, so breaking it up was a much needed UX decision.",
          "The public brief view (what the freelancer shares/references) is intentionally minimal. It needed to be printable, screenshottable, and readable in a Zoom call. The same goes for the PDF export.",
          "For the dashboard I kept the information density low. Freelancers don't manage hundreds of briefs, but a handful of active projects at a time. I think a clean list with search and archive is enough.",
        ],
      },
      {
        title: "The hardest part",
        paragraphs: [
          "Because I don't have any dev acquaintances, and I could only count on Claude Code to help me understand all of the back-end shenanigans, everything excluding the front was frustrating.",
          "Getting Clerk and UploadThing to work together cleanly for example. I waded through a quagmire only to be humbled (it was a one-line fix).",
        ],
      },
      {
        title: "What it taught me",
        paragraphs: ["A LOT."],
      },
    ],
  },

  {
    slug: "webfolio",
    sections: [
      {
        title: "The problem",
        paragraphs: [
          "Most portfolios I admired did one of two things really well. Either they were obviously a developer's site — clean, precise, slightly intimidating in the GitHub-y way — or obviously an artist's site, with the weird cursor and the moodboard energy. I am both, which sounds good in a cover letter and looks like a mess on a homepage.",
          "My first attempt was the kitchen sink: Blender renders, analog photos, code projects, sound experiments, all jostling for attention on the same page. It was a disaster. It looked like I couldn't decide what I wanted.",
        ],
      },
      {
        title: "Design decisions",
        paragraphs: [
          "The site is split into /work and /experiments, doing different jobs. /work is where the deployable, clienty things live — proper case studies, tech stack, the whole pitch. /experiments is where I get to be weird without it counting against me. A scroll-driven zine doesn't need to justify itself the way a SaaS tool does.",
          "No shadcn anywhere on the case study pages. I love shadcn for actual products, but on a creative-agency-facing portfolio it reads like “I know how to ship a SaaS dashboard.” That's not what I'm selling here. So the typography, the motion, the spacing, the hover states — all custom, all on me to get right.",
          "The motion language is restrained on purpose. Sections fade up as you scroll, sticky labels anchor section titles, and that's most of it. When you can do GSAP and Three.js, there's a temptation to put GSAP and Three.js on every page. I wanted the case studies themselves to be readable first, expressive second. The expressive lives one click deeper, in /experiments, where it belongs.",
        ],
      },
      {
        title: "The hardest part",
        paragraphs: [
          "The actual hardest part wasn't technical — it was deleting things. I had a Blender showcase page mostly built. I had a sound-design demo. I had a TouchDesigner experiment I was proud of. Cutting them out of the navigation felt like throwing away parts of myself.",
          "What helped was reframing it: a portfolio isn't an inventory of everything I can do. It's an argument for one specific thing. The other skills can show up inside the work — in the textures, the typographic choices, the pacing — without needing their own front-page real estate.",
        ],
      },
      {
        title: "What it taught me",
        paragraphs: [
          "That focus is more impressive than range. Studios don't hire multidisciplinary in the abstract; they hire frontend developers who happen to have weird useful side skills. The fine arts background still does the work I want it to — it shows up in the typography, the comfort with negative space, the willingness to sit on a problem until it feels right — but it does that quietly, in service of the main story.",
          "Also: ship the imperfect version. There's an /experiments page with one and a half things on it. There are case studies still in draft. But it's live, and it's better than the polished-forever-unreleased version that lived in my head for six months.",
        ],
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
