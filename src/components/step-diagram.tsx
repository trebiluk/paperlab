import { useEffect, useState } from "react";
import { LabSvg } from "@/components/lab-svg";
import { ViewSinkProvider } from "@/components/paper-gfx";
import { cn } from "@/lib/utils";

const ACCENTS = ["#0f766e", "#0e7490", "#c2410c", "#a16207", "#4d7c0f", "#be185d"];

export function stepAccent(index: number) {
  return ACCENTS[index % ACCENTS.length];
}

export function StepDiagram({
  visual,
  accent,
  label,
  spin,
  wiggle,
  className,
  onZoom,
}: {
  visual: string;
  accent: string;
  label: string;
  spin?: boolean;
  wiggle?: boolean;
  className?: string;
  onZoom?: () => void;
}) {
  const [view, setView] = useState("");
  return (
    <div
      className={cn("relative flex h-full min-h-0 w-full items-center justify-center", className)}
      style={{ ["--step-accent" as string]: accent }}
      data-step-diagram={visual}
    >
      <button
        type="button"
        className="flex h-full max-h-full w-full items-center justify-center"
        onClick={onZoom}
        aria-label={label}
      >
        <ViewSinkProvider onView={setView}>
          <LabSvg
            visual={visual}
            decorative
            className={cn("max-h-full max-w-full", spin && "pl-spin", wiggle && "pl-wiggle")}
          />
        </ViewSinkProvider>
      </button>
      {view ? (
        <span className="absolute top-2 left-2 inline-flex min-h-11 min-w-11 items-center justify-center border-2 border-ink bg-surface px-2 text-sm font-medium text-ink">
          {view}
        </span>
      ) : null}
    </div>
  );
}

export function ZoomSheet({
  open,
  onClose,
  visual,
  accent,
  closeLabel,
  title,
}: {
  open: boolean;
  onClose: () => void;
  visual: string;
  accent: string;
  closeLabel: string;
  title: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-surface" role="dialog" aria-modal aria-label={title}>
      <div className="flex justify-end p-2">
        <button type="button" className="inline-flex min-h-14 min-w-14 items-center justify-center border-2 border-ink px-3 text-base font-medium" onClick={onClose}>
          {closeLabel}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4" style={{ ["--step-accent" as string]: accent }}>
        <div className="mx-auto aspect-[4/3] w-[160%] max-w-none origin-top-left">
          <LabSvg visual={visual} decorative />
        </div>
      </div>
    </div>
  );
}
