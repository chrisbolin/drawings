import { react } from "../utils/react.mjs";
import { FillingLine } from "../utils/lines.mjs";
import { range } from "../utils/core.mjs";
import { dispearse } from "../utils/random.mjs";

export const height = 4;
export const width = 6;

const initialColors = [
  'white',
  'yellow',
  'red', 
  'blue'
];
const strokeWidth = 1/45;
const sections = 30;
const strength = section => 4 + 1.2 * section;

export function Component(props) {
  const sectionWidth = width/sections;
  const linesPerSection = Math.round(height/strokeWidth);
  let lineColors = range(linesPerSection)
    .map(i => initialColors[
      Math.floor(i * initialColors.length / linesPerSection)
    ]);
  return range(sections).flatMap(section => {
    const x0 = section * sectionWidth;
    const x1 = (section + 1) * sectionWidth - strokeWidth;
    const lines = lineColors.map((stroke, line) => {
      const y = line * strokeWidth;
      return react`
        <${FillingLine}
          key="${section}.${line}"
          center=${[0, y]}
          angle=${0}
          stroke=${stroke}
          strokeWidth=${strokeWidth}
          xBounds=${[x0, x1]}
          yBounds=${[0,height]}
        />
      `;
    });
    lineColors = dispearse(lineColors, strength(section));
    return lines;
  });
}