import React from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

function range(n) {
  return Array.apply(null, Array(n))
    .map((_, i) => i);
}

function uniform(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

function uniformSum(n, min = 0, max = 1) {
  if (!(n >= 1)) throw new Error('n must be 1 or greater.'); // use ! >= to catch non-numbers

  let subtotal = 0;
  for (let i = 0; i < n; i++) {
    subtotal = subtotal + uniform();
  }
  const normalized = subtotal / n; // normalize
  return normalized * (max - min) + min;
}

function CenteredLine({length, center, angle}) {
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

function Drawing1(props) {
  const height = 400;
  const width = 400;
  const lineLength = 100;
  const lineCount = 50;

  const divStyle = {
    backgroundColor: 'lightgrey',
    width: '100vw',
    height: '100vh'
  };
  const svgStyle = {
    // border: '20px solid black',
    backgroundColor: 'white',
    width: '90vw',
    maxHeight: '90vh',
    maxWidth: '90vw',
    display: 'block',
    position: 'absolute',
    top: '5vw',
    left: '5vw',
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

ReactDOM.render(
  html`<${Drawing1}/>`,
  document.getElementById("root")
);