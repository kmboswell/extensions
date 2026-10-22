export function coverage() {
  ensure();
  return data ? (filledCount / (CW * CH)) * 100 : 0;
}
