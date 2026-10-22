export function gammaFunction(args) {
  return this.gammaOf(args.X);
}

export function logGammaFunction(args) {
  return this.logGammaOf(args.X);
}

export function betaFunction(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  return (this.gammaOf(a) * this.gammaOf(b)) / this.gammaOf(a + b);
}

export function errorFunction(args) {
  return this.erfOf(args.X);
}

export function inverseErrorFunction(args) {
  const target = this.num(args.Y);
  if (target <= -1 || target >= 1) return NaN;
  let estimate = this.clampNum(target, -0.9999999, 0.9999999);
  for (let i = 0; i < 80; i++) {
    const error = this.erfOf(estimate) - target;
    const slope = (2 / Math.sqrt(Math.PI)) * Math.exp(-estimate * estimate);
    if (slope === 0) break;
    const next = estimate - error / slope;
    if (!Number.isFinite(next)) break;
    estimate = next;
  }
  return estimate;
}

export function stirlingApproximation(args) {
  const n = this.num(args.N);
  if (!Number.isFinite(n) || n < 0) return NaN;
  if (n === 0) return 1;
  return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n);
}
