export function greatestCommonDivisor(args) {
  return this.gcdOf(args.A, args.B);
}

export function leastCommonMultiple(args) {
  return this.lcmOf(args.A, args.B);
}

export function isPrime(args) {
  return this.isPrimeNumber(args.N);
}

export function nthPrime(args) {
  const index = Math.trunc(this.num(args.INDEX));
  if (!Number.isFinite(index) || index < 1) return 0;
  let limit = 10000;
  for (let attempt = 0; attempt < 6; attempt++) {
    const primes = sieveTo(limit);
    if (primes.length >= index) return primes[index - 1];
    limit *= 4;
  }
  return 0;
}

export function primeCountUpTo(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 0 || n > 1000000000) return 0;
  return countPrimesUpTo(n);
}

export function nextPrime(args) {
  return this.nextPrimeOf(args.N);
}

export function previousPrime(args) {
  return this.previousPrimeOf(args.N);
}

export function primeFactors(args) {
  return this.joinNumbers(this.primeFactorsOf(args.N));
}

export function primeFactorCount(args) {
  return this.distinctPrimeFactorsOf(args.N).length;
}

export function smallestPrimeFactor(args) {
  const factors = this.primeFactorsOf(args.N);
  return factors.length === 0 ? 0 : factors[0];
}

export function largestPrimeFactor(args) {
  const factors = this.primeFactorsOf(args.N);
  return factors.length === 0 ? 0 : factors[factors.length - 1];
}

export function allDivisors(args) {
  return this.joinNumbers(this.divisorsOf(args.N));
}

export function divisorCount(args) {
  return this.divisorsOf(args.N).length;
}

export function divisorSum(args) {
  return this.sumOf(this.divisorsOf(args.N));
}

export function properDivisorSum(args) {
  return this.sumOf(this.divisorsOf(args.N)) - Math.abs(this.whole(args.N));
}

export function isPerfectNumber(args) {
  const n = Math.abs(this.whole(args.N));
  if (n < 2) return false;
  return this.sumOf(this.divisorsOf(n)) === 2 * n;
}

export function isSemiprime(args) {
  return this.primeFactorsOf(args.N).length === 2;
}

export function eulerTotient(args) {
  return this.totientOf(args.N);
}

export function mobius(args) {
  return this.mobiusOf(args.N);
}

export function primorial(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 2) return 1;
  if (n > 1000000) return Infinity;
  let total = 1;
  for (const prime of primesUpTo(n)) {
    total *= prime;
    if (!Number.isFinite(total)) return Infinity;
  }
  return total;
}

export function collatzSteps(args) {
  return this.collatzStepsOf(args.N);
}

export function digitalRoot(args) {
  let n = Math.abs(this.whole(args.N));
  if (!Number.isFinite(n)) return 0;
  while (n > 9) {
    let total = 0;
    while (n > 0) {
      total += n % 10;
      n = Math.floor(n / 10);
    }
    n = total;
  }
  return n;
}

export function isArmstrongNumber(args) {
  const digits = this.digitsOf(args.N);
  if (digits.length === 0) return false;
  const power = digits.length;
  const n = Math.abs(this.whole(args.N));
  let total = 0;
  for (const digit of digits) total += Math.pow(digit, power);
  return total === n;
}

export function isPalindromeNumber(args) {
  const n = Math.abs(this.whole(args.N));
  if (!Number.isFinite(n)) return false;
  const digits = this.digitsOf(n);
  for (let i = 0; i < Math.floor(digits.length / 2); i++) {
    if (digits[i] !== digits[digits.length - 1 - i]) return false;
  }
  return true;
}

export function factorialDigitCount(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 0) return 0;
  if (n < 2) return 1;
  const digits = this.logGammaOf(n + 1) / Math.LN10;
  if (!Number.isFinite(digits)) return 0;
  return Math.floor(digits) + 1;
}

export function factorialTrailingZeros(args) {
  const n = Math.trunc(this.num(args.N));
  if (!Number.isFinite(n) || n < 0) return 0;
  let zeros = 0;
  let power = 5;
  while (power <= n) {
    zeros += Math.floor(n / power);
    power *= 5;
  }
  return zeros;
}