import { range } from "../utils/core.mjs";
import { Polyline } from "../utils/lines.mjs";
import { react } from "../utils/react.mjs";
import wrap from "../utils/wrap.mjs";

const defaults = {
  width: 400,
  height: 400,
};

function Component({ height, width }){
  const sideLength = 40;
  const points = range(7)
    .map(i => -i * 2 * Math.PI / 7) // angles
    .reduce((acc, _, i, angles) => {
      acc.push(angles[[0, 1, 6, 2, 5, 3, 4][i]]);
      return acc;
    }, [])
    .reduce((acc, angle) => {
      const [x0, y0] = acc[acc.length - 1];
      const dy = sideLength * Math.sin(angle);
      const dx = sideLength * Math.cos(angle);
      acc.push([x0 + dx, y0 + dy]);    
      return acc;
    }, [[100, 100]]);

  return react`<${Polyline}
    points="${points}"
    stroke="black"
    centerX=${width/2}
    centerY=${height/2}
  />`;
}

export default wrap({
  Component,
  defaults
});
