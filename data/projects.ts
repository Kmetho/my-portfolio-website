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
  featured?: boolean;
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
    thumbnail: "/thumbnails/briefed-thumb.jpg",
    liveUrl: "https://briefedapp.vercel.app/",
    githubUrl: "https://github.com/Kmetho/briefed-shadcn",
    featured: true,
  },
];
