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

export default function wrap({ Component, variants, defaults }) {
  if (!Component) throw new Error('wrap() must be called with Component');
  if (!variants && !defaults) throw new Error('wrap() must be called with variants or default');
  
  const _defaults = { ...fallbacks, ...defaults };

  if (!variants) {
    variants = [() => _defaults];
  } else {
    variants = variants.map(variant => x => {
      return {
        ..._defaults,
        ...variant({ // send input and defaults to variant function
          ..._defaults,
          ...x,
        })
      };
    });
  }
  
  return {
    name: drawingName(),
    Component,
    variants
  };
}
