import { registered as ext, defaultArgs, blockSpecs } from "./harness.mjs";
const byOpcode = Object.fromEntries(blockSpecs().map((b) => [b.opcode, b]));
const call = (opcode, overrides = {}) => ext[opcode](defaultArgs(byOpcode[opcode], overrides), undefined);
const cases = [
  ["hypergeometricCdf huge", "hypergeometricCdf", { K: 5e8, DRAWN: 1e9, SUCCESSES: 4e8, POPULATION: 1e9 }],
  ["hypergeometricCdf large k", "hypergeometricCdf", { K: 999999, DRAWN: 1000000, SUCCESSES: 500000, POPULATION: 1000000 }],
  ["hypergeometricCdf exact", "hypergeometricCdf", { K: 4, DRAWN: 10, SUCCESSES: 4, POPULATION: 20 }],
  ["binomialCdf large", "binomialCdf", { K: 1e6, TRIALS: 1e7, PROBABILITY: 0.1 }],
  ["binomialPmf large", "binomialPmf", { K: 5e6, TRIALS: 1e7, PROBABILITY: 0.1 }],
  ["poissonQuantile large", "poissonQuantile", { PROBABILITY: 0.5, RATE: 1e6 }],
  ["poissonQuantile tail", "poissonQuantile", { PROBABILITY: 0.999999, RATE: 100 }],
  ["normalQuantile", "normalQuantile", { PROBABILITY: 1e-12 }],
  ["gammaQuantile", "gammaQuantile", { PROBABILITY: 1e-12, SHAPE: 1e6, SCALE: 1 }],
  ["gammaQuantile tail", "gammaQuantile", { PROBABILITY: 1 - 1e-12, SHAPE: 0.001 }],
  ["betaQuantile", "betaQuantile", { PROBABILITY: 1e-15, A: 1e4, B: 1e-4 }],
  ["fDistributionCdf", "fDistributionCdf", { X: 1e6, NUMERATOR_DEGREES: 1, DENOMINATOR_DEGREES: 1e6 }],
  ["chiSquareCdf", "chiSquareCdf", { X: 1e7, DEGREES_OF_FREEDOM: 1e7 }],
  ["rationalApproximation", "rationalApproximationList", { VALUE: 3.14159265358979, MAX_DENOMINATOR: 1e7 }],
  ["continuedFraction", "continuedFractionList", { VALUE: 3.14159265358979, TERMS: 500 }],
  ["chineseRemainder", "chineseRemainder", { REMAINDER1: 123456789, MODULUS1: 999983, REMAINDER2: 987654321, MODULUS2: 999979 }],
  ["modularInverse", "modularInverse", { VALUE: 1e18, MODULUS: 999999999999999989 }],
  ["modularPower", "modularPowerOf", { BASE: 1e9, EXPONENT: 1e9, MODULUS: 999999999999999989 }],
  ["isPrime big", "isPrime", { N: 2 ** 61 - 1 }],
  ["countPrimes", "primeCountUpTo", { N: 100000000 }],
  ["fibonacci", "fibonacci", { N: 2000 }],
  ["sampleSizeForMargin", "sampleSizeForMargin", { MARGIN: 1e-9, LEVEL: 0.5, SIGMA: 1e9 }],
  ["confidenceInterval", "confidenceIntervalList", { LIST: "testList", LEVEL: 1e-12 }],
  ["polynomialFit", "polynomialFitList", { XS: "testList", YS: "testList", DEGREE: 12 }],
  ["tribonacci", "tribonacci", { N: 10000 }],
  ["normalZScore", "normalZScore", { VALUE: 1, MEAN: 1e18, DEVIATION: 1e-18 }],
  ["betaSample", "betaSample", { A: 1e-8, B: 1e-8 }],
  ["weibullSample", "weibullSample", { SHAPE: 1e-8, SCALE: 1 }],
  ["gammaSample", "gammaSample", { SHAPE: 1e6, SCALE: 1 }],
  ["studentTCdf", "studentTCdf", { X: 1e9, DEGREES_OF_FREEDOM: 0.001 }],
  ["laplaceQuantile", "laplaceQuantile", { PROBABILITY: 1 - 1e-15 }],
];
const unknown = cases.filter(([, opcode]) => typeof ext[opcode] !== "function");
if (unknown.length) {
  console.log(`TIMING CASES INVALID: ${unknown.map(([name, opcode]) => `${name} -> ${opcode}`).join(", ")}`);
  process.exit(1);
}
const badArgs = cases.filter(([, opcode, overrides]) =>
  Object.keys(overrides).some((arg) => !(arg in (byOpcode[opcode].arguments || {}))));
if (badArgs.length) {
  console.log(`TIMING CASES INVALID ARGS: ${badArgs.map(([name, opcode]) => `${name} -> ${opcode}`).join(", ")}`);
  process.exit(1);
}
let slow = 0;
for (const [name, opcode, overrides] of cases) {
  const start = Date.now();
  let result;
  try {
    result = call(opcode, overrides);
  } catch (error) {
    result = `THREW ${error.message}`;
  }
  const ms = Date.now() - start;
  if (ms > 200) slow += 1;
  const shown = typeof result === "number" ? Number(result.toPrecision(6)) : Array.isArray(result) ? `[${result.length}]` : result;
  console.log(`${ms.toString().padStart(6)}ms ${name} -> ${shown}`);
}
const threw = cases.filter(([name]) => name && false);
console.log(slow === 0 ? "TIMING OK" : `TIMING SLOW: ${slow}`);
