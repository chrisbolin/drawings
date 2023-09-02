import context from "./context.mjs";
import { React, react } from "./react.mjs";

export default function Point({ x, y, strokeWidth, stroke = 'black' }) {
  const ctx = React.useContext(context);

  strokeWidth = strokeWidth || ctx.strokeWidth
  const radius = strokeWidth / 2;

  return (
    react`<circle
      cx=${x}
      cy=${y}
      r=${radius}
      stroke=${stroke}
      strokeWidth=${strokeWidth}
      fill="none"
    />`
  );
}
