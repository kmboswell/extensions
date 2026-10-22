export function constantPi() {
  return Math.PI;
}

export function constantE() {
  return Math.E;
}

export function constantTau() {
  return Math.PI * 2;
}

export function constantPhi() {
  return (1 + Math.sqrt(5)) / 2;
}

export function constantSqrt2() {
  return Math.SQRT2;
}

export function mathConstant(args) {
  switch (args.CONSTANT) {
    case "pi":
      return Math.PI;
    case "e":
      return Math.E;
    case "tau":
      return Math.PI * 2;
    case "phi":
      return (1 + Math.sqrt(5)) / 2;
    case "sqrt2":
      return Math.SQRT2;
    case "sqrt3":
      return Math.sqrt(3);
    case "sqrt5":
      return Math.sqrt(5);
    case "sqrt2pi":
      return Math.sqrt(2 * Math.PI);
    case "gelfond":
      return Math.pow(Math.E, Math.PI);
    case "eulerGamma":
      return 0.5772156649015329;
    case "catalan":
      return 0.915965594177219;
    case "apery":
      return 1.202056903159594;
    case "zeta2":
      return (Math.PI * Math.PI) / 6;
    case "ln2":
      return Math.LN2;
    case "ln10":
      return Math.LN10;
    case "plastic":
      return 1.324717957244746;
    case "goldenAngle":
      return 137.50776405003785;
    default:
      return NaN;
  }
}