export function clampNumber(args) {
  return this.clampNum(args.VALUE, args.LOW, args.HIGH);
}

export function lerp(args) {
  const from = this.num(args.FROM);
  const to = this.num(args.TO);
  return from + (to - from) * this.num(args.AMOUNT);
}

export function inverseLerp(args) {
  const from = this.num(args.FROM);
  const to = this.num(args.TO);
  if (to === from) return 0;
  return (this.num(args.VALUE) - from) / (to - from);
}

export function remapNumber(args) {
  const fromLow = this.num(args.FROM_LOW);
  const fromHigh = this.num(args.FROM_HIGH);
  if (fromHigh === fromLow) return this.num(args.TO_LOW);
  const position = (this.num(args.VALUE) - fromLow) / (fromHigh - fromLow);
  return this.num(args.TO_LOW) + position * (this.num(args.TO_HIGH) - this.num(args.TO_LOW));
}

export function wrapNumber(args) {
  const low = this.num(args.LOW);
  const high = this.num(args.HIGH);
  const size = high - low;
  if (size === 0) return low;
  return low + this.positiveRemainder(this.num(args.VALUE) - low, size);
}

export function smoothStep(args) {
  const low = this.num(args.LOW);
  const high = this.num(args.HIGH);
  if (high === low) return 0;
  const t = this.clampNum((this.num(args.VALUE) - low) / (high - low), 0, 1);
  return t * t * (3 - 2 * t);
}

export function approachNumber(args) {
  const value = this.num(args.VALUE);
  const target = this.num(args.TARGET);
  const step = Math.abs(this.num(args.STEP));
  if (step === 0) return value;
  if (value < target) return Math.min(value + step, target);
  if (value > target) return Math.max(value - step, target);
  return value;
}

export function isCloseTo(args) {
  const tolerance = Math.abs(this.num(args.TOLERANCE));
  return Math.abs(this.num(args.A) - this.num(args.B)) <= tolerance;
}

export function averageOfTwo(args) {
  return (this.num(args.A) + this.num(args.B)) / 2;
}

export function smallestOfThree(args) {
  return Math.min(this.num(args.A), this.num(args.B), this.num(args.C));
}

export function largestOfThree(args) {
  return Math.max(this.num(args.A), this.num(args.B), this.num(args.C));
}

export function percentOf(args) {
  return (this.num(args.NUM) * this.num(args.PERCENT)) / 100;
}

export function percentChange(args) {
  const from = this.num(args.FROM);
  if (from === 0) return NaN;
  return ((this.num(args.TO) - from) / Math.abs(from)) * 100;
}

export function floorDivide(args) {
  const divisor = this.num(args.B);
  if (divisor === 0) return NaN;
  return Math.floor(this.num(args.A) / divisor);
}

export function ceilingDivide(args) {
  const divisor = this.num(args.B);
  if (divisor === 0) return NaN;
  return Math.ceil(this.num(args.A) / divisor);
}

export function euclideanModulo(args) {
  const size = Math.abs(this.num(args.B));
  if (!Number.isFinite(size) || size === 0) return NaN;
  return this.positiveRemainder(args.A, size);
}