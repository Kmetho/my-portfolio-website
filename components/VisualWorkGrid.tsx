"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Experiment } from "@/data/experiments";

export function VisualWorkGrid({ items }: { items: Experiment[] }) {
  const [selected, setSelected] = useState<Experiment | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, close]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="group relative aspect-square overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-white font-medium">
                  {item.title}
                </span>
                {item.medium && (
                  <span className="block text-[10px] text-white/50 mt-0.5">
                    {item.medium}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6 md:p-8"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.fullImage || selected.thumbnail}
              alt={selected.title}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg text-white">{selected.title}</h3>
                {selected.medium && (
                  <p className="text-sm text-white/50 mt-1">
                    {selected.medium}
                  </p>
                )}
              </div>
              <button
                onClick={close}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
