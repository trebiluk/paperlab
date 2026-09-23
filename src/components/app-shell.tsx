import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { PAPERS, PAPER_IDS, type PaperId } from "@/lib/paper";
import { setPaper, usePaper, useRole } from "@/lib/lesson";
import { APP_KICKER, APP_SHORT } from "@/lib/brand";
import { LogoMark } from "@/components/berty";
import { ClassroomBar } from "@/components/classroom-bar";
import { GoldChip } from "@/components/gold-chip";
import { Segmented } from "@/components/segmented";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6 lg:py-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-ink no-underline"
            aria-label={`${APP_KICKER} ${APP_SHORT} home`}
          >
            <LogoMark />
            <span className="min-w-0 leading-tight">
              <span className="block text-xs font-medium tracking-wide text-pine">
                {APP_KICKER}
              </span>
              <span className="block truncate font-display text-lg font-semibold tracking-tight">
                {APP_SHORT}
              </span>
            </span>
          </Link>
          <nav className="ml-2 hidden items-center gap-1 lg:flex" aria-label="Main">
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
          <SiteMenu pathname={pathname} paper={paper} />
        </div>
        <div className="mx-auto hidden max-w-6xl gap-2 px-4 pb-2 sm:px-6 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <ClassroomBar compact={slim} />
          <PaperToggle paper={paper} full />
        </div>
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

function SiteMenu({ pathname, paper }: { pathname: string; paper: PaperId }) {
  const [open, setOpen] = useState(false);

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
      <SheetTrigger className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-surface px-3 text-sm font-medium text-ink shadow-card lg:hidden">
        <Menu className="size-4" aria-hidden />
        Menu
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b border-line pr-14">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Pages, reading, and paper size.</SheetDescription>
        </SheetHeader>
        <div className="border-b border-line p-4" onClick={() => setOpen(false)}>
          <GoldChip />
        </div>
        <nav className="flex flex-col p-2" aria-label="Main">
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-md px-3 text-sm font-medium",
                  active ? "bg-bg-warm text-ink" : "text-ink-soft hover:bg-bg-warm hover:text-ink",
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
