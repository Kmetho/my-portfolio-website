import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import BriefedCaseStudy from "@/components/case-studies/BriefedCaseStudy";
import WebfolioCaseStudy from "@/components/case-studies/WebfolioCaseStudy";
import { projects } from "@/data/projects";

const caseStudies: Record<string, React.ComponentType> = {
  briefed: BriefedCaseStudy,
  webfolio: WebfolioCaseStudy,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — wercche`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const CaseStudy = caseStudies[project.slug];

  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="work" />
      </div>
      <PageTransition>
        <article>
          <header className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-16">
            <FadeIn delay={0}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Case Study
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                  {project.year}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
                {project.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-serif text-lg md:text-xl text-foreground max-w-[70ch] mb-10 leading-relaxed">
                {project.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-6 mb-10">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-0.5 transition-opacity duration-200 hover:opacity-60"
                  >
                    Try it live&ensp;&rarr;
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-opacity duration-200 hover:opacity-60"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-2">
                    Role
                  </p>
                  <p className="text-foreground">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-2">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-sm text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </header>

          {CaseStudy && <CaseStudy />}

          <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

          <ContactBlob />
          <div className="h-20" />
        </article>
      </PageTransition>
    </main>
  );
}
