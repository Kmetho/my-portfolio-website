"use client";

import dynamic from "next/dynamic";

const SynthKitExperience = dynamic(
  () => import("./SynthKitExperience"),
  { ssr: false }
);

export default function SynthKitLoader() {
  return <SynthKitExperience />;
}
