import { allAtOnce } from "./blocks/allAtOnce.js";
import { atEnd } from "./blocks/atEnd.js";
import { add } from "./blocks/add.js";
import { rm } from "./blocks/rm.js";
import { rmRange } from "./blocks/rmRange.js";
import { clear } from "./blocks/clear.js";
import { count } from "./blocks/count.js";
import { run } from "./blocks/run.js";
import { queueFn } from "./blocks/queueFn.js";
import { names, make } from "./methods.js";

export { setup } from "./setup.js";

export const blocks = {
  allAtOnce,
  atEnd,
  add,
  rm,
  rmRange,
  clear,
  count,
  run,
  queueFn,
  make, // Added here so the validator finds it in the blocks map
};

export const methods = {
  names,
  make,
};
