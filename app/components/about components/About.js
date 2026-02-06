export default function About() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-display mb-6">
        I build digital experiences where code behaves like material.
      </h1>

      <p className="mb-4 text-lg">
        I’m Weronika Kmieć — a creative technologist working across web
        development, generative visuals, and 3D. I use code as a design tool,
        not just a delivery mechanism.
      </p>

      <p className="mb-4">
        My background in media arts shapes how I build interfaces: I care about
        rhythm, interaction, and emotional response as much as performance and
        structure. I’m most interested in work that sits between engineering and
        expression.
      </p>
      <p className="mb-4 text-sm opacity-80">
        Currently exploring scroll-based narratives, generative motion,
        TouchDesigner, and how minimal UI can coexist with expressive
        backgrounds.
      </p>

      <p className="mt-8 text-sm">
        You can reach me at{" "}
        <a href="mailto:wercche@gmail.com" className="underline">
          wercche@gmail.com
        </a>{" "}
        or on{" "}
        <a
          href="https://www.instagram.com/wercche/"
          target="_blank"
          className="underline"
        >
          Instagram
        </a>
        .
      </p>
    </div>
  );
}
