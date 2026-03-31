import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import BriefedCaseStudy from "@/components/case-studies/BriefedCaseStudy";
import { projects } from "@/data/projects";

const caseStudies: Record<string, React.ComponentType> = {
  briefed: BriefedCaseStudy,
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
          <header className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
            <div className="max-w-6xl">
              <FadeIn delay={0}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                    Case Study
                  </span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="italic text-xl md:text-3xl lg:text-4xl tracking-tight mb-6">
                  {project.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mb-10">
                  {project.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[0_8px_32px_var(--glow-primary)]"
                    >
                      Try it live&ensp;&rarr;
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 border border-border text-foreground hover:bg-muted"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Role
                    </p>
                    <p className="text-foreground">{project.role}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </header>

          {CaseStudy && <CaseStudy />}

          <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

          <ContactBlob />
          <div className="h-20" />
        </article>
      </PageTransition>
    </main>
  );
}
