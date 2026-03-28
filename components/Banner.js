"use client";

export default function Banner() {
  const items = [
    "Web, 3D, visuals & the in-between",
    "Available for freelance & collaboration",
    "Based in Poland",
  ];

  const track = [...items, ...items, ...items];

  return (
    <div className="glass relative z-10 w-full overflow-hidden border-b">
      <div className="flex w-max animate-marquee">
        {track.map((text, i) => (
          <span
            key={i}
            className="obvi-wide-bold whitespace-nowrap text-lg md:text-xl uppercase text-foreground/80 mx-6 md:mx-10"
          >
            {text}
            <span className="inline-block w-16 md:w-24" />
          </span>
        ))}
      </div>
    </div>
  );
}
