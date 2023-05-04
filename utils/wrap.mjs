function getCallerFile(){
  const fileRegEx = /\w\.mjs/g;
  const stack = (new Error()).stack;
  const thisFile = import.meta.url.match(fileRegEx)[0];
  console.log({thisFile});
  return Array.from(stack.matchAll(fileRegEx))
    .filter(filename => filename !== thisFile)
    .join(' | ');
}

export default function wrap({ Component, variants, defaults }, meta) {
  if (!Component) throw new Error('wrap() must be called with Component');
  if (!meta) throw new Error('wrap() last argument must be an import.meta');
  console.log('Caller:', getCallerFile());

  if (variants) {
    return {
      variants,
      Component,
    };
  }

  if (defaults) {
    return {
      variants: [() => defaults],
      Component,
    }
  }

  throw new Error('wrap() must be called with varaints or default');
}