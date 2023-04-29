import { react } from "../utils/react.mjs";

export const name = "Z";

export const wrapper = true;

export const factories = [
  function f001(){
    return   {
      height: 400,
      width: 400,
    }
  }

];

export function Component(props) {
 return react`
      <rect stroke="black" width="100" height="200"/>
  `;
}