// make a second Banner especially for "About" page import Banner from "../components/UI/Banner";
import About from "../components/about components/About";
import MouseTrack from "../components/UI/MouseTrackCanvas";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <MouseTrack />
      <About />
    </main>
  );
}
