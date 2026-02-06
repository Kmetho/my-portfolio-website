export default function sketch(p) {
  let x = [];
  let y = [];
  let word = "⋆⭒˚.⋆˚✧˚.⋆⭒˚.⋆⋆⭒˚.⋆˚✧˚.⋆⭒˚.⋆";

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(30);

    for (let i = 0; i < word.length; i++) {
      x[i] = p.mouseX;
      y[i] = p.mouseY;
    }
  };

  p.draw = () => {
    p.clear();

    for (let i = word.length - 1; i > 0; i--) {
      x[i] = x[i - 1];
      y[i] = y[i - 1];
    }

    x[0] = p.mouseX;
    y[0] = p.mouseY;

    for (let i = 0; i < word.length; i++) {
      p.fill(0, 200 - i * 12);
      p.textSize(32 - i * 0.6);
      p.text(word[i], x[i], y[i]);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
