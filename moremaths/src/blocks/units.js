export function convertUnit(args) {
  return this.convertBetween(args.VALUE, args.FROM, args.TO);
}

export function convertMass(args) {
  return this.convertBetween(args.MASS, args.FROM, args.TO);
}

export function convertLength(args) {
  return this.convertBetween(args.LENGTH, args.FROM, args.TO);
}

export function convertArea(args) {
  return this.convertBetween(args.AREA, args.FROM, args.TO);
}

export function convertVolume(args) {
  return this.convertBetween(args.VOLUME, args.FROM, args.TO);
}

export function convertTime(args) {
  return this.convertBetween(args.TIME, args.FROM, args.TO);
}

export function convertSpeed(args) {
  return this.convertBetween(args.SPEED, args.FROM, args.TO);
}

export function convertAcceleration(args) {
  return this.convertBetween(args.ACCELERATION, args.FROM, args.TO);
}

export function convertTemperature(args) {
  return this.convertBetween(args.TEMPERATURE, args.FROM, args.TO);
}

export function convertPressure(args) {
  return this.convertBetween(args.PRESSURE, args.FROM, args.TO);
}

export function convertEnergy(args) {
  return this.convertBetween(args.ENERGY, args.FROM, args.TO);
}

export function convertPower(args) {
  return this.convertBetween(args.POWER, args.FROM, args.TO);
}

export function convertForce(args) {
  return this.convertBetween(args.FORCE, args.FROM, args.TO);
}

export function convertDataSize(args) {
  return this.convertBetween(args.SIZE, args.FROM, args.TO);
}

export function convertFrequency(args) {
  return this.convertBetween(args.FREQUENCY, args.FROM, args.TO);
}

export function convertDensity(args) {
  return this.convertBetween(args.DENSITY, args.FROM, args.TO);
}

export function convertAngle(args) {
  return this.convertBetween(args.ANGLE, args.FROM, args.TO);
}

export function convertFuelEconomy(args) {
  return this.convertBetween(args.VALUE, args.FROM, args.TO);
}

export function convertFlow(args) {
  return this.convertBetween(args.FLOW, args.FROM, args.TO);
}

export function convertTorque(args) {
  return this.convertBetween(args.TORQUE, args.FROM, args.TO);
}

export function convertRadioactivity(args) {
  return this.convertBetween(args.VALUE, args.FROM, args.TO);
}

export function convertDose(args) {
  return this.convertBetween(args.DOSE, args.FROM, args.TO);
}

export function kilogramsToPounds(args) {
  return this.num(args.KG) * 2.2046226218487757;
}

export function poundsToKilograms(args) {
  return this.num(args.LB) / 2.2046226218487757;
}

export function poundsToStone(args) {
  return this.num(args.LB) / 14;
}

export function stoneToPounds(args) {
  return this.num(args.ST) * 14;
}

export function tonnesToPounds(args) {
  return this.num(args.TONNES) * 2204.6226218487757;
}

export function ouncesToGrams(args) {
  return this.num(args.OZ) * 28.349523125;
}

export function gramsToOunces(args) {
  return this.num(args.G) / 28.349523125;
}

export function kilometresToMiles(args) {
  return this.num(args.KM) / 1.609344;
}

export function milesToKilometres(args) {
  return this.num(args.MI) * 1.609344;
}

export function feetToMetres(args) {
  return this.num(args.FT) * 0.3048;
}

export function metresToFeet(args) {
  return this.num(args.M) / 0.3048;
}

export function inchesToCentimetres(args) {
  return this.num(args.IN) * 2.54;
}

export function centimetresToInches(args) {
  return this.num(args.CM) / 2.54;
}

export function milesToFeet(args) {
  return this.num(args.MI) * 5280;
}

export function feetToMiles(args) {
  return this.num(args.FT) / 5280;
}

export function celsiusToFahrenheit(args) {
  return this.num(args.C) * 1.8 + 32;
}

export function fahrenheitToCelsius(args) {
  return (this.num(args.F) - 32) / 1.8;
}

export function celsiusToKelvin(args) {
  return this.num(args.C) + 273.15;
}

export function kelvinToCelsius(args) {
  return this.num(args.K) - 273.15;
}

export function fahrenheitToKelvin(args) {
  return ((this.num(args.F) + 459.67) * 5) / 9;
}

export function kilometresToMetres(args) {
  return this.num(args.KM) * 1000;
}

export function litresToGallons(args) {
  return this.num(args.L) / 3.785411784;
}

export function gallonsToLitres(args) {
  return this.num(args.GAL) * 3.785411784;
}

export function secondsToMinutes(args) {
  return this.num(args.S) / 60;
}

export function minutesToHours(args) {
  return this.num(args.MIN) / 60;
}

export function hoursToDays(args) {
  return this.num(args.H) / 24;
}

export function daysToYears(args) {
  return this.num(args.D) / 365.2425;
}

export function yearsToDays(args) {
  return this.num(args.YR) * 365.2425;
}

export function kilometresPerHourToMilesPerHour(args) {
  return this.num(args.KPH) / 1.609344;
}

export function milesPerHourToKilometresPerHour(args) {
  return this.num(args.MPH) * 1.609344;
}

export function unitDimension(args) {
  const entry = this.unitEntryOf(args.UNIT);
  return entry === null ? "" : entry[0];
}

export function unitSymbol(args) {
  const entry = this.unitEntryOf(args.UNIT);
  return entry === null ? "" : entry[2];
}

export function unitName(args) {
  const entry = this.unitEntryOf(args.UNIT);
  return entry === null ? "" : entry[3];
}

export function unitDetail(args) {
  const entry = this.unitEntryOf(args.UNIT);
  if (entry === null) return "";
  const [dimension, factor, symbol, name, offset] = entry;
  if (dimension === "temperature") {
    return `${name} (${symbol}) is a temperature in ${dimension}`;
  }
  if (dimension === "fuel") {
    return `${name} (${symbol}) measures fuel economy`;
  }
  const base = this.baseSymbolFor(dimension);
  const converted = this.convertBetween(
    1,
    args.UNIT,
    this.baseUnitKeyFor(dimension),
  );
  if (!Number.isFinite(converted)) {
    return `${name} (${symbol}) is a ${dimension}`;
  }
  const rounded = Math.round(converted * 1e9) / 1e9;
  return `1 ${name} (${symbol}) = ${rounded} ${base} [${dimension}]`;
}

export function unitsInDimension(args) {
  const wanted = String(args.DIMENSION);
  const names = [];
  for (const key of Object.keys(UNITS)) {
    const entry = UNITS[key];
    if (entry[0] === wanted) names.push(`${entry[3]} (${entry[2]})`);
  }
  return names.join(", ");
}

export function unitDimensionsList() {
  const seen = [];
  for (const key of Object.keys(UNITS)) {
    if (seen.indexOf(UNITS[key][0]) < 0) seen.push(UNITS[key][0]);
  }
  return seen.join(", ");
}

export function unitKeyForSymbol(args) {
  const symbol = String(args.SYMBOL).trim();
  for (const key of Object.keys(UNITS)) {
    if (UNITS[key][2] === symbol) return key;
  }
  return "";
}
