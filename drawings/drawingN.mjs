import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const phi = (1 + Math.sqrt(5)) / 2;

const edgesIcosahedron = [
  [[1, phi, 0], [1, -phi, 0]],
  [[1, phi, 0], [phi, 0, 1]],
  [[1, phi, 0], [phi, 0, -1]],
  [[1, -phi, 0], [phi, 0, 1]],
  [[1, -phi, 0], [phi, 0, -1]],
  [[1, -phi, 0], [-1, -phi, 0]],
  [[-1, -phi, 0], [-1, phi, 0]],
  [[-1, -phi, 0], [-phi, 0, 1]],
  [[-1, -phi, 0], [-phi, 0, -1]],
  [[-1, phi, 0], [-phi, 0, 1]],
  [[-1, phi, 0], [-phi, 0, -1]],
  [[-1, phi, 0], [1, phi, 0]],
  [[phi, 0, 1], [0, 1, phi]],
  [[phi, 0, 1], [0, -1, phi]],
  [[phi, 0, -1], [0, 1, phi]],
  [[phi, 0, -1], [0, -1, phi]],
  [[-phi, 0, 1], [0, 1, phi]],
  [[-phi, 0, 1], [0, -1, phi]],
  [[-phi, 0, -1], [0, 1, phi]],
  [[-phi, 0, -1], [0, -1, phi]],
  [[0, 1, phi], [1, phi, 0]],
  [[0, 1, phi], [-1, phi, 0]],
  [[0, -1, phi], [1, -phi, 0]],
  [[0, -1, phi], [-1, -phi, 0]],
  [[0, 1, -phi], [1, phi, 0]],
  [[0, 1, -phi], [-1, phi, 0]],
  [[0, -1, -phi], [1, -phi, 0]],
  [[0, -1, -phi], [-1, -phi, 0]],
  [[phi, 0, 1], [1, -phi, 0]],
  [[phi, 0, -1], [1, -phi, 0]]
];

function basicProjection(edges) {
  return edges.map(edge => {
    const [p0, p1] = edge;
    const [p0x, p0y] = p0;
    const [p1x, p1y] = p1;
    return [
      [p0x, p0y],
      [p1x, p1y],
    ];
  });
}

const defaults = {
  height: 4,
  width: 6,
  strokeWidth: 1/50,
};

const variants = [
  () => {
    return {
      lines: basicProjection(edgesIcosahedron),
    };
  },
];

export function Component({
  strokeWidth,
  width,
  height,
  lines
}) {
  const cx = width/2;
  const cy = height/2;
  return lines.map(([p0, p1], i) => {
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    return react`<line
      x1=${cx + x0}
      y1=${cy + y0}
      x2=${cx + x1}
      y2=${cy + y1}
      stroke="black"
      key=${i}
      strokeWidth="${strokeWidth}"
    />`;
  });
}

export default wrap({
  variants,
  defaults,
  Component
});
