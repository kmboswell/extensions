export function solveLinearEquation(args) {
  const a = this.num(args.A);
  if (a === 0) return NaN;
  return (this.num(args.C) - this.num(args.B)) / a;
}

export function quadraticDiscriminant(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  return b * b - 4 * a * c;
}

export function quadraticRoot1(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  if (a === 0) return NaN;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return NaN;
  return (-b - Math.sqrt(discriminant)) / (2 * a);
}

export function quadraticRoot2(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  if (a === 0) return NaN;
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return NaN;
  return (-b + Math.sqrt(discriminant)) / (2 * a);
}

export function quadraticVertexX(args) {
  const a = this.num(args.A);
  if (a === 0) return NaN;
  return -this.num(args.B) / (2 * a);
}

export function quadraticVertexY(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  if (a === 0) return NaN;
  const x = -b / (2 * a);
  return a * x * x + b * x + c;
}

export function sumOfQuadraticRoots(args) {
  const a = this.num(args.A);
  if (a === 0) return NaN;
  return -this.num(args.B) / a;
}

export function productOfQuadraticRoots(args) {
  const a = this.num(args.A);
  if (a === 0) return NaN;
  return this.num(args.C) / a;
}

export function arithmeticNthTerm(args) {
  return (
    this.num(args.FIRST) + this.num(args.STEP) * (this.num(args.INDEX) - 1)
  );
}

export function geometricNthTerm(args) {
  return (
    this.num(args.FIRST) *
    Math.pow(this.num(args.RATIO), this.num(args.INDEX) - 1)
  );
}

export function arithmeticSeriesSum(args) {
  const index = this.num(args.INDEX);
  const first = this.num(args.FIRST);
  const step = this.num(args.STEP);
  return (index * (2 * first + (index - 1) * step)) / 2;
}

export function geometricSeriesSum(args) {
  const index = this.num(args.INDEX);
  const first = this.num(args.FIRST);
  const ratio = this.num(args.RATIO);
  if (ratio === 1) return first * index;
  return (first * (1 - Math.pow(ratio, index))) / (1 - ratio);
}

export function infiniteGeometricSum(args) {
  const first = this.num(args.FIRST);
  const ratio = this.num(args.RATIO);
  if (ratio >= 1 || ratio <= -1) return NaN;
  return first / (1 - ratio);
}

export function triangularNumber(args) {
  const n = this.num(args.INDEX);
  return (n * (n + 1)) / 2;
}

export function squarePyramidalNumber(args) {
  const n = this.num(args.INDEX);
  return (n * (n + 1) * (2 * n + 1)) / 6;
}

export function sumOfFirstOdds(args) {
  const n = this.num(args.INDEX);
  return n * n;
}

export function sumOfFirstEvens(args) {
  const n = this.num(args.INDEX);
  return n * (n + 1);
}

export function harmonicNumber(args) {
  const count = Math.trunc(this.num(args.INDEX));
  if (!Number.isFinite(count) || count < 1) return NaN;
  if (count <= 1000) {
    let total = 0;
    for (let i = 1; i <= count; i++) total += 1 / i;
    return total;
  }
  const n = count;
  const inverse = 1 / n;
  const inverse2 = inverse * inverse;
  return (
    Math.log(n) +
    0.5772156649015329 +
    inverse / 2 -
    inverse2 / 12 +
    (inverse2 * inverse2) / 120 -
    (inverse2 * inverse2 * inverse2) / 252
  );
}
