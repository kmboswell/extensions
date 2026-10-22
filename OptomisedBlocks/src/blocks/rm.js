export function rm(args) {
  const [fn] = get(args.F);
  const i = Math.round(args.N) - 1;
  if (i >= 0 && i < fn.stmts.length) {
    fn.stmts.splice(i, 1);
    fn.dirty = true;
  }
}
