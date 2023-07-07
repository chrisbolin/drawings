import { range, toRadians } from "../lib/core.mjs";
import { SimpleLine, centerOfMass } from "../lib/lines.mjs";
import { uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  height: 4,
  width: 6,
  strokeWidth: 1/100,
};

const variants = [
  ({ width, height }) => {
    return {
      total: 1000,
      lineLength: 1,
      polygon: range(3).map(axis => {
        const radius = 2;
        const x0 = 0.5 * width;
        const y0 = 0.65 * height;
        const axisAngle = 30 + 120 * axis;
        return [
          x0 + radius * Math.cos(toRadians(axisAngle)),
          y0 + radius * Math.sin(toRadians(axisAngle)),
        ];
      })
    };
  },
];

function inPolygon(point, polygon) {
  const n = polygon.length;
  const [cx, cy] = centerOfMass(polygon);
  const lines = range(n).map(i => [
    polygon[i],
    polygon[(i + 1) % n],
  ]);
}

export function Component({
  total,
  strokeWidth,
  width,
  height,
  polygon,
  lineLength,
  lines
}) {
  return range(total).map(i => {
    const x = uniform(0, width);
    const y = uniform(0, height);
    return react`<${SimpleLine} key=${i} length=${lineLength} start=${[x,y]} angle=${30} strokeWidth=${strokeWidth} />`;
  });
}

export default wrap({
  variants,
  defaults,
  Component
});
