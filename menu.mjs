import { React, react } from "./utils/react.mjs";

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

function A({href='#', ...otherProps}) {
  return react`<a href="#" ...${otherProps}/>`;
}

const menuToggleStyle = {
  position: 'fixed',
  top: '0',
  right: '0',
  width: '3vw',
  height: '3vh',
  zIndex: 1,
  cursor: 'pointer'
}

const menuStyle = (menuShown) => ({
  backgroundColor: 'white',
  padding: '25px',
  border: '1px dashed black',
  position: 'fixed',
  top: '3vw',
  right: '3vh',
  zIndex: 1,
  lineHeight: 2,
  display: menuShown ? 'block' : 'none'
});

function MenuItem({text, onClick, active = true}) {
  if (!active) return react`<div children=${text}/>`;
  return react`<div>
    <${A} onClick=${onClick} children=${text}/>
  </div>`;
}

export default function Menu({
  refreshApp, drawings, drawingIndex, setDrawingIndex, variantIndex, setVariantIndex
}) {
  const [menuShown, setMenuShown] = React.useState(true);
  const toggleMenu = () => setMenuShown(!menuShown);

  const activeDrawing = drawings[drawingIndex];

  return react`<div>
    <div style=${menuToggleStyle} onClick=${toggleMenu} />
    <div style=${menuStyle(menuShown)}>
      <div><a onClick=${refreshApp} href="#">refresh</a></div>
      <div><a onClick=${launchDownload} href="#">download</a></div>
      ${
        drawings.map((drawing, i) => react`
        <${MenuItem}
        key=${i}
        text="drawing ${drawing.name}"
        active=${i !== drawingIndex}
        onClick=${() => setDrawingIndex(i)}
        />
        `)
      }
      ${
        activeDrawing.variants.length > 1
        && activeDrawing.variants.map((variant, i) => react`
          <${MenuItem}
            key=${i}
            text="variant ${i}"
            active=${i !== variantIndex}
            onClick=${() => setVariantIndex(i)}
            />
        `)
      }
      </div>
  </div>
  `
}
