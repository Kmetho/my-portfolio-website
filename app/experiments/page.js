import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Experiments from "@/components/Experiments";

export default function ExperimentsPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <Banner />
      <Nav current="experiments" />
      <Experiments />
    </main>
  );
}
