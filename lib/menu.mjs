import { getUrl, isCurrentLocation } from "./navigator.mjs";
import { React, react } from "./react.mjs";

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

function MenuItem({text, onClick, href}) {
  const children = isCurrentLocation(href) ? react`<b>${text}</b>` : text;
  return react`<div>
    <a onClick=${onClick} href=${href || location.href}>${children}</a>
  </div>`;
}

export default function Menu({
  refreshApp, drawings, drawingIndex, variantIndex, invertColors
}) {
  const [menuShown, setMenuShown] = React.useState(true);
  const toggleMenu = () => setMenuShown(!menuShown);

  const activeDrawing = drawings[drawingIndex];

  return react`<div>
    <div style=${menuToggleStyle} onClick=${toggleMenu} />
    <div style=${menuStyle(menuShown)}>
      ${
        drawings.map((drawing, i) => react`
          <${MenuItem}
            key=${i}
            text="drawing ${drawing.name}"
            href=${getUrl({drawingIndex: i})}
            onClick=${refreshApp}
          />
        `)
      }
      ${
        activeDrawing.variants.length > 1
        && activeDrawing.variants.map((_, i) => react`
          <${MenuItem}
            key=${i}
            text="variant ${i}"
            active=${i !== variantIndex}
            href=${getUrl({drawingIndex, variantIndex: i})}
            onClick=${refreshApp}
          />
        `)
      }
      <${MenuItem} text="refresh" onClick=${refreshApp}/>
      <${MenuItem} text="download" onClick=${launchDownload}/>
      <${MenuItem} text="invert" onClick=${invertColors}/>
      </div>
  </div>
  `
}
