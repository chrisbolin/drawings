import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";
import Point from "../lib/point.mjs";
import { range } from "../lib/core.mjs";
import { uniform } from "../lib/random.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  () => {
    return {
      nPoints: 1000,
      nLines: 20,
      xMin: 0.1,
      xMax: 0.9,
      amplitude: .8
    };
  },
];

export function Component({
  width,
  height,
  nPoints,
  xMin,
  xMax,
  nLines,
  amplitude
}) {
  const xDistance = (xMax - xMin) * width;
  const spaces = nLines - 1;
  const Y = range(nPoints).map(() => uniform(0, height));
  let X = range(nPoints).fill(xMin);
  const realAmplitude = amplitude * xDistance / spaces;
  const xStep = (xDistance / spaces);

  const lineX = [X];
  for (let xIndex = 0; xIndex < nLines - 1; xIndex++) {
    X = X.map(x => x + x * realAmplitude * uniform());
    lineX.push(X);
  }

  return lineX.map((X, lineIndex) => Y.map((y, pointIndex) => react`
      <${Point}
        x=${X[pointIndex] + xStep * lineIndex}
        y=${y}
        key="${lineIndex}.${pointIndex}"
      />`
  ));
}

export default wrap({
  variants,
  defaults,
  Component
});
