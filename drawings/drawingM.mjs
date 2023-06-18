import { range } from "../lib/core.mjs";
import { FillingLine } from "../lib/lines.mjs";
import { uniformSum } from "../lib/random.mjs";
import { React, react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const variants = [
  ({strokeWidth}) => {
    const boxSize = 2/3;
    const offsetCenters = range(12).map(i => [
      uniformSum(4, -boxSize/2, boxSize/2),
      uniformSum(4, -boxSize/2, boxSize/2)
    ]);
    return {
      boxSize,
      Box: ({ x0, x1, y0, y1, a, b }) => {
        const angle = -45 * Math.abs(b) + 90 * Math.abs(a);
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;

        return offsetCenters.map(([dx, dy], i) => react`
          <${FillingLine}
            center=${[x + dx, y + dy]}
            angle=${angle}
            xBounds=${[x0, x1]}
            yBounds=${[y0, y1]}
            strokeWidth=${strokeWidth}
            key=${i}
          />`);
      } 
    };
  }
];

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

export function Component({
  width,
  height,
  boxSize,
  Box
}) {
  return range(Math.ceil(width/boxSize)).flatMap(column => {
    const x0 = column * boxSize;
    const x1 = x0 + boxSize;
    return range(Math.ceil(height/boxSize)).map(row => {
      const y0 = row * boxSize;
      const y1 = y0 + boxSize;
      const a = (x0 + x1) / width - 1;
      const b = (y0 + y1) / height - 1;
      const props = { x0, x1, y0, y1, column, row, a, b };
      return React.createElement(Box, {...props, key: `${x0} ${x1} ${y0} ${y1}`});
    });
  });
}

export default wrap({
  variants,
  defaults,
  Component
});
