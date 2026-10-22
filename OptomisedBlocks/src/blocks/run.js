export function run(args, util) {
  init(util);
  const t = execNow(get(args.F)[0], util.target);
  if (!t) return; // finished in this tick
  rt.threads.push(t);
  return new Promise((res) => {
    const chk = () => {
      if (t.status === 4 || !rt.threads.includes(t)) {
        rt.off("AFTER_EXECUTE", chk);
        res();
      }
    };
    rt.on("AFTER_EXECUTE", chk);
  });
}
