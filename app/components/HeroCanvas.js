// "use client";

// import { useEffect, useRef } from "react";
// import p5 from "p5";
// import Sketch from "../sketches/Sketch.js";

// export default function Canvas() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const sketch = new p5(Sketch, containerRef.current);

//     return () => {
//       sketch.remove(); // 💀 kill it cleanly
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Sketch from "../sketches/Sketch";

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    let p5Instance;

    (async () => {
      const p5 = (await import("p5")).default;
      p5Instance = new p5(Sketch, containerRef.current);
    })();

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
