import { Polyline } from "../lib/lines.mjs";
import { uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import vector from "../lib/vector.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  ({width, height}) => {
    const directions = [
      [-1, 0],
      [+1, 0],
      [0, -1],
      [0, +1],
    ];
    const step = 0.125;
    const nextPoint = ([x0, y0], i) => {
      const [dx, dy] = directions[uniform(0, 4, 1)];
      return [
        x0 + dx * step,
        y0 + dy * step,
      ];
    };
    return {
      initialPoint: [width/2, height/2],
      nextPoint,
      n: 250,
    };
  },
];

export function Component({
  strokeWidth,
  initialPoint,
  nextPoint,
  n
}) {
  const points = [initialPoint];
  for (let i = 0; i < n; i++) {
    points.push(nextPoint(points[points.length - 1], i));
  }
  return react`<${Polyline} points=${points} strokeWidth=${strokeWidth}/>`
}

export default wrap({
  variants,
  defaults,
  Component
});
