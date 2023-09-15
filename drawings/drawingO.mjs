import { range } from "../lib/core.mjs";
import { CenteredLine, triangle } from "../lib/lines.mjs";
import { pickRandomWeighted, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  height: 4,
  width: 6,
  strokeWidth: 1/100,
};

const variants = [
  ({ width, height }) => {
    const cx = 0.5 * width;
    const cy = 0.6 * height;
    const center = [cx, cy];
    return {
      total: 10000,
      density: 4,
      inclusionPolygon: triangle(center, 2),
      exclusionPolygon: triangle(center, 1.1),
      getLineLength() {
        return pickRandomWeighted([
          {weight: 100, value: uniform(0.05, 0.4)}, // shorts
          {weight: 1, value: uniform(1, 4)}, // longs
        ]);
      },
      getAngle() {
        return 30;
      },
    };
  },
];

function inConvexPolygon([px, py], polygon) {
  const n = polygon.length;
  const lines = range(n).map(i => [
    polygon[i],
    polygon[(i + 1) % n],
  ]);

  return lines.every(([a, b]) => {
    const [xa, ya] = a;
    const [xb, yb] = b;
    const slope = (yb - ya) / (xb - xa);

    const yline = slope * (px - xa) + ya;
    return (xb >= xa) ? (py >= yline) : (py <= yline);
  });
}

export function Component({
  total,
  strokeWidth,
  width,
  height,
  inclusionPolygon,
  exclusionPolygon,
  density,
  getLineLength,
  getAngle,
}) {
  console.log({inclusionPolygon});
  return range(total).map(i => {
    const x = uniform(-1, width);
    const y = uniform(-1, height);
    const point = [x, y];
    if (
      (inConvexPolygon(point, inclusionPolygon) && !inConvexPolygon(point, exclusionPolygon))
      || (uniform() < 1/density)
    ) return react`<${CenteredLine}
      key=${i}
      length=${getLineLength()}
      center=${point}
      angle=${getAngle()}
      strokeWidth=${strokeWidth}
    />`;
    return false;
  });
}

export default wrap({
  variants,
  defaults,
  Component
});
