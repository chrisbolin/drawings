import { react } from "../utils/react.js";

import { CenteredLine } from "../utils/lines.js";
import { uniformSum, uniform } from "../utils/random.js";
import { range } from "../utils/core.js";

function RandomLine({length, xMax, yMax, progress, randomSumCount, ...otherProps}) {
  const center = [
    xMax * uniformSum(5),
    yMax * uniformSum(5)
  ];
  const firstHalf = progress < 0.5;
  const angle = (firstHalf ? 85 : 175) + 10 * uniform();
  const stroke = 'black';

  return CenteredLine({
    length,
    center,
    angle,
    stroke,
    ...otherProps
  })
}

export default function Drawing1(props) {
  const height = 400;
  const width = 400;
  const lineLength = 200;
  const lineCount = 50;
  const randomSumCount = 3;
  const strokeWidth = 1;

  const divStyle = {
    backgroundColor: 'lightgrey',
    width: '100vw',
    height: '100vh'
  };
  const svgStyle = {
    // border: '20px solid black',
    backgroundColor: 'white',
    width: '98vw',
    maxHeight: '90vh',
    display: 'block',
    position: 'absolute',
    top: '1vw',
    left: '1vw',
    boxSizing: 'border-box'
  };

  const rendered = range(lineCount)
    .map(i => react`
      <${RandomLine}
        length=${lineLength}
        key=${i}
        xMax=${width}
        yMax=${height}
        progress=${i/lineCount}
        strokeWidth=${strokeWidth}
        randomSumCount=${randomSumCount}
        />`)
    ;

  return react`
  <div style=${divStyle}>
    <svg viewBox="0 0 ${width} ${height}" fill="white" xmlns="http://www.w3.org/2000/svg" style=${svgStyle}>
      ${rendered}
    </svg>
  </div>
  `;
}