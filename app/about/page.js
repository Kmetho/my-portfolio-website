import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <Banner />
      <Nav current="about" />
      <About />
    </main>
  );
}
