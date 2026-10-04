import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PAPERS, PAPER_IDS, type PaperId } from "@/lib/paper";
import { setRole, setPaper, usePaper, useRole } from "@/lib/lesson";
import { APP_KICKER, APP_SHORT, APP_VERSION } from "@/lib/brand";
import { HelpButton } from "@/components/fold-help";
import { LogoMark } from "@/components/berty";
import { ClassroomBar } from "@/components/classroom-bar";
import { GoldChip } from "@/components/gold-chip";
import { Segmented } from "@/components/segmented";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { TECHWORKS_NAME, TECHWORKS_URL } from "@/lib/room";
import { useCopy } from "@/lib/copy";
import { UPDATES } from "@/lib/changelog";
import { useHubLang, useHubT, type HubLang } from "@/lib/hub-lang";

const NAV = [
  { to: "/labs", label: "Labs" },
  { to: "/skills", label: "Skills" },
  { to: "/studio", label: "Studio" },
  { to: "/plans", label: "Plans" },
  { to: "/supports", label: "Supports" },
  { to: "/standards", label: "MST 5" },
] as const;

const STUDENT_NAV = NAV.filter((item) => item.to === "/labs" || item.to === "/skills" || item.to === "/studio");

/** Drawer language chips. UK is Ukrainian (`uk`). Dari is `fa-AF`. */
const HUB_LANG_PICK: { id: HubLang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "uk", label: "UK" },
  { id: "ru", label: "RU" },
  { id: "es", label: "ES" },
  { id: "ar", label: "AR" },
  { id: "fa-AF", label: "Dari" },
  { id: "rw", label: "Kinyarwanda" },
  { id: "ti", label: "Tigrinya" },
  { id: "simple", label: "Simple" },
];

function pickHubLang(id: HubLang) {
  const prefs = (window as Window & { KulibertPrefs?: { acceptLang?: (lang: string) => unknown } }).KulibertPrefs;
  prefs?.acceptLang?.(id);
}

function isNavActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const paper = usePaper();
  const role = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const slim = role === "student";
  const copy = useCopy();
  const t = useHubT();
  const links = (slim ? STUDENT_NAV : NAV).map((item) => ({
    ...item,
    label:
      item.to === "/labs"
        ? copy("labs")
        : item.to === "/skills"
          ? copy("skills")
          : item.to === "/studio"
            ? copy("studio")
            : item.label,
  }));
  const onMake = /^\/labs\/[^/]+$/.test(pathname);
  const [full, setFull] = useState(false);
  const [short, setShort] = useState(false);
  const [canFull, setCanFull] = useState(true);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    const fit = () => setShort(window.innerHeight <= 480);
    const framed = window.parent !== window;
    setCanFull(Boolean(document.fullscreenEnabled) || framed);
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    fit();
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  async function toggleFull() {
    const root = document.getElementById("pl-app") ?? document.documentElement;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.requestFullscreen();
    } catch {
      try {
        window.parent?.postMessage({ type: "kb-fullscreen" }, "*");
      } catch {
        /* framed page blocked the call */
      }
    }
  }

  return (
    <div id="pl-app" className={cn("paper-grain min-h-dvh", onMake && "flex h-dvh flex-col overflow-hidden")} data-kid-lab={onMake ? "1" : undefined}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-pine-fg"
      >
        {copy("skip")}
      </a>
      <header dir="ltr" className={cn("sheet-bar no-print sticky top-0 z-40 shrink-0", short && "h-[52px] overflow-hidden")}>
        <div className={cn("mx-auto flex max-w-6xl items-center gap-x-2 px-2 sm:px-6", short ? "h-full flex-nowrap py-0" : "flex-wrap gap-y-1 py-2")}>
          <SiteMenu pathname={pathname} paper={paper} links={links} />
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-ink no-underline"
            aria-label={`${APP_KICKER} ${APP_SHORT} home`}
          >
            <LogoMark />
            <span className={cn("min-w-0 leading-tight", short && "sr-only")}>
              <span className="block text-sm font-medium tracking-wide text-pine">
                <bdi>{APP_KICKER}</bdi>
              </span>
              <span className="block truncate font-display text-lg font-semibold tracking-tight">
                <bdi>{copy("appTitle")}</bdi>
              </span>
            </span>
          </Link>
          <span className="border-2 border-ink px-2 py-1 text-sm font-medium tabular-nums text-ink" data-version-plate>
            {APP_VERSION}
          </span>
          <span className="ml-auto" />
          {slim ? <GoldChip compact /> : null}
          {canFull ? (
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border-2 border-ink bg-surface px-2 text-sm font-medium"
            onClick={() => void toggleFull()}
          >
            <span aria-hidden>{full ? "⤢" : "⛶"}</span>
            <span className="ml-1">{full ? copy("exitFull") : copy("fullScreen")}</span>
          </button>
          ) : null}
          <HelpButton />
        </div>
        {slim ? null : (
        <div className="mx-auto hidden max-w-6xl gap-2 px-4 pb-2 sm:px-6 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <ClassroomBar compact={slim} />
          <PaperToggle paper={paper} full />
        </div>
        )}
      </header>
      <main id="main" tabIndex={-1} className={onMake ? "min-h-0 flex-1 overflow-hidden" : undefined}>{children}</main>
      <ToastHost />
      {onMake ? null : (
      <footer className="no-print mx-auto max-w-6xl px-4 py-12 text-sm text-muted sm:px-6">
        <div className="cut-rule mb-6 max-w-xs" />
        <p>
          <bdi>{APP_KICKER}</bdi>
          {" · "}
          <bdi>{APP_SHORT}</bdi>
          {" · "}
          {copy("oneSheet")}
        </p>
        {slim ? (
          <>
            <p className="mt-1">{copy("finish")}</p>
            <p className="mt-2">
              <button
                type="button"
                className="inline-flex min-h-11 items-center px-3 font-medium text-pine"
                onClick={() => setRole("teacher")}
              >
                {copy("teacher")}
              </button>
            </p>
          </>
        ) : (
          <>
            <p className="mt-1">NYSED MST Standard 5 · Grades 2–8 · scissors, glue, and a period.</p>
            <p className="mt-2">
              <Link to="/skills" className="font-medium text-pine">
                Skills · Gold XP
              </Link>
              <span className="text-muted"> · practice on this Chromebook · the 1–4 lives in </span>
              <a href={TECHWORKS_URL} className="font-medium text-pine" target="_blank" rel="noreferrer">
                {TECHWORKS_NAME}
              </a>
            </p>
            <p className="mt-2">
              <Link to="/updates" className="font-medium text-pine">
                Shop notes
              </Link>
              <span className="text-muted"> · what changed, in class order</span>
            </p>
          </>
        )}
      </footer>
      )}
    </div>
  );
}

