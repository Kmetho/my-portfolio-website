import Banner from "./components/UI/Banner";
import HeroCanvas from "./components/UI/HeroCanvas";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Banner />
      <HeroCanvas />
    </main>
  );
}
