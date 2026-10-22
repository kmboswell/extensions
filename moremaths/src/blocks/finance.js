export function simpleInterest(args) {
  const principal = this.num(args.PRINCIPAL);
  const rate = this.num(args.RATE) / 100;
  const years = this.num(args.YEARS);
  return principal * rate * years;
}

export function compoundAmount(args) {
  const principal = this.num(args.PRINCIPAL);
  const rate = this.num(args.RATE) / 100;
  const years = this.num(args.YEARS);
  const periods = Math.trunc(this.num(args.PERIODS));
  const timesPerYear = periods > 0 ? periods : 1;
  return principal * Math.pow(1 + rate / timesPerYear, years * timesPerYear);
}

export function continuousCompoundAmount(args) {
  const principal = this.num(args.PRINCIPAL);
  const rate = this.num(args.RATE) / 100;
  const years = this.num(args.YEARS);
  return principal * Math.exp(rate * years);
}

export function annualPercentageYield(args) {
  const rate = this.num(args.RATE) / 100;
  const timesPerYear = Math.trunc(this.num(args.PERIODS));
  if (timesPerYear <= 0) return 0;
  return (Math.pow(1 + rate / timesPerYear, timesPerYear) - 1) * 100;
}

export function ruleOf72(args) {
  const rate = this.num(args.RATE);
  if (rate === 0) return Infinity;
  return 72 / rate;
}

export function doublingTime(args) {
  const rate = this.num(args.RATE) / 100;
  if (rate <= 0) return Infinity;
  return Math.log(2) / Math.log(1 + rate);
}

export function monthlyLoanPayment(args) {
  const principal = this.num(args.PRINCIPAL);
  const rate = this.num(args.RATE) / 100 / 12;
  const months = Math.trunc(this.num(args.MONTHS));
  if (months <= 0) return 0;
  if (rate === 0) return principal / months;
  return (principal * rate) / (1 - Math.pow(1 + rate, -months));
}

export function presentValue(args) {
  const amount = this.num(args.AMOUNT);
  const rate = this.num(args.RATE) / 100;
  const years = this.num(args.YEARS);
  return amount / Math.pow(1 + rate, years);
}