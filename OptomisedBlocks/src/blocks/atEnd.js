export function atEnd(args, util) {
  init(util);
  const fn = anonFn(util.thread);
  if (fn.stmts.length) queue.push({ fn, target: util.target });
  // the substack is stored, not run in place
}
