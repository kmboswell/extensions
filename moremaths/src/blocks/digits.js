export function digitSum(args) {
  return this.sumOf(this.digitsOf(args.N));
}

export function digitProduct(args) {
  const digits = this.digitsOf(args.N);
  if (digits.length === 0) return 0;
  let total = 1;
  for (const digit of digits) total *= digit;
  return total;
}

export function reverseDigits(args) {
  const value = this.num(args.N);
  if (!Number.isFinite(value)) return 0;
  const reversed = Number(String(Math.abs(Math.trunc(value))).split("").reverse().join(""));
  return value < 0 ? -reversed : reversed;
}

export function digitCount(args) {
  return this.digitsOf(args.N).length;
}

export function digitAt(args) {
  const digits = this.digitsOf(args.N);
  const index = Math.trunc(this.num(args.INDEX));
  if (index < 1 || index > digits.length) return 0;
  return digits[index - 1];
}

export function numberToBase(args) {
  return this.toBase(args.N, args.BASE);
}

export function baseToNumber(args) {
  return this.fromBase(args.TEXT, args.BASE);
}

export function toBinary(args) {
  return this.toBase(args.N, 2);
}

export function toOctal(args) {
  return this.toBase(args.N, 8);
}

export function toHexadecimal(args) {
  return this.toBase(args.N, 16);
}

export function toRomanNumerals(args) {
  return this.toRoman(args.N);
}

export function fromRomanNumerals(args) {
  return this.fromRoman(args.TEXT);
}

export function setBitCount(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 0) return 0;
  let rest = n;
  let count = 0;
  while (rest > 0) {
    if (rest % 2 === 1) count += 1;
    rest = Math.floor(rest / 2);
  }
  return count;
}

export function bitLength(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 0) return 0;
  let length = 0;
  let rest = n;
  while (rest > 0) {
    length += 1;
    rest = Math.floor(rest / 2);
  }
  return length;
}

export function padWithZeros(args) {
  const width = Math.min(Math.trunc(this.num(args.WIDTH)), 10000);
  const text = this.toBase(args.N, 10);
  if (!Number.isFinite(width) || width <= text.length) return text;
  const sign = text.startsWith("-") ? "-" : "";
  const digits = sign === "" ? text : text.slice(1);
  return sign + "0".repeat(width - digits.length) + digits;
}

export function scientificNotation(args) {
  const value = this.num(args.N);
  if (value === 0) return "0e0";
  const text = value.toExponential(6);
  const [mantissa, exponent] = text.split("e");
  return (
    mantissa.replace(/0+$/, "").replace(/\.$/, "") + "e" + Number(exponent)
  );
}

export function powerOfTen(args) {
  const value = Math.abs(this.num(args.N));
  if (!Number.isFinite(value) || value === 0) return 0;
  return Math.floor(Math.log(value) / Math.LN10);
}