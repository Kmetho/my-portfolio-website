const photos = [
  {
    src: "https://64.media.tumblr.com/b482fccce1618a8a59baf51434ad8635/848839ae19feb639-1e/s2048x3072/903f739859532cae38641d8bfbd035002dcb0c77.pnj",
    alt: "Photo 1",
  },
  {
    src: "https://64.media.tumblr.com/4734f237aeaba33aab8e50862b5d382a/aac6c9a15c6bf520-f7/s2048x3072/75d99cdee8968a5b7df3a4288bf58c2b4e440b92.pnj",
    alt: "Photo 2",
  },
  {
    src: "https://64.media.tumblr.com/78211863c99de17f4d989e2fb275abc3/4bb6ca4d4f5a3cf5-c0/s2048x3072/ea024342ec51f66740bf1233be8bfcee13aca3a7.pnj",
    alt: "Photo 3",
  },
  {
    src: "https://64.media.tumblr.com/f7356f3a7623fd4cb28f6aed3d2bd1b4/4bb6ca4d4f5a3cf5-db/s2048x3072/f9b00030cabdd1a2d6b401f4603e76abc8bf0d34.pnj",
    alt: "Photo 4",
  },
  {
    src: "https://64.media.tumblr.com/db8bad39c12aafd41147f38a2babc262/a7622186805470a7-c8/s2048x3072/9956cea62355efc8ad494fa7f2c53206e5cf6667.pnj",
    alt: "Photo 5",
  },
  {
    src: "https://64.media.tumblr.com/ed3484e3f378a8878d76ba70594255e0/a7622186805470a7-39/s2048x3072/602e4a523789dfaf6118317bce98da8cf2a0990d.pnj",
    alt: "Photo 6",
  },
  {
    src: "https://64.media.tumblr.com/58459eaaec2a326896dcf10fb87ff053/61d44557e50cb96b-25/s2048x3072/c92c45e8a2505626a6bd3a6ea05284695d584a47.pnj",
    alt: "Photo 7",
  },
  {
    src: "https://64.media.tumblr.com/8df0d977c76b83172b9a4fdacd610eba/c3815f776cf50920-69/s2048x3072/9f7bea9b4abd0508632a62335bde9450e452e140.pnj",
    alt: "Photo 8",
  },
];

const blenderRenders = [
  {
    src: "https://64.media.tumblr.com/f2667b5002c0e07125962b43ba7ddc59/2dae4127e7f629cb-ff/s2048x3072/2608d72444e76d88f38e127c0668b82ed8396ca7.pnj",
    alt: "Blender render 1",
  },
  {
    src: "https://64.media.tumblr.com/5b25054ecd2377ef94855f554784ddd0/49153f79c104ee77-30/s640x960/01b5460ae8416fa0d88ddf293e6ae65bfe82e220.pnj",
    alt: "Blender render 2",
  },
  {
    src: "https://64.media.tumblr.com/0e17e172dddefab765787bffade03146/90ddb00def9dfeb5-a4/s2048x3072/627395f504ffdd6f2e02f1da1fb8b87cb9e5289f.pnj",
    alt: "Blender render 3",
  },
  {
    src: "https://64.media.tumblr.com/e372ae57edae74bfab6deef76cc605e3/ac038d8a3a3c7b32-75/s2048x3072/4c8a733d85a51824ff1d7d53db2fbb7601469ad7.pnj",
    alt: "Blender render 4",
  },
  {
    src: "https://64.media.tumblr.com/abda532ea8c4ed0a90e712b5073b88c4/f77a01acf381f610-62/s2048x3072/7e95733d6aa55be9d8354114b869ab218865cd1f.pnj",
    alt: "Blender render 5",
  },
];

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
