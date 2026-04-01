"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import Link from "next/link";

const Zine = dynamic(() => import("./ZineExperience"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, MorphSVGPlugin);
}

const BLOB1 =
  "M45.1,-60.2C52.5,-56.7,48.5,-35.6,53.8,-17.8C59,-0.1,73.6,14.3,72.2,24.9C70.7,35.5,53.2,42.3,38.5,52.3C23.8,62.2,11.9,75.3,-3.1,79.6C-18.1,83.9,-36.3,79.4,-42.2,66.6C-48.1,53.8,-41.7,32.6,-41,17.4C-40.3,2.2,-45.3,-7.1,-43.2,-14.3C-41.2,-21.4,-32.1,-26.6,-23.7,-29.7C-15.3,-32.9,-7.7,-34.1,5.6,-41.8C18.9,-49.5,37.7,-63.7,45.1,-60.2Z";
const BLOB2 =
  "M22.1,-34.4C30,-24.7,38.6,-20,41.9,-12.9C45.2,-5.8,43.1,3.7,39.3,12C35.6,20.3,30.3,27.4,23.5,34.4C16.7,41.5,8.3,48.6,-0.2,48.9C-8.8,49.2,-17.7,42.8,-30.7,37.8C-43.7,32.8,-60.9,29.1,-68.9,18.9C-77,8.8,-75.9,-7.7,-67.9,-18.9C-59.9,-30.1,-45.1,-35.9,-32.7,-44.1C-20.2,-52.3,-10.1,-62.9,-1.5,-60.8C7.1,-58.7,14.2,-44,22.1,-34.4Z";
const BLOB3 =
  "M46.3,-64.1C59.9,-53.9,70.6,-40.2,68.3,-27C66,-13.8,50.5,-1.2,44,12.9C37.5,27,39.8,42.5,34,54.6C28.1,66.7,14.1,75.3,0.5,74.6C-13.1,73.9,-26.2,64,-39.9,54.5C-53.6,44.9,-68,35.9,-70.5,23.9C-72.9,12,-63.3,-2.7,-58.1,-18.9C-52.9,-35.2,-52.1,-52.8,-43.1,-64.6C-34.2,-76.3,-17.1,-82.1,-0.4,-81.6C16.4,-81.1,32.7,-74.3,46.3,-64.1Z";

export default function DigitalZineLoader() {
  const myShape = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(myShape.current, { morphSVG: BLOB2, duration: 2, ease: "sine.inOut" })
      .to(myShape.current, { morphSVG: BLOB3, duration: 2, ease: "sine.inOut" })
      .to(myShape.current, {
        morphSVG: BLOB1,
        duration: 2,
        ease: "sine.inOut",
      });
  });

  return (
    // <Zine />
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary-foreground font-bold text-xs uppercase gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-100 -100 200 200"
        className="w-64 h-64"
        fill="var(--primary)"
      >
        <path ref={myShape} d={BLOB1} />
      </svg>
      <span>Cooking up something good...</span>
      <Link
        href="/experiments"
        className="text-primary/50 hover:text-primary transition-colors duration-200"
      >
        &larr; go back (for now)
      </Link>
      <span>and visit later</span>
    </div>
  );
}
