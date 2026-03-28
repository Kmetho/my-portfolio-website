const tools = [
  "React",
  "Next.js",
  "Tailwind",
  "Framer Motion",
  "p5.js",
  "Three.js",
  "Blender",
  "GLSL",
  "Figma",
  "Node.js",
];

const links = [
  { label: "Email", href: "mailto:wercche@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/wercche/" },
  { label: "GitHub", href: "https://github.com/Kmetho" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wercche/" },
];

export default function About() {
  return (
    <div className="max-h-screen overflow-y-auto">
      {/* ── hero statement ── */}
      <section className="px-8 pt-24 pb-20 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-8">
            About
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl">
            Creative technologist making interfaces that move, respond & feel
            alive.
          </h1>
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">
            I work across web development, generative art, and 3D — building
            things where code defines rhythm and behavior, not just layout.
          </p>
        </div>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      {/* ── tools — horizontal flow ── */}
      <section className="px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
              Tools & Tech
            </p>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full px-5 py-2.5 text-sm font-medium bg-muted text-foreground border border-border transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-8 md:mx-16 lg:mx-24 max-w-6xl h-px bg-border" />

      {/* ── contact ── */}
      <section className="px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground pt-1">
              Get in touch
            </p>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-border transition-colors duration-200 hover:border-primary"
                >
                  <span className="font-display text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
                    {link.label}
                  </span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200 text-lg">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
