export interface Poem {
  id: string;
  lines: string[];
  textPosition: "left" | "center" | "right";
  textAlign: "left" | "center" | "right";
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
    atmosphere: {
      fogColor: "#d8cce0",
      fogDensity: 0.03,
      ambientColor: "#c8a0d4",
      bloomIntensity: 0.4,
      bloomThreshold: 0.8,
    },
    background: "/experiments/digital-zine/poem-01-bg.webp",
  },
];
