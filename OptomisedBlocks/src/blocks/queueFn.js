export function queueFn(args, util) {
  init(util);
  queue.push({ fn: get(args.F)[0], target: util.target });
}
