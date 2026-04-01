"use client";

export function ZineCover() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-5xl md:text-7xl font-light italic tracking-wide leading-tight"
          style={{ color: "#d4789c" }}
        >
          cyber love poems
        </h1>
        <p className="mt-8 text-sm" style={{ color: "rgba(90, 80, 100, 0.6)" }}>
          Weronika Kmieć
        </p>
        <p
          className="mt-16 text-xs animate-pulse"
          style={{ color: "rgba(90, 80, 100, 0.35)" }}
        >
          scroll to enter
        </p>
      </div>
    </section>
  );
}
