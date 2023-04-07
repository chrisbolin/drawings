import React from "https://unpkg.com/es-react@latest/dev/react.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

export function CenteredLine({length, center, angle}) {
  return html`<line
    x1="0"
    y1="0"
    x2="${length}"
    y2="0"
    stroke="black"
    strokeWidth="5"
    transform="translate(${center[0]-length/2} ${center[1]}) rotate(${angle} ${length/2} 0)"
  />`;
}