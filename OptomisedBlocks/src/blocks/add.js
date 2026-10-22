export function add(args, util) {
  init(util);
  const [fn, created] = get(args.F);
  const [, stmts] = capture(util.thread);
  for (const s of stmts) fn.stmts.push(s);
  fn.dirty = true;
  if (created) vm.extensionManager.refreshBlocks();
}
