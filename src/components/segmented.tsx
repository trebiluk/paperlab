import { cn } from "@/lib/utils";

export function Segmented({
  label,
  value,
  options,
  onChange,
  full,
}: {
  label: string;
  value: string;
  options: { id: string; name: string; title?: string }[];
  onChange: (id: string) => void;
  full?: boolean;
}) {
  return (
    <div
      className={cn("flex h-11 items-center rounded-md bg-bg-warm p-1", full && "w-full lg:w-auto")}
      role="radiogroup"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        const i = options.findIndex((o) => o.id === value);
        if (i < 0) return;
        const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
        const next = options[i + dir];
        if (!next) return;
        e.preventDefault();
        onChange(next.id);
        const btn = e.currentTarget.querySelector<HTMLButtonElement>(`[data-seg="${next.id}"]`);
        btn?.focus();
      }}
    >
      {options.map((o) => {
        const on = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            title={o.title}
            data-seg={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "min-h-9 rounded-[10px] px-2.5 text-sm font-medium transition-colors",
              full && "flex-1 px-1.5 lg:px-2.5",
              on ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink",
            )}
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}
