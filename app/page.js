import Banner from "./components/Banner";
import Work from "./components/Work.js";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Banner />
      <Work />
    </main>
  );
}
