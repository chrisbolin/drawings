import { range, roundTo, sum, toBinary, zip } from "../utils/core.js";
import { CenteredLine } from "../utils/lines.js";
import { shuffle, uniform } from "../utils/random.js";
import { react } from "../utils/react.js";

function f009() {
  return {
    width: 5.5,
    height: 3.5,
    density: 1, 
    strokeWidth: 1/64,
    separation: 1/64,
    fullPalette: [
      'black',
      'firebrick',
      'blue',
      'gold'
    ],
    binaryFilter: binary => sum(binary) >= 3,
  };
}

function f010() {
  return {
    width: 5.5,
    height: 3.5,
    density: 1, 
    strokeWidth: 1/50,
    separation: 1/50,
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
}

const config = f010();

export const width = config.width;
export const height = config.height;

function selectFromArrayWithBinary(array, binary) {
  return zip(array, binary)
  .filter(([element, include]) => include)
  .map(([element]) => element)
}

export function Component(props) {
  const {
    fullPalette, separation, density, strokeWidth, binaryFilter
  } = config; 

  const palettes = shuffle(range(Math.pow(2, fullPalette.length)))
    .map(n => toBinary(n, fullPalette.length))
    .filter(binaryFilter)
    .map(binary => selectFromArrayWithBinary(fullPalette, binary));
  
  const sections = palettes.length;
  const subsections =  Math.round(width / sections / separation);

  console.table({sections, subsections, total: sections*subsections});

  return palettes.flatMap((palette, i) => {
      return shuffle(range(subsections)).map((colorOrder, j) => {
        if (uniform() > density) return null;
        const colorIndex = colorOrder % palette.length;
        const stroke = palette[colorIndex];
        const x = width*(i/sections + j/sections/subsections);
        const y = height / 2;
        // hack for plotting: have all lines of the same color overrun the canvas by the same ammount for easy grouping
        const length = height * (1 + 1 * fullPalette.findIndex(c => c === stroke)/fullPalette.length);
        return {
          sortkey: stroke,
          rendered: react`
          <${CenteredLine}
            key="${i}-${j}"
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