import { range, toRadians } from "../utils/core.mjs";
import { FillingLine } from "../utils/lines.mjs";
import { uniformSum } from "../utils/random.mjs";
import { react } from "../utils/react.mjs";
import wrap from "../utils/wrap.mjs";

const variants = [
  () => {
    return {
      height: 3.5,
      width: 5.5,
      strokeWidth: 1/100,
    }
  }
];

export function Component({ height, width, strokeWidth }) {
  const min = 0;
  const max = 3;
  const lines = 100;
  const x0 = 0.5 * width;
  const y0 = 0.6 * height;
  
  return range(lines).flatMap(line => {
    const dist = uniformSum(2, min, max);
    return range(3).map(axis => {
      const axisAngle = 90 + 120 * axis;
      const lineAngle = axisAngle + 90;
      const center = [
        x0 + dist * Math.cos(toRadians(axisAngle)),
        y0 + dist * Math.sin(toRadians(axisAngle)),
      ];
      return react`
        <${FillingLine} key="${axis}.${line}" angle=${lineAngle} center=${center} />
      `;
  })});
}

export default wrap({
  Component,
  variants
});
