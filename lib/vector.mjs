export default {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  subtract: (a, b) => [a[0] - b[0], a[1] - b[1]],
  divide: (a, d) => [a[0]/d, a[1]/d],
  multiply: (a, m) => [m*a[0], m*a[1]],
  midpoint: (a, b) => [(a[0] + b[0])/2, (a[1] + b[1])/2],
};
