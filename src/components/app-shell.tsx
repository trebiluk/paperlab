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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { TECHWORKS_NAME, TECHWORKS_URL } from "@/lib/room";
import { useCopy } from "@/lib/copy";
import { useHubT } from "@/lib/hub-lang";

const NAV = [
  { to: "/labs", label: "Labs" },
  { to: "/skills", label: "Skills" },
  { to: "/studio", label: "Studio" },
  { to: "/plans", label: "Plans" },
  { to: "/supports", label: "Supports" },
  { to: "/standards", label: "MST 5" },
] as const;

const STUDENT_NAV = NAV.filter((item) => item.to === "/labs" || item.to === "/skills" || item.to === "/studio");

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

  return (
    <div className="paper-grain min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-pine-fg"
      >
        Skip to content
      </a>
      <header dir="ltr" className="sheet-bar no-print sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:px-6">
          <SiteMenu pathname={pathname} paper={paper} links={links} />
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 text-ink no-underline"
            aria-label={`${APP_KICKER} ${APP_SHORT} home`}
          >
            <LogoMark />
            <span className="min-w-0 leading-tight">
              <span className="block text-xs font-medium tracking-wide text-pine">
                <bdi>{APP_KICKER}</bdi>
              </span>
              <span className="block truncate font-display text-lg font-semibold tracking-tight">
                <bdi>{APP_SHORT}</bdi>
              </span>
            </span>
          </Link>
          <span className="border-2 border-ink px-2 py-1 text-xs font-medium tabular-nums text-ink" data-version-plate>
            {APP_VERSION}
          </span>
          <span className="ml-auto" />
          {slim ? <GoldChip compact /> : null}
          <HelpButton />
        </div>
        {slim ? null : (
        <div className="mx-auto hidden max-w-6xl gap-2 px-4 pb-2 sm:px-6 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <ClassroomBar compact={slim} />
          <PaperToggle paper={paper} full />
        </div>
        )}
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      {onMake ? null : (
      <footer className="no-print mx-auto max-w-6xl px-4 py-12 text-sm text-muted sm:px-6">
        <div className="cut-rule mb-6 max-w-xs" />
        <p>BertyBot’s PaperLab · one sheet of printer paper.</p>
        {slim ? (
          <>
            <p className="mt-1">{copy("finish")}</p>
            <p className="mt-2">
              <button type="button" className="font-medium text-pine" onClick={() => setRole("teacher")}>
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
        className="inline-flex size-11 shrink-0 items-center justify-center border-2 border-ink bg-surface text-xl leading-none text-ink"
        aria-label={t("menu", "Menu")}
      >
        <span aria-hidden>≡</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b border-line pr-14">
          <SheetTitle>{t("menu", "Menu")}</SheetTitle>
          <SheetDescription>{t("appsFollow", "Your apps will use this language.")}</SheetDescription>
        </SheetHeader>
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
