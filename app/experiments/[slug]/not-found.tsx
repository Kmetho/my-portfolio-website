import Link from "next/link";

export default function ExperimentNotFound() {
  return (
    <main className="h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-medium mb-4">
          Experiment not found
        </h1>
        <p className="text-muted-foreground mb-8">
          This experiment doesn't exist or has been moved.
        </p>
        <Link
          href="/experiments"
          className="text-sm text-secondary hover:text-secondary/80 transition-colors"
        >
          &larr; Back to experiments
        </Link>
      </div>
    </main>
  );
}
