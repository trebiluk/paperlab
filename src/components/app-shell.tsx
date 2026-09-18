import { Link, useRouterState } from "@tanstack/react-router";
import { PAPERS, PAPER_IDS, type PaperId } from "@/lib/paper";
import { setPaper, usePaper } from "@/lib/lesson";
import { APP_KICKER, APP_SHORT } from "@/lib/brand";
import { LogoMark } from "@/components/berty";
import { ClassroomBar } from "@/components/classroom-bar";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/labs", label: "Labs" },
  { to: "/studio", label: "Studio" },
  { to: "/plans", label: "Plans" },
  { to: "/supports", label: "Supports" },
  { to: "/standards", label: "MST 5" },
] as const;

function isNavActive(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const paper = usePaper();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="paper-grain min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-pine-fg"
      >
        Skip to content
      </a>
      <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-ink no-underline"
            aria-label={`${APP_KICKER} ${APP_SHORT} home`}
          >
            <LogoMark />
            <span className="leading-tight">
              <span className="block text-[11px] font-medium tracking-wide text-pine">
                {APP_KICKER}
              </span>
              <span className="block font-display text-[17px] font-semibold tracking-tight">
                {APP_SHORT}
              </span>
            </span>
          </Link>
          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-bg-warm text-ink"
                      : "text-muted hover:bg-bg-warm hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <ClassroomBar />
          <PaperToggle paper={paper} full />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "shrink-0 rounded-full px-3 py-2 text-sm font-medium",
                  active
                    ? "bg-pine text-pine-fg"
                    : "bg-surface text-ink-soft shadow-card",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="no-print mx-auto max-w-6xl px-4 py-12 text-sm text-muted sm:px-6">
        <div className="cut-rule mb-6 max-w-xs" />
        <p>BertyBot’s PaperLab · Technology education on a sheet of printer paper.</p>
        <p className="mt-1">NYSED MST Standard 5 · Grades 2–8 · scissors, glue, and a period.</p>
      </footer>
    </div>
  );
}

function PaperToggle({ paper, full }: { paper: PaperId; full?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-11 rounded-md bg-bg-warm p-1",
        full ? "w-full lg:w-auto" : "max-w-full overflow-x-auto",
      )}
      role="group"
      aria-label="Paper size"
    >
      {PAPER_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setPaper(id)}
          title={`${PAPERS[id].name} · ${PAPERS[id].sheetLabel}`}
          className={cn(
            "rounded-[10px] text-sm font-medium transition-colors",
            full ? "min-h-11 flex-1 px-1.5 lg:px-2.5" : "shrink-0 px-2 sm:px-2.5",
            paper === id ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink",
          )}
        >
          {PAPERS[id].shortName}
        </button>
      ))}
    </div>
  );
}
