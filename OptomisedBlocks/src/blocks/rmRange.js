export function rmRange(args) {
  const [fn] = get(args.F);
  let a = Math.max(1, Math.round(args.A));
  let b = Math.min(fn.stmts.length, Math.round(args.B));
  if (a > b) [a, b] = [b, a];
  if (b >= a) {
    fn.stmts.splice(a - 1, b - a + 1);
    fn.dirty = true;
  }
}
