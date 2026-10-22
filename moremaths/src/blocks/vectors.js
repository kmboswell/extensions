export function magnitude2d(args) {
  return Math.hypot(this.num(args.X), this.num(args.Y));
}

export function magnitude3d(args) {
  return Math.hypot(this.num(args.X), this.num(args.Y), this.num(args.Z));
}

export function dotProduct(args) {
  return (
    this.num(args.X1) * this.num(args.X2) +
    this.num(args.Y1) * this.num(args.Y2) +
    this.num(args.Z1) * this.num(args.Z2)
  );
}

export function crossProductMagnitude(args) {
  const x1 = this.num(args.X1);
  const y1 = this.num(args.Y1);
  const z1 = this.num(args.Z1);
  const x2 = this.num(args.X2);
  const y2 = this.num(args.Y2);
  const z2 = this.num(args.Z2);
  const cx = y1 * z2 - z1 * y2;
  const cy = z1 * x2 - x1 * z2;
  const cz = x1 * y2 - y1 * x2;
  return Math.hypot(cx, cy, cz);
}

export function angleBetweenVectors(args) {
  const dot =
    this.num(args.X1) * this.num(args.X2) +
    this.num(args.Y1) * this.num(args.Y2);
  const lengths =
    Math.hypot(this.num(args.X1), this.num(args.Y1)) *
    Math.hypot(this.num(args.X2), this.num(args.Y2));
  if (lengths === 0) return NaN;
  const cosine = this.clampNum(dot / lengths, -1, 1);
  return this.radiansToDegrees(Math.acos(cosine));
}

export function determinant2x2(args) {
  return (
    this.num(args.A) * this.num(args.D) - this.num(args.B) * this.num(args.C)
  );
}

export function determinant3x3(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  const d = this.num(args.D);
  const e = this.num(args.E);
  const f = this.num(args.F);
  const g = this.num(args.G);
  const h = this.num(args.H);
  const i = this.num(args.I);
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}