function SiteMenu({
  pathname,
  paper,
  links,
}: {
  pathname: string;
  paper: PaperId;
  links: readonly { to: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const lang = useHubLang();
  const t = useHubT();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        id="pl-menu"
        className="inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap border-2 border-ink bg-surface px-2 text-sm font-medium text-ink"
        aria-label={t("menu", "Menu")}
      >
        <span aria-hidden>≡</span>
        <span>{t("menu", "Menu")}</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b border-line pr-14">
          <SheetTitle>{t("menu", "Menu")}</SheetTitle>
        </SheetHeader>
        <div className="border-b border-line px-4 py-3">
          <Link
            to="/updates"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-ink"
          >
            {t("whatsNew", "What's new")}
          </Link>
          <p className="mt-1 text-sm text-ink-soft">
            <bdi>{UPDATES[0]?.items[0]}</bdi>
          </p>
        </div>
        <div className="border-b border-line px-4 py-3">
          <p className="text-base font-medium text-ink">{t("settings", "Settings")}</p>
          <p className="mt-2 text-xs font-medium tracking-wide text-pine">{t("language", "Language")}</p>
          <div
            dir="ltr"
            className="mt-2 flex flex-wrap gap-2"
            role="group"
            aria-label={t("language", "Language")}
          >
            {HUB_LANG_PICK.map((item) => {
              const on = lang === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pickHubLang(item.id)}
                  className={cn(
                    "inline-flex min-h-11 items-center justify-center border-2 border-ink px-2 text-sm font-medium",
                    on ? "bg-pine text-pine-fg" : "bg-surface text-ink",
                  )}
                >
                  <bdi>{item.label}</bdi>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-ink-soft">{t("appsFollow", "Your apps will use this language.")}</p>
        </div>
        <div className="border-b border-line p-4" onClick={() => setOpen(false)}>
          <GoldChip />
        </div>
        <nav className="flex flex-col p-2" aria-label="Main">
          {links.map((item) => {
            const active = isNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center border-b border-line px-4 text-base font-medium",
                  active ? "text-ink shadow-[inset_3px_0_0_#1c1915]" : "text-ink-soft hover:bg-bg-warm hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-3 border-t border-line p-4">
          <p className="text-xs font-medium tracking-wide text-pine">Reading and room</p>
          <ClassroomBar stacked hideGold />
          <p className="text-xs font-medium tracking-wide text-pine">Paper size</p>
          <PaperToggle paper={paper} full />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ToastHost() {
  const [text, setText] = useState("");
  useEffect(() => {
    const onToast = (event: Event) => {
      const next = String((event as CustomEvent).detail || "");
      setText(next);
      window.setTimeout(() => setText(""), 1600);
    };
    window.addEventListener("pl-toast", onToast);
    return () => window.removeEventListener("pl-toast", onToast);
  }, []);
  if (!text) return null;
  return (
    <p className="pointer-events-none fixed top-16 left-1/2 z-[80] -translate-x-1/2 border-2 border-ink bg-surface px-3 py-2 text-sm font-medium text-ink" role="status">
      {text}
    </p>
  );
}

function PaperToggle({ paper, full }: { paper: PaperId; full?: boolean }) {
  return (
    <Segmented
      label="Paper size"
      value={paper}
      full={full}
      options={PAPER_IDS.map((id) => ({
        id,
        name: PAPERS[id].shortName,
        title: `${PAPERS[id].name} · ${PAPERS[id].sheetLabel}`,
      }))}
      onChange={(id) => setPaper(id as PaperId)}
    />
  );
}
