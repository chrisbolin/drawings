import { React, react, ReactDOM } from "./utils/react.js";

import * as drawingA from "./drawings/drawingA.js";
import * as drawingB from "./drawings/drawingB.js";
import * as drawingC from "./drawings/drawingC.js";
import * as drawingD from "./drawings/drawingD.js";
import * as drawingE from "./drawings/drawingE.js";
import * as drawingF from "./drawings/drawingF.js";

const drawing = drawingF;

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

function DownloadLink() {
  const html = document.getElementById('mainDrawing').outerHTML;
  const href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(html);
  return react`<a download href=${href}>download</a>`;
}

function Menu({refreshApp}) {
  const [menuShown, setMenuShown] = React.useState(false);
  function toggleMenu() { setMenuShown(!menuShown); console.log(menuShown); }
  const menuToggleStyle = {
    position: 'fixed',
    top: '0',
    right: '0',
    width: '10vw',
    height: '10vh',
    zIndex: 1,
    cursor: 'context-menu'
  }
  const menuStyle = {
    backgroundColor: 'white',
    padding: '25px',
    border: '5px black',
    position: 'absolute',
    top: '5vw',
    right: '5vh',
    zIndex: 1,
    lineHeight: 2,
    display: menuShown ? 'block' : 'none'
  };
  return react`<div>
    <div style=${menuToggleStyle} onClick=${toggleMenu} />
    <div style=${menuStyle}>
      <div><a onClick=${() => refreshApp() && false} href="#">refresh</a></div>
      <div>${menuShown ? DownloadLink() : false}</div>
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