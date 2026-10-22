export function roundNumber(args) {
  const rounded = Math.round(this.num(args.NUM));
  return rounded === 0 ? 0 : rounded;
}

export function floorNumber(args) {
  return Math.floor(this.num(args.NUM));
}

export function ceilingNumber(args) {
  return Math.ceil(this.num(args.NUM));
}

export function truncateNumber(args) {
  const value = this.num(args.NUM);
  const truncated = Math.trunc(value);
  return truncated === 0 ? 0 : truncated;
}

export function roundToPlaces(args) {
  const places = Math.trunc(this.num(args.PLACES));
  const value = this.num(args.NUM);
  if (!Number.isFinite(value)) return value;
  const factor = Math.pow(10, places);
  const rounded = Math.round(Math.abs(value) * factor) / factor;
  return (value < 0 ? -rounded : rounded) || 0;
}

export function roundHalfDown(args) {
  const places = Math.trunc(this.num(args.PLACES));
  const value = this.num(args.NUM);
  if (!Number.isFinite(value)) return value;
  const factor = Math.pow(10, places);
  const rounded = Math.ceil(Math.abs(value) * factor - 0.5) / factor;
  return (value < 0 ? -rounded : rounded) || 0;
}

export function roundHalfEven(args) {
  const places = Math.trunc(this.num(args.PLACES));
  const value = this.num(args.NUM);
  if (!Number.isFinite(value)) return value;
  const factor = Math.pow(10, places);
  const scaled = value * factor;
  const floor = Math.floor(scaled);
  const difference = scaled - floor;
  let rounded;
  if (difference > 0.5) rounded = floor + 1;
  else if (difference < 0.5) rounded = floor;
  else rounded = floor % 2 === 0 ? floor : floor + 1;
  rounded /= factor;
  return rounded === 0 ? 0 : rounded;
}

export function roundToSignificant(args) {
  const figures = Math.trunc(this.num(args.FIGURES));
  const value = this.num(args.NUM);
  if (!Number.isFinite(value) || value === 0) return value;
  if (figures <= 0) return 0;
  const rounded = Number(value.toPrecision(Math.min(100, figures)));
  return rounded === 0 ? 0 : rounded;
}

export function roundToMultiple(args) {
  const value = this.num(args.NUM);
  const step = this.num(args.STEP);
  if (!Number.isFinite(step) || step === 0) return value;
  const rounded = Math.round(value / step) * step;
  return rounded === 0 ? 0 : rounded;
}

export function floorToMultiple(args) {
  const value = this.num(args.NUM);
  const step = this.num(args.STEP);
  if (!Number.isFinite(step) || step === 0) return value;
  return Math.floor(value / step) * step;
}

export function ceilingToMultiple(args) {
  const value = this.num(args.NUM);
  const step = this.num(args.STEP);
  if (!Number.isFinite(step) || step === 0) return value;
  return Math.ceil(value / step) * step;
}

export function absoluteValue(args) {
  return Math.abs(this.num(args.NUM));
}

export function signOfNumber(args) {
  return this.signOf(args.NUM);
}

export function fractionalPart(args) {
  const value = this.num(args.NUM);
  return value - Math.floor(value);
}

export function decimalPlacesOf(args) {
  const text = Scratch.Cast.toString(this.num(args.NUM));
  const exponentAt = text.search(/e/i);
  const mantissa = exponentAt < 0 ? text : text.slice(0, exponentAt);
  const exponent = exponentAt < 0 ? 0 : Number(text.slice(exponentAt + 1));
  const dotAt = mantissa.indexOf(".");
  const decimals = dotAt < 0 ? 0 : mantissa.length - dotAt - 1;
  return Math.max(0, decimals - exponent);
}

export function absoluteDifference(args) {
  return Math.abs(this.num(args.A) - this.num(args.B));
}