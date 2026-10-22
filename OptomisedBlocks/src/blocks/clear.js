export function clear(args) {
  const [fn] = get(args.F);
  fn.stmts = [];
  fn.dirty = true;
}
