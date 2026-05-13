import Link from "next/link";

export default function ExperimentNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-[clamp(1rem,4vw,4rem)]">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">
          404
        </p>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-4 text-foreground">
          Experiment not found
        </h1>
        <p className="font-serif text-lg text-foreground mb-8 max-w-[70ch] mx-auto">
          This experiment doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/experiments"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-0.5 transition-opacity duration-200 hover:opacity-60"
        >
          &larr; Back to experiments
        </Link>
      </div>
    </main>
  );
}
