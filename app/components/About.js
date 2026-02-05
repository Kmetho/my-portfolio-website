export default function About() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-display mb-4">About</h1>
      <p className="mb-4">
        Hello! I'm Weronika Kmieć, a creative technologist specializing in web
        development, 3D art, and visual design. I love blending technology with
        creativity to produce unique digital experiences.
      </p>
      <p className="mb-4">
        With a background in both art and programming, I bring a
        multidisciplinary approach to my projects. Whether it's building
        interactive websites or crafting stunning 3D visuals, I strive to push
        the boundaries of what's possible.
      </p>
      <p>
        Feel free to reach out to me via email{" "}
        <a href="mailto:wercche@gmail.com" className="text-blue-600 underline">
          here
        </a>
        or connect with me on{" "}
        <a
          href="https://www.instagram.com/wercche/"
          target="_blank"
          className="text-blue-600 underline"
        >
          Instagram
        </a>
        . I'm always open to new opportunities and collaborations!
      </p>
    </div>
  );
}
