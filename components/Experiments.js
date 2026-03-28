"use client";

export default function Experiments() {
  return (
    <section className="max-h-screen overflow-y-auto">
      <div className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
            Media Arts
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6">
            3D, generative & visual experiments.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Blender renders, p5.js sketches, and other explorations where code
            meets aesthetics.
          </p>
        </div>
      </div>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      <div className="px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-[var(--radius-sm)] transition-all duration-300 hover:shadow-lg bg-muted border border-border"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {String(i).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-20" />
    </section>
  );
}
