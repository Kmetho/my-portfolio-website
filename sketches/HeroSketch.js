export default function Sketch(p) {
  const textString = "❁✿❀❁✿❀❁✿❀❁✿❀❁✿❀❁✿❀ ";

  const CONFIG = {
    typeX: 65,
    typeY: 65,
    typeStroke: 1,
    tracking: 65,

    ribbonCount: 14,
    ribbonSpaceX: -65,
    ribbonSpaceY: 65,
    ribbonSize: 55,
    ribbonOffset: 0,

    yWave: 50,
    speed: 0.04,
    offset: 2,
    slope: 1,

    colors: [
      "#B9A7D8", // ethereal purple, less pink
      "#8FB3FF", // muted, dreamy blue
      "#E6B8C6", // emotional but restrained
      "#E8F0EE", // soft fog, not sterile white
      "#7FAFA3", // bridges green-black nicely
    ],
    background: "#1D201F", // sacred black
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.strokeCap(p.PROJECT);
    p.strokeJoin(p.ROUND);
  };

  p.draw = () => {
    p.background(CONFIG.background);

    const chars = textString.length;
    const xSpace = CONFIG.typeX + CONFIG.tracking;

    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.translate(
      (-xSpace * chars) / 2 - (CONFIG.ribbonCount * CONFIG.ribbonSpaceX) / 2,
      (-CONFIG.ribbonCount * CONFIG.ribbonSpaceY) / 2,
    );

    for (let k = 0; k < CONFIG.ribbonCount; k++) {
      // Ribbon
      p.strokeWeight(CONFIG.typeY + CONFIG.ribbonSize);
      p.stroke(CONFIG.colors[k % CONFIG.colors.length]);
      p.beginShape();
      for (let i = -1; i <= chars; i++) {
        const y = sinEngine(i, k) * CONFIG.yWave;
        p.vertex(
          i * xSpace + k * CONFIG.ribbonSpaceX,
          k * CONFIG.ribbonSpaceY + y,
        );
      }
      p.endShape();

      // Text
      p.strokeWeight(CONFIG.typeStroke);
      p.stroke(CONFIG.colors[(k + 1) % CONFIG.colors.length]);

      for (let i = 0; i < chars; i++) {
        const yPrev = sinEngine(i - 1, k) * CONFIG.yWave;
        const yNext = sinEngine(i + 1, k) * CONFIG.yWave;
        const rotation = p.atan2(yNext - yPrev, 2 * xSpace);
        const y = sinEngine(i, k) * CONFIG.yWave;

        p.push();
        p.translate(
          i * xSpace + k * CONFIG.ribbonSpaceX,
          k * CONFIG.ribbonSpaceY + y,
        );
        p.rotate(rotation);
        p.translate(-CONFIG.typeX / 2, -CONFIG.typeY / 2);
        drawLetter(textString[i]);
        p.pop();
      }
    }
    p.pop();
  };

  function drawLetter(letter) {
    if (letter === " ") return;
    p.textSize(CONFIG.typeY);
    p.text(letter, 0, CONFIG.typeY);
  }

  function sinEngine(x, y) {
    const s = p.sin(
      p.frameCount * CONFIG.speed + x * CONFIG.offset + y * CONFIG.ribbonOffset,
    );
    const sign = s >= 0 ? 1 : -1;
    return sign * (1 - p.pow(1 - p.abs(s), CONFIG.slope));
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
