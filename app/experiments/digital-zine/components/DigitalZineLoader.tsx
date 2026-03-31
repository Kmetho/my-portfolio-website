"use client";

import ExperimentBackLink from "@/components/ExperimentBackLink";
import dynamic from "next/dynamic";

const DigitalZineExperience = dynamic(() => import("./ZineExperience"), {
  ssr: false,
});

export default function DigitalZineLoader() {
  return (
    <>
      <ExperimentBackLink />
      <DigitalZineExperience />
    </>
  );
}
