import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import { projects } from "@/data/projects";

export default function WorkPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="work" />
      </div>
      <PageTransition>
        <section className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">
                Work
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-sm max-w-4xl">
                Selected projects
              </h1>
            </FadeIn>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={0.1 * i}
              />
            ))}
            {rest.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={0.1 * (featured.length + i)}
              />
            ))}
          </div>
        </section>

        <ContactBlob />
        <div className="h-20" />
      </PageTransition>
    </main>
  );
}
