// dropdown items for the [F] menu
export function names() {
  return F.size ? [...F.keys()] : [""];
}

// palette button
export function make() {
  const n = prompt("Function name?");
  if (n) get(n);
  vm.extensionManager.refreshBlocks();
}
