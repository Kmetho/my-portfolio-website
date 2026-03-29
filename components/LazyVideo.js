"use client";

import { useRef, useEffect, useState } from "react";

export default function LazyVideo({ src, className = "", poster }) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          // start loading + playing
          if (!video.src) {
            video.src = src;
            video.load();
          }
          video.play().catch(() => {
            // autoplay blocked — that's fine, user can interact
          });
        } else {
          // pause when out of view to save CPU/battery
          video.pause();
        }
      },
      {
        // start loading slightly before it's visible (200px margin)
        rootMargin: "200px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={`h-full ${className}`}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
    />
  );
}
