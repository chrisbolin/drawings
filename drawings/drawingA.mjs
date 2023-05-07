import { react } from "../lib/react.mjs";

import { CenteredLine } from "../lib/lines.mjs";
import { uniformSum, uniform } from "../lib/random.mjs";
import { range } from "../lib/core.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  height: 400,
  width: 400,
};

function RandomLine({length, xMax, yMax, progress, randomSumCount, ...otherProps}) {
  const center = [
    xMax * uniformSum(5),
    yMax * uniformSum(5)
  ];
  const firstHalf = progress < 0.5;
  const angle = (firstHalf ? 85 : 175) + 10 * uniform();
  const stroke = 'black';

  return CenteredLine({
    length,
    center,
    angle,
    stroke,
    ...otherProps
  })
}

function Component({height, width}) {
  const lineLength = 200;
  const lineCount = 50;
  const randomSumCount = 3;
  const strokeWidth = 1;

  const rendered = range(lineCount)
    .map(i => react`
      <${RandomLine}
        length=${lineLength}
        key=${i}
        xMax=${width}
        yMax=${height}
        progress=${i/lineCount}
        strokeWidth=${strokeWidth}
        randomSumCount=${randomSumCount}
        />`)
    ;

  return react`
      ${rendered}
  `;
}

export default wrap({
  Component,
  defaults
});
