import { range, toRadians } from "../lib/core.mjs";
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
  ({ width, height }) => {
    const initialPoints = range(4).map(axis => {
      const radius = 2.5;
      const x0 = 0.5 * width;
      const y0 = 0.65 * height;
      const axisAngle = 30 + 120 * axis;
      return [
        x0 + radius * Math.cos(toRadians(axisAngle)),
        y0 + radius * Math.sin(toRadians(axisAngle)),
      ];
    });
    const nextPoints = (previousPoints) => {
      const [a, b, c] = previousPoints;
      const next = [
        vector.divide(vector.add(a, b), 2),
        vector.divide(vector.add(a, c), 2),
        vector.divide(vector.add(b, c), 2),
      ];
      next.push(next[0]);
      return next;
    };
    return {
      initialPoints,
      nextPoints,
      depth: 7
    };
  },

  ({ width, height }) => {
    const initialPoints = range(5).map(axis => {
      const radius = 2;
      const axisAngle = -45 + 90 * axis;
      const x0 = 0.5 * width;
      const y0 = 0.5 * height;
      return [
        x0 + radius * Math.cos(toRadians(axisAngle)),
        y0 + radius * Math.sin(toRadians(axisAngle)),
      ];
    });
    const minIntensity = 0.7;
    const maxIntensity = 1.1;
    const aIntensity = uniform(minIntensity, maxIntensity);
    const bIntensity = uniform(minIntensity, maxIntensity);
    const cIntensity = uniform(minIntensity, maxIntensity);
    const dIntensity = uniform(minIntensity, maxIntensity);
    const nextPoints = (previousPoints) => {
      const [a, b, c, d] = previousPoints;
      const next = [
        vector.multiply(a, aIntensity),
        vector.multiply(b, bIntensity),
        vector.multiply(c, cIntensity),
        vector.multiply(d, dIntensity),
      ];
      next.push(next[0]);
      return next;
    };
    return {
      initialPoints,
      nextPoints,
      depth: 17
    };
  },

  ({ width, height }) => {
    const initialPoints = range(4).map(axis => {
      const radius = 2.5;
      const x0 = 0.5 * width;
      const y0 = 0.65 * height;
      const axisAngle = 30 + 120 * axis;
      return [
        x0 + radius * Math.cos(toRadians(axisAngle)),
        y0 + radius * Math.sin(toRadians(axisAngle)),
      ];
    });
    const minIntensity = 0.7;
    const maxIntensity = 1.05;
    const aIntensity = uniform(minIntensity, maxIntensity);
    const bIntensity = uniform(minIntensity, maxIntensity);
    const cIntensity = uniform(minIntensity, maxIntensity);
    const nextPoints = (previousPoints) => {
      const [a, b, c] = previousPoints;
      const next = [
        vector.multiply(a, aIntensity),
        vector.multiply(b, bIntensity),
        vector.multiply(c, cIntensity),
      ];
      next.push(next[0]);
      return next;
    };
    return {
      initialPoints,
      nextPoints,
      depth: 17
    };
  },
];

export function Component({
  strokeWidth,
  initialPoints,
  nextPoints,
  depth
}) {
  const pointSets = [initialPoints];
  for (let i = 0; i < depth; i++) {
    pointSets.push(nextPoints(pointSets[pointSets.length - 1]));
  }
  return pointSets.map((points, i) => react`
    <${Polyline} key=${i} points=${points} strokeWidth=${strokeWidth}/>
  `);
}

export default wrap({
  variants,
  defaults,
  Component
});
