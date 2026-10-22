export function colorUnder(args, util) {
  const r = vm.renderer;
  const id = util.target.drawableID;
  const bounds = r._touchingBounds(id); // clamped to the stage, so no offstage
  if (!bounds) return "";
  ensure();
  if (!data) return "";

  const drawable = r._allDrawables[id];
  drawable.updateCPURenderAttributes();
  const D = drawable.constructor;
  const sid = stageTarget().drawableID;
  // the backdrop comes from the cache, everything else is blended live
  const cands = r
    ._candidatesTouching(id, r._visibleDrawList || r._drawList)
    .filter((c) => c.id !== sid);

  const step = Math.max(
    1,
    Math.ceil(Math.sqrt((bounds.width * bounds.height) / SAMPLES)),
  );
  let R = 0;
  let G = 0;
  let B = 0;
  let n = 0;
  let missed = false;
  let sdReady = false;

  for (let y = bounds.bottom; y <= bounds.top; y += step) {
    for (let x = bounds.left; x <= bounds.right; x += step) {
      point[0] = x;
      point[1] = y;
      if (!drawable.isTouching(point)) continue;

      let pr = 0;
      let pg = 0;
      let pb = 0;
      let a = 1;
      for (let k = 0; k < cands.length; k++) {
        D.sampleColor4b(point, cands[k].drawable, tmp);
        pr += tmp[0] * a;
        pg += tmp[1] * a;
        pb += tmp[2] * a;
        a *= 1 - tmp[3] / 255;
        if (a === 0) break;
      }
      if (a > 0) {
        const cx = Math.min(CW - 1, Math.max(0, ((x + W / 2) / CELL) | 0));
        const cy = Math.min(CH - 1, Math.max(0, ((H / 2 - y) / CELL) | 0));
        const i = cy * CW + cx;
        if (!filled[i]) {
          missed = true;
          if (!sdReady) {
            stageDrawable().updateCPURenderAttributes();
            sdReady = true;
          }
          fillIdx(i);
        }
        pr += data[i * 3] * a;
        pg += data[i * 3 + 1] * a;
        pb += data[i * 3 + 2] * a;
      }
      R += pr;
      G += pg;
      B += pb;
      n++;
    }
  }

  if (missed) {
    // tell the idle scanner to fill the area around this sprite next
    if (hot.size >= MAX_HOT) hot.delete(hot.keys().next().value);
    const toX = (v) => Math.min(CW - 1, Math.max(0, ((v + W / 2) / CELL) | 0));
    const toY = (v) => Math.min(CH - 1, Math.max(0, ((H / 2 - v) / CELL) | 0));
    hot.set(id, {
      x0: toX(bounds.left - HOT_PAD),
      x1: toX(bounds.right + HOT_PAD),
      y0: toY(bounds.top + HOT_PAD),
      y1: toY(bounds.bottom - HOT_PAD),
    });
  }

  if (!n) return "";
  return (
    "#" +
    hex(Math.round(R / n)) +
    hex(Math.round(G / n)) +
    hex(Math.round(B / n))
  );
}
