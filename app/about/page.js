import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="about" />
      </div>
      <About />
    </main>
  );
}
