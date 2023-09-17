import context from "./context.mjs";
import { inRange, unique, range, toRadians, dedupeBy, roundTo, groupBy, stableObjectKey, sortBy } from "./core.mjs";
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

function calculateLineEquation([point1, point2], precision = 0.00000000001) {
  const round = a => roundTo(a, precision);
  // returns either {x} (vertical lines) or {m, b}
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  if (x1 === x2) { // Handle vertical line: x = constant
    return { x: round(x1), vertical: true };
  }

  // Calculate the slope (m)
  const m = round((y2 - y1) / (x2 - x1));

  // Calculate the y-intercept (b) using one of the points
  const b = round(y1 - m * x1);

  return { m, b };
}

function pointSortIndexForLine(line) {
  // for vertical likes, use y (1). for all others, use x (0)
  return calculateLineEquation(line).vertical ? 1 : 0;
}

function simpleLineBounds(line) {
  // get the start and end of it as two numbers
  const [ point0, point1 ] = line;
  const pointSortIndex = pointSortIndexForLine(line);
  const bounds = [
    point0[pointSortIndex],
    point1[pointSortIndex]
  ];

  return bounds.sort(sortBy());
}

function consolidateColinearLines(lines) {
  /*
  a. first, sort the lines by minimum bound. [1,4] is before [2,3] or [3,4]
  b. Establish a "uniqueLines" array. 
  c. for n lines, make n-1 comparisons of the "current" and "next" lines.
  if two lines are colinear, there are three cases:
  1. no overlap. keep both. The current should be added to uniqueLines; next should be made current.
  2. partial overlap. create a new line with bounds of the extrema. discard both original lines.
  note: the new segement may be identical to one of the original lines, and that's fine.
  d. Add current to uniqueLines and return uniqueLines
  */
  if (lines.length <= 1) return lines;
  const pointSortIndex = pointSortIndexForLine(lines[0]);
  
  const wrapLine = line => ({ line, bounds: simpleLineBounds(line) });
  const wrappedSegements = lines
    .map(line => line.sort(sortBy(point => point[pointSortIndex]))) // ensure points are sorted consistently
    .map(wrapLine)
    .sort(sortBy(({ bounds }) => bounds[0])); // sort by min bound
  
  const uniqueLines = [];
  let current = wrappedSegements[0];

  // start at 1 (not 0), as we want to iterate n-1 times
  for (let i = 1; i < wrappedSegements.length; i++) {
    const next = wrappedSegements[i];    
    if (next.bounds[0] > current.bounds[1]) {
      // case 1: no overlap. next.min > current.max
      uniqueLines.push(current.line);
      current = next;
    } else {
      // case 2: partial overlap. next.min <= current.max
      // min point must come from current, as they were sorted by min
      // max point can come from either
      const start = current.line[0];
      const end = current.bounds[1] >= next.bounds[1] ? current.line[1] : next.line[1];
      current = wrapLine([start, end]);
    }
  }
  uniqueLines.push(current.line);
  return uniqueLines;
}

export function deduplicateLines(lines, precision = 0.001) {
  const simpleLineKey = (line) => JSON.stringify(
    line.flatMap(point => point.flatMap(v => roundTo(v, precision)))
  );
  const uniqueLines = dedupeBy(lines, simpleLineKey); // simple dedupe, just identical lines removed

  const getEquation = (line) => stableObjectKey(calculateLineEquation(line, precision));
  const groupedCollinearLines = groupBy(uniqueLines, getEquation);

  const consolidatedLines = [];
  for (const equation in groupedCollinearLines) {
    const colinearLines = groupedCollinearLines[equation];
    consolidatedLines.push(consolidateColinearLines(colinearLines));
  }
  return consolidatedLines;
}
  
  window.calculateLineEquation = calculateLineEquation;
  window.simpleLineBounds = simpleLineBounds;
  window.consolidateColinearLines = consolidateColinearLines;