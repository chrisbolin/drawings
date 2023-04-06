import React from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

const Drawing1 = (props) => {
  const style = {
    border: '2px solid black',
    width: '90vw',
    maxHeight: '90vh',
    maxWidth: '90vw',
    display: 'block',
    margin: 'auto'
  }
  return html`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style=${style}>
    <line x1="5" y1="5" x2="595" y2="395" stroke="black" />
  </svg>`;
}
// Standard postcards are usually made of paper,
// are between 5" to 6" long and 3-1/2" to 4-1/4" high,
// and are between 0.007" and 0.016" thick.

ReactDOM.render(
  html`<${Drawing1}/>`,
  document.getElementById("root")
);