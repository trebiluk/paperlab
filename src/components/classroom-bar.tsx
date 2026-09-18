import { READ_LEVELS, ROOM_ROLES, setReadLevel, setRole, useReadLevel, useRole, type ReadLevel, type RoomRole } from "@/lib/lesson";
import { cn } from "@/lib/utils";

export function ClassroomBar({ compact }: { compact?: boolean }) {
  const read = useReadLevel();
  const role = useRole();
  return (
    <div className={cn("flex flex-wrap items-center gap-2", compact && "justify-end")}>
      <Seg
        label="Reading"
        value={read}
        options={READ_LEVELS.map((l) => ({ id: l.id, name: l.name }))}
        onChange={(id) => setReadLevel(id as ReadLevel)}
      />
      <Seg
        label="Room"
        value={role}
        options={ROOM_ROLES.map((r) => ({ id: r.id, name: r.name }))}
        onChange={(id) => setRole(id as RoomRole)}
      />
    </div>
  );
}

function Seg({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; name: string }[];
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex h-11 items-center rounded-md bg-bg-warm p-1" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "min-h-9 rounded-[10px] px-2.5 text-sm font-medium",
            value === o.id ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink",
          )}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}
