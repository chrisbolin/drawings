import React from "https://unpkg.com/es-react@latest/dev/react.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

import { CenteredLine } from "../utils/lines.js";
import { uniformSum } from "../utils/random.js";
import { range } from "../utils/core.js";

function RandomLine({length, xMax, yMax}) {
  const center = [
    xMax * uniformSum(1),
    yMax * uniformSum(1)
  ];
  const angle = 360 * Math.random();

  return CenteredLine({
    length,
    center,
    angle
  })
}

export default function Drawing1(props) {
  const height = 400;
  const width = 400;
  const lineLength = 100;
  const lineCount = 1000;

  const divStyle = {
    backgroundColor: 'lightgrey',
    width: '100vw',
    height: '100vh'
  };
  const svgStyle = {
    // border: '20px solid black',
    backgroundColor: 'white',
    width: '98vw',
    maxHeight: '90vh',
    display: 'block',
    position: 'absolute',
    top: '1vw',
    left: '1vw',
    boxSizing: 'border-box'
  };

  const rendered = range(lineCount)
    .map(i => html`<${RandomLine} length=${lineLength} key=${i} xMax=${width} yMax=${height}/>`);

  return html`
  <div style=${divStyle}>
    <svg viewBox="0 0 ${width} ${height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
      ${rendered}
    </svg>
  </div>
  `;
}