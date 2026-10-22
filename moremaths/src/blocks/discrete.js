export function modularReduceOf(args) {
  const modulus = Math.abs(this.whole(args.MODULUS));
  if (modulus < 1) return NaN;
  const value = this.num(args.VALUE);
  return ((value % modulus) + modulus) % modulus;
}

export function modularAddOf(args) {
  const modulus = Math.abs(this.whole(args.MODULUS));
  if (modulus < 1) return NaN;
  const total = this.num(args.A) + this.num(args.B);
  return ((total % modulus) + modulus) % modulus;
}

export function modularMultiplyOf(args) {
  const modulus = Math.abs(this.whole(args.MODULUS));
  if (modulus < 1) return NaN;
  const product = this.num(args.A) * this.num(args.B);
  return ((product % modulus) + modulus) % modulus;
}

export function modularPowerOf(args) {
  const modulus = Math.abs(this.whole(args.MODULUS));
  const exponent = this.whole(args.EXPONENT);
  if (modulus < 1 || exponent < 0) return NaN;
  return this.positiveRemainder(this.powerMod(this.num(args.BASE), exponent, modulus), modulus);
}

export function modularInverse(args) {
  return this.modularInverseOf(args.VALUE, args.MODULUS);
}

export function chineseRemainder(args) {
  return this.chineseRemainderOf(args.REMAINDER1, args.MODULUS1, args.REMAINDER2, args.MODULUS2);
}

export function arithmeticSequenceList(args) {
  return this.arithmeticSequenceOf(args.TERMS, args.FIRST, args.DIFFERENCE);
}

export function geometricSequenceList(args) {
  return this.geometricSequenceOf(args.TERMS, args.FIRST, args.RATIO);
}

export function fibonacciSequenceList(args) {
  return this.fibonacciSequenceOf(args.TERMS);
}

export function tribonacciSequenceList(args) {
  const terms = this.whole(args.TERMS);
  const result = [];
  if (!(terms > 0)) return result;
  let a = 0;
  let b = 0;
  let c = 1;
  for (let i = 0; i < terms; i++) {
    result.push(a);
    const next = a + b + c;
    a = b;
    b = c;
    c = next;
    if (!Number.isFinite(c)) break;
  }
  return result;
}

export function firstDifferencesList(args, util) {
  const values = this.listNumbersOf(args.LIST, util);
  return values === null ? [] : this.differencesOf(values);
}

export function secondDifferencesList(args, util) {
  const values = this.listNumbersOf(args.LIST, util);
  return values === null ? [] : this.secondDifferencesOf(values);
}

export function runningProductList(args, util) {
  const values = this.listNumbersOf(args.LIST, util);
  return values === null ? [] : this.runningProductOf(values);
}

export function alternatingSumValue(args, util) {
  const values = this.listNumbersOf(args.LIST, util);
  return values === null ? 0 : this.alternatingSumOf(values);
}

export function cumulativeMeanList(args, util) {
  const values = this.listNumbersOf(args.LIST, util);
  return values === null ? [] : this.cumulativeMeanOf(values);
}

export function continuedFractionList(args) {
  return this.continuedFractionOf(args.VALUE, args.TERMS);
}

export function rationalApproximationList(args) {
  return this.rationalApproximationOf(args.VALUE, args.MAX_DENOMINATOR);
}

export function numberInWords(args) {
  return this.numberToWordsOf(args.VALUE);
}

export function ordinalSuffix(args) {
  return this.ordinalSuffixOf(args.VALUE);
}

export function isHappyNumber(args) {
  const seen = new Set();
  let value = Math.abs(this.whole(args.VALUE));
  while (value !== 1) {
    if (value === 0 || seen.has(value)) return false;
    seen.add(value);
    let total = 0;
    let remaining = value;
    while (remaining > 0) {
      const digit = remaining % 10;
      total += digit * digit;
      remaining = Math.floor(remaining / 10);
    }
    value = total;
  }
  return true;
}

export function happyNumberSequence(args) {
  const terms = this.whole(args.TERMS);
  const result = [];
  if (!(terms > 0)) return result;
  let value = Math.abs(this.whole(args.VALUE));
  for (let i = 0; i < terms && i < 2000; i++) {
    result.push(value);
    if (value === 1) break;
    let total = 0;
    let remaining = value;
    while (remaining > 0) {
      const digit = remaining % 10;
      total += digit * digit;
      remaining = Math.floor(remaining / 10);
    }
    value = total;
  }
  return result;
}

export function hammingDistance(args) {
  const first = this.digitsOf(this.whole(args.A));
  const second = this.digitsOf(this.whole(args.B));
  const length = Math.min(first.length, second.length);
  let different = Math.abs(first.length - second.length);
  for (let i = 0; i < length; i++) {
    if (first[first.length - 1 - i] !== second[second.length - 1 - i]) different += 1;
  }
  return different;
}