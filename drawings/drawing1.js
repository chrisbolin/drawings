import { react } from "../utils/react.js";

import { CenteredLine } from "../utils/lines.js";
import { uniformSum } from "../utils/random.js";
import { range } from "../utils/core.js";

function RandomLine({length, xMax, yMax, progress, randomSumCount, ...otherProps}) {
  const center = [
    xMax * uniformSum(randomSumCount),
    yMax * uniformSum(randomSumCount)
  ];
  const angle = uniformSum(1);

  let stroke;
  if (progress === 0) {
    stroke = 'yellow';
  } else if (progress < 3/15) {
    stroke = 'red';
  } else if (progress <= 7/15) {
    stroke = 'blue';
  } else {
    stroke = 'black';
  }

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
  const lineCount = 15;
  const randomSumCount = 3;
  const strokeWidth = 5;

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