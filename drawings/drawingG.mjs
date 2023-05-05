import { combinations, groupReduce, range } from "../utils/core.mjs";
import { FillingLine, CenteredLine } from "../utils/lines.mjs";
import { sample, uniform } from "../utils/random.mjs";
import { react } from "../utils/react.mjs";
import wrap from "../utils/wrap.mjs";


const defaults = {
  height: 4,
  width: 6,
};

const variants = [
  function $011g(){
    return {
      fullPalette: [
        'red',
        'blue',
        'yellow',
        'purple',
        'orange',
        'green',
      ],
      startK: 1,
    }
  },
  function $012g(){
    return {
      fullPalette: [
        'red',
        'blue',
        'yellow',
        'purple',
        'orange',
        'green',
      ],
      startK: 2,
    }
  }, 
  function $013g(){
    return {
      fullPalette: [
        'blue',
        'red',
        'orange',
        'gold',
      ],
      startK: 2,
    }
  }
];


function Component({ fullPalette, startK, width, height }) {
  const strokeWidth = 1/45;
  const sections = fullPalette.length + 1 - startK;
  const sectionWidth = width / sections; 
  const groups = range(sections).flatMap((iSection) => {
    const chooseK = iSection + startK;
    const palettes = combinations(fullPalette, chooseK);
    const ySections = palettes.length;
    const boxWidth = sectionWidth;
    const boxHeight = height / ySections;
    const linesPerBox = Math.round(boxWidth / strokeWidth);
    let paletteIndex = 0;
    return range(ySections).flatMap(iSubsection => {
      const palette = palettes[paletteIndex];
      paletteIndex++;
      const x0 = (iSection * sectionWidth);
      const xBounds = [0, width]; // doesn't matter, as all lines are vertical
      const yBounds = [
        iSubsection * boxHeight, // all sections start boxes at the top, y=0
        (iSubsection + 1) * boxHeight - strokeWidth
      ];
      return sample(palette, linesPerBox).flatMap((stroke, iLine) => {
        const x = x0 + iLine * strokeWidth;
        const center = [x, 0]; // y doesn't matter, as all lines are vertical

        return react`<${FillingLine}
          key="${iSection}.${iSubsection}.${iLine}"
          center=${center}
          xBounds=${xBounds}
          yBounds=${yBounds}
          angle=${90}
          stroke=${stroke}
          strokeWidth=${strokeWidth}
        />`;
      });
    })
  }).reduce(...groupReduce(el => el.props.stroke));

  return Object.entries(groups)
    .map(([groupKey, group], i) => {
      const id = `${i}-${groupKey}`;
      return react`<g id=${id} key=${id}>
        ${group}
      </g>`;
    });
}

export default wrap({
  Component,
  defaults,
  variants,
});
