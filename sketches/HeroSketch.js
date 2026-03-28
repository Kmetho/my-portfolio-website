export default function Sketch(p) {
  const CONFIG = {
    ribbonCount: 16,
    ribbonSpaceX: -60,
    ribbonSpaceY: 60,
    ribbonHalf: 58,
    segments: 80,
    subdivisions: 2,
    segmentWidth: p.windowWidth,

    yWave: 55,
    speed: 0.03,
    offset: 0.25,
    ribbonOffset: 0.15,

    mouseRadius: 400,
    mouseStrength: 70,

    colors: [
      [9, 232, 94],    // primary green
      [157, 141, 241], // secondary purple
      [255, 127, 17],  // accent orange
      [185, 255, 183], // soft mint
      [240, 206, 80],  // highlight warm
    ],
    background: [17, 17, 17],
  };

  let mx, my;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.pixelDensity(1);
    mx = 0;
    my = 0;
  };

  p.draw = () => {
    p.background(...CONFIG.background);

    // ease mouse (WEBGL origin is center, so offset)
    const targetX = (p.mouseX || p.width / 2) - p.width / 2;
    const targetY = (p.mouseY || p.height / 2) - p.height / 2;
    mx = p.lerp(mx, targetX, 0.12);
    my = p.lerp(my, targetY, 0.12);

    const totalW = CONFIG.segments * CONFIG.segmentWidth;
    const originX =
      -totalW / 2 - (CONFIG.ribbonCount * CONFIG.ribbonSpaceX) / 2;
    const originY = (-CONFIG.ribbonCount * CONFIG.ribbonSpaceY) / 2;

    for (let k = 0; k < CONFIG.ribbonCount; k++) {
      const [cr, cg, cb] = CONFIG.colors[k % CONFIG.colors.length];

      const alpha = p.map(k, 0, CONFIG.ribbonCount - 1, 255, 180);

      p.fill(cr, cg, cb, alpha);
      p.noStroke();

      // precompute centerline (subdivided for smoothness)
      const sub = CONFIG.subdivisions;
      const totalPts = CONFIG.segments * sub;
      const subWidth = CONFIG.segmentWidth / sub;
      const pts = [];
      for (let i = 0; i <= totalPts; i++) {
        const frac = i / sub; // fractional segment index
        const bx = originX + i * subWidth + k * CONFIG.ribbonSpaceX;
        const by = originY + k * CONFIG.ribbonSpaceY + wave(frac, k) * CONFIG.yWave;

        // mouse push — smoothstep falloff (no hard edge)
        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0;
        let pushY = 0;
        if (dist < CONFIG.mouseRadius && dist > 0) {
          // smoothstep: 3t² - 2t³ (eases in AND out, no visible boundary)
          const t = 1 - dist / CONFIG.mouseRadius;
          const smooth = t * t * (3 - 2 * t);
          const force = smooth * CONFIG.mouseStrength;
          pushX = (dx / dist) * force * 0.3;
          pushY = (dy / dist) * force;
        }

        pts.push({ x: bx + pushX, y: by + pushY });
      }

      // draw ribbon as TRIANGLE_STRIP
      p.beginShape(p.TRIANGLE_STRIP);
      for (let i = 0; i < pts.length; i++) {
        // compute normal (perpendicular to tangent)
        let tx, ty;
        if (i === 0) {
          tx = pts[1].x - pts[0].x;
          ty = pts[1].y - pts[0].y;
        } else if (i === pts.length - 1) {
          tx = pts[i].x - pts[i - 1].x;
          ty = pts[i].y - pts[i - 1].y;
        } else {
          tx = pts[i + 1].x - pts[i - 1].x;
          ty = pts[i + 1].y - pts[i - 1].y;
        }
        const len = Math.sqrt(tx * tx + ty * ty) || 1;
        const nx = -ty / len;
        const ny = tx / len;

        p.vertex(
          pts[i].x + nx * CONFIG.ribbonHalf,
          pts[i].y + ny * CONFIG.ribbonHalf,
        );
        p.vertex(
          pts[i].x - nx * CONFIG.ribbonHalf,
          pts[i].y - ny * CONFIG.ribbonHalf,
        );
      }
      p.endShape();
    }
  };

  function wave(x, k) {
    return p.sin(
      p.frameCount * CONFIG.speed +
        x * CONFIG.offset +
        k * CONFIG.ribbonOffset,
    );
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
