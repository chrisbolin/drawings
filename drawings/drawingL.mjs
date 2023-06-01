import { range, roundTo, sum, toBinary, zip } from "../lib/core.mjs";
import { CenteredLine, SimpleLine } from "../lib/lines.mjs";
import { shuffle, uniform } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

import { sharpieOilColors } from "../lib/pens.mjs";

const defaults = {
  width: 5.5,
  height: 3.5,
};

const variants = [
  () => {
    return {
      repeats: 0.5,
      entities: [
        {
          stroke: 'yellow',
          count: 71,
        },
        {
          stroke: 'red',
          count: 67,
        },
        {
          stroke: 'blue',
          count: 61,
        },
        {
          stroke: 'black',
          count: 59,
        },
      ],
    };
  },
  () => {
    return {
      repeats: 0.5,
      entities: [
        {
          count: 53,
        },
        {
          count: 43,
        },
        {
          count: 37,
        },
        {
          count: 31,
        },
      ],
    };
  },
];

function Component({
  height = 4,
  width = 6,
  strokeWidth = 1/50,
  repeats,
  entities,
}) {
  return entities.flatMap(({ stroke = 'black', count }, iEntity) => {
    return range(count).flatMap(iCount => {
      return range(Math.ceil(repeats)).flatMap(iRepeat => {
        const sectionWidth = width/repeats;
        const period = sectionWidth / count;
        const x = (sectionWidth * iRepeat) + (period * iCount);
        return react`
          <${SimpleLine}
            key="${iEntity}.${iCount}.${iRepeat}"
            start=${[x, 0]}
            angle=${90}
            stroke=${stroke}
            length=${height}
            strokeWidth=${strokeWidth}
          />`;
      });
    });
  });
}

export default wrap({
  Component,
  defaults,
  variants,
});
