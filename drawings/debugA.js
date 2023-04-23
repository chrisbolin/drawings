import { range, roundTo, sum, toBinary, zip } from "../utils/core.js";
import { CenteredLine } from "../utils/lines.js";
import { react } from "../utils/react.js";

export const width = 5.5;
export const height = 3.5;

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

export function Component(props) {
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