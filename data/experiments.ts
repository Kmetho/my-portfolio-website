export type ExperimentType = "interactive" | "visual";

export interface Experiment {
  id: string;
  title: string;
  description: string;
  type: ExperimentType;
  tags: string[];
  thumbnail: string;
  featured?: boolean;

  // Only for interactive experiments
  slug?: string;
  liveUrl?: string;

  livePreview?: boolean;

  // Only for visual work
  fullImage?: string;
  medium?: string;
}

export const experiments: Experiment[] = [
  // === FEATURED INTERACTIVE EXPERIMENTS ===
  {
    id: "digital-zine",
    title: "Cyber Love Poems",
    description:
      "An interactive poetry zine. Scroll through 3D environments inhabited by love poems written in the language of technology.",
    type: "interactive",
    tags: ["React Three Fiber", "GSAP", "Poetry", "3D"],

    thumbnail: "/thumbnails/digital-zine-thumb.jpg",
    slug: "digital-zine",
    featured: true,
    livePreview: false,
  },
  {
    id: "synth-kit",
    title: "Crystal Synth Kit",
    description:
      "Click or tap crystals to play synthesized sounds. A musical instrument built in the browser.",
    type: "interactive",
    tags: ["Three.js", "Web Audio", "3D"],
    thumbnail: "/thumbnails/synth-kit-thumb.jpg",
    slug: "synth-kit",
    featured: true,
    livePreview: false,
  },

  // visual work
  // replace placeholder titles
  {
    id: "visual-01",
    title: "Untitled 01",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/01.webp",
    fullImage: "/experiments/01-full.webp",
    medium: "Blender",
  },
  {
    id: "visual-02",
    title: "Untitled 02",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/02.webp",
    fullImage: "/experiments/02-full.webp",
    medium: "Blender",
  },
  {
    id: "visual-03",
    title: "Untitled 03",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/03.webp",
    fullImage: "/experiments/03-full.webp",
    medium: "Blender",
  },
  {
    id: "visual-04",
    title: "Untitled 04",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/04.webp",
    fullImage: "/experiments/04-full.webp",
    medium: "Blender",
  },
  {
    id: "visual-05",
    title: "Untitled 05",
    description: "p5.js sketch",
    type: "visual",
    tags: ["p5.js"],
    thumbnail: "/experiments/05.webp",
    fullImage: "/experiments/05-full.webp",
    medium: "p5.js",
  },
  {
    id: "visual-06",
    title: "Untitled 06",
    description: "p5.js sketch",
    type: "visual",
    tags: ["p5.js"],
    thumbnail: "/experiments/06.webp",
    fullImage: "/experiments/06-full.webp",
    medium: "p5.js",
  },
  {
    id: "visual-07",
    title: "Untitled 07",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/07.webp",
    fullImage: "/experiments/07-full.webp",
    medium: "Blender",
  },
  {
    id: "visual-08",
    title: "Untitled 08",
    description: "Blender render",
    type: "visual",
    tags: ["Blender"],
    thumbnail: "/experiments/08.webp",
    fullImage: "/experiments/08-full.webp",
    medium: "Blender",
  },
];

// Helper functions
export function getFeaturedExperiments() {
  return experiments.filter((e) => e.featured);
}

export function getInteractiveExperiments() {
  return experiments.filter((e) => e.type === "interactive");
}

export function getVisualWork() {
  return experiments.filter((e) => e.type === "visual");
}

export function getExperimentBySlug(slug: string) {
  return experiments.find((e) => e.slug === slug);
}
