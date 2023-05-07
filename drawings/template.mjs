import { react } from "../utils/react.mjs";
import wrap from "../utils/wrap.mjs";

const defaults = {
  width: 100,
  height: 50,
};

const variants = [
  () => {
    const strokeWidth = 1/50;
    return {
      height: 4,
      width: 6,
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
