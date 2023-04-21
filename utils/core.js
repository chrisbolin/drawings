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