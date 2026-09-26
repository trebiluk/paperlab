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
      className={cn("flex h-11 items-center border-2 border-ink bg-bg-warm p-1", full && "w-full lg:w-auto")}
      role="radiogroup"
      aria-label={label}
      onKeyDown={(e) => {
        const i = options.findIndex((o) => o.id === value);
        if (i < 0) return;
        let nextI = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") nextI = Math.min(i + 1, options.length - 1);
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") nextI = Math.max(i - 1, 0);
        else if (e.key === "Home") nextI = 0;
        else if (e.key === "End") nextI = options.length - 1;
        else return;
        if (nextI === i) return;
        e.preventDefault();
        const next = options[nextI];
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
            tabIndex={on ? 0 : -1}
            title={o.title}
            data-seg={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "min-h-11 rounded-none px-2.5 text-sm font-medium transition-colors",
              full && "flex-1 px-1.5 lg:px-2.5",
              on ? "bg-surface text-ink shadow-card" : "text-ink-soft hover:text-ink",
            )}
          >
            {o.name}
          </button>
        );
      })}
    </div>
  );
}
