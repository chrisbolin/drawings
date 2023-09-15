import { range, toRadians } from "../lib/core.mjs";
import { Polyline, centerPointsByMass } from "../lib/lines.mjs";
import { uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import vector from "../lib/vector.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
  initialPoint: [0, 0],
};

function nextPointFactory({directions, step}) {
  const vectors = range(directions).map(i => {
    const angle = toRadians(i * 360 / directions);
    return [
      Math.cos(angle),
      Math.sin(angle),
    ]
  });
  return ([x0, y0], i) => {
    const [dx, dy] = vectors[uniform(0, directions, 1)];
    return [
      x0 + dx * step,
      y0 + dy * step,
    ];
  };
}

const variants = [
  () => ({
    directions: 4,
    step: 0.125,
    n: 2500,
  }),
  () => ({
    directions: 3,
    step: 0.125,
    n: 2500,
  }),
  () => ({
    directions: 12,
    step: 0.125,
    n: 1250,
  }),
];

export function Component({
  strokeWidth,
  initialPoint,
  width,
  height,
  directions,
  step,
  n
}) {
  const points = [initialPoint];
  const nextPoint = nextPointFactory({directions, step});
  for (let i = 0; i < n; i++) {
    points.push(nextPoint(points[points.length - 1], i));
  }

  return react`<${Polyline} points=${centerPointsByMass(points, [width/2, height/2])} strokeWidth=${strokeWidth} cen/>`
}

export default wrap({
  variants,
  defaults,
  Component
});
