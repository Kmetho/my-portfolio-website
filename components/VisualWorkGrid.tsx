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
            className="group relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
          >
            <Image
              src={item.image || item.thumbnail}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-3">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium text-background">
                  {item.title}
                </span>
                {item.medium && (
                  <span className="block text-[10px] text-background mt-0.5">
                    {item.medium}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-foreground/85 flex items-center justify-center p-6 md:p-8"
          onClick={close}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.image || selected.thumbnail}
              alt={selected.title}
              width={1920}
              height={1080}
              className="w-auto h-auto"
            />
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg text-background">{selected.title}</h3>
                {selected.medium && (
                  <p className="text-sm text-background mt-1">
                    {selected.medium}
                  </p>
                )}
              </div>
              <button
                onClick={close}
                className="text-background text-sm hover:opacity-60 transition-opacity"
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
