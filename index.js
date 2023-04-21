import { React, react, ReactDOM } from "./utils/react.js";

import * as drawingA from "./drawings/drawingA.js";
import * as drawingB from "./drawings/drawingB.js";
import * as drawingC from "./drawings/drawingC.js";
import * as drawingD from "./drawings/drawingD.js";

const drawing = drawingC;

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
  const downloadLinkStyle = {
    position: 'absolute',
    top: '10vw',
    left: '10vh',
    zIndex: 1,
  };
  const filename = '004download.svg';
  const html = document.getElementById('mainDrawing').outerHTML;
  const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(html);
  return react`<a style=${downloadLinkStyle} href=${href} download=${filename}>download me</a>`;
}

function Menu() {
  const [menuShown, setMenuShown] = React.useState(false);
  function toggleMenu() { setMenuShown(!menuShown); console.log(menuShown); }
  const menuStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: 1,
  }
  return react`<div style=${menuStyle} onClick=${toggleMenu}>
    ${menuShown ? DownloadLink() : false}
  </div>
  `
}

function App() {
  return react`
    <div style=${divStyle}>
      <svg id="mainDrawing" viewBox="0 0 ${drawing.width} ${drawing.height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
        <${drawing.Component}/>
      </svg>
      <${Menu}/>
    </div>
  `
}

ReactDOM.render(react`<${App}/>`, document.getElementById("app"));