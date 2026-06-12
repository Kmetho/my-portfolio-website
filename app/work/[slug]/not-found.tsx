import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen overflow-y-auto bg-background">
      <div className="glass sticky top-0 z-50 w-full overflow-hidden">
        <Banner />
        <Nav current="work" />
      </div>
      <div className="px-[clamp(1rem,4vw,4rem)] pt-24">
        <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-8">
          404
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
          Project not found
        </h1>
        <Link
          href="/work"
          className="text-xs font-bold tracking-widest transition-colors duration-200 hover:text-signal"
        >
          &larr; go back to work page
        </Link>
      </div>
    </main>
  );
}
