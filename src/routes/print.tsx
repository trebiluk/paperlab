import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { DevelopmentSvg, LineSample } from "@/components/development-svg";
import { pageTitle } from "@/lib/brand";
import { LINE_TYPES } from "@/lib/conventions";
import { PAPERS, sheetPhysical } from "@/lib/paper";
import { usePaper } from "@/lib/lesson";

export const Route = createFileRoute("/print")({
  component: PrintPage,
  head: () => ({
    meta: [{ title: pageTitle("Printable development") }],
  }),
});

function PrintPage() {
  const paper = usePaper();
  const spec = PAPERS[paper];
  const phys = sheetPhysical(spec);

  return (
    <AppShell>
      <style>{phys.css}</style>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="no-print">
          <p className="text-sm font-medium tracking-wide text-pine">
            Printable development · {spec.name}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
            Cut the outline. Fold the dashes. Glue the tabs.
          </h1>
          <p className="mt-3 text-ink-soft">
            Print at 100% scale on {spec.name} ({spec.sheetLabel}) — do not
            “fit to page.” Each square will be {spec.squareLabel}. Thick line
            = cut. Dashed = fold. Tabs A–F tuck inside the edge with the same
            letter. G is the closing joint (Top to Back) — a glue line, no tab.
          </p>
          <Button className="mt-5" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
        </div>

        <div className="print-net mt-8 rounded-xl bg-surface shadow-card print:rounded-none print:shadow-none">
          <DevelopmentSvg
            paper={paper}
            crop="sheet"
            layers={{
              construction: false,
              folds: true,
              tabs: true,
              labels: true,
              dimensions: true,
              glueMarks: true,
              matchMarks: true,
            }}
          />
        </div>

        <ul className="no-print mt-6 grid gap-3 sm:grid-cols-2">
          {LINE_TYPES.filter((t) => t.id !== "construction").map((lt) => (
            <li
              key={lt.id}
              className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-card"
            >
              <div className="w-24 shrink-0">
                <LineSample kind={lt.id} />
              </div>
              <div>
                <p className="text-sm font-medium">{lt.name}</p>
                <p className="text-xs text-muted">{lt.look}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
