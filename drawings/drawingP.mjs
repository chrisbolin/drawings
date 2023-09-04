import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";
import Point from "../lib/point.mjs";
import { range } from "../lib/core.mjs";
import { uniform, uniformArray } from "../lib/random.mjs";
import { grid1d } from "../lib/grid.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  ({ height }) => {
    return {
      Y: uniformArray(500, 0, height),
      nLines: 10,
      xBounds: [0.1, 0.9],
      x0: 0.1,
      dx: x => x * .8 * uniform(),
      staticFirstLine: true,
    };
  },
  ({ height }) => {
    return {
      Y: grid1d(250, 0, height),
      nLines: 25,
      xBounds: [0.1, 1],
      x0: 0.1,
      dx: (x, i) => i === 0 ? uniform(0, 0.01) : 2.2 * x,
      staticFirstLine: false,
    };
  },
];

export function Component({
  width,
  xBounds,
  nLines,
  Y,
  dx,
  staticFirstLine,
  x0
}) {
  const [xStart, xEnd] = xBounds;
  const xDistance = (xEnd - xStart) * width;
  const spaces = nLines - 1;
  let X = range(Y.length).fill(0);
  const xStep = (xDistance / spaces);

  const XX = staticFirstLine ? [X] : [];
  for (let ignore; XX.length < nLines; ignore++) {
    X = X.map(x => x + xStep * dx((x || x0), XX.length));
    XX.push(X);
  }

  return XX.map((X, lineIndex) => X
    .filter(x => x <= width)
    .map((x, pointIndex) => react`
      <${Point}
        x=${x + xStep * lineIndex + xStart}
        y=${Y[pointIndex]}
        key="${lineIndex}.${pointIndex}"
      />`
  ));
}

export default wrap({
  variants,
  defaults,
  Component
});
