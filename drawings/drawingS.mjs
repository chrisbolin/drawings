import { range } from "../lib/core.mjs";
import { Polyline, PointToPointMultilines, polygonPoints, triangle } from "../lib/lines.mjs";
import Point from "../lib/point.mjs";
import { pickRandom, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/200,
};

class UniqueJSONSet extends Set {
  add(item) {
    const stringifiedItem = JSON.stringify(item);
    super.add(stringifiedItem);
    return this;
  }

  has(item) {
    const stringifiedItem = JSON.stringify(item);
    return super.has(stringifiedItem);
  }

  delete(item) {
    const stringifiedItem = JSON.stringify(item);
    return super.delete(stringifiedItem);
  }

  anyValue() {
    const stringifiedItem = this.values().next().value;
    if (stringifiedItem) {
      return JSON.parse(stringifiedItem);
    }
    return value;
  }

  toArray() {
    return Array.from(this, stringifiedItem => JSON.parse(stringifiedItem));
  }
}

function generateSierpinskiTriangle(n, vertices) {
  const MAX_ITERATIONS = 10 * 1000 * 1000;
  const pointsToProcess = new UniqueJSONSet(vertices);
  const finalPoints = new UniqueJSONSet();
  let iterations = 0;
  while (finalPoints.size < n && iterations++ < MAX_ITERATIONS) {
    const point = pointsToProcess.anyValue();
    if (true) {
      // console.log({vertices, pointsToProcess, finalPoints, iterations});
    }
    const [px, py] = point; 
    for (const vertex of vertices) {
      const [vx, vy] = vertex; 
      const newPoint = [
        (vx + px) / 2,
        (vy + py) / 2,
      ];
      pointsToProcess.add(newPoint);
    }
    pointsToProcess.delete(point);
    finalPoints.add(point);
  }

  return finalPoints.toArray();
}

const variants = [
  ({ center, maxRadius }) => {
    const adjustedCenter = [center[0], center[1] * 1.1];
    return {
      points: generateSierpinskiTriangle(20000, triangle(adjustedCenter, maxRadius))
    };
  },
];

export function Component({ points }) {
  return react`<g>
    ${points.map(([x, y], i) => react`<${Point} x=${x} y=${y} key=${i} stroke="rgba(0, 0, 0, 100%)" />`)}
  </g>`;
}

export default wrap({
  variants,
  defaults,
  Component
});
