import Link from "next/link";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";

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
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
          Project not found
        </h1>
        <p className="font-serif text-lg md:text-xl text-foreground max-w-[70ch] mb-10">
          This case study doesn&apos;t exist (yet).
        </p>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-0.5 transition-opacity duration-200 hover:opacity-60"
        >
          &larr;&ensp;Back to work
        </Link>
      </div>
    </main>
  );
}
