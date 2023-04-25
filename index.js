import { React, react, ReactDOM } from "./utils/react.mjs";

import * as drawingA from "./drawings/drawingA.js";
import * as drawingB from "./drawings/drawingB.js";
import * as drawingC from "./drawings/drawingC.js";
import * as drawingD from "./drawings/drawingD.js";
import * as drawingE from "./drawings/drawingE.js";
import * as drawingF from "./drawings/drawingF.js";
import * as drawingG from "./drawings/drawingG.js";

const drawing = drawingG;

const divStyle = {
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
    backgroundColor: menuShown ? 'lightgrey' : 'transparent',
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

function App() {
  const [counter, setCounter] = React.useState(0);
  const refreshApp = () => setCounter(counter + 1);
  return react`
    <div style=${divStyle}>
      <svg id="mainDrawing" viewBox="0 0 ${drawing.width} ${drawing.height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
        <${drawing.Component}/>
      </svg>
      <${Menu} refreshApp=${refreshApp}/>
    </div>
  `
}

ReactDOM.render(react`<${App}/>`, document.getElementById("app"));