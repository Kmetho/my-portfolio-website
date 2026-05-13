import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import ContactBlob from "@/components/ContactBlob";
import FadeIn from "@/components/motion/FadeIn";
import PageTransition from "@/components/motion/PageTransition";
import LazyVideo from "@/components/LazyVideo";
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
        <section className="px-[clamp(1rem,4vw,4rem)] pt-24 pb-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
              Media Arts
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
              3D, generative & visual experiments
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-serif text-lg md:text-xl text-foreground max-w-[70ch]">
              My various explorations where code meets aesthetics.
            </p>
          </FadeIn>
        </section>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <section className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
              Featured
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featured.map((experiment, i) => (
              <FadeIn key={experiment.id} delay={0.1 * i}>
                <ExperimentCard experiment={experiment} />
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <section className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
              Visual work
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <VisualWorkGrid items={visuals} />
          </FadeIn>
        </section>

        <div className="mx-[clamp(1rem,4vw,4rem)] h-px bg-border" />

        <section className="px-[clamp(1rem,4vw,4rem)] py-16">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-10">
              Generative visualization
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="overflow-hidden border border-border aspect-video max-w-3xl">
              <LazyVideo
                src="/experiments/vis-web.mp4"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-serif mt-4 text-base md:text-lg text-foreground max-w-[70ch]">
              Audio-reactive visuals built in TouchDesigner, exploring
              real-time feedback between sound and geometry.
            </p>
          </FadeIn>
        </section>

        <ContactBlob />
        <div className="h-20" />
      </PageTransition>
    </main>
  );
}
