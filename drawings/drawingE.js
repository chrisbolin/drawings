import { range } from "../utils/core.js";
import { CenteredLine, FillingLine } from "../utils/lines.js";
import { shuffle, uniform, uniformSum } from "../utils/random.js";
import { react } from "../utils/react.js";

export const width = 96;
export const height = 48;

const diagonal = Math.sqrt(width*width + height*height);
const thickness = 1/16; // inch

const COLORS = ['black', 'firebrick', 'gold', 'blue']
const COLUMNS = 4;
const LINES = 1000;

export function Component() {
  return range(LINES)
    .map(i => {
      const column = Math.floor(i / LINES * COLUMNS); // consistent z-index
      // const column = i % COLUMNS; // randon z-index
      const x = (column + 1) * width/5;
      const stroke = COLORS[column];
      const y = uniformSum(3, 0, height);
      const length = 4/5 * width;
      return {
        x,
        y,
        stroke,
        length,
      };
    }
    )
    .map(({x, y, stroke, length}, i) => react`
      <${CenteredLine}
        key=${i}
        center=${[x, y]}
        angle=${0}
        strokeWidth=${thickness/diagonal*100+'%'}
        stroke=${stroke}
        length=${length}
        />`)
    ;
}