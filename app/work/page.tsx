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
        <section className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
              Work
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
              Selected projects
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-serif text-lg md:text-xl text-foreground max-w-[70ch]">
              Case studies and things I've built.
            </p>
          </FadeIn>
        </section>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <section className="px-[clamp(1rem,4vw,4rem)] py-16">
          <div className="grid grid-cols-1 gap-16">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={0.1 * i} />
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
