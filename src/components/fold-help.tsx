import { useEffect } from "react";

/** Three pictures: thick cut, dashed valley, do not cut a dash. The hub bar opens #pl-help. */
export function FoldHelp() {
  useEffect(() => {
    const open = () => {
      if (window.location.hash !== "#pl-help") return;
      const dialog = document.getElementById("pl-help");
      if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <dialog
      id="pl-help"
      className="w-[min(100%,40rem)] border-2 border-ink bg-surface p-0 text-ink backdrop:bg-ink/40"
      aria-labelledby="pl-help-title"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-3">
        <h2 id="pl-help-title" className="font-display text-xl font-semibold">
          How to read the lines
        </h2>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border-2 border-ink text-sm font-medium"
          onClick={() => {
            const dialog = document.getElementById("pl-help");
            if (dialog instanceof HTMLDialogElement) dialog.close();
          }}
        >
          Close
        </button>
      </div>
      <ol className="grid gap-4 p-4 sm:grid-cols-3">
        <li>
          <LinePicture kind="cut" />
          <p className="mt-2 text-sm font-medium">1. A thick line is a cut.</p>
        </li>
        <li>
          <LinePicture kind="fold" />
          <p className="mt-2 text-sm font-medium">2. A dashed line is a fold toward you.</p>
        </li>
        <li>
          <LinePicture kind="stop" />
          <p className="mt-2 text-sm font-medium">3. Do not cut a dashed line.</p>
        </li>
      </ol>
    </dialog>
  );
}

export function HelpButton() {
  return (
    <button
      type="button"
      className="inline-flex size-11 shrink-0 items-center justify-center border-2 border-ink bg-surface text-lg font-semibold text-ink"
      aria-label="Help. How to read fold lines."
      onClick={() => {
        const dialog = document.getElementById("pl-help");
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
    >
      ?
    </button>
  );
}

function LinePicture({ kind }: { kind: "cut" | "fold" | "stop" }) {
  return (
    <svg viewBox="0 0 160 120" className="h-28 w-full border-2 border-ink bg-[#fbf8f1]" role="img">
      <title>{kind === "cut" ? "Thick cut line" : kind === "fold" ? "Dashed fold line" : "Do not cut a dashed line"}</title>
      <rect x="28" y="18" width="104" height="84" fill="#fffdf8" stroke="#1c1915" strokeWidth="2" />
      {kind === "cut" ? <line x1="40" y1="60" x2="120" y2="60" stroke="#1c1915" strokeWidth="6" /> : null}
      {kind !== "cut" ? (
        <line x1="40" y1="60" x2="120" y2="60" stroke="#1c1915" strokeWidth="3" strokeDasharray="10 7" />
      ) : null}
      {kind === "stop" ? (
        <g stroke="#8f3d32" strokeWidth="4">
          <line x1="58" y1="40" x2="102" y2="84" />
          <line x1="102" y1="40" x2="58" y2="84" />
        </g>
      ) : null}
    </svg>
  );
}
