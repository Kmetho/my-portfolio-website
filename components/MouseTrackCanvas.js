"use client";

import { useEffect, useRef } from "react";
import Sketch from "@/sketches/MouseTrackSketch";

export default function P5Canvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    let p5Instance;

    (async () => {
      const p5 = (await import("p5")).default;
      p5Instance = new p5(Sketch, containerRef.current);
    })();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z--1 pointer-events-none"
    />
  );
}
