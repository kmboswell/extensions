export function distanceBetweenPoints(args) {
  return Math.hypot(
    this.num(args.X2) - this.num(args.X1),
    this.num(args.Y2) - this.num(args.Y1),
  );
}

export function midpointX(args) {
  return (this.num(args.X1) + this.num(args.X2)) / 2;
}

export function midpointY(args) {
  return (this.num(args.Y1) + this.num(args.Y2)) / 2;
}

export function angleOfPoint(args) {
  return this.radiansToDegrees(Math.atan2(this.num(args.Y), this.num(args.X)));
}

export function polarToX(args) {
  return this.num(args.RADIUS) * Math.cos(this.degreesToRadians(args.ANGLE));
}

export function polarToY(args) {
  return this.num(args.RADIUS) * Math.sin(this.degreesToRadians(args.ANGLE));
}

export function areaOfTriangle(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const c = this.num(args.C);
  if (a <= 0 || b <= 0 || c <= 0) return 0;
  const s = (a + b + c) / 2;
  const area = s * (s - a) * (s - b) * (s - c);
  if (area < 0) return 0;
  return Math.sqrt(area);
}

export function areaOfCircle(args) {
  return Math.PI * Math.pow(this.num(args.RADIUS), 2);
}

export function areaOfRectangle(args) {
  return Math.abs(this.num(args.WIDTH) * this.num(args.HEIGHT));
}

export function areaOfEllipse(args) {
  return Math.PI * Math.abs(this.num(args.A) * this.num(args.B));
}

export function areaOfRegularPolygon(args) {
  const sides = this.num(args.SIDES);
  const side = this.num(args.SIDE);
  if (sides < 3) return 0;
  return (sides * side * side) / (4 * Math.tan(Math.PI / sides));
}

export function perimeterOfRectangle(args) {
  return 2 * (Math.abs(this.num(args.WIDTH)) + Math.abs(this.num(args.HEIGHT)));
}

export function circleCircumference(args) {
  return 2 * Math.PI * Math.abs(this.num(args.RADIUS));
}

export function arcLength(args) {
  const fraction = this.num(args.ANGLE) / 360;
  return 2 * Math.PI * Math.abs(this.num(args.RADIUS)) * fraction;
}

export function chordLength(args) {
  return (
    2 *
    Math.abs(this.num(args.RADIUS)) *
    Math.sin(this.degreesToRadians(this.num(args.ANGLE) / 2))
  );
}

export function sectorArea(args) {
  const fraction = this.num(args.ANGLE) / 360;
  return fraction * Math.PI * Math.pow(this.num(args.RADIUS), 2);
}

export function lawOfCosines(args) {
  const a = this.num(args.A);
  const b = this.num(args.B);
  const angle = this.degreesToRadians(args.ANGLE);
  return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angle));
}

export function lawOfSines(args) {
  const side = this.num(args.SIDE);
  const sideAngle = this.degreesToRadians(args.SIDE_ANGLE);
  const otherAngle = this.degreesToRadians(args.OTHER_ANGLE);
  const remaining = Math.PI - sideAngle - otherAngle;
  if (remaining <= 0) return NaN;
  return (side * Math.sin(remaining)) / Math.sin(sideAngle);
}

export function polygonArea(args, util) {
  const values = this.listNumbersOf(args.POINTS, util);
  if (!values) return 0;
  return this.polygonAreaOf(values);
}

export function polygonPerimeter(args, util) {
  const values = this.listNumbersOf(args.POINTS, util);
  if (!values) return 0;
  return this.polygonPerimeterOf(values);
}
