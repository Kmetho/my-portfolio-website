export default function Banner() {
  const content = (
    <>
      🚂 Weronika Kmieć, creative technologist | web, 3D, visuals, and sometimes
      photos | Contact:&nbsp;
      <a href="mailto:wercche@gmail.com" className="underline hover:opacity-70">
        e-mail
      </a>
      &nbsp;or DM me on&nbsp;
      <a
        href="https://www.instagram.com/wercche/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:opacity-70"
      >
        the evil app
      </a>
    </>
  );

  return (
    <div
      className="z-10 relative w-full overflow-hidden text-white uppercase font-display text-5xl"
      lang="pl"
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        <span className="mx-8 whitespace-nowrap">{content}</span>
        <span className="mx-8 whitespace-nowrap">{content}</span>
      </div>
    </div>
  );
}
