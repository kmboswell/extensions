// A function is a private block container. "add blocks" copies the C block's
// contents into it, "run" starts a thread on that container, so TurboWarp
// compiles it once and reuses the result until the function is edited.
export function setup() {
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Optomised Blocks must run unsandboxed");
  }

  const vm = Scratch.vm;
  const rt = vm.runtime;
  const F = new Map(); // name -> { stmts, container, dirty, first }
  const anon = new Map(); // C block id -> { fn, sig, epoch }
  const snaps = new Map(); // C block id -> { stmts, epoch }
  const queue = []; // deferred runs: { fn, target }
  let uid = 0;
  let epoch = 0;
  let Thread;
  let Blocks;
  const nid = () => "cf" + (uid++).toString(36);

  // any real project edit invalidates snapshots
  rt.on("PROJECT_CHANGED", () => {
    epoch++;
  });

  const init = (util) => {
    Thread = Thread || util.thread.constructor;
    Blocks = Blocks || util.target.blocks.constructor;
  };

  const get = (name) => {
    name = String(name);
    let fn = F.get(name);
    if (!fn) {
      fn = { stmts: [], container: null, dirty: true, first: null };
      F.set(name, fn);
      return [fn, true];
    }
    return [fn, false];
  };

  // copy one block and everything nested in its inputs
  const collect = (src, id, out, followNext) => {
    const b = src.getBlock(id);
    if (!b || out[id]) return;
    out[id] = JSON.parse(JSON.stringify(b));
    for (const k in b.inputs) {
      const inp = b.inputs[k];
      if (inp.block) collect(src, inp.block, out, true);
      if (inp.shadow && inp.shadow !== inp.block)
        collect(src, inp.shadow, out, true);
    }
    if (followNext && b.next) collect(src, b.next, out, true);
  };

  // snapshot the substack of the C block that is running (cached per epoch)
  const capture = (th) => {
    const cid = th.peekStack();
    const hit = snaps.get(cid);
    if (hit && hit.epoch === epoch) return [cid, hit.stmts];
    const src = th.blockContainer;
    const blk = src.getBlock(cid);
    let id = blk && blk.inputs.SUBSTACK && blk.inputs.SUBSTACK.block;
    const stmts = [];
    while (id) {
      const blocks = {};
      collect(src, id, blocks, false);
      blocks[id].next = null;
      stmts.push({ root: id, blocks });
      id = src.getBlock(id).next;
    }
    snaps.set(cid, { stmts, epoch });
    return [cid, stmts];
  };

  const build = (fn) => {
    const c = new Blocks(rt, true);
    c.emitProjectChanged = () => {}; // do not flag the project as modified
    let prev = null;
    fn.first = null;
    for (const snap of fn.stmts) {
      const map = {};
      for (const old in snap.blocks) map[old] = nid();
      for (const old in snap.blocks) {
        const b = JSON.parse(JSON.stringify(snap.blocks[old]));
        b.id = map[old];
        b.parent = b.parent && map[b.parent] ? map[b.parent] : null;
        b.next = b.next && map[b.next] ? map[b.next] : null;
        b.topLevel = false;
        for (const k in b.inputs) {
          const i = b.inputs[k];
          if (i.block) i.block = map[i.block] || i.block;
          if (i.shadow) i.shadow = map[i.shadow] || i.shadow;
        }
        c.createBlock(b);
      }
      const root = c.getBlock(map[snap.root]);
      if (prev) {
        c.getBlock(prev).next = root.id;
        root.parent = prev;
      } else {
        root.topLevel = true;
        c._addScript(root.id);
        fn.first = root.id;
      }
      prev = root.id;
    }
    c.resetCache();
    fn.container = c;
    fn.dirty = false;
  };

  // step a function once, right now. returns the thread if it is still alive
  const execNow = (fn, target) => {
    if (!fn.stmts.length) return null;
    if (fn.dirty || !fn.container) build(fn);
    const t = new Thread(fn.first);
    t.target = target;
    t.stackClick = false;
    t.updateMonitor = false;
    t.blockContainer = fn.container;
    t.pushStack(fn.first);
    if (rt.compilerOptions.enabled) t.tryCompile(); // cached in fn.container
    const seq = rt.sequencer;
    const prev = seq.activeThread;
    seq.stepThread(t);
    seq.activeThread = prev;
    return t.status === 4 ? null : t;
  };

  // end of frame: every main script has already run
  rt.on("AFTER_EXECUTE", () => {
    if (!queue.length) return;
    const items = queue.splice(0, queue.length);
    for (const it of items) {
      try {
        const t = execNow(it.fn, it.target);
        if (t) rt.threads.push(t); // yielded (wait, loop): the engine continues it
      } catch (e) {
        console.warn("[optomisedblocks] deferred run failed", e);
      }
    }
  });

  const anonFn = (th) => {
    const [cid, stmts] = capture(th);
    const hit = anon.get(cid);
    if (hit && hit.epoch === epoch) return hit.fn;
    const sig = JSON.stringify(stmts);
    if (hit && hit.sig === sig) {
      hit.epoch = epoch; // unchanged: keep the container and its compiled code
      return hit.fn;
    }
    const fn = { stmts, container: null, dirty: true, first: null };
    anon.set(cid, { fn, sig, epoch });
    return fn;
  };
}
