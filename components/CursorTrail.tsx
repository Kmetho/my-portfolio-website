"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  t: number;
}

interface CursorTrailProps {
  lifetime?: number;
  lineWidth?: number;
  color?: string;
}

export default function CursorTrail({
  lifetime = 900,
  lineWidth = 8,
  color,
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setup();
    window.addEventListener("resize", setup);

    const points: Point[] = [];
    const onMove = (e: PointerEvent) => {
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const now = performance.now();

      while (points.length && now - points[0].t > lifetime) points.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (points.length < 2) return;

      const stroke =
        color ??
        (document.documentElement.classList.contains("dark")
          ? "#9d8df1"
          : "#ff7f11");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = stroke;

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];

        if (b.t - a.t > 100) continue;
        if (Math.hypot(b.x - a.x, b.y - a.y) > 120) continue;

        const life = 1 - (now - b.t) / lifetime;
        if (life <= 0) continue;

        ctx.lineWidth = lineWidth * life;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", setup);
    };
  }, [lifetime, lineWidth, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-1"
    />
  );
}
