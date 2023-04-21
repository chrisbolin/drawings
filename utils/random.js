import { roundTo } from "./core.js";

export function uniform(min = 0, max = 1, precision = false) {
  const value = Math.random() * (max - min) + min;
  if (precision) {return roundTo(value, precision);}
  return value;
}

export function uniformSum(n, min = 0, max = 1, integer = false) {
  if (!(n >= 1)) throw new Error('n must be 1 or greater.'); // use ! >= to catch non-numbers

  let subtotal = 0;
  for (let i = 0; i < n; i++) {
    subtotal = subtotal + uniform();
  }
  const normalized = subtotal / n; // normalize
  const value = normalized * (max - min) + min;

}