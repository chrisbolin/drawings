import { React, react, ReactDOM } from "./utils/react.mjs";
import { groupReduce } from "./utils/core.mjs";
import context from "./utils/context.mjs";

import * as drawingTemplate from "./drawings/drawing.mjs";
import drawingA from "./drawings/drawingA.mjs";
// import drawingB from "./drawings/drawingB.mjs";
// import drawingC from "./drawings/drawingC.mjs";
// import drawingD from "./drawings/drawingD.mjs";
// import drawingE from "./drawings/drawingE.mjs";
// import drawingF from "./drawings/drawingF.mjs";
// import drawingG from "./drawings/drawingG.mjs";
import drawingH from "./drawings/drawingH.mjs";
// import drawingI from "./drawings/drawingI.mjs";

const drawing = drawingH;

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

function launchDownload() {
  const svgXML = document.getElementById('mainDrawing').outerHTML;
  // Construct the <a> element
  var link = document.createElement("a");
  link.download = 'download.svg';
  // Construct the uri
  var uri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXML)
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  // Cleanup the DOM
  document.body.removeChild(link);
}

function Menu({refreshApp}) {
  const [menuShown, setMenuShown] = React.useState(true);
  
  function toggleMenu() { setMenuShown(!menuShown); }
  const menuToggleStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    width: '3vw',
    height: '3vh',
    zIndex: 1,
    cursor: 'pointer'
  }
  const menuStyle = {
    backgroundColor: 'white',
    padding: '25px',
    border: '1px dashed black',
    position: 'fixed',
    top: '3vw',
    right: '3vh',
    zIndex: 1,
    lineHeight: 2,
    display: menuShown ? 'block' : 'none'
  };
  return react`<div>
    <div style=${menuToggleStyle} onClick=${toggleMenu} />
    <div style=${menuStyle}>
      <div><a onClick=${refreshApp} href="#">refresh</a></div>
      <div><a onClick=${launchDownload} href="#">download</a></div>
    </div>
  </div>
  `
}

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

function Wrapper({ drawing }) {
  const variant = drawing.variants[drawing.variants.length - 1];
  const settings = variant();
  return react`
    <${context.Provider} value=${settings}>
      <${SVG} width=${settings.width} height=${settings.height}>
      <${drawing.Component} ...${settings}/>
      </${SVG}>
    </${context.Provider}>
  `;
}

function App() {
  const [counter, setCounter] = React.useState(0);
  const refreshApp = () => setCounter(counter + 1);
  return react`
    <div style=${appStyle}>
      <${Wrapper} drawing=${drawing} />
      <${Menu} refreshApp=${refreshApp} drawing=${drawing} />
    </div>
  `
}

ReactDOM.render(react`<${App}/>`, document.getElementById("app"));