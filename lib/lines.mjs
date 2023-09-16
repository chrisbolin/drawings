import context from "./context.mjs";
import { inRange, unique, range, toRadians } from "./core.mjs";
import { React, react } from "./react.mjs";
import vector from "./vector.mjs";

export const NONE_STROKE = 'none';

export function CenteredLine({length, center, angle, strokeWidth = 1, stroke = 'black'}) {
  if (stroke === NONE_STROKE) return false;
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

export function SimpleLine({length, start, angle, strokeWidth = 1, stroke = 'black'}) {
  const [x0, y0] = start;
  if (stroke === NONE_STROKE) return false;
  return react`<line
    x1=${x0}
    y1=${y0}
    x2=${x0 + length}
    y2=${y0}
    stroke="${stroke}"
    strokeWidth="${strokeWidth}"
    transform="rotate(${angle} ${x0} ${y0})"
  />`; 
}

function dParamMultiline(lines) {
  // Iterate through the lines and generate the "d" parameter string
  return lines
    .map((line) =>
      line
        .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.join(' ')}`)
        .join(' ')
    )
    .join(' ');
}

export function PointToPointMultilines({lines, strokeWidth = 1, stroke = 'black'}) {
  if (stroke === NONE_STROKE) return false;
  return react`<path
    d=${dParamMultiline(lines)}
    stroke="${stroke}"
    strokeWidth="${strokeWidth}"
  />`; 
}

export function FillingLine({center, angle, xBounds, yBounds, strokeWidth, stroke = 'black'}) {
  if (stroke === NONE_STROKE) return false;

  const ctx = React.useContext(context);

  xBounds = xBounds || [0, ctx.width];
  yBounds = yBounds || [0, ctx.height];
  strokeWidth = strokeWidth || ctx.strokeWidth
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
  if (points.length < 2) return false;
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

export function centerOfMass(points) {
  const n = points.length;
  const [sumX, sumY] = points.reduce(
    (sum, point, i) => [sum[0] + point[0], sum[1] + point[1]],
    [0, 0]);
  return [sumX / n, sumY / n];
}

export function boundingBox(points) {
  let minX = points[0][0];
  let maxX = points[0][0];
  let minY = points[0][1];
  let maxY = points[0][1];

  // Find the minimum and maximum x and y values among the points
  for (const point of points) {
    const [x, y] = point;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  // Create the bounding box as an array of four points
  return [
    [minX, minY], // Bottom-left corner
    [maxX, minY], // Bottom-right corner
    [maxX, maxY], // Top-right corner
    [minX, maxY], // Top-left corner
  ];
}

export function translateByReferences(points, oldRefPoint, newRefPoint) {
  const delta = vector.subtract(newRefPoint, oldRefPoint);
  return points.map(point => vector.add(point, delta));
}

export function centerPointsByMass(points, newCenter) {
  const currentCenter = centerOfMass(points);
  return translateByReferences(points, currentCenter, newCenter);
}

export function centerPointsByBounds(points, newCenter) {
  const box = boundingBox(points);
  const bottomLeft = box[0];
  const topRight = box[2];
  const currentCenter = vector.midpoint(bottomLeft, topRight);
  return translateByReferences(points, currentCenter, newCenter);
}

export function distance(p0, p1) {
  const [dx, dy] = vector.subtract(p1, p0);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

export function triangle([x, y], radius) {
  return range(3).map(axis => {
    const axisAngle = 30 + 120 * axis;
    return [
      x + radius * Math.cos(toRadians(axisAngle)),
      y + radius * Math.sin(toRadians(axisAngle)),
    ];
  });
}

export function Polyline({
  points = [[]],
  stroke = 'black',
  strokeWidth = 1,
  closed = false,
  center
}) {
  const elementName = closed ? 'polygon' : 'polyline';
  strokeWidth = strokeWidth || ctx.strokeWidth
  const _points = (center?.length === 2) ?
    centerPointsByMass(points, center)
    : points;

  const pointsString = _points.map(p => p.toString()).join(' ');

  return react`<${elementName}
    points="${pointsString}"
    fill="none"
    stroke=${stroke}
    strokeWidth=${strokeWidth}
  />`
}
