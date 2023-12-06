import { range } from "../lib/core.mjs";
import { Polyline, PointToPointMultilines } from "../lib/lines.mjs";
import { pickRandom, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/50,
};

function randomPentagon(center, radius) {
  return cyclicPentagonFromAngles(
    range(5).map(() => uniform(0, 2 * Math.PI)).sort(),
    center,
    radius
  );
}

function regularPentagon(center, radius) {
  return cyclicPentagonFromAngles(
    range(5).map(i => (i/5 - 1/4) * 2 * Math.PI), // -1/4 to orient to the top
    center,
    radius
  );
}

function cyclicPentagonFromAngles(angles, center, radius) {
  return angles.map(angle => {
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    return [x, y];
  });
}

function diagonalFromAdjacentVertex(polygon, vertexIndex) {
  // some polygon diagonals are made of two vertexes with a shared adjacent vertex (e.g., A and C, which share B)
  const n = polygon.length;
  const prevVertexIndex = (vertexIndex + n - 1) % n;
  const nextVertexIndex = (vertexIndex + 1) % n;
  return [
    polygon[prevVertexIndex],
    polygon[nextVertexIndex],
  ]
}

const variants = [
  ({ center, maxRadius }) => {
    const strokeWidth = 1/50;
    // const pentagon = randomPentagon(center, maxRadius * 0.95);
    const pentagon = regularPentagon(center, maxRadius * 0.95);
    const v0 = pickRandom(range(5));
    const v1 = (v0 + 2 + pickRandom(range(2))) % 5;
    const diagonal0 = diagonalFromAdjacentVertex(pentagon, v0);
    const diagonal1 = diagonalFromAdjacentVertex(pentagon, v1);
    return {
      strokeWidth,
      polygon: pentagon,
      lines: [diagonal0, diagonal1]
    };
  },
];

export function Component({
  strokeWidth,
  polygon,
  lines
}) {
  return react`<g>
    <${Polyline} closed points=${polygon} strokeWidth=${strokeWidth}/>
    <${PointToPointMultilines} lines=${lines} strokeWidth=${strokeWidth}/>
  </g>`;
}

export default wrap({
  variants,
  defaults,
  Component
});
