import { react } from "../lib/react.mjs";
import wrap from "../lib/wrap.mjs";

const defaults = {
  width: 6,
  height: 4,
  strokeWidth: 1/50,
};

const variants = [
  () => {
    const strokeWidth = 1/50;
    return {
      height: 400,
      width: 600,
      strokeWidth,
    };
  },
];

export function Component({
  strokeWidth
}) {
  return react``;
}

export default wrap({
  variants,
  defaults,
  Component
});
