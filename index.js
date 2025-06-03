import { React, react, ReactDOM } from "./lib/react.mjs";
import { groupReduce } from "./lib/core.mjs";
import context from "./lib/context.mjs";
import drawings from "./drawings/drawings.js";
import Menu from "./lib/menu.mjs";
import { getIndexes, listen } from "./lib/navigator.mjs";
import { SVGComment } from "./lib/comment.mjs";

let DEBUG = false;
// DEBUG = true;

const debugLog = (...items) => {
  if (DEBUG) {
    console.log(...items);
  }
}

const appStyle = ({invertedColors = false}) => ({
  backgroundColor: 'lightgrey',
  width: '100vw',
  height: '100vh',
  fontFamily: 'monospace',
  filter: invertedColors ? 'invert()' : 'none',
});
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
  return react`
    <svg id="mainDrawing" viewBox="0 0 ${width} ${height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
      ${children}
    </svg>
  `;
}

const Wrapper = React.memo(({ drawing, variant, variantIndex, uuid }) => {
  const v = variant();
  debugLog(v);
  const commentObject = {
    name: drawing.name,
    variantIndex,
    about: v.about
  };
  return react`
    <${context.Provider} value=${v}>
      <${SVG} width=${v.width} height=${v.height}>
        <${SVGComment}>${commentObject}</${SVGComment}>
        <${drawing.Component} ...${v}/>
      </${SVG}>
    </${context.Provider}>
  `;
});

function prefersDarkMode() {
  return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function makeKeyHandler({ redraw, toggleMenu }) {
  return (event) => {
    switch (event.key) {
      case 'r':
        redraw();
        break;
      case 'm':
        toggleMenu();
        break;
    }
  };
}

function App() {
  const initialIndexes = getIndexes() || {drawingIndex: 0, variantIndex: 0};
  const [counter, setCounter] = React.useState(0);
  const [invertedColors, setInvertedColors] = React.useState(prefersDarkMode());
  const [drawingIndex, setDrawingIndex] = React.useState(initialIndexes.drawingIndex);
  const [variantIndex, setVariantIndex] = React.useState(initialIndexes.variantIndex);
  const [menuShown, setMenuShown] = React.useState(true);
  
  const toggleMenu = () => setMenuShown(!menuShown);
  const redraw = () => setCounter(counter + 1);
  const invertColors = () => setInvertedColors(!invertedColors);

  React.useEffect(() => {
    listen(indexes => {
      setVariantIndex(indexes.variantIndex);
      setDrawingIndex(indexes.drawingIndex);
    });
  }, []);

  const drawing = drawings[drawingIndex];
  const variant = drawing.variants[variantIndex];

  return react`
    <div
      style=${appStyle({ invertedColors })}
      onKeyDown=${makeKeyHandler({ redraw, toggleMenu })}
      tabIndex="1"
    >
      <${Wrapper}
        drawing=${drawing}
        variantIndex=${variantIndex}
        variant=${variant}
        uuid=${counter}
      />
      <${Menu}
        redraw=${redraw}
        menuShown=${menuShown}
        toggleMenu=${toggleMenu}
        invertColors=${invertColors}
        drawings=${drawings}
        drawingIndex=${drawingIndex}
        variantIndex=${variantIndex}
      />
    </div>
  `
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(react`<${App}/>`);

