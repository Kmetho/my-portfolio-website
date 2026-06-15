"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function ZineLoaderOverlay() {
  const { active, progress, total } = useProgress();
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  // hide once the loading manager reports everything done
  useEffect(() => {
    if (total > 0 && !active && progress >= 100) setHidden(true);
  }, [active, progress, total]);

  // safety net: never block the experience for more than 10s
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 10000);
    return () => clearTimeout(t);
  }, []);

  if (removed) return null;

  return (
    <div
      onTransitionEnd={() => hidden && setRemoved(true)}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex gap-2" role="status" aria-label="Loading">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  );
}
