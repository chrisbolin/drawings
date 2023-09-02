import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";
import Point from "../lib/point.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  () => {
    return {
    };
  },
];

function getRandomPointArray(boundingRect, count) {
  const [xMin, yMin, xMax, yMax] = boundingRect;
  const pointArray = [];

  for (let i = 0; i < count; i++) {
    const randomX = Math.random() * (xMax - xMin) + xMin;
    const randomY = Math.random() * (yMax - yMin) + yMin;
    pointArray.push([randomX, randomY]);
  }

  return pointArray;
}

export function Component({
  width,
  height
}) {
  const points = getRandomPointArray([0, 0, width/4, height/2], 1000);
  return points.map(
    ([x, y], i) => react`<${Point} x=${x} y=${y} key=${i}/>`
  );
}

export default wrap({
  variants,
  defaults,
  Component
});
