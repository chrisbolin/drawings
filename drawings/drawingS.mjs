import { range } from "../lib/core.mjs";
import { Polyline, PointToPointMultilines, polygonPoints, triangle } from "../lib/lines.mjs";
import Point from "../lib/point.mjs";
import { pickRandom, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  () => {
    return {
      n: 1000,
    };
  },
];

function iterate() {
  
}

export function Component({ n, maxRadius, center }) {
  const vertices = triangle(center, maxRadius);
  const points = vertices;

  return react`<g>
    ${points.map(([x, y], i) => react`<${Point} x=${x} y=${y} key=${i}/>`)}
  </g>`;
}

export default wrap({
  variants,
  defaults,
  Component
});
