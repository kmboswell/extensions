export function polynomialAt(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length === 0) return 0;
  return this.polynomialValueOf(coefficients, args.X);
}

export function polynomialDegree(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length === 0) return 0;
  return coefficients.length - 1;
}

export function polynomialDerivativeAt(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length < 2) return 0;
  return this.polynomialValueOf(this.polynomialDerivativeOf(coefficients), args.X);
}

export function polynomialIntegral(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length === 0) return 0;
  return this.polynomialIntegralOf(coefficients, args.FROM, args.TO);
}

export function polynomialLimit(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length === 0) return 0;
  return this.polynomialValueOf(coefficients, args.X);
}

export function polynomialDerivativeTerms(args, util) {
  const coefficients = this.listNumbersOf(args.COEFFICIENTS, util);
  if (!coefficients || coefficients.length < 2) return "";
  return this.joinNumbers(this.polynomialDerivativeOf(coefficients));
}