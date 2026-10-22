export function last(args) {
  const ms = lasts.get(String(args.NAME));
  if (ms === undefined) return 0;
  return conv(ms, String(args.UNIT));
}
