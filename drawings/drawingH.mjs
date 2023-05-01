import { react } from "../utils/react.mjs";
import { FillingLine, NONE_STROKE } from "../utils/lines.mjs";
import { range } from "../utils/core.mjs";
import { dispearse } from "../utils/random.mjs";

export const height = 4;
export const width = 6;

function f013() {
  return {
    initialColors: [
      'white',
      'yellow',
      'red', 
      'blue'
    ],
    strokeWidth: 1/45,
    sections: 30,
    strength: section => 4 + 1.2 * section,
  };
};

function f014() {
  return {
    initialColors: [
      NONE_STROKE,
      NONE_STROKE,
      'black',
      NONE_STROKE
    ],
    strokeWidth: 1/100,
    sections: 30,
    strength: section => 4 + 2 * section,
  };
};


const variant = f014();

export function Component(props) {
  const {initialColors, strokeWidth, sections, strength} = variant;
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