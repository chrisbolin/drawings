export function range(n) {
  return Array.apply(null, Array(n))
    .map((_, i) => i);
}

export function unique(list, by = String) {
  return list.filter((a, index) => 
    list.findIndex(b => by(a) === by(b)) === index
  );
}

export function inRange(value, min, max) {
  return (value >= min) && (value <= max);
}

export function roundTo(value, precision) {
  return Math.round(value / precision) * precision;
}

export function floorTo(value, precision) {
  return Math.floor(value / precision) * precision;
}

export function toBinary(number, minimumLength = 0) {
  const binary = number
    .toString(2)
    .split('')
    .map(parseFloat);

  const shortfall = minimumLength - binary.length;
  if (shortfall > 0) {
    return range(shortfall).map(() => 0).concat(binary)
  }
  return binary;
}

export function sumReduce(previous, current) {
  previous = previous || 0;
  return previous + current;
}

export function sum(array) {
  return array.reduce(sumReduce);
}

export function zip(arrayA, arrayB) {
  return arrayA.map((el, i) =>
    [el, arrayB[i]]
  );
}