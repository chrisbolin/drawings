import { combinations, range } from "../utils/core.mjs";
import { FillingLine } from "../utils/lines.mjs";
import { uniform } from "../utils/random.mjs";
import { react } from "../utils/react.mjs";

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
    const chooseK = i + 1;
    const boxWidth = sectionWidth / xSections;
    const boxHeight = height / ySections;
    const linesPerBox = Math.round(boxWidth / strokeWidth);
    const palettes = combinations(fullPalette, chooseK);
    let paletteIndex = 0;
    return range(xSections).flatMap(j => range(ySections).flatMap(k => {
      const palette = palettes[paletteIndex];
      paletteIndex++;
      const x0 = (i * sectionWidth) + (j * boxWidth);
      const xBounds = [0, width]; // doesn't matter, as all lines are vertical
      const yBounds = [
        k * boxHeight, // all sections start boxes at the top, y=0
        (k + 1) * boxHeight
      ];
      console.log({chooseK, palette, j, k});
      return range(linesPerBox).flatMap(l => {
        const stroke = palette[uniform(0, palette.length, 1)];
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