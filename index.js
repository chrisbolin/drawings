import { React, react, ReactDOM } from "./utils/react.mjs";
import { groupReduce } from "./utils/core.mjs";
import context from "./utils/context.mjs";
import drawings from "./drawings/drawings.js";
import Menu from "./menu.mjs";

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
  const [counter, setCounter] = React.useState(0);
  const [drawingIndex, _setDrawingIndex] = React.useState(0);
  const [variantIndex, setVariantIndex] = React.useState(0);
  const refreshApp = () => setCounter(counter + 1);
  const setDrawingIndex = i => {
    setVariantIndex(0); // always zero out variants
    _setDrawingIndex(i);
  };

  const drawing = drawings[drawingIndex];
  const variant = drawing.variants[variantIndex];

  return react`
    <div style=${appStyle}>
      <${Wrapper} drawing=${drawing} variant=${variant}/>
      <${Menu}
        refreshApp=${refreshApp}
        drawings=${drawings}
        drawingIndex=${drawingIndex}
        setDrawingIndex=${setDrawingIndex}
        variantIndex=${variantIndex}
        setVariantIndex=${setVariantIndex}
      />
    </div>
  `
}

ReactDOM.render(react`<${App}/>`, document.getElementById("app"));