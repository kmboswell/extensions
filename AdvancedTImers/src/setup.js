export function setup() {
  const starts = new Map(); // name -> performance.now() at start
  const lasts = new Map(); // name -> ms of the last "time this" run
  const now = () => performance.now();

  // factors from milliseconds. micro sign, greek mu and "us" all work
  const PER_MS = {
    s: 1e-3,
    ms: 1,
    us: 1e3,
    "\u00b5s": 1e3,
    "\u03bcs": 1e3,
    ns: 1e6,
  };
  const conv = (ms, unit) => ms * (PER_MS[unit] ?? 1);
}
