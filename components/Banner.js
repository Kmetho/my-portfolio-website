export default function Banner() {
  const content = (
    <>
      Web, 3D, visuals & the in-between ✿ Available for freelance &
      collaboration ❀&nbsp;
      <a href="mailto:wercche@gmail.com" className="underline hover:opacity-70">
        let's talk!
      </a>
      &nbsp;❁ Based in Poland ❁
    </>
  );

  return (
    <div className="obvi-wide-bold z-10 relative w-full overflow-hidden text-foreground uppercase text-3xl border-b border-border">
      <div
        className="flex w-max animate-marquee hover:animation-play-state:paused"
        aria-hidden="true"
      >
        <span className="mx-8 whitespace-nowrap">{content}</span>
        <span className="mx-8 whitespace-nowrap">{content}</span>
        <span className="mx-8 whitespace-nowrap">{content}</span>
      </div>
    </div>
  );
}
