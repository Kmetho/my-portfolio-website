import Link from "next/link";
import Image from "next/image";
import { Experiment } from "@/data/experiments";

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const href = experiment.slug
    ? `/experiments/${experiment.slug}`
    : experiment.liveUrl || "#";

  return (
    <Link href={href} className="group block">
      <article className="relative">
        <div className="relative aspect-video overflow-hidden border-t border-border">
          <Image
            src={experiment.thumbnail}
            alt={experiment.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="py-5 md:py-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground">
              Interactive
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-[1.05] text-foreground">
            {experiment.title}
          </h3>
          <p className="text-base text-foreground mt-2 max-w-[70ch]">
            {experiment.description}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-foreground"
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
