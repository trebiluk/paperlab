import { useSyncExternalStore } from "react";

export const HUB_LANGS = ["en", "simple", "uk", "ru", "es", "ar", "fa-AF", "rw", "ti"] as const;
export type HubLang = (typeof HUB_LANGS)[number];

type Who = {
  lang?: string;
  dir?: string;
  acceptLang?: (lang: string) => unknown;
  say?: (text: string) => void;
  voiceFor?: (lang?: string) => { lang?: string } | null;
};

type I18n = {
  t?: (key: string) => string;
  ready?: (lang: string, cb?: () => void) => void;
  paint?: () => void;
};

let lang: HubLang = "en";
let dir: "ltr" | "rtl" = "ltr";
let tick = 0;
const listeners = new Set<() => void>();
let booted = false;

function isLang(value: string | null | undefined): value is HubLang {
  return !!value && (HUB_LANGS as readonly string[]).includes(value);
}

function classicOn() {
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.get("theme") === "classic" || q.get("hub") === "classic") return true;
    if (window.localStorage.getItem("tech-room-hub") === "classic") return true;
  } catch {
    /* ignore */
  }
  return false;
}

function queryLang() {
  try {
    const own = new URLSearchParams(window.location.search).get("lang");
    if (isLang(own)) return own;
    if (window.parent !== window) {
      const framed = new URLSearchParams(window.parent.location.search).get("lang");
      if (isLang(framed)) return framed;
    }
  } catch {
    /* parent frame is another origin */
  }
  return null;
}

function prefs() {
  return (window as Window & { KulibertPrefs?: Who }).KulibertPrefs;
}

function i18n() {
  return (window as Window & { KulibertI18n?: I18n }).KulibertI18n;
}

function emit() {
  for (const listener of listeners) listener();
}

function paint(next: HubLang, nextDir: "ltr" | "rtl") {
  const el = document.documentElement;
  el.lang = next === "simple" ? "en" : next;
  el.dir = nextDir;
  el.setAttribute("data-kp-lang", next);
}

function apply(next: HubLang, nextDir: "ltr" | "rtl") {
  const changed = next !== lang || nextDir !== dir;
  lang = next;
  dir = nextDir;
  paint(next, nextDir);
  if (changed) tick += 1;
  emit();
}

let querySent = false;

function resolve(): { lang: HubLang; dir: "ltr" | "rtl" } {
  if (classicOn()) return { lang: "en", dir: "ltr" };
  const fromQuery = queryLang();
  if (fromQuery && !querySent && prefs()?.acceptLang) {
    querySent = true;
    prefs()?.acceptLang?.(fromQuery);
  }
  const fromPrefs = prefs()?.lang;
  const next = isLang(fromPrefs) ? fromPrefs : isLang(fromQuery) ? fromQuery : "en";
  const nextDir = next === "ar" || next === "fa-AF" ? "rtl" : "ltr";
  return { lang: next, dir: nextDir };
}

export function bootHubLang() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  const refresh = () => {
    const current = resolve();
    apply(current.lang, current.dir);
    i18n()?.ready?.(current.lang, () => {
      i18n()?.paint?.();
      tick += 1;
      emit();
    });
  };
  refresh();
  window.addEventListener("kulibert-lang", refresh);
  window.addEventListener("storage", (event) => {
    if (event.key === "kulibert-prefs-v1" || event.key === null) refresh();
  });
  const wait = window.setInterval(() => {
    if (prefs()) {
      refresh();
      window.clearInterval(wait);
    }
  }, 200);
  window.setTimeout(() => window.clearInterval(wait), 4000);
}

export function useHubLang() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => lang,
    () => "en" as HubLang,
  );
}

export function useHubDir() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => dir,
    () => "ltr" as const,
  );
}

/** Shared chrome words. Empty or missing keys fall back. Never a raw key. */
export function hubT(key: string, fallback: string) {
  void tick;
  try {
    const value = i18n()?.t?.(key);
    if (value) return value;
  } catch {
    /* pack not loaded yet */
  }
  return fallback;
}

export function useHubT() {
  useHubLang();
  useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => tick,
    () => 0,
  );
  return hubT;
}
