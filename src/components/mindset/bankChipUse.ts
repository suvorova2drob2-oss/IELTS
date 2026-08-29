/** Chip capacity: allow the same bank answer as many times as items need it. */

export function chipExhausted(
  chipId: string,
  keysNeeded: string[],
  placed: string[],
): boolean {
  const need = keysNeeded.filter((k) => k === chipId).length;
  const used = placed.filter((v) => v === chipId).length;
  if (need === 0) {
    // Distractor: grey after one mistaken placement
    return used >= 1;
  }
  return used >= need;
}

export function gapChipExhausted(
  word: string,
  items: { key: string; altKeys?: string[] }[],
  placed: string[],
  norm: (s: string) => string,
): boolean {
  const nw = norm(word);
  const need = items.filter(
    (it) =>
      norm(it.key) === nw ||
      (it.altKeys ?? []).some((a) => norm(a) === nw),
  ).length;
  const used = placed.filter((v) => norm(v) === nw).length;
  if (need === 0) return used >= 1;
  return used >= need;
}
