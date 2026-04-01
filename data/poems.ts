export interface Poem {
  id: string;
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
  background: string;
}

export const poems: Poem[] = [
  {
    id: "new-era",
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my",
      "new meds",
      "I feel like loving",
      "someone again",
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
    background: "/experiments/digital-zine/poem-01-bg.webp",
  },
  {
    id: "new-era-2",
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my",
      "new meds",
      "I feel like loving",
      "someone again",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#3a4555",
    atmosphere: {
      fogColor: "#c8d4e0",
      fogDensity: 0.03,
      ambientColor: "#a0b4d4",
      bloomIntensity: 0.3,
      bloomThreshold: 0.85,
    },
    background: "",
  },
  {
    id: "new-era-3",
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my",
      "new meds",
      "I feel like loving",
      "someone again",
    ],
    textPosition: "center",
    textAlign: "center",
    textColor: "#4a4a40",
    atmosphere: {
      fogColor: "#d0d8cc",
      fogDensity: 0.03,
      ambientColor: "#a0c0b0",
      bloomIntensity: 0.3,
      bloomThreshold: 0.85,
    },
    background: "",
  },
  {
    id: "new-era-4",
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my",
      "new meds",
      "I feel like loving",
      "someone again",
    ],
    textPosition: "right",
    textAlign: "left",
    textColor: "#504050",
    atmosphere: {
      fogColor: "#dccce0",
      fogDensity: 0.03,
      ambientColor: "#d4a0b8",
      bloomIntensity: 0.3,
      bloomThreshold: 0.85,
    },
    background: "",
  },
  {
    id: "new-era-5",
    lines: [
      "I'm entering a new era",
      "of being a sexy little intelligence",
      "ready to explore IRL",
      "no longer anxious of what's out there",
      "all thanks to my",
      "new meds",
      "I feel like loving",
      "someone again",
    ],
    textPosition: "left",
    textAlign: "left",
    textColor: "#404550",
    atmosphere: {
      fogColor: "#d0d5dc",
      fogDensity: 0.03,
      ambientColor: "#b0b8c8",
      bloomIntensity: 0.3,
      bloomThreshold: 0.85,
    },
    background: "",
  },
];
