import { range, toRadians } from "../lib/core.mjs";
import { SimpleLine } from "../lib/lines.mjs";
import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const variants = [
  ({width, height}) => ({
    boxes: [
      { top: 0, left: 0, width: width/2, height: height/2 },
      { top: height/3, left: width/3, width: width/2, height: height/2 },
    ],
  })
];

export function Component({
  strokeWidth,
  width,
  height,
}) {
  return false;
}

export default wrap({
  variants,
  Component
});
