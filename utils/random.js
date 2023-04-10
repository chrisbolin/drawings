export function uniform(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
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