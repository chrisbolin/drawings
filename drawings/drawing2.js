import { range } from "../utils/core.js";
import { react } from "../utils/react.js";

export default function Drawing2(){
  const sideLength = 40;
  const points = range(7)
    .map(i => Math.PI/2 + i * 2 * Math.PI / 7) // angles
    .reduce((acc, _, i, angles) => {
      acc.push(angles[[0, 4, 6, 3, 2, 1, 5][i]]);
      return acc;
    }, [])
    .reduce((acc, angle) => {
      const [x0, y0] = acc[acc.length - 1];
      const dx = sideLength * Math.sin(angle);
      const dy = sideLength * Math.cos(angle);
      acc.push([x0 + dx, y0 + dy]);    
      return acc;
    }, [[100, 100]]);
  
  const pointsString = points.map(p => p.toString()).join(' ');
  return react`<polyline
    points="${pointsString}"
    fill="none" stroke="black"
  />`
}