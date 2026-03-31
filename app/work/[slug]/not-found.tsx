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
      <div className="px-8 pt-24 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
            404
          </p>
          <h1 className="text-xl md:text-3xl lg:text-4xl tracking-tight mb-6">
            Project not found
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            This case study doesn't exist (yet).
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 bg-primary text-primary-foreground hover:shadow-[0_8px_32px_var(--glow-primary)]"
          >
            &larr;&ensp;Back to work
          </Link>
        </div>
      </div>
    </main>
  );
}
