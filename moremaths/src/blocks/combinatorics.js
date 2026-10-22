export function factorial(args) {
  return this.factorialOf(args.N);
}

export function doubleFactorial(args) {
  return this.doubleFactorialOf(args.N);
}

export function derangements(args) {
  return this.subfactorialOf(args.N);
}

export function permutations(args) {
  const n = this.whole(args.N);
  const k = this.whole(args.K);
  if (!Number.isFinite(n) || !Number.isFinite(k)) return NaN;
  if (n < 0 || k < 0) return NaN;
  if (k > n) return 0;
  let total = 1;
  for (let i = 0; i < k; i++) {
    total *= n - i;
    if (!Number.isFinite(total)) return Infinity;
  }
  return total;
}

export function combinations(args) {
  return this.binomialOf(args.N, args.K);
}

export function combinationsWithRepetition(args) {
  const n = this.whole(args.N);
  const k = this.whole(args.K);
  if (!Number.isFinite(n) || !Number.isFinite(k)) return NaN;
  if (n < 1 || k < 0) return NaN;
  return this.binomialOf(n + k - 1, k);
}

export function multinomial(args) {
  const n = this.whole(args.N);
  const parts = [this.whole(args.A), this.whole(args.B), this.whole(args.C)];
  if (!Number.isFinite(n) || parts.some((part) => !Number.isFinite(part))) {
    return NaN;
  }
  if (n < 0 || parts.some((part) => part < 0)) return NaN;
  if (parts.reduce((total, part) => total + part, 0) !== n) return NaN;
  let total = this.factorialOf(n);
  for (const part of parts) total /= this.factorialOf(part);
  return Math.round(total);
}

export function stirlingSecondKind(args) {
  return this.stirlingSecondOf(args.N, args.K);
}

export function stirlingFirstKind(args) {
  return this.stirlingFirstOf(args.N, args.K);
}

export function catalanNumber(args) {
  return this.catalanOf(args.N);
}

export function bellNumber(args) {
  return this.bellOf(args.N);
}

export function fibonacci(args) {
  return this.fibonacciOf(args.N);
}

export function lucas(args) {
  return this.lucasOf(args.N);
}

export function tribonacci(args) {
  return this.tribonacciOf(args.N);
}

export function combinationChance(args) {
  const wins = this.binomialOf(args.WINS, args.DRAW);
  const total = this.binomialOf(args.TOTAL, args.DRAW);
  if (total === 0) return NaN;
  return wins / total;
}
