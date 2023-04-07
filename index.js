import React from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

import Drawing1 from "./drawings/drawing1.js";

ReactDOM.render(
  html`<${Drawing1}/>`,
  document.getElementById("root")
);