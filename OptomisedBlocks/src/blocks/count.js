export function count(args) {
  return get(args.F)[0].stmts.length;
}
