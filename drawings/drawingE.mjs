import { range } from "../lib/core.mjs";
import { CenteredLine, FillingLine } from "../lib/lines.mjs";
import { uniform, uniformSum } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 96,
  height: 48,
  strokeWidth: 1/20,
};

const variants = [
  ({ width }) => ({
    modes: ['black', 'firebrick', 'gold', 'blue']
      .map((color, i) => ({
        color,
        n: 250,
        xCenter: (i + 1) * width / 5,
        length: 4/5 * width,
      })),
  }),
  ({ width }) => ({
    modes: range(5).map(i => ({
      color: 'black',
      n: 80,
      xCenter: uniform(0, width),
      length: uniform(0, width),
    })),
  }),

];

function Component({ height, strokeWidth, modes }) {
  return modes
    .flatMap(({ color, n, xCenter, length }, i) => {
      return range(n).map(j => {
        const y = uniformSum(3, 0, height);
        return {
          xCenter,
          y,
          stroke: color,
          length,
          key: `${i}.${j}`
        };
      });
    })
    .map(({xCenter, y, stroke, length, key}) => (
      react`<${CenteredLine}
        key=${key}
        center=${[xCenter, y]}
        angle=${0}
        strokeWidth=${strokeWidth}
        stroke=${stroke}
        length=${length}
      />`
    ));
}

export default wrap({
  defaults,
  Component,
  variants
});
