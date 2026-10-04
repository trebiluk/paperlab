import { useEffect, useState } from "react";
import { useCopy } from "@/lib/copy";
import { useHubT } from "@/lib/hub-lang";
import { FOLD_SYMBOLS, FoldIcon, symbolCopyKey, type FoldSymbol } from "@/components/fold-icons";

/** Three pictures: thick cut, dashed valley, do not cut a dash. The hub bar opens #pl-help. */
export function FoldHelp() {
  const copy = useCopy();
  const t = useHubT();
  const [mark, setMark] = useState<FoldSymbol | null>(null);
  useEffect(() => {
    const open = () => {
      if (window.location.hash !== "#pl-help") return;
      const dialog = document.getElementById("pl-help");
      if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
    };
    const onSymbol = (event: Event) => {
      const id = (event as CustomEvent).detail as FoldSymbol;
      setMark(id);
      window.setTimeout(() => document.getElementById(`pl-symbol-${id}`)?.focus(), 0);
    };
    open();
    window.addEventListener("hashchange", open);
    window.addEventListener("pl-help-symbol", onSymbol);
    return () => {
      window.removeEventListener("hashchange", open);
      window.removeEventListener("pl-help-symbol", onSymbol);
    };
  }, []);

  return (
    <dialog
      id="pl-help"
      className="w-[min(100%,40rem)] border-2 border-ink bg-surface p-0 text-ink backdrop:bg-ink/40"
      aria-labelledby="pl-help-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-3">
        <h2 id="pl-help-title" className="font-display text-xl font-semibold">
          {copy("linesTitle")}
        </h2>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border-2 border-ink text-sm font-medium"
          onClick={() => {
            const dialog = document.getElementById("pl-help");
            if (dialog instanceof HTMLDialogElement) dialog.close();
          }}
        >
          {t("close", "Close")}
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {FOLD_SYMBOLS.map((id) => (
          <li key={id} id={`pl-symbol-${id}`} tabIndex={-1} className={mark === id ? "bg-bg-warm" : undefined}>
            <div className="flex min-h-11 flex-col items-center gap-1 px-1 py-2 text-center text-sm font-medium">
              <FoldIcon id={id} />
              <span>{copy(symbolCopyKey(id) as "valley")}</span>
            </div>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

export function HelpButton() {
  const t = useHubT();
  return (
    <button
      type="button"
      className="inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap border-2 border-ink bg-surface px-2 text-sm font-semibold text-ink"
      aria-label={t("help", "Help")}
      onClick={() => {
        const dialog = document.getElementById("pl-help");
        if (dialog instanceof HTMLDialogElement) dialog.showModal();
      }}
    >
      <span aria-hidden>?</span>
      <span>{t("help", "Help")}</span>
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
