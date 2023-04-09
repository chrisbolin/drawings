import { react } from "./react.js";

export function CenteredLine({length, center, angle, stroke = 'black', strokeWidth}) {
  return react`<line
    x1="0"
    y1="0"
    x2="${length}"
    y2="0"
    stroke="${stroke}"
    strokeWidth="${strokeWidth}"
    transform="translate(${center[0]-length/2} ${center[1]}) rotate(${angle} ${length/2} 0)"
  />`;
}