import type { Metadata } from "next";
import DigitalZineLoader from "./components/DigitalZineLoader";

export const metadata: Metadata = {
  title: "Cyber Love Poems — wercche",
  description:
    "An interactive poetry zine. Love poems in the language of technology, floating in 3D cyberspace.",
  openGraph: {
    title: "Cyber Love Poems",
    description: "An interactive poetry zine by Weronika Kmieć",
    images: ["/experiments/digital-zine-og.webp"],
  },
};

export default function DigitalZinePage() {
  return <DigitalZineLoader />;
}
