import { range } from "../utils/core.js";
import { CenteredLine } from "../utils/lines.js";
import { react } from "../utils/react.js";

export const width = 600;
export const height = 400;

function f004(i) {
  const j = i + 30;
  const x = j + 40;
  const y = x + 100;
  const angle = j + j*j / 50;
  return {
    center: [x, y],
    angle
  };
}

function f005(i) {
  const x = 300 + i;
  const y = 50 + i*4;
  const angle = i + i*i/30;
  return {
    center: [x, y],
    angle
  };
}

function f006(i) {
  const x = 600;
  const y = 50 + i*4 + i*i/10;
  const angle = i < 30 ? (180 + i/2) : i;
  return {
    center: [x, y],
    angle
  };
}

const drawingFunction = f006;

export function Component(){
  const lineCount = 70;
  return range(lineCount)
    .map(drawingFunction)
    .map(({center, angle}, i) => react`
      <${CenteredLine}
        length=${10000}
        key=${i}
        center=${center}
        angle=${angle}
        strokeWidth=${1}
        />`)
    ;
}