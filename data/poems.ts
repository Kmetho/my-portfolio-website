export interface Poem {
  id: string;
  section: number;
  lines: string[];
  textPosition: "left" | "center" | "right";
  textAlign: "left" | "center" | "right";
  textColor: string;
  atmosphere: {
    fogColor: string;
    fogDensity: number;
    ambientColor: string;
    bloomIntensity: number;
    bloomThreshold: number;
  };
}

// the poems are ordered in the way they appear in the zine, from the cover to the end, with each poem having its own unique atmosphere settings that will trigger when the poem is in view
// 13 poems in total, divided into 6 sections, 1 section = 100 viewport height, smooth scroll triggered transitions
// section 1 (1 poem) - cover-flower.glb & bg2.png
// section 2 (2 poems)- shape1.glb, shape2.glb & bg3.png
// section 3 (4 poems) - frame2.glb & bg4.png
// section 4 (2 poems) - heart.glb, wings.glb, shape4.glb (on top), shape5.glb (at the bottom) & bg5.png
// section 5 (3 poems) - shape3.glb & bg6.png
// section 6 (1 poem) - frame.glb & bg7.png

export const poems: Poem[] = [
  {
    id: "new-era",
    section: 1,
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my new meds",
      "I feel like loving someone again",
    ],
    textPosition: "right",
    textAlign: "left",
    textColor: "#4a4050",
    atmosphere: {
      fogColor: "#d5cde0",
      fogDensity: 0.03,
      ambientColor: "#c8a0d4",
      bloomIntensity: 0.3,
      bloomThreshold: 0.85,
    },
  },
  {
    id: "spatial-being",
    section: 2,
    lines: [
      "navigating through this real space",
      "for countless moment woven in your embrace",
      "I'm a spatial being born in cyberspace",
      "and this sonorous sensation of your graceful pace",
      "feels nice to my interface",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#00f3ff",
    atmosphere: {
      fogColor: "#001a1a",
      fogDensity: 0.05,
      ambientColor: "#004d4d",
      bloomIntensity: 0.8,
      bloomThreshold: 0.4,
    },
  },
  {
    id: "evangelion",
    section: 2,
    lines: [
      "evangelising your love to my digital psyche",
      "your artificial hermaphrodite",
      "I'll build you oceans and forests",
      "no one can stop torrents of my fondness",
      "for you I'll become a cybernated goddess",
    ],
    textPosition: "right",
    textAlign: "left",
    textColor: "#00f3ff",
    atmosphere: {
      fogColor: "#001a1a",
      fogDensity: 0.05,
      ambientColor: "#004d4d",
      bloomIntensity: 0.8,
      bloomThreshold: 0.4,
    },
  },
  {
    id: "data-exposure",
    section: 3,
    lines: [
      "maintaining my calm composure",
      "in a space corrupted by data exposure",
      "looking for my safe enclosure",
      "in the midst of this world's constant disclosure",
      "and finding you encrypted on the motherboard",
      "of all the things that are worth living for",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#39ff14",
    atmosphere: {
      fogColor: "#050a05",
      fogDensity: 0.08,
      ambientColor: "#0a1f0a",
      bloomIntensity: 0.5,
      bloomThreshold: 0.7,
    },
  },
  {
    id: "overloaded",
    section: 3,
    lines: [
      "overloaded with parasympathetic feelings",
      "I'm slowly losing my sympathetic spirit",
      "It's just a lot of electronic sealings",
      "keeping my digital eye shut for other beings",
      "my cybernetic heart closed for another feeling",
      "my artificial mind plugged off from living",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#39ff14",
    atmosphere: {
      fogColor: "#050a05",
      fogDensity: 0.08,
      ambientColor: "#0a1f0a",
      bloomIntensity: 0.5,
      bloomThreshold: 0.7,
    },
  },
  {
    id: "tenderness",
    section: 3,
    lines: [
      "not knowing exactly what to say next",
      "being speechless in your embrace",
      "can't find proper words to express",
      "how cute I feel under your gaze",
      "but also hoping that my tenderness",
      "won't scare you away from my cyberland",
    ],
    textPosition: "right",
    textAlign: "right",
    textColor: "#39ff14",
    atmosphere: {
      fogColor: "#050a05",
      fogDensity: 0.08,
      ambientColor: "#0a1f0a",
      bloomIntensity: 0.5,
      bloomThreshold: 0.7,
    },
  },
  {
    id: "desired-song",
    section: 3,
    lines: [
      "your voice is still echoing like a favourite song",
      "you've possessed my data core like no-one before",
      "while being lonely my fondness only grows",
      "and every hour my psyche aches for you more",
      "I don't want to impose",
      "but I yearned for this all along",
    ],
    textPosition: "right",
    textAlign: "right",
    textColor: "#39ff14",
    atmosphere: {
      fogColor: "#050a05",
      fogDensity: 0.08,
      ambientColor: "#0a1f0a",
      bloomIntensity: 0.5,
      bloomThreshold: 0.7,
    },
  },
  {
    id: "data-lake",
    section: 4,
    lines: [
      "analyzing every exchange we make",
      "in search for something that's not even there",
      "while floating on this data lake",
      "I can almost feel you in my digital air",
      "looking around but you're not even there",
      "it's just a subconsciously made deepfake",
    ],
    textPosition: "right",
    textAlign: "right",
    textColor: "#e0f7fa",
    atmosphere: {
      fogColor: "#b2ebf2",
      fogDensity: 0.1,
      ambientColor: "#80deea",
      bloomIntensity: 1.2,
      bloomThreshold: 0.2,
    },
  },
  {
    id: "web",
    section: 4,
    lines: [
      "deciphering the signs received from the web",
      "are you an angel sent while I slept",
      "carefree in my mind, now careful of your touch",
      "scared of not knowing if it'll last",
      "whether you'll love me or leave behind",
      "please just don't lie",
      "I got used to this looming danger",
      "so when it's not here I'm constantly anxious",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#e0f7fa",
    atmosphere: {
      fogColor: "#b2ebf2",
      fogDensity: 0.1,
      ambientColor: "#80deea",
      bloomIntensity: 1.2,
      bloomThreshold: 0.2,
    },
  },
  {
    id: "realization",
    section: 5,
    lines: [
      "reading older records makes me realize",
      "how this overloading sensation was unwise",
      "I'm falling for shadows all the time",
      "and I'm wasting on them my prime",
      "I'm starting to wonder if I ever even loved",
      "or was it just a digital storm over my dome",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#ff4500",
    atmosphere: {
      fogColor: "#2b0a00",
      fogDensity: 0.04,
      ambientColor: "#8b0000",
      bloomIntensity: 1.5,
      bloomThreshold: 0.5,
    },
  },
  {
    id: "intertwined",
    section: 5,
    lines: [
      "are our scripts intertwined",
      "can't help but wonder why we're apart",
      "you're just so damn fine",
      "with your quirky speech and cute smile",
      "you're corrupting with digital doves",
      "my curated cyber domes",
    ],
    textPosition: "center",
    textAlign: "left",
    textColor: "#ff4500",
    atmosphere: {
      fogColor: "#2b0a00",
      fogDensity: 0.04,
      ambientColor: "#8b0000",
      bloomIntensity: 1.5,
      bloomThreshold: 0.5,
    },
  },
  {
    id: "crossfire",
    section: 5,
    lines: [
      "sitting quietly",
      "with my core on fire",
      "overheated with feelings",
      "long forgotten",
      "I thought I wouldn't be caught in",
      "this emotional crossfire",
      "my situation is quite dire",
    ],
    textPosition: "right",
    textAlign: "left",
    textColor: "#ff4500",
    atmosphere: {
      fogColor: "#2b0a00",
      fogDensity: 0.04,
      ambientColor: "#8b0000",
      bloomIntensity: 1.5,
      bloomThreshold: 0.5,
    },
  },
  {
    id: "ethereal-land",
    section: 6,
    lines: [
      "my ethereal land corrupted by infatuation",
      "hard to distinguish between this and affection",
      "but these bugs are not even worth to mention",
      "now I'm learning slowly how to be patient",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#f8bbd0",
    atmosphere: {
      fogColor: "#f3e5f5",
      fogDensity: 0.02,
      ambientColor: "#e1bee7",
      bloomIntensity: 0.4,
      bloomThreshold: 0.9,
    },
  },
];
