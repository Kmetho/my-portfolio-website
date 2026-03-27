const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  { category: "Creative", items: ["p5.js", "Three.js", "Blender", "GLSL"] },
  {
    category: "Design",
    items: ["Figma", "UI/UX", "Typography", "Motion Design"],
  },
  {
    category: "Other",
    items: ["Git", "Node.js", "REST APIs", "Responsive Design"],
  },
];

export default function About() {
  return (
    <div className="max-h-screen overflow-y-auto">
      <section className="px-8 pt-20 pb-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="aspect-[3/4] w-full max-w-[280px] mx-auto lg:mx-0 rounded-[var(--radius-lg)] overflow-hidden bg-muted border border-border">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                Your photo here
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
              About
            </h1>

            <div className="space-y-5 text-base leading-relaxed max-w-xl text-foreground">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. I am a
                creative technologist working across web development, generative
                motion, and 3D.
              </p>
              <p className="text-muted-foreground">
                Sed euismod nisl vel tincidunt luctus. I design interfaces where
                code defines behavior and rhythm, not just layout. Nunc sapien
                aliquet nunc, vitae bibendum nisi.
              </p>
              <p className="text-muted-foreground">
                Currently focused on interactive web experiences and expressive
                systems. Vivamus magna justo, lacinia eget consectetur sed.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: "Email", href: "mailto:wercche@gmail.com" },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/wercche/",
                },
                { label: "GitHub", href: "https://github.com/Kmetho" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/wercche/",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 bg-muted text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl h-px bg-border" />

      <section className="px-8 py-16 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <h2 className="mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Skills & Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-display text-sm font-bold mb-3">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-all duration-200 cursor-default bg-muted text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
