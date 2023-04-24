import { range } from "../utils/core.js";
import { FillingLine } from "../utils/lines.js";
import { uniform } from "../utils/random.js";
import { react } from "../utils/react.js";

export const height = 4;
export const width = 6;

const sections = [
  [2, 3], // 6
  [3, 5], // 15
  [4, 5], // 20
  [3, 5], // 15
  [2, 3], // 6
  [1, 1], // 1
];

const fullPalette = [
  'red',
  'blue',
  'gold',
  'violet',
  'orange',
  'green',
];

const strokeWidth = 0.02;

export function Component(props) {
  const sectionWidth = width / sections.length; 
  return sections.flatMap(([xSections, ySections], i) => {
    const boxWidth = sectionWidth / xSections;
    const boxHeight = height / ySections;
    const linesPerBox = Math.round(boxWidth / strokeWidth);
    return range(xSections).flatMap(j => range(ySections).flatMap(k => {
      const x0 = (i * sectionWidth) + (j * boxWidth);
      const xBounds = [0, width]; // doesn't matter, as all lines are vertical
      const yBounds = [
        k * boxHeight, // all sections start boxes at the top, y=0
        (k + 1) * boxHeight
      ];
      const stroke = fullPalette[uniform(0, fullPalette.length, 1)];
      return range(linesPerBox).flatMap(l => {
        const x = x0 + l * strokeWidth;
        const center = [x, 0]; // y doesn't matter, as all lines are vertical
        return react`<${FillingLine}
          key="${i}.${j}.${k}.${l}"
          center=${center}
          xBounds=${xBounds}
          yBounds=${yBounds}
          angle=${90}
          stroke=${stroke}
          strokeWidth=${strokeWidth}
        />`;
      });
    }))
  });
}