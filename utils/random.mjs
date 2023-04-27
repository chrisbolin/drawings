import { range, floorTo, sortBy, sum } from "./core.mjs";

export function uniform(min = 0, max = 1, precision) {
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

export function sample(array, n) {
  // sample without replacement, and also allow for oversampling
  const randomOffset = uniform(0, array.length, 1);
  return shuffle(range(n)).map(
    i => array[(i + randomOffset) % array.length]
  );
}

export function dispearse(array, strength) {
  return range(array.length)
    .map(oldIndex => ({
      oldIndex, newValue: oldIndex + strength * uniform(-1, 1)
    })).sort(
      sortBy(el => el.newValue)
    ).map(el => array[el.oldIndex]);
}
