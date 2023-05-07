import { React, react, ReactDOM } from "./lib/react.mjs";
import { groupReduce } from "./lib/core.mjs";
import context from "./lib/context.mjs";
import drawings from "./drawings/drawings.js";
import Menu from "./lib/menu.mjs";
import { getIndexes, listen } from "./lib/navigator.mjs";

let DEBUG = false;
// DEBUG = true;

const debugLog = (...items) => {
  if (DEBUG) {
    console.log(...items);
  }
}

const appStyle = {
  backgroundColor: 'lightgrey',
  width: '100vw',
  height: '100vh',
  fontFamily: 'monospace',
  filter: 'invert()',
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

function groupByStroke(renderedElements) {
  if (!renderedElements.length) return renderedElements;
  return Object.entries(
    renderedElements
      .reduce(...groupReduce(el => el?.props?.stroke || 'none'))
  ).map(([groupKey, group], i) => {
    const id = `${i}-${groupKey}`;
    return react`<g id=${id} key=${id}>
      ${group}
    </g>`;
  });
}

function SVG({ width, height, children }) {
  const groupedChildren = groupByStroke(children);
  return react`
    <svg id="mainDrawing" viewBox="0 0 ${width} ${height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
      ${groupedChildren}
    </svg>
  `;
}

function Wrapper({ drawing, variant }) {;
  const v = variant();
  debugLog(v);
  return react`
    <${context.Provider} value=${v}>
      <${SVG} width=${v.width} height=${v.height}>
      <${drawing.Component} ...${v}/>
      </${SVG}>
    </${context.Provider}>
  `;
}

function App() {
  const initialIndexes = getIndexes() || {drawingIndex: 0, variantIndex: 0};
  const [counter, setCounter] = React.useState(0);
  const [drawingIndex, setDrawingIndex] = React.useState(initialIndexes.drawingIndex);
  const [variantIndex, setVariantIndex] = React.useState(initialIndexes.variantIndex);
  const refreshApp = () => setCounter(counter + 1);

  React.useEffect(() => {
    listen(indexes => {
      setDrawingIndex(indexes.drawingIndex);
      setVariantIndex(indexes.variantIndex);
    });
  }, []);

  const drawing = drawings[drawingIndex];
  const variant = drawing.variants[variantIndex];

  return react`
    <div style=${appStyle}>
      <${Wrapper} drawing=${drawing} variant=${variant}/>
      <${Menu}
        refreshApp=${refreshApp}
        drawings=${drawings}
        drawingIndex=${drawingIndex}
        variantIndex=${variantIndex}
      />
    </div>
  `
}

ReactDOM.render(react`<${App}/>`, document.getElementById("app"));
