export function timeThis(args, util) {
  if (util.stackFrame.t === undefined) {
    util.stackFrame.t = now();
    util.startBranch(1, true);
  } else {
    lasts.set(String(args.NAME), now() - util.stackFrame.t);
  }
}
