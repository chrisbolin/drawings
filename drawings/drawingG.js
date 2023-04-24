import { range } from "../utils/core.js";
import { react } from "../utils/react.js";

export const height = 4;
export const width = 6;

const sections = [
  [2, 3], // 6
  [3, 5], // 15
  [4, 5], // 20
  [3, 5], // 15
  [2, 3], // 6
  [1, 1], // 1
]

export function Component(props) {
  const sectionWidth = width / sections.length; 
  return sections.flatMap(([xSections, ySections], i) => {
    const x0 = i * sectionWidth;
    return range(xSections).map(j => range(ySections).map(k => 
      react`
        <rect
          key="${i}.${j}.${k}"
          stroke="black"
          x=${x0 + j * (sectionWidth / xSections)}
          y=${k * (height / ySections)}
          width=${sectionWidth / xSections}
          height=${height / ySections}
          strokeWidth="0.02"/>
      `))
  });
}