import { range } from "../utils/core.mjs";
import { FillingLine } from "../utils/lines.mjs";
import { uniform } from "../utils/random.mjs";
import { react } from "../utils/react.mjs";

export const width = 600;
export const height = 400;

export function Component(){
  const lineCount = 71;
  let x = uniform(500, 800, 1);
  let y0 = uniform(50, 200, 1);
  let angleDelta = uniform(1, 2.5, 0.1);
  const split = (lineCount / 3);
  // x= 735, angleDelta= 1.1, y0= 187;
  console.log( {x, angleDelta, y0} );
  return range(lineCount)
    // .filter(i => i > 40)
    .map(i => {
      const half = i < split;
      const y = y0 + i*4 + i*i/10;
      const angle = (half ? (180 + i/2 * angleDelta) : i * angleDelta);
      return {
        center: [x, y],
        angle
      };
    }
    )
    .map(({center, angle}, i) => react`
      <${FillingLine}
        key=${i}
        center=${center}
        angle=${angle}
        strokeWidth=${1}
        xBounds=${[0, width]}
        yBounds=${[0, height]}
        />`)
    ;
}