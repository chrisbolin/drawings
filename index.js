import { react, ReactDOM } from "./utils/react.js";

import Drawing1 from "./drawings/drawing1.js";
import Drawing2 from "./drawings/drawing2.js";

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

ReactDOM.render(
  react`
    <div style=${divStyle}>
      <svg viewBox="0 0 400 400" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
        <${Drawing2}/>
      </svg>
    </div>
  `,
  document.getElementById("root")
);