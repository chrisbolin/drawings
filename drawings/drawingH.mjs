import { react } from "../utils/react.mjs";
import { FillingLine, NONE_STROKE } from "../utils/lines.mjs";
import { range } from "../utils/core.mjs";
import { dispearse } from "../utils/random.mjs";

const height = 4;
const width = 6;

export const wrapper = true;

export const variants = [
  function f013() {
    const strokeWidth = 1/45;
    return {
      initialColors: [
        'white',
        'yellow',
        'red', 
        'blue'
      ],
      strokeWidth,
      endMargin: strokeWidth,
      sections: 30,
      strength: section => 4 + 1.2 * section,
      height,
      width
    };
  },
  function f015() {
    const strokeWidth = 1/100;
    return {
      initialColors: [
        NONE_STROKE,
        NONE_STROKE,
        'black',
        NONE_STROKE
      ],
      strokeWidth,
      endMargin: strokeWidth,
      sections: 30,
      strength: section => 4 + 2 * section,
      height,
      width
    };
  },
  function f016() {
    return {
      initialColors: [
        NONE_STROKE,
        NONE_STROKE,
        'black',
        NONE_STROKE,
        NONE_STROKE
      ],
      strokeWidth: 1/100,
      endMargin: 0,
      sections: 30,
      strength: section => 4 + 1.3 * section,
      height,
      width
    };
  }
];

export function Component({
  initialColors, strokeWidth, sections, strength, height, width, endMargin
}) {
  const sectionWidth = width/sections;
  const linesPerSection = Math.round(height/strokeWidth);
  let lineColors = range(linesPerSection)
    .map(i => initialColors[
      Math.floor(i * initialColors.length / linesPerSection)
    ]);
  return range(sections).flatMap(section => {
    const x0 = section * sectionWidth;
    const x1 = (section + 1) * sectionWidth - endMargin;
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