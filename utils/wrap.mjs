function callingFile(){
  const fileRegEx = /[a-zA-Z]+\.mjs/g;
  const stack = (new Error()).stack;
  const thisFile = import.meta.url.match(fileRegEx)[0];

  return Array.from(stack.matchAll(fileRegEx))
    .map(el => el[0])
    .filter(filename => filename !== thisFile)[0];
}

function drawingID() {
  return callingFile().match(/([A-Z]+)\.mjs/)[1];
}

export default function wrap({ Component, variants, defaults }, meta) {
  if (!Component) throw new Error('wrap() must be called with Component');
  if (!meta) throw new Error('wrap() last argument must be an import.meta');
  if (!variants && !defaults) throw new Error('wrap() must be called with variants or default');
  
  if (!variants) {
    variants = [() => defaults];
  }
  
  return {
    id: drawingID(),
    Component,
    variants
  };
}