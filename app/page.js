import Banner from "../components/Banner";
import HeroTypography from "../components/HeroTypography";
import ContactBlob from "../components/ContactBlob";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Banner />
      <HeroTypography />
      {/* nav hints */}
      <div className="fixed bottom-8 left-8 z-10 flex flex-col gap-2">
        <a
          href="/work"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors duration-200"
        >
          Work
        </a>
        <a
          href="/experiments"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors duration-200"
        >
          Experiments
        </a>
        <a
          href="/about"
          className="obvi-extended-super-italic text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors duration-200"
        >
          About
        </a>
      </div>
      <ContactBlob />
    </main>
  );
}
