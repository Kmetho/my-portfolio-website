"use client";

export default function Banner() {
  const items = [
    "Web, 3D, visuals & the in-between",
    "Available for freelance & collaboration",
    "Based in Poland",
  ];

  const track = [...items, ...items, ...items];

  return (
    <div className="flex w-max animate-marquee border-b border-border">
      {track.map((text, i) => (
        <span
          key={i}
          className="font-sans font-medium whitespace-nowrap text-lg md:text-xl uppercase text-foreground mx-6 md:mx-10 py-1"
        >
          {text}
          <span className="inline-block w-16 md:w-24" />
        </span>
      ))}
    </div>
  );
}
