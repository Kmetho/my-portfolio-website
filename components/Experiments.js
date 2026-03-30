"use client";

import ContactBlob from "./ContactBlob";
import FadeIn from "./motion/FadeIn";
import PageTransition from "./motion/PageTransition";
import Slideshow from "./Slideshow";
import LazyVideo from "./LazyVideo";

const photos = [
  {
    src: "https://64.media.tumblr.com/b482fccce1618a8a59baf51434ad8635/848839ae19feb639-1e/s2048x3072/903f739859532cae38641d8bfbd035002dcb0c77.pnj",
    alt: "Photo 1",
  },
  {
    src: "https://64.media.tumblr.com/4734f237aeaba33aab8e50862b5d382a/aac6c9a15c6bf520-f7/s2048x3072/75d99cdee8968a5b7df3a4288bf58c2b4e440b92.pnj",
    alt: "Photo 2",
  },
  {
    src: "https://64.media.tumblr.com/78211863c99de17f4d989e2fb275abc3/4bb6ca4d4f5a3cf5-c0/s2048x3072/ea024342ec51f66740bf1233be8bfcee13aca3a7.pnj",
    alt: "Photo 3",
  },
  {
    src: "https://64.media.tumblr.com/f7356f3a7623fd4cb28f6aed3d2bd1b4/4bb6ca4d4f5a3cf5-db/s2048x3072/f9b00030cabdd1a2d6b401f4603e76abc8bf0d34.pnj",
    alt: "Photo 4",
  },
  {
    src: "https://64.media.tumblr.com/db8bad39c12aafd41147f38a2babc262/a7622186805470a7-c8/s2048x3072/9956cea62355efc8ad494fa7f2c53206e5cf6667.pnj",
    alt: "Photo 5",
  },
  {
    src: "https://64.media.tumblr.com/ed3484e3f378a8878d76ba70594255e0/a7622186805470a7-39/s2048x3072/602e4a523789dfaf6118317bce98da8cf2a0990d.pnj",
    alt: "Photo 6",
  },
  {
    src: "https://64.media.tumblr.com/58459eaaec2a326896dcf10fb87ff053/61d44557e50cb96b-25/s2048x3072/c92c45e8a2505626a6bd3a6ea05284695d584a47.pnj",
    alt: "Photo 7",
  },
  {
    src: "https://64.media.tumblr.com/8df0d977c76b83172b9a4fdacd610eba/c3815f776cf50920-69/s2048x3072/9f7bea9b4abd0508632a62335bde9450e452e140.pnj",
    alt: "Photo 8",
  },
];

const blenderRenders = [
  {
    src: "https://64.media.tumblr.com/f2667b5002c0e07125962b43ba7ddc59/2dae4127e7f629cb-ff/s2048x3072/2608d72444e76d88f38e127c0668b82ed8396ca7.pnj",
    alt: "Blender render 1",
  },
  {
    src: "https://64.media.tumblr.com/5b25054ecd2377ef94855f554784ddd0/49153f79c104ee77-30/s640x960/01b5460ae8416fa0d88ddf293e6ae65bfe82e220.pnj",
    alt: "Blender render 2",
  },
  {
    src: "https://64.media.tumblr.com/0e17e172dddefab765787bffade03146/90ddb00def9dfeb5-a4/s2048x3072/627395f504ffdd6f2e02f1da1fb8b87cb9e5289f.pnj",
    alt: "Blender render 3",
  },
  {
    src: "https://64.media.tumblr.com/e372ae57edae74bfab6deef76cc605e3/ac038d8a3a3c7b32-75/s2048x3072/4c8a733d85a51824ff1d7d53db2fbb7601469ad7.pnj",
    alt: "Blender render 4",
  },
  {
    src: "https://64.media.tumblr.com/abda532ea8c4ed0a90e712b5073b88c4/f77a01acf381f610-62/s2048x3072/7e95733d6aa55be9d8354114b869ab218865cd1f.pnj",
    alt: "Blender render 5",
  },
];

export default function Experiments() {
  return (
    <PageTransition>
      <section>
        <div className="px-8 pt-24 pb-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0}>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
                Media Arts
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-xl md:text-3xl lg:text-4xl tracking-tight leading-[1.05] max-w-4xl mb-6">
                3D, generative & visual experiments
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-fit">
                Blender renders, p5.js sketches, and other explorations where
                code meets aesthetics.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <div className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0.1}>
              <div className="max-w-2xl">
                <a
                  href="https://crystalssss.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-[var(--radius)] border border-border bg-card aspect-video group"
                >
                  <iframe
                    src="https://crystalssss.netlify.app/"
                    className="w-full h-full pointer-events-none"
                    title="Crystals — interactive 3D synth"
                    loading="lazy"
                  />
                </a>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Crystals
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Interactive 3D synth kit. Click or tap one of the crystals to
                  play a sound. Built with Three.js and Vite, crystals modelled
                  in Blender.
                </p>
                <div className="mt-3 flex gap-4">
                  <a
                    href="https://crystalssss.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors duration-200"
                  >
                    Try it live →
                  </a>
                  <a
                    href="https://github.com/Kmetho/crystals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <div className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl">
            <FadeIn delay={0.1}>
              <div className="max-w-2xl">
                <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-card aspect-video">
                  <LazyVideo
                    src="/experiments/vis-web.mp4"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Generative visualization
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Audio-reactive visuals built in TouchDesigner, exploring
                  real-time feedback between sound and geometry.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

        <div className="px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-6xl flex flex-col md:flex-row gap-12">
            <FadeIn delay={0.3}>
              <div className="max-w-sm">
                <Slideshow images={blenderRenders} interval={1000} />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Blender renders
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Scenes modelled and lit in Blender, with final colour grading
                  and compositing in Adobe Creative Suite.
                </p>
                <a
                  href="https://wercche.tumblr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[11px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors duration-200"
                >
                  More on Tumblr →
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="max-w-sm">
                <Slideshow images={photos} interval={1000} />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Photography
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Film, digital and analog photography - moments, textures, and
                  light.
                </p>
                <a
                  href="https://wercche.tumblr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[11px] font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors duration-200"
                >
                  More on Tumblr →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        <ContactBlob />
        <div className="h-20" />
      </section>
    </PageTransition>
  );
}
