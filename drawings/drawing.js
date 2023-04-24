import { react } from "../utils/react.js";

export const height = 400;
export const width = 400;

export function Component(props) {
 return react`
      <rect stroke="black" width="100" height="200"/>
  `;
}