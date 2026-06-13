"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Img } from "@/data/images";

export function VisualWorkGrid({ items }: { items: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );

  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, close, next, prev]);

  const selected = index === null ? null : items[index];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-signal"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="fixed right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground text-lg leading-none backdrop-blur-sm transition-opacity hover:opacity-70"
          >
            ✕
          </button>

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground text-2xl leading-none backdrop-blur-sm transition-opacity hover:opacity-70"
            >
              ‹
            </button>
          )}

          <img
            src={selected.src}
            alt={selected.alt}
            onClick={(e) => e.stopPropagation()}
            className="block h-auto max-h-[85vh] w-auto max-w-[90vw] object-contain select-none"
          />

          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground text-2xl leading-none backdrop-blur-sm transition-opacity hover:opacity-70"
            >
              ›
            </button>
          )}

          {selected.tags.length > 0 && (
            <div className="fixed bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-wrap justify-center gap-x-4 gap-y-1">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest text-background/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
