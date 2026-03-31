import Link from "next/link";
import Image from "next/image";
import { Experiment } from "@/data/experiments";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const href = experiment.slug
    ? `/experiments/${experiment.slug}`
    : experiment.liveUrl || "#";

  return (
    <Link
      href={href}
      className="group block relative overflow-hidden rounded-xl border border-border/50 hover:border-secondary/40 transition-colors duration-500"
    >
      <article className="relative">
        <div className="relative aspect-video overflow-hidden rounded-xl">

          {experiment.livePreview && experiment.slug ? (
            <iframe
              src={`/experiments/${experiment.slug}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              tabIndex={-1}
              aria-hidden
              loading="lazy"
            />
          ) : (
            <Image
              src={experiment.thumbnail}
              alt={experiment.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /> */}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">
              Interactive
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-medium text-black">
            {experiment.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">

            {experiment.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-white/40 border border-white/15 rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
