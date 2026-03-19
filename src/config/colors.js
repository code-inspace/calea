// Lire la couleur principale depuis la CSS variable
// Modifier uniquement dans src/index.css (:root { --calea-primary: ... })
export function getPrimaryColor() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--calea-primary')
    .trim()
    .split(' ')
    .map(Number);
}

export function getPrimaryHex() {
  const [r, g, b] = getPrimaryColor();
  return `rgb(${r}, ${g}, ${b})`;
}
