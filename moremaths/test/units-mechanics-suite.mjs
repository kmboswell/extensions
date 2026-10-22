import { registered as ext, defaultArgs, blockSpecs, menuItems, util } from "./harness.mjs";

import fs from "node:fs";

const COVERAGE_DIR = new URL(".coverage/", import.meta.url).pathname;
fs.mkdirSync(COVERAGE_DIR, { recursive: true });
const TAG = "v4";

let checks = 0;
const failures = [];
const byOpcode = Object.fromEntries(blockSpecs().map((b) => [b.opcode, b]));
const called = new Set();
function call(opcode, overrides = {}) {
  called.add(opcode);
  const entry = byOpcode[opcode];
  if (!entry) throw new Error(`unknown opcode ${opcode}`);
  for (const name of Object.keys(overrides)) {
    if (!(name in (entry.arguments || {}))) failures.push(`${opcode}: unknown argument ${name}`);
  }
  return ext[opcode](defaultArgs(entry, overrides), util);
}
function eq(name, actual, expected) {
  checks += 1;
  if (!Object.is(actual, expected)) failures.push(`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function close(name, actual, expected, relTol = 1e-9) {
  checks += 1;
  if (typeof actual !== "number" || !Number.isFinite(actual)) {
    failures.push(`${name}: expected ~${expected}, got ${actual}`);
    return;
  }
  const rel = Math.abs(actual - expected) / Math.max(Math.abs(expected), 1e-30);
  if (rel > relTol) failures.push(`${name}: expected ~${expected}, got ${actual} (rel ${rel.toExponential(2)})`);
}
function within(name, actual, expected, absTol) {
  checks += 1;
  if (typeof actual !== "number" || !(Math.abs(actual - expected) <= absTol)) {
    failures.push(`${name}: expected ${expected} ±${absTol}, got ${actual}`);
  }
}
function isNan(name, actual) {
  checks += 1;
  if (!Number.isNaN(actual)) failures.push(`${name}: expected NaN, got ${actual}`);
}
function ok(name, condition) {
  checks += 1;
  if (!condition) failures.push(`${name}: condition failed`);
}
function contains(name, actual, needle) {
  checks += 1;
  if (typeof actual !== "string" || !actual.includes(needle)) failures.push(`${name}: expected text containing ${JSON.stringify(needle)}, got ${JSON.stringify(actual)}`);
}
const listVars = new Map();
let listCounter = 0;
function lst(value) {
  const name = `L${listCounter += 1}`;
  let n = 0;
  const key = name;
  listVars.set(key, { id: key, type: "list", name: key, value });
  n += 1;
  util.target.lookupVariableById = (id) => listVars.get(id) || null;
  util.target.lookupVariableByNameAndType = (nm) => listVars.get(nm) || null;
  util.target.lookupList = (nm) => listVars.get(nm) || null;
  return key;
}

/* ---------------- leftover unit and mechanics opcodes ---------------- */
close("convert temperature c to f", call("convertTemperature", { TEMPERATURE: 100, FROM: "celsius", TO: "fahrenheit" }), 212, 1e-12);
within("convert temperature f to c", call("convertTemperature", { TEMPERATURE: 32, FROM: "fahrenheit", TO: "celsius" }), 0, 1e-9);
close("convert temperature c to k", call("convertTemperature", { TEMPERATURE: 0, FROM: "celsius", TO: "kelvin" }), 273.15, 1e-12);
close("convert temperature k to c", call("convertTemperature", { TEMPERATURE: 300, FROM: "kelvin", TO: "celsius" }), 26.85, 1e-12);
close("tonnes to pounds", call("tonnesToPounds", { TONNES: 2 }), 2 * 1000 * 2.2046226218487757, 1e-12);
close("metres to feet", call("metresToFeet", { M: 5 }), 5 * 3.280839895013123, 1e-12);
close("centimetres to inches", call("centimetresToInches", { CM: 10 }), 10 / 2.54, 1e-12);
close("kilometres to metres", call("kilometresToMetres", { KM: 7.5 }), 7500, 1e-12);
close("seconds to minutes", call("secondsToMinutes", { S: 180 }), 3, 1e-12);
close("minutes to hours", call("minutesToHours", { MIN: 150 }), 2.5, 1e-12);
close("days to years", call("daysToYears", { D: 365.2425 }), 1, 1e-12);
close("years to days", call("yearsToDays", { YR: 2 }), 730.485, 1e-12);
close("mph to kmh", call("milesPerHourToKilometresPerHour", { MPH: 60 }), 60 * 1.609344, 1e-12);
close("lever arm from torque", call("leverArmFromTorque", { TORQUE: 5, FORCE: 10 }), 0.5, 1e-12);
close("moment of force", call("momentOfForce", { FORCE: 10, LEVER_ARM: 0.5 }), 5, 1e-12);

close("wavelength from wave", call("wavelengthFromWave", { SPEED: 343, FREQUENCY: 440 }), 343 / 440, 1e-12);
isNan("wavelength from zero frequency", call("wavelengthFromWave", { SPEED: 343, FREQUENCY: 0 }));
close("specific heat from energy", call("specificHeatFromEnergy", { ENERGY: 41840, MASS: 2, TEMPERATURE_CHANGE: 10 }), 2092, 1e-12);
isNan("specific heat from zero mass", call("specificHeatFromEnergy", { ENERGY: 41840, MASS: 0, TEMPERATURE_CHANGE: 10 }));

/* ---------------- summary ---------------- */
console.log(`checks run: ${checks}`);
if (failures.length) {
  console.log(`FAILURES: ${failures.length}`);
  for (const line of failures) console.log(" -", line);
  process.exit(1);
}
console.log("ALL CHECKS PASSED");
fs.writeFileSync(`${COVERAGE_DIR}/${TAG}.json`, JSON.stringify([...called]));
console.log(`opcodes exercised: ${called.size} / ${Object.keys(byOpcode).length}`);
