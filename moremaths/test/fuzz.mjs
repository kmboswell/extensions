import {
  blockSpecs,
  defaultArgs,
  registered,
  menuItems,
  util,
  isSane,
} from "./harness.mjs";

const specs = blockSpecs();
console.log(`fuzzing ${specs.length} blocks`);
const problems = [];
const nanResults = [];
let calls = 0;
const byType = {};

for (const entry of specs) {
  const opcode = entry.opcode;
  if (typeof registered[opcode] !== "function") {
    problems.push(`${opcode}: no handler on instance`);
    continue;
  }
  const defs = entry.arguments || {};
  const names = Object.keys(defs);
  // default call
  for (const variant of ["defaults", "adversarial", "text", "empty"]) {
    const overrides = {};
    for (const name of names) {
      const def = defs[name];
      if (def.menu === "list") {
        if (variant === "empty")
          overrides[name] = {
            type: "list",
            id: "none",
            name: "none",
            value: [],
          };
        else if (variant === "adversarial") overrides[name] = "testList";
        else if (variant === "text") overrides[name] = "missingList";
        continue;
      }
      if (def.menu) {
        const items = menuItems[def.menu] || [];
        if (variant === "adversarial" && items.length > 3)
          overrides[name] = items[items.length - 1];
        else if (variant === "text") overrides[name] = "nonsense";
        continue;
      }
      if (def.type === "number") {
        if (variant === "adversarial")
          overrides[name] = [1e9, 1e18, -1e18, 1e-9, 7][calls % 5];
        else if (variant === "text") overrides[name] = "12.5";
        else if (variant === "empty") overrides[name] = "";
        continue;
      }
      if (def.type === "boolean") {
        if (variant === "adversarial") overrides[name] = true;
        continue;
      }
      if (variant === "text") overrides[name] = "abc";
    }
    const args = defaultArgs(entry, overrides);
    calls += 1;
    let result;
    const started = Date.now();
    try {
      result = registered[opcode](args, util);
    } catch (error) {
      problems.push(`${opcode} [${variant}]: threw ${error.message}`);
      continue;
    }
    const elapsed = Date.now() - started;
    if (elapsed > 200)
      problems.push(`${opcode} [${variant}]: slow ${elapsed}ms`);
    const sane = isSane(result);
    if (sane === "undefined")
      problems.push(`${opcode} [${variant}]: returned undefined`);
    if (sane === "NaN") {
      nanResults.push(`${opcode} [${variant}]`);
    }
    const kind = Array.isArray(result) ? "list" : typeof result;
    byType[kind] = (byType[kind] || 0) + 1;
  }
}

console.log("calls:", calls, "result types:", JSON.stringify(byType));
console.log("NaN results:", nanResults.length);
console.log("NaN list:", nanResults.join(", "));
if (problems.length) {
  console.log("PROBLEMS:", problems.length);
  for (const line of problems.slice(0, 60)) console.log(" -", line);
  process.exit(1);
}
console.log("fuzz OK");
