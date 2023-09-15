import { range } from "../lib/core.mjs";
import { Polyline, centerPointsByBounds, distance, triangle } from "../lib/lines.mjs";
import { pickRandom } from "../lib/random.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

function pointAlongSegment(segment, distance) {
  const [startPoint, endPoint] = segment;
  // Calculate the coordinates of the point at the given distance
  const x = startPoint[0] + (endPoint[0] - startPoint[0]) * distance;
  const y = startPoint[1] + (endPoint[1] - startPoint[1]) * distance;

  return [x, y];
}

function splitTriangle(vertexes, n, topVertexIndex) {
  const distance = 1/n; // e.g., a n=2 split will cut the lines in half (0.5) and produce 2n=4 trianges

  const newTriangles = [];

  const aVertex = vertexes[topVertexIndex];
  const bVertex = vertexes[(topVertexIndex + 1) % 3];
  const cVertex = vertexes[(topVertexIndex + 2) % 3];

  const bPrimeVertex = pointAlongSegment([bVertex, aVertex], distance);
  const cPrimeVertex = pointAlongSegment([cVertex, aVertex], distance);

  const largeTriangle = [aVertex, bPrimeVertex, cPrimeVertex];
  newTriangles.push(largeTriangle);

  const segmentBC = [bVertex, cVertex];
  const segmentBPrimeCPrime = [bPrimeVertex, cPrimeVertex];

  // n small upright triangles. bases along BC, peaks along B'C'
  for (let i = 0; i < n; i++) {
    const v0 = pointAlongSegment(segmentBPrimeCPrime, i / (n - 1));
    const v1 = pointAlongSegment(segmentBC, i / n);
    const v2 = pointAlongSegment(segmentBC, (i + 1) / n);
    newTriangles.push([ v0, v1, v2 ]);
  }
  
  // n-1 small inverted triangles. bases along B'C', peaks along BC
  for (let i = 0; i < (n - 1); i++) {
    const v0 = pointAlongSegment(segmentBC, (i + 1) / n);
    const v1 = pointAlongSegment(segmentBPrimeCPrime, i / (n - 1));
    const v2 = pointAlongSegment(segmentBPrimeCPrime, (i + 1) / (n - 1));
    newTriangles.push([ v0, v1, v2 ]);
  }

  return newTriangles;
}

let runCount = 0;
let MAX_RUNS = 500000;
function recursivelySplitTriangle(initialTriangle, divisions, minSideLength) {
  if (runCount++ > MAX_RUNS) throw new Error('MAX_RUNS EXCEEDED');

  const lengthOfSide = distance(initialTriangle[0], initialTriangle[1]);

  // we can only use the divisions that give us a side length at least minSideLength
  const validDivisions = divisions.filter(n => (lengthOfSide / n) >= minSideLength);

  // if no valid divisions, bail
  if (validDivisions.length === 0) return [initialTriangle];

  // otherwise, split the triangle and split each of the splits
  const division = pickRandom(validDivisions);
  const direction = pickRandom(range(3));
  // recurse!
  const subtriangles = splitTriangle(initialTriangle, division, direction)
    .flatMap(sub => recursivelySplitTriangle(sub, validDivisions, minSideLength));

  return [initialTriangle, ...subtriangles];
}

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/100,
};

const variants = [
  ({ center, strokeWidth }) => {
    const initialTriangle = centerPointsByBounds(triangle([0, 0], 2), center);
    const splits = recursivelySplitTriangle(initialTriangle, [2, 4, 6, 8, 10], strokeWidth * 3)
    return {
      polygons: splits
    };
  },
];

export function Component({
  strokeWidth,
  polygons
}) {
  return polygons.map((polygon, i) => react`
    <${Polyline}
      points=${polygon}
      key=${i}
      strokeWidth=${strokeWidth}
      closed
    />`
  );
}

export default wrap({
  variants,
  defaults,
  Component
});
