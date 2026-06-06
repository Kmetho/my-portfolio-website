"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";


const FACE =
  "M88.92,44.58c0,24.62-19.96,44.58-44.58,44.58-59.13-2.35-59.12-86.82,0-89.16,24.62,0,44.58,19.96,44.58,44.58Z";
const MOUTH =
  "M66.96,49.42c-10.37,16.64-35.41,16.46-45.45-.36-.44-.77.06-1.78.73-2.15s1.74-.26,2.19.47c3.94,6.5,11.12,10.69,18.71,11.04,8.46.44,16.37-3.65,20.89-10.79,1.22-2.07,4.21-.27,2.93,1.79Z";
const EYE_L =
  "M34.64,32.95c0,2.88-2.33,5.21-5.21,5.21-6.9-.24-6.9-10.19,0-10.42,2.88,0,5.21,2.33,5.21,5.21Z";
const EYE_R =
  "M64.54,32.96c0,2.88-2.33,5.21-5.21,5.21-6.9-.24-6.9-10.18,0-10.42,2.88,0,5.21,2.33,5.21,5.21Z";

// bounce-loop tuning knobs
const APEX = -70; // how high it rises (px), negative = up
const SQUASH = { x: 1.35, y: 0.62 }; // splat at impact
const STRETCH = { x: 0.9, y: 1.1 }; // elongation mid-air

export default function DigitalZineLoader() {
  const ballRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const ball = ballRef.current;
    if (!ball) return;

    // origin at bottom-centre so the squash plants onto the "ground"
    gsap.set(ball, { transformOrigin: "50% 100%" });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(ball, { y: APEX, scaleX: 1, scaleY: 1 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.12 });
      tl
        // fall + stretch as it accelerates
        .to(ball, {
          y: 0,
          scaleX: STRETCH.x,
          scaleY: STRETCH.y,
          duration: 0.45,
          ease: "power2.in",
        })
        // impact: squash onto the ground
        .to(ball, {
          scaleX: SQUASH.x,
          scaleY: SQUASH.y,
          duration: 0.1,
          ease: "power2.out",
        })
        // recoil stretch as it pushes off
        .to(ball, {
          scaleX: 0.94,
          scaleY: 1.06,
          duration: 0.12,
          ease: "power1.out",
        })
        // rise + settle back to a round resting shape
        .to(ball, {
          y: APEX,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        });
    });
  }, []);

  return (
    <div className="relative">
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background text-foreground uppercase">
        <svg
          ref={ballRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 88.92 89.16"
          className="w-32 h-32 md:w-40 md:h-40 will-change-transform"
          aria-hidden="true"
        >
          <path d={FACE} fill="var(--foreground)" />
          <path d={MOUTH} fill="var(--background)" />
          <path d={EYE_L} fill="var(--background)" />
          <path d={EYE_R} fill="var(--background)" />
        </svg>

        <span className="text-lg md:text-2xl tracking-widest">
          Nothing to see here for now
        </span>

        <Link
          href="/experiments"
          className="text-xs font-bold tracking-widest transition-colors duration-200 hover:text-signal"
        >
          &larr; go back
        </Link>
      </div>
    </div>
  );
}
