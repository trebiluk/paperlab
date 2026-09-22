import { Link, useRouterState } from "@tanstack/react-router";
import { PAPERS, PAPER_IDS, type PaperId } from "@/lib/paper";
import { setPaper, usePaper, useRole } from "@/lib/lesson";
import { APP_KICKER, APP_SHORT } from "@/lib/brand";
import { LogoMark } from "@/components/berty";
import { ClassroomBar } from "@/components/classroom-bar";
import { Segmented } from "@/components/segmented";
import { cn } from "@/lib/utils";
import { TECHWORKS_NAME, TECHWORKS_URL } from "@/lib/room";

const NAV = [
  { to: "/labs", label: "Labs" },
  { to: "/skills", label: "Skills" },
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
  const role = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const slim = role === "student";
  const onMake = /^\/labs\/[^/]+$/.test(pathname);

  return (
    <div className="paper-grain min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-pine-fg"
      >
        Skip to content
      </a>
      {onMake ? null : (
      <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-ink no-underline"
            aria-label={`${APP_KICKER} ${APP_SHORT} home`}
          >
            <LogoMark />
            <span className="leading-tight">
              <span className="block text-xs font-medium tracking-wide text-pine">
                {APP_KICKER}
              </span>
              <span className="block font-display text-lg font-semibold tracking-tight">
                {APP_SHORT}
              </span>
            </span>
          </Link>
          <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
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
          <ClassroomBar compact={slim} />
          <PaperToggle paper={paper} full />
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden" aria-label="Main">
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
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
      )}
      <main id="main" tabIndex={-1}>{children}</main>
      {onMake ? null : (
      <footer className="no-print mx-auto max-w-6xl px-4 py-12 text-sm text-muted sm:px-6">
        <div className="cut-rule mb-6 max-w-xs" />
        <p>BertyBot’s PaperLab · Technology education on a sheet of printer paper.</p>
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
      </footer>
      )}
    </div>
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
