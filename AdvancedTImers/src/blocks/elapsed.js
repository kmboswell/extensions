export function elapsed(args) {
  const t = starts.get(String(args.NAME));
  if (t === undefined) return 0;
  return conv(now() - t, String(args.UNIT));
}
