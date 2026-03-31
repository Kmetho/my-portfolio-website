import { notFound } from "next/navigation";
<<<<<<< Updated upstream
import { getExperimentBySlug, getInteractiveExperiments } from "@/data/experiments";
=======
import {
  getExperimentBySlug,
  getInteractiveExperiments,
} from "@/data/experiments";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  // For now, this is a fallback for future interactive experiments
  // that don't need a full folder structure.
  // Complex experiments (synth-kit, digital-zine) have their own folders.
=======
>>>>>>> Stashed changes
  return (
    <main className="h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-8">
        <h1 className="text-2xl md:text-4xl font-medium mb-4">
          {experiment.title}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {experiment.description}
        </p>
      </div>
    </main>
  );
}
