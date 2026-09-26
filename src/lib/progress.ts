import { useSyncExternalStore } from "react";

const DONE_KEY = "ppl-done-v1";

let done = new Set<string>();
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem(DONE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) done = new Set(parsed.filter((id) => typeof id === "string"));
    }
  } catch {
    /* ignore */
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    window.localStorage.setItem(DONE_KEY, JSON.stringify([...done]));
  } catch {
    /* ignore */
  }
}

export function isLabDone(id: string) {
  return done.has(id);
}

export function setLabDone(id: string, value: boolean) {
  if (value === done.has(id)) return;
  const next = new Set(done);
  if (value) next.add(id);
  else next.delete(id);
  done = next;
  persist();
  emit();
}

export function toggleLabDone(id: string) {
  setLabDone(id, !done.has(id));
}

export function clearDone() {
  if (done.size === 0) return;
  done = new Set();
  persist();
  emit();
}

export function useDoneLabs() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => done,
    () => done,
  );
}

export function useLabDone(id: string) {
  const set = useDoneLabs();
  return set.has(id);
}

export function nextUndoneId(path: readonly string[], set: Set<string>) {
  return path.find((id) => !set.has(id)) ?? path[0] ?? "";
}

export function countDone(path: readonly string[], set: Set<string>) {
  let n = 0;
  for (const id of path) if (set.has(id)) n += 1;
  return n;
}
