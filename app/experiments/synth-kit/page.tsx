import type { Metadata } from "next";
import SynthKitLoader from "./components/SynthKitLoader";

export const metadata: Metadata = {
<<<<<<< Updated upstream
  title: "Crystal Synth Kit — wercche",
  description:
    "A musical instrument made of crystalline 3D shapes. Click or tap to play.",
=======
  title: "Crystal Synth Kit",
  description:
    "A musical instrument made of crystals modelled in Blender. Click or tap to play.",
>>>>>>> Stashed changes
};

export default function SynthKitPage() {
  return <SynthKitLoader />;
}
