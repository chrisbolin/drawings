import { identity } from "./core.mjs";

const fallbacks = {
  width: 6,
  height: 4,
  strokeWidth: 1/50,
};

function callingFile(){
  const fileRegEx = /[a-zA-Z]+\.mjs/g;
  const stack = (new Error()).stack;
  const thisFile = import.meta.url.match(fileRegEx)[0];

  return Array.from(stack.matchAll(fileRegEx))
    .map(el => el[0])
    .filter(filename => filename !== thisFile)[0];
}

function drawingName() {
  return callingFile().match(/([A-Z]+)\.mjs/)[1];
}

function enrichInputs(inputs, prepare = identity) {
  const center = [inputs.width / 2, inputs.height / 2];
  const minDimension = Math.min(inputs.width, inputs.height);
  const maxDimension = Math.max(inputs.width, inputs.height);
  const maxRadius = minDimension / 2;

  return prepare({
    ...inputs,
    center,
    minDimension,
    maxDimension,
    maxRadius,
  });
}

export default function wrap({ Component, variants, defaults, prepare = enrichInputs }) {
  if (!Component) throw new Error('wrap() must be called with Component');
  if (!variants && !defaults) throw new Error('wrap() must be called with variants or default');
  
  const _defaults = { ...fallbacks, ...defaults };

  if (!variants) {
    variants = [() => prepare(enrichInputs(_defaults))];
  } else {
    variants = variants.map(variant => x => {
      return prepare({
        ..._defaults,
        ...variant(enrichInputs({ // send input and defaults to variant function
          ..._defaults,
          ...x,
        }))
      });
    });
  }
  return {
    name: drawingName(),
    Component,
    variants
  };
}
