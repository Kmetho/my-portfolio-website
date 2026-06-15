export interface Project {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  role: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "briefed",
    title: "Briefed",
    description:
      "A client brief tool for creative freelancers. Turn chaotic client messages into structured, actionable briefs.",
    year: "2026",
    tags: [
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
    ],
    role: "fullstack, UX/UI",
    thumbnail: "/thumbnails/briefed-thumb.png",
    liveUrl: "https://briefedapp.vercel.app/",
    githubUrl: "https://github.com/Kmetho/briefed-shadcn",
  },

  {
    slug: "webfolio",
    title: "Personal portfolio website",
    description:
      "A personal portfolio website built to not work in hospitality anymore, change my life, showcase my skills and to have a better quality of life.",
    year: "2026",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Vercel",
    ],
    role: "fullstack, UX/UI",
    thumbnail: "/thumbnails/webfolio-thumb.png",
    liveUrl: "https://wercche.xyz/",
    githubUrl: "https://github.com/Kmetho/my-portfolio-website",
  },

  {
    slug: "digital-zine",
    title: "Cyber Love Poems",
    description:
      "An interactive poetry zine. Scroll through 3D environments inhabited by love poems written in the language of technology.",
    year: "zine: 2024, digital version: 2026",
    tags: ["React Three Fiber", "GSAP", "Poetry", "3D"],
    role: "fullstack, UX/UI, writer",
    thumbnail: "/thumbnails/digital-zine-thumb.png",
    liveUrl: "https://wercche.xyz/work/digital-zine",
    githubUrl: "https://github.com/Kmetho/my-portfolio-website",
  },

  {
    slug: "synth-kit",
    title: "Crystal Synth Kit",
    description:
      "Click or tap crystals to play synthesized sounds. A musical instrument built in the browser.",
    year: "2024, updated version: 2026",
    tags: ["Three.js", "Web Audio API", "3D"],
    role: "fullstack, UX/UI, 3D modeling",
    thumbnail: "/thumbnails/synth-kit-thumb.jpg",
    liveUrl: "https://wercche.xyz/work/synth-kit",
    githubUrl: "https://github.com/Kmetho/my-portfolio-website",
  },
];
