import { range, roundTo, sum, toBinary, zip } from "../lib/core.mjs";
import { CenteredLine } from "../lib/lines.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 5.5,
  height: 3.5,
};

function Component({width, height}) {
  const linesPerGroup = 3;

  const distances = [
    1/64,
    1/50,
    1/40,
    1/32,
    1/24,
    1/20,
    1/16,
    1/10,
    1/8,
    1/4,
  ];

  const strokeWidth = 1/64;
  const length = 1;
  const groupLength = width/distances.length;

  return distances.flatMap((distance, i) => {
      const xStart = i * groupLength;
      const lines = range(linesPerGroup).map(j => {
        const x = xStart + distance * j;
        if (x > (i + 1) * groupLength) {
          throw Error(`Not enough space for distance: ${distance}`);
        }
        const y = height / 2;
        return react`
          <${CenteredLine}
            key="${i}-${j}"
            center=${[x, y]}
            angle=${90}
            length=${length}
            strokeWidth=${strokeWidth}/>
        `
      });
      return lines;
    })
}

export default wrap({
  Component, defaults
});
