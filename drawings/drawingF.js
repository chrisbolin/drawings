import { range, sum, toBinary } from "../utils/core.js";
import { CenteredLine } from "../utils/lines.js";
import { react } from "../utils/react.js";

export const width = 5.5;
export const height = 3.5;

const strokeWidth = 1/64;

const sections = 11;
const subsections = 25;

const COLORS = ['black', 'firebrick', 'gold', 'blue'];

export function Component(props) {
   return range(16)
    .map(toBinary)
    .filter(binary => sum(binary) > 1)
    .flatMap((binary, i) => {
      console.log(binary);
      return range(subsections).map(j =>
        react`
          <${CenteredLine}
            key="${i}${j}"
            center=${[
              width*(i/sections + j/sections/subsections),
              height/2
            ]}
            angle=${90}
            length=${height}
            strokeWidth=${strokeWidth}/>
        `
      )})
}