import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Experiments from "@/components/Experiments";

export default function ExperimentsPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="experiments" />
      </div>
      <Experiments />
    </main>
  );
}
