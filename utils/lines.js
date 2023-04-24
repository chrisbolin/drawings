import { inRange, unique } from "./core.js";
import { react } from "./react.js";

export function CenteredLine({length, center, angle, strokeWidth = 1, stroke = 'black'}) {
  return react`<line
    x1="0"
    y1="0"
    x2="${length}"
    y2="0"
    stroke="${stroke}"
    strokeWidth="${strokeWidth}"
    transform="translate(${center[0]-length/2} ${center[1]}) rotate(${angle} ${length/2} 0)"
  />`;
}

export function FillingLine({center, angle, xBounds, yBounds, strokeWidth = 1, stroke = 'black'}) {
  const [x0, y0] = center;
  const m = Math.tan(angle / 180 * Math.PI); // slope

  let points = [];
  // try xBounds, the vertical boundary lines
  xBounds.forEach(x1 => {
    const y1 = m * (x1 - x0) + y0;
    points.push([x1, y1]);
  });
  // try yBounds, the horizontal boundary line
  yBounds.forEach(y1 => {
    const x1 = (y1 - y0)/m + x0;
    points.push([x1, y1]);
  });

  points = unique(points).filter(([x, y]) => inRange(x, ...xBounds) && inRange(y, ...yBounds));
  if (points.length < 2) throw new Error(`FillingLine error. Too few points. ${points.map(String)}`);
  if (points.length > 2) throw new Error(`FillingLine error. Too many points. ${points.map(String)}`);

  return react`<line
    x1=${points[0][0]}
    y1=${points[0][1]}
    x2=${points[1][0]}
    y2=${points[1][1]}
    stroke="${stroke}"
    strokeWidth="${strokeWidth}"
  />`;
}