
document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate');
  const palette = document.getElementById('palette');

  generateButton.addEventListener('click', () => {
    palette.innerHTML = '';
    const baseHue = Math.floor(Math.random() * 360);
    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 35) % 360;
      const color = hslToHex(hue, 0.7, 0.7);
      const colorBox = document.createElement('div');
      colorBox.className = 'col';
      colorBox.style.backgroundColor = color;
      colorBox.innerHTML = `<span>${color}</span>`;
      palette.appendChild(colorBox);
    }
  });

  function hslToHex(h, s, l) {
    h /= 360;
    s = s > 1 ? 1 : s < 0 ? 0 : s;
    l = l > 1 ? 1 : l < 0 ? 0 : l;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = function(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return (
      "#" +
      ("00" + Math.round(r * 255).toString(16)).slice(-2) +
      ("00" + Math.round(g * 255).toString(16)).slice(-2) +
      ("00" + Math.round(b * 255).toString(16)).slice(-2)
    );
  }
});
