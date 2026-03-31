"use client";

import dynamic from "next/dynamic";

const DigitalZineExperience = dynamic(
  () => import("./DigitalZineExperience"),
  { ssr: false }
);

export default function DigitalZineLoader() {
  return <DigitalZineExperience />;
}
