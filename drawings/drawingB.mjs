import { range } from "../utils/core.mjs";
import { react } from "../utils/react.mjs";

function centerOfMass(points) {
  const n = points.length;
  const [sumX, sumY] = points.reduce(
    (sum, point, i) => [sum[0] + point[0], sum[1] + point[1]],
    [0, 0]);
  return [sumX / n, sumY / n];
}

function centerPoints(points, centerX, centerY) {
  const [massX, massY] = centerOfMass(points);
  const [dX, dY] = [centerX - massX, centerY - massY];
  return points.map(([x, y]) => [x + dX, y + dY]);
}

export const width = 400;
export const height = 400;

export function Component(){
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

  const centeredPoints = centerPoints(points, width/2, height/2);
  const pointsString = centeredPoints.map(p => p.toString()).join(' ');
  return react`<polyline
    points="${pointsString}"
    fill="none" stroke="black"
  />`
}