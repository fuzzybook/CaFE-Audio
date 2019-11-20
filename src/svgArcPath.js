const cos = Math.cos;
const sin = Math.sin;
const π = Math.PI;

const f_matrix_times = ([[a, b], [c, d]], [x, y]) => [a * x + b * y, c * x + d * y];
const f_rotate_matrix = x => [
  [cos(x), -sin(x)],
  [sin(x), cos(x)]
];
const f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

/* 
  returns a SVG path element that represent a ellipse.
  cx,cy → center of ellipse
  rx,ry → major minor radius
  t1 → start angle, in degree.
  Δ → angle to sweep, in degrees. positive.
  φ → rotation on the whole, in degrees
*/

const arcPath = ([cx, cy], [rx, ry], [t1, Δ], φ) => {
  t1 = t1 * (π / 180);
  φ = φ * (π / 180);
  Δ = Δ * (π / 180);
  Δ = Δ % (2 * π);
  const rotMatrix = f_rotate_matrix(φ);
  const [sX, sY] = f_vec_add(f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]), [cx, cy]);
  const [eX, eY] = f_vec_add(f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]), [cx, cy]);
  const fA = Δ > π ? 1 : 0;
  const fS = Δ > 0 ? 1 : 0;
  return "d", "M " + sX + " " + sY + " A " + [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ");
};

export default arcPath;
