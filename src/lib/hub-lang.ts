import { useEffect, useRef, useSyncExternalStore } from "react";

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
/** False until after hydration, so the first client render matches the English server HTML. */
let hydrated = false;
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
  hydrated = true;
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * English on the hydration render of this component, including a route that
 * hydrates after HubLangBoot's effect. A module flag flips too early and
 * React #418s the later text.
 */
function useAfterPaint<T>(read: () => T, server: T): T {
  const on = useRef(false);
  const value = useSyncExternalStore(
    subscribe,
    () => (on.current ? read() : server),
    () => server,
  );
  useEffect(() => {
    on.current = true;
    emit();
  }, []);
  return value;
}

export function useHubLang() {
  return useAfterPaint(() => lang, "en" as HubLang);
}

export function useHubDir() {
  return useAfterPaint(() => dir, "ltr" as const);
}

function translate(key: string, fallback: string) {
  try {
    const value = i18n()?.t?.(key);
    if (value) return value;
  } catch {
    /* pack not loaded yet */
  }
  return fallback;
}

/** Shared chrome words. Empty or missing keys fall back. Never a raw key. English until mounted. */
export function hubT(key: string, fallback: string) {
  if (!hydrated) return fallback;
  void tick;
  return translate(key, fallback);
}

export function useHubT() {
  const on = useRef(false);
  useSyncExternalStore(subscribe, () => (on.current ? tick : 0), () => 0);
  useEffect(() => {
    on.current = true;
    emit();
  }, []);
  return (key: string, fallback: string) => (on.current ? translate(key, fallback) : fallback);
}
