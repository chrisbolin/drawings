import { range } from "./core.mjs"

export function grid1d(n, min, max) {
  return range(n).map(i => i * (max - min) / (n - 1));
}
