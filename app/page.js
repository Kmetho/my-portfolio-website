import Banner from "../components/Banner";
import HeroCanvas from "../components/HeroCanvas";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Banner />
      <HeroCanvas />
      {/* nav hints */}
      <div className="fixed bottom-8 left-8 z-10 flex flex-col gap-2">
        <a
          href="/work"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Work
        </a>
        <a
          href="/about"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          About
        </a>
      </div>
      <div className="fixed bottom-8 right-8 z-10">
        <a
          href="mailto:wercche@gmail.com"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
