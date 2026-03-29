import Banner from "../components/Banner";
import HeroTypography from "../components/HeroTypography";
import ContactBlob from "../components/ContactBlob";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
      </div>
      <HeroTypography />
      <div className="fixed bottom-8 left-8 z-10 flex flex-col gap-2 items-start">
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
        <ThemeToggle />
      </div>
      <ContactBlob />
    </main>
  );
}
