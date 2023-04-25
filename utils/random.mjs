import { range, floorTo } from "./core.mjs";

export function uniform(min = 0, max = 1, precision = false) {
  const value = Math.random() * (max - min) + min;
  if (precision) {return floorTo(value, precision);}
  return value;
}

export function uniformSum(n, min = 0, max = 1) {
  if (!(n >= 1)) throw new Error('n must be 1 or greater.'); // use ! >= to catch non-numbers

  let subtotal = 0;
  for (let i = 0; i < n; i++) {
    subtotal = subtotal + uniform();
  }
  const normalized = subtotal / n; // normalize
  return normalized * (max - min) + min;
}

export function shuffle(list) {
  const n = list.length;
  const indexes = range(n);
  return range(n).map((i) =>{
    const sliceIndex = Math.floor(uniform(0, n - i));
    const [newIndex] = indexes.splice(sliceIndex, 1);
    return list[newIndex];
  });
}
