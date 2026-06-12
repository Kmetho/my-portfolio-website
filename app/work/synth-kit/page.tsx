import type { Metadata } from "next";
import SynthKitLoader from "@/components/synth-kit/SynthKitLoader";

export const metadata: Metadata = {
  title: "Crystal Synth Kit",
  description:
    "A musical instrument made of crystals modelled in Blender. Click or tap to play.",
};

export default function SynthKitPage() {
  return <SynthKitLoader />;
}
