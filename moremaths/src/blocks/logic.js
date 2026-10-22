export function booleanAnd(args) {
  return Scratch.Cast.toBoolean(args.A) && Scratch.Cast.toBoolean(args.B);
}

export function booleanOr(args) {
  return Scratch.Cast.toBoolean(args.A) || Scratch.Cast.toBoolean(args.B);
}

export function booleanXor(args) {
  return Scratch.Cast.toBoolean(args.A) !== Scratch.Cast.toBoolean(args.B);
}

export function booleanNand(args) {
  return !(Scratch.Cast.toBoolean(args.A) && Scratch.Cast.toBoolean(args.B));
}

export function booleanNor(args) {
  return !(Scratch.Cast.toBoolean(args.A) || Scratch.Cast.toBoolean(args.B));
}

export function booleanNot(args) {
  return !Scratch.Cast.toBoolean(args.VALUE);
}

export function booleanToNumber(args) {
  return Scratch.Cast.toBoolean(args.VALUE) ? 1 : 0;
}

export function numberToBoolean(args) {
  return this.num(args.VALUE) !== 0;
}

export function ifThenElse(args) {
  return Scratch.Cast.toBoolean(args.CONDITION) ? args.IF_TRUE : args.IF_FALSE;
}

export function strictlyEquals(args) {
  return Scratch.Cast.toString(args.A) === Scratch.Cast.toString(args.B);
}

export function compareValues(args) {
  const a = Scratch.Cast.toString(args.A);
  const b = Scratch.Cast.toString(args.B);
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

export function isBetween(args) {
  const value = this.num(args.VALUE);
  const low = this.num(args.LOW);
  const high = this.num(args.HIGH);
  return value >= Math.min(low, high) && value <= Math.max(low, high);
}

export function isDivisibleBy(args) {
  const divisor = this.num(args.B);
  if (divisor === 0) return false;
  const value = this.num(args.A) / divisor;
  return Number.isFinite(value) && Math.abs(value - Math.round(value)) < 1e-9;
}

export function isEven(args) {
  const value = this.whole(args.N);
  return Number.isFinite(value) && value % 2 === 0;
}

export function isOdd(args) {
  const value = this.whole(args.N);
  return Number.isFinite(value) && Math.abs(value % 2) === 1;
}

export function isInteger(args) {
  const value = this.num(args.N);
  return Number.isFinite(value) && Number.isInteger(value);
}

export function isNegative(args) {
  return this.num(args.N) < 0;
}

export function isPositive(args) {
  return this.num(args.N) > 0;
}

export function isZero(args) {
  return this.num(args.N) === 0;
}

export function isNumeric(args) {
  const value = args.VALUE;
  if (typeof value === "number") return Number.isFinite(value);
  const text = Scratch.Cast.toString(value).trim();
  return text !== "" && !Number.isNaN(Number(text));
}

export function isFiniteNumber(args) {
  return Number.isFinite(this.num(args.N));
}
