import { Polyline, triangle } from "../lib/lines.mjs";
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

  debugger;
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

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/50,
};

const variants = [
  ({ center }) => {
    console.log({center});
    const initial = triangle(center, 1);
    const split = splitTriangle(initial, 10, 0);
    return {
      polygons: [initial, ...split]
    };
  },
];

export function Component({
  strokeWidth,
  polygons,
  ...props
}) {
  console.log({props});
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
