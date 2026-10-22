export function randomNormal(args) {
  return this.randomNormalSample(args.MEAN, args.DEVIATION);
}

export function randomExponential(args) {
  return this.randomExponentialSample(args.RATE);
}

export function randomTriangular(args) {
  return this.randomTriangularSample(args.LOW, args.HIGH, args.MODE);
}

export function rollDiceSum(args) {
  const count = Math.trunc(this.num(args.COUNT));
  const sides = Math.trunc(this.num(args.SIDES));
  if (!Number.isFinite(count) || count < 1 || count > 100000) return 0;
  if (!Number.isFinite(sides) || sides < 1 || sides > 1000000) return 0;
  let total = 0;
  for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
  return total;
}

export function randomWeightedFromList(args, util) {
  const values = this.listValuesOf(args.LIST, util);
  const weights = this.listNumbersOf(args.WEIGHTS, util);
  if (!values || !weights || values.length === 0) return "";
  return this.weightedPickOf(values, weights);
}

export function normalCdf(args) {
  return this.normalCdfOf(args.VALUE, args.MEAN, args.DEVIATION);
}

export function normalPdf(args) {
  return this.normalPdfOf(args.VALUE, args.MEAN, args.DEVIATION);
}