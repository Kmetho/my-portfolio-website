import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import { getFeaturedExperiments, getVisualWork } from "@/data/experiments";
import { ExperimentCard } from "@/components/ExperimentCard";
import { VisualWorkGrid } from "@/components/VisualWorkGrid";

export default function ExperimentsPage() {
  const featured = getFeaturedExperiments();
  const visuals = getVisualWork();

  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="experiments" />
      </div>

      <PageTransition>
        <section className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-8">
                Media Arts
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-xl md:text-3xl lg:text-4xl tracking-tight leading-[1.05] max-w-4xl mb-6">
                3D, generative & visual experiments.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Various explorations where code meets aesthetics.
              </p>
            </FadeIn>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
                Featured
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((experiment, i) => (
                <FadeIn key={experiment.id} delay={0.1 * i}>
                  <ExperimentCard experiment={experiment} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <section className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
                Visual Work
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <VisualWorkGrid items={visuals} />
            </FadeIn>
          </div>
        </section>

        <div className="h-20" />
      </PageTransition>
    </main>
  );
}
