import { range } from "../utils/core.mjs";
import { FillingLine } from "../utils/lines.mjs";
import { react } from "../utils/react.mjs";
import wrap from "../utils/wrap.mjs";


const defaults = {
  width: 600,
  height: 400,
};

(i) => {
  const x = 300 + i;
  const y = 50 + i*4;
  const angle = i + i*i/30;
  return {
    center: [x, y],
    angle
  };
}

(i) => {
  const x = 600;
  const y = 50 + i*4 + i*i/10;
  const angle = i < 30 ? (180 + i/2) : i;
  return {
    center: [x, y],
    angle
  };
}

const variants = [
  () => ({
    mapper: (i) => {
      const j = i + 30;
      const x = j + 40;
      const y = x + 100;
      const angle = j + j*j / 50;
      return {
        center: [x, y],
        angle
      };
    }
  }),
];

function Component({width, height, mapper}) {
  const lineCount = 70;
  return range(lineCount)
    .map(mapper)
    .map(({center, angle}, i) => react`
      <${FillingLine}
        key=${i}
        center=${center}
        angle=${angle}
        strokeWidth=${1}
        xBounds=${[0, width]}
        yBounds=${[0, height]}
        />`);
}

export default wrap({
  Component,
  variants,
  defaults
});
