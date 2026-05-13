import { notFound } from "next/navigation";
import {
  getExperimentBySlug,
  getInteractiveExperiments,
} from "@/data/experiments";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getInteractiveExperiments()
    .filter((e) => e.slug)
    .map((e) => ({ slug: e.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);
  if (!experiment) return {};

  return {
    title: `${experiment.title} — wercche`,
    description: experiment.description,
    openGraph: {
      title: experiment.title,
      description: experiment.description,
    },
  };
}

export default async function ExperimentSlugPage({ params }: Props) {
  const { slug } = await params;
  const experiment = getExperimentBySlug(slug);

  if (!experiment) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-[clamp(1rem,4vw,4rem)]">
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-4 text-foreground">
          {experiment.title}
        </h1>
        <p className="font-serif text-lg text-foreground max-w-[70ch] mx-auto">
          {experiment.description}
        </p>
      </div>
    </main>
  );
}
