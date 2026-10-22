// Everything here ends up at the top of the built file, so the handlers in
// src/blocks can use these names. Handlers are copied out as text, so they
// can't import anything.
export function setup() {
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Sense Color must run unsandboxed");
  }

  const vm = Scratch.vm;
  const rt = vm.runtime;
  const CELL = 2; // px per cache cell
  const SAMPLES = 256; // max sample points per lookup
  const HOT_PAD = 40; // px around a queried sprite scanned first
  const MAX_HOT = 64;

  const hex = (n) => n.toString(16).padStart(2, "0");
  const point = new Float32Array(3);
  const tmp = new Uint8ClampedArray(4);

  let W = 0;
  let H = 0;
  let CW = 0;
  let CH = 0;
  let data = null;
  let filled = null;
  let filledCount = 0;
  let cursor = 0;
  let key = "";
  const hot = new Map(); // drawableID -> cell rect still to scan

  const stageTarget = () => rt.getTargetForStage();
  const stageDrawable = () => {
    const t = stageTarget();
    return t && vm.renderer._allDrawables[t.drawableID];
  };

  const reset = () => {
    filled.fill(0);
    filledCount = 0;
    cursor = 0;
    hot.clear();
  };

  // reallocate on stage resize, wipe the cache when the backdrop changes
  const ensure = () => {
    if (W !== rt.stageWidth || H !== rt.stageHeight || !data) {
      W = rt.stageWidth;
      H = rt.stageHeight;
      CW = Math.ceil(W / CELL);
      CH = Math.ceil(H / CELL);
      data = new Uint8Array(CW * CH * 3);
      filled = new Uint8Array(CW * CH);
      key = "";
    }
    const s = stageTarget();
    const d = stageDrawable();
    if (!s || !d) return;
    const k =
      (d.skin ? d.skin.id : "") + "|" + Object.values(s.effects).join(",");
    if (k !== key) {
      key = k;
      reset();
    }
  };

  const fillIdx = (i) => {
    const sd = stageDrawable();
    const cx = i % CW;
    const cy = (i / CW) | 0;
    point[0] = -W / 2 + cx * CELL + CELL / 2;
    point[1] = H / 2 - cy * CELL - CELL / 2;
    vm.renderer.sampleColor4b(point, [{ drawable: sd }], tmp);
    data[i * 3] = tmp[0];
    data[i * 3 + 1] = tmp[1];
    data[i * 3 + 2] = tmp[2];
    filled[i] = 1;
    filledCount++;
  };

  // idle scan: hot areas near queried sprites first, then the whole stage
  const scan = (deadline) => {
    const sd = stageDrawable();
    if (!sd) return;
    sd.updateCPURenderAttributes();
    let n = 0;
    const over = () => (++n & 63) === 0 && performance.now() > deadline;

    for (const [id, r] of hot) {
      let missing = false;
      for (let cy = r.y0; cy <= r.y1; cy++) {
        for (let cx = r.x0; cx <= r.x1; cx++) {
          const i = cy * CW + cx;
          if (filled[i]) continue;
          missing = true;
          fillIdx(i);
          if (over()) return;
        }
      }
      if (!missing) hot.delete(id);
    }
    while (cursor < CW * CH) {
      const i = cursor++;
      if (filled[i]) continue;
      fillIdx(i);
      if (over()) return;
    }
  };

  // idle detection from the frame interval and how long scripts ran
  let tBefore = 0;
  let lastBefore = 0;
  let interval = 0;
  rt.on("BEFORE_EXECUTE", () => {
    const t = performance.now();
    interval = t - lastBefore;
    lastBefore = tBefore = t;
  });
  rt.on("AFTER_EXECUTE", () => {
    const t = performance.now();
    const busy = t - tBefore;
    const step = rt.currentStepTime || 1000 / 30;
    ensure();
    if (!data || (filledCount >= CW * CH && hot.size === 0)) return;
    if (interval > step * 1.2 || busy > step * 0.6) return;
    scan(t + Math.min(3, (step - busy) * 0.5));
  });
}
