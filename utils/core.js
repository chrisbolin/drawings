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
  return Math.round(value / precision) * precision;
}

export function toBinary(number) {
  return number
    .toString(2)
    .split('')
    .map(parseFloat);
}

export function sumReduce(previous, current) {
  previous = previous || 0;
  return previous + current;
}

export function sum(array) {
  return array.reduce(sumReduce);
}