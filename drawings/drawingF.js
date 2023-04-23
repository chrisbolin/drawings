import { range, roundTo, sum, toBinary, zip } from "../utils/core.js";
import { CenteredLine } from "../utils/lines.js";
import { shuffle, uniform } from "../utils/random.js";
import { react } from "../utils/react.js";

export const width = 5.5;
export const height = 3.5;

const strokeWidth = 1/64;
const separation = 1/60;

const sections = 5;
const density = 1;

const subsections =  Math.round(width / sections / separation);

const COLORS = [
  'black',
  'firebrick',
  'blue',
  'gold'
];

function selectFromArrayWithBinary(array, binary) {
  return zip(array, binary)
    .filter(([element, include]) => include)
    .map(([element, include]) => element)
}

export function Component(props) {
   return shuffle(range(16))
    .map(n => toBinary(n, 4))
    .filter(binary => sum(binary) > 2)
    .flatMap((binary, i) => {
      const colors = selectFromArrayWithBinary(COLORS, binary);
      return shuffle(range(subsections)).map((colorOrder, j) => {
        if (uniform() > density) return null;
        const colorIndex = colorOrder % colors.length;
        const stroke = colors[colorIndex];
        const x = width*(i/sections + j/sections/subsections);
        const y = height / 2;
        const length = height * (1 + colorIndex/4);
        return {
          sortkey: stroke,
          rendered: react`
          <${CenteredLine}
            key="${i}${j}"
            center=${[x, y]}
            angle=${90}
            stroke=${stroke}
            length=${length}
            strokeWidth=${strokeWidth}/>
        `}
      })}
    ).sort((a, b) => b.sortkey > a.sortkey)
    .map(item => item.rendered)
}