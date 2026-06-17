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
  wip?: boolean;
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
      "A personal portfolio website (this one!) built to not work in hospitality anymore, change my life, showcase my skills.",
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
    year: "paper version: 2024",
    tags: ["React Three Fiber", "GSAP", "Poetry", "3D"],
    role: "fullstack, UX/UI, writer, 3D modeling",
    thumbnail: "/thumbnails/digital-zine-thumb.png",
    liveUrl: "https://wercche.xyz/work/digital-zine",
    githubUrl: "https://github.com/Kmetho/my-portfolio-website",
    wip: true,
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

  {
    slug: "reactive-shaders",
    title: "Reactive Shaders",
    description:
      "A website that listens (microphone input) and reacts (shaders).",
    year: "2026",
    tags: ["GLSL", "Shaders", "Vite"],
    role: "fullstack, UX/UI, 3D modeling",
    thumbnail: "/thumbnails/reactive-shaders-thumb.jpg",
    liveUrl: "https://wercche-shaders.vercel.app/",
    githubUrl: "https://github.com/Kmetho/shaders",
    wip: true,
  },

  {
    slug: "paulina-rams-portfolio",
    title: "Portfolio website for Paulina Rams",
    description:
      "An updated portfolio website for a graphic designer, Paulina Rams. Migrated to Astro for better performance and SEO, with the same design but improved user experience. First version built in 2023 as one of my first freelance projects, and now updated in 2026 with new features and a more modern tech stack.",
    year: "2026",
    tags: ["Astro", "WebGL", "TypeScript"],
    role: "fullstack, working with a designer",
    thumbnail: "/thumbnails/paulina-thumb.jpg",
    // liveUrl: "https://paulinarams.com/",
    githubUrl: "https://github.com/Kmetho/paulina-update",
    wip: true,
  },
];
