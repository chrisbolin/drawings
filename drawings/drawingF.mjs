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
  function f009() {
    return {
      density: 1, 
      strokeWidth: 1/64,
      fullPalette: [
        'black',
        'firebrick',
        'blue',
        'gold'
      ],
      binaryFilter: binary => sum(binary) >= 3,
    };
  },
  function f010() {
    return {
      density: 1, 
      strokeWidth: 1/50,
      fullPalette: [
        'red',
        'blue',
        'gold',
        'violet',
        'orange',
        'green',
      ],
      binaryFilter: binary => sum(binary) === 4,
    };
  },
  () => {
    const length = 0.6;
    const paletteSize = 3;
    return {
      density: 1, 
      strokeWidth: 1/16,
      height: 4 * 12,
      width: 8 * 12,
      fullPalette: [
        sharpieOilColors.yellow,
        sharpieOilColors.aqua,
        sharpieOilColors.red,
        sharpieOilColors.black,
      ],
      binaryFilter: binary => sum(binary) === paletteSize,
      flength: () => length,
      fy: ({colorIndex, i}) => (1 - length) * ((colorIndex + i) % paletteSize / (paletteSize - 1))
    };
  },
  () => {
    return {
      density: 1, 
      strokeWidth: 1/16,
      height: 3.58 * 12, // each of the 5 sections has the same ratio as the entire piece
      width: 8 * 12,
      fullPalette: [
        sharpieOilColors.yellow,
        sharpieOilColors.aqua,
        sharpieOilColors.black,
        sharpieOilColors.red,
        // sharpieOilColors.orange,
        // sharpieOilColors.limeGreen,
        // sharpieOilColors.magenta,
        // sharpieOilColors.white,
      ],
      binaryFilter: binary => sum(binary) >= 3,
    };
  },
];

function selectFromArrayWithBinary(array, binary) {
  return zip(array, binary)
  .filter(([element, include]) => include)
  .map(([element]) => element)
}

function Component({
  height,
  width,
  fullPalette,
  separation,
  density,
  strokeWidth,
  binaryFilter,
  fy = () => 0,
  flength = () => 1,
}) {
  separation = separation || strokeWidth;

  const palettes = shuffle(range(Math.pow(2, fullPalette.length)))
    .map(n => toBinary(n, fullPalette.length))
    .filter(binaryFilter)
    .map(binary => selectFromArrayWithBinary(fullPalette, binary));
  
  const sections = palettes.length;
  const linesPerSection =  Math.round(width / sections / separation);
  const lines = linesPerSection * sections;

  console.log({lines, sections, linesPerSection});

  return palettes.flatMap((palette, i) => {
      return shuffle(range(linesPerSection)).map((colorOrder, j) => {
        if (uniform() > density) return null;
        const colorIndex = colorOrder % palette.length;
        const stroke = palette[colorIndex];
        const x = width*(i/sections + j/sections/linesPerSection);
        const y = fy({colorIndex, i, j}) * height;
        const length = flength(colorIndex) * height;
        return react`<${SimpleLine}
            key="${i}-${j}"
            start=${[x, y]}
            angle=${90}
            stroke=${stroke}
            length=${length}
            strokeWidth=${strokeWidth}/>`
      })}
    );
}

export default wrap({
  Component,
  defaults,
  variants,
});
