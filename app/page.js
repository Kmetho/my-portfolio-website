import Banner from "./components/Banner";
import HeroCanvas from "./components/HeroCanvas";
import Work from "./components/Work.js";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Banner />
      <HeroCanvas />
      {/* <Work /> */}
    </main>
  );
}
