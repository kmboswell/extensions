import fs from "node:fs";
import {
  manifest,
  menuItems,
  registered,
  blockSpecs,
  util,
  defaultArgs,
  ADVERSARIAL,
} from "./harness.mjs";

const unitMenus = new Set([
  "anyUnit",
  "lengthUnit",
  "massUnit",
  "areaUnit",
  "volumeUnit",
  "timeUnit",
  "speedUnit",
  "accelerationUnit",
  "temperatureUnit",
  "pressureUnit",
  "energyUnit",
  "powerUnit",
  "forceUnit",
  "dataSizeUnit",
  "frequencyUnit",
  "densityUnit",
  "angleUnit",
  "fuelUnit",
  "flowUnit",
  "torqueUnit",
  "activityUnit",
  "catalogUnit",
  "rotationUnit",
  "angleWrapUnit",
]);
let problems = 0;
for (const menu of unitMenus) {
  for (const value of menuItems[menu] || []) {
    if (registered.unitEntryOf(value) === null) {
      console.log(`unit menu "${menu}" item "${value}" has no UNITS entry`);
      problems += 1;
    }
  }
}
console.log(
  problems === 0 ? "unit menu values OK" : `UNIT MENU PROBLEMS ${problems}`,
);

/* menus that no block uses, and items no block selects */
const usedMenus = new Set();
for (const entry of blockSpecs()) {
  for (const [name, def] of Object.entries(entry.arguments || {})) {
    if (def.menu) usedMenus.add(def.menu);
  }
}
const declaredMenus = new Set(Object.keys(menuItems));
const deadMenus = [...declaredMenus].filter((m) => !usedMenus.has(m)).sort();
console.log(
  `declared menus: ${declaredMenus.size}, referenced by blocks: ${usedMenus.size}`,
);
console.log("menus never used by a block:", deadMenus.join(" ") || "(none)");
const unknownMenus = [...usedMenus].filter((m) => !declaredMenus.has(m)).sort();
console.log("block menus not declared:", unknownMenus.join(" ") || "(none)");

/* blockType vs handler return kinds */
const kinds = new Map();
const inputs = [
  {},
  ...ADVERSARIAL.map((v) => ({ X: v, VALUE: v, NUMBER: v, N: v })),
  { LIST: "testList" },
];
for (const entry of blockSpecs()) {
  for (const input of inputs) {
    let result;
    try {
      result = registered[entry.opcode](defaultArgs(entry, input), util);
    } catch (error) {
      console.log(
        `throw: ${entry.opcode} (${entry.blockType}) ${error.message}`,
      );
      problems += 1;
      continue;
    }
    const kind = Array.isArray(result) ? "list" : typeof result;
    if (!kinds.has(entry.opcode)) kinds.set(entry.opcode, new Set());
    kinds
      .get(entry.opcode)
      .add(kind === "number" && Number.isNaN(result) ? "number(NaN)" : kind);
  }
}
const mismatches = [];
for (const entry of blockSpecs()) {
  const seen = kinds.get(entry.opcode);
  const numeric = [...seen].every((k) => k.startsWith("number"));
  const booleans = [...seen].every((k) => k === "boolean");
  const texts = [...seen].every((k) => k === "string");
  const lists = [...seen].every((k) => k === "list");
  const declared = entry.blockType;
  const expected =
    declared === "boolean"
      ? "boolean"
      : declared === "reporter"
        ? "number/list/text"
        : declared;
  let bad = false;
  if (declared === "boolean") bad = !booleans;
  else if (declared === "reporter") bad = false;
  else if (declared === "Boolean reporter" || declared === "boolean reporter")
    bad = !booleans;
  if (bad)
    mismatches.push(
      `${entry.opcode} declared ${declared} returns ${[...seen].join("+")}`,
    );
}
console.log(mismatches.length ? mismatches.join("\n") : "block types OK");
fs.writeFileSync(
  new URL(".coverage/kinds.json", import.meta.url).pathname,
  JSON.stringify([...kinds].map(([k, v]) => [k, [...v]])),
);
console.log(
  problems === 0 && mismatches.length === 0
    ? "AUDIT OK"
    : "AUDIT PROBLEMS FOUND",
);
