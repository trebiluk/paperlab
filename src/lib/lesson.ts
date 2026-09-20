import { useSyncExternalStore } from "react";
import { DEFAULT_PAPER, isPaperId, type PaperId } from "./paper";

const PAPER_KEY = "ppl-paper-v1";
const PAPER_KEY_LEGACY = "osc-paper-v2";
const READ_KEY = "ppl-read-v1";
const ROLE_KEY = "ppl-role-v1";

export type ReadLevel = "easy" | "class" | "stretch";
export type RoomRole = "student" | "helper" | "teacher";

export const READ_LEVELS: {
  id: ReadLevel;
  name: string;
  grades: string;
  note: string;
}[] = [
  {
    id: "easy",
    name: "Easy",
    grades: "2–4",
    note: "Short sentences. One action at a time. Everyday words.",
  },
  {
    id: "class",
    name: "Class",
    grades: "4–6",
    note: "Classroom voice. Tech-ed words with a meaning next to them.",
  },
  {
    id: "stretch",
    name: "Stretch",
    grades: "6–8",
    note: "Constraints, tradeoffs, data, and the names engineers use.",
  },
];

export const ROOM_ROLES: {
  id: RoomRole;
  name: string;
  note: string;
}[] = [
  { id: "student", name: "Student", note: "The make. Steps and a test." },
  {
    id: "helper",
    name: "Helper",
    note: "TA / aide: what to say, what not to do, what to watch.",
  },
  {
    id: "teacher",
    name: "Teacher",
    note: "Plan, standards, ELL, and extra-help notes on this lab.",
  },
];

function isReadLevel(v: string): v is ReadLevel {
  return v === "easy" || v === "class" || v === "stretch";
}
function isRole(v: string): v is RoomRole {
  return v === "student" || v === "helper" || v === "teacher";
}

let paper: PaperId = DEFAULT_PAPER;
let readLevel: ReadLevel = "class";
let role: RoomRole = "student";
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  const savedPaper = window.localStorage.getItem(PAPER_KEY) ?? window.localStorage.getItem(PAPER_KEY_LEGACY);
  if (savedPaper && isPaperId(savedPaper)) paper = savedPaper;
  const savedRead = window.localStorage.getItem(READ_KEY);
  if (savedRead && isReadLevel(savedRead)) readLevel = savedRead;
  const savedRole = window.sessionStorage.getItem(ROLE_KEY);
  if (savedRole && isRole(savedRole)) role = savedRole;
}

function emit() {
  for (const listener of listeners) listener();
}

function persist(key: string, value: string, store: "local" | "session" = "local") {
  try {
    const s = store === "session" ? window.sessionStorage : window.localStorage;
    s.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function getPaper() {
  return paper;
}
export function setPaper(next: PaperId) {
  if (paper === next) return;
  paper = next;
  persist(PAPER_KEY, next);
  emit();
}
export function usePaper() {
  return useSyncExternalStore(subscribe, () => paper, () => DEFAULT_PAPER);
}

export function getReadLevel() {
  return readLevel;
}
export function setReadLevel(next: ReadLevel) {
  if (readLevel === next) return;
  readLevel = next;
  persist(READ_KEY, next);
  emit();
}
export function useReadLevel() {
  return useSyncExternalStore(subscribe, () => readLevel, () => "class" as ReadLevel);
}

export function getRole() {
  return role;
}
export function setRole(next: RoomRole) {
  if (role === next) return;
  role = next;
  persist(ROLE_KEY, next, "session");
  emit();
}
export function useRole() {
  return useSyncExternalStore(subscribe, () => role, () => "student" as RoomRole);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function pickRead<T>(level: ReadLevel, text: { easy: T; class: T; stretch: T }) {
  return text[level];
}
