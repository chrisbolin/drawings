import { range, toRadians } from "../lib/core.mjs";
import { CenteredLine, SimpleLine, centerOfMass } from "../lib/lines.mjs";
import { pickRandom, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  height: 4,
  width: 6,
  strokeWidth: 1/100,
};

function makeTriange([x, y], radius) {
  return range(3).map(axis => {
    const axisAngle = 30 + 120 * axis;
    return [
      x + radius * Math.cos(toRadians(axisAngle)),
      y + radius * Math.sin(toRadians(axisAngle)),
    ];
  });
}

const variants = [
  ({ width, height }) => {
    const cx = 0.5 * width;
    const cy = 0.6 * height;
    const center = [cx, cy];
    return {
      total: 10000,
      density: 6,
      inclusionPolygon: makeTriange(center, 2),
      exclusionPolygon: makeTriange(center, 1.1),
      getLineLength() {
        const key = pickRandom([0, 0, 0, 0, 0, 0, 0, 1]);
        switch (key) {
          case 0:
            return uniform(0.05, 0.5);
          case 1:
            return uniform(1, 3);
        }
        ;

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
