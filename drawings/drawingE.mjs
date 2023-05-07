import { range } from "../lib/core.mjs";
import { CenteredLine, FillingLine } from "../lib/lines.mjs";
import { uniformSum } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 96,
  height: 48,  
};

function Component({ height, width }) {
  const diagonal = Math.sqrt(width*width + height*height);
  const thickness = 1/16; // inch
  
  const COLORS = ['black', 'firebrick', 'gold', 'blue'];
  const COLUMNS = 4;
  const LINES = 1000;
  return range(LINES)
    .map(i => {
      const column = Math.floor(i / LINES * COLUMNS); // consistent z-index
      // const column = i % COLUMNS; // random z-index
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

export default wrap({
  defaults,
  Component,
});
