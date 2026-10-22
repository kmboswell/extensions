import fs from "node:fs";
import { parse } from "yaml";

const DIST = new URL("../../dist/moremaths.js", import.meta.url);
const MANIFEST = new URL("../twext.yml", import.meta.url);

let registered = null;
const listVariables = new Map();
globalThis.Blockly = { FIELD_NUMBER: "NumberField" };

const Scratch = {
  Cast: {
    toNumber(value) {
      if (typeof value === "number") return value;
      if (typeof value === "boolean") return value ? 1 : 0;
      const n = Number(value);
      return Number.isNaN(n) ? 0 : n;
    },
    toString(value) {
      if (typeof value === "string") return value;
      if (value === null || value === undefined) return "";
      if (typeof value === "boolean") return value ? "true" : "false";
      if (typeof value === "number") return String(value);
      return String(value);
    },
    toBoolean(value) {
      if (typeof value === "boolean") return value;
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") return value.length > 0;
      return Boolean(value);
    },
  },
  vm: null,
  extensions: {
    register(instance) {
      registered = instance;
    },
  },
};
globalThis.Scratch = Scratch;

const code = fs.readFileSync(DIST, "utf8");
new Function("Scratch", code)(Scratch);
if (registered === null) throw new Error("extension did not register");

const manifest = parse(fs.readFileSync(MANIFEST, "utf8"));
const menus = manifest.extension.menus;
const menuItems = {};
for (const [name, def] of Object.entries(menus)) {
  menuItems[name] = Array.isArray(def.items)
    ? def.items.map((item) => (typeof item === "string" ? item : item.value))
    : [];
}

const TEST_LIST = [1, 2, 2, 3, 4, 8, 13];
listVariables.set("testList", { id: "testList", type: "list", name: "testList", value: TEST_LIST });
listVariables.set("emptyList", { id: "emptyList", type: "list", name: "emptyList", value: [] });
const util = {
  target: {
    lookupVariableById(id) {
      return listVariables.get(id) || null;
    },
    lookupVariableByNameAndType(name) {
      return listVariables.get(name) || null;
    },
    lookupList(name) {
      return listVariables.get(name) || null;
    },
  },
  runtime: null,
};

function listRef(name = "testList") {
  return name;
}

const ADVERSARIAL = [
  0, 1, -1, 2, 0.5, -0.5, 1e9, -1e9, 1e18, -1e18, 1e-18, 123.456, -123.456,
  10, 100, 1000, 1e6, 3.14159, 2.71828, 0.1, 255, 1024, 1e15,
];

export function blockSpecs() {
  const specs = [];
  for (const entry of manifest.blocks) {
    if (!entry.opcode) continue;
    specs.push(entry);
  }
  return specs;
}

export function defaultArgs(entry, overrides = {}) {
  const args = {};
  const defs = entry.arguments || {};
  for (const [name, def] of Object.entries(defs)) {
    if (name in overrides) {
      args[name] = overrides[name];
      continue;
    }
    if (def.menu === "list") {
      args[name] = listRef();
    } else if (def.menu) {
      const items = menuItems[def.menu] || [];
      args[name] = items[0];
    } else if (def.type === "number") {
      args[name] = def.defaultValue === undefined ? 0 : def.defaultValue;
    } else if (def.type === "boolean") {
      args[name] = false;
    } else {
      args[name] = "";
    }
  }
  return args;
}

export { registered, manifest, menuItems, util, listRef, TEST_LIST, ADVERSARIAL, Scratch };

export function isSane(value) {
  if (value === undefined) return "undefined";
  if (typeof value === "number") {
    if (Number.isNaN(value)) return "NaN";
  }
  if (typeof value === "object" && value !== null) return null;
  return null;
}
