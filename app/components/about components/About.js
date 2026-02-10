export default function About() {
  return (
    <div>
      <section className="px-8 py-24 max-w-2xl mx-auto">
        <h1 className="text-3xl font-display mb-16">About</h1>

        <div className="space-y-10 text-lg leading-relaxed">
          <p>
            I am a creative technologist working across web development,
            generative motion, and 3D.
          </p>

          <p>
            I design interfaces where code defines behavior and rhythm, not just
            layout.
          </p>

          <p className="opacity-80">
            Currently focused on interactive web experiences and expressive
            systems.
          </p>
        </div>
      </section>
      <section className="px-8 pb-32 max-w-2xl mx-auto">
        <h2 className="text-xs uppercase tracking-widest opacity-60 mb-6">
          Focus
        </h2>

        <ul className="space-y-3 text-sm">
          <li>Interactive web experiences</li>
          <li>Creative coding and generative motion</li>
          <li>Scroll-based and time-based narratives</li>
          <li>Minimal interfaces with expressive systems</li>
        </ul>
      </section>
    </div>
  );
}
