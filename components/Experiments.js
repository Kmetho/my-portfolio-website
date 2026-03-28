"use client";

import ContactBlob from "./ContactBlob";
import FadeIn from "./motion/FadeIn";
import PageTransition from "./motion/PageTransition";
import Slideshow from "./Slideshow";

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
            <FadeIn delay={0.3}>
              <div className="max-w-sm">
                <Slideshow images={blenderRenders} interval={1000} />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Blender renders
                </p>
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
