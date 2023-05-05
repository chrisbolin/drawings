import React from "../external/es-react/react.js";
import ReactDOM from "../external/es-react/react-dom.js";
import htm from "../external/htm.module.js";

const react = htm.bind(React.createElement);

export { React, ReactDOM, react };