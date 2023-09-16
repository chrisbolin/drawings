function _range(n) {
  return Array.apply(null, Array(n))
    .map((_, i) => i);
}

export function range(a, b) {
  if (b === undefined) return _range(a);
  return _range(b - a).map(n => n + a);
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

export function sumReduce() {
  return [
    (previous, current) => previous + current,
    0
  ]
}

export function sum(array) {
  return array.reduce(...sumReduce());
}

export function groupReduce(getKey) {
  return [
    (grouped, current) => {
      grouped = grouped || {};
      const key = getKey(current);
      if (!(key in grouped)) {
        grouped[key] = [];
      }
      grouped[key].push(current);
      return grouped;
    },
    {}
  ];
}

export function sortBy(getKey) {
  return (a, b) => getKey(a) - getKey(b);
}

export function zip(arrayA, arrayB) {
  return arrayA.map((el, i) =>
    [el, arrayB[i]]
  );
}

export function permutations(array, k) {
  const n = array.length;
  if (k === 0) return [[]];
  
  return range(n).flatMap(i => {
    const element = array[i];
    const subset = [...array];
    subset.splice(i, 1);

    return permutations(subset, k-1).map(sub => 
      [element].concat(sub)
    );
  })
}

export function combinations(array, k) {
  const n = array.length;
  if (k === 0) return [[]];
  
  return range(n).flatMap(i => {
    const element = array[i];
    const subset = array.slice(i + 1);

    return combinations(subset, k-1).map(sub => 
      [element].concat(sub)
    );
  })
}

export function toRadians(degrees) {
  return degrees / 180 * Math.PI;
}
