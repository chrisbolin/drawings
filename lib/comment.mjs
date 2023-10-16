import { react } from "../lib/react.mjs";
import { prettyJSON } from "./core.mjs";

export function HTMLComment({ children }) {
  return react`<${CommentOfType} type="div" children=${children}/>`;
}

export function SVGComment({ children }) {
  return react`<${CommentOfType} type="defs" children=${children}/>`;
}

function CommentOfType({ children, type }) {
  const comment = typeof children === 'object' ? prettyJSON(children) : children;
  return react`<${type} dangerouslySetInnerHTML=${ { __html: `<!-- ${comment} -->` } } />`;
}
