import { Segmented } from "@/components/segmented";
import { GoldChip } from "@/components/gold-chip";
import { READ_LEVELS, ROOM_ROLES, setReadLevel, setRole, useReadLevel, useRole, type ReadLevel, type RoomRole } from "@/lib/lesson";
import { cn } from "@/lib/utils";

export function ClassroomBar({
  compact,
  stacked,
  hideGold,
}: {
  compact?: boolean;
  stacked?: boolean;
  hideGold?: boolean;
}) {
  const read = useReadLevel();
  const role = useRole();
  return (
    <div
      className={cn(
        "flex gap-2",
        stacked ? "flex-col items-stretch" : "flex-wrap items-center",
        compact && !stacked && "justify-end",
      )}
    >
      {hideGold ? null : <GoldChip compact />}
      <Segmented
        label="Reading"
        value={read}
        full={stacked}
        options={READ_LEVELS.map((l) => ({ id: l.id, name: l.name, title: l.note }))}
        onChange={(id) => setReadLevel(id as ReadLevel)}
      />
      <Segmented
        label="Room"
        value={role}
        full={stacked}
        options={ROOM_ROLES.map((r) => ({ id: r.id, name: r.name, title: r.note }))}
        onChange={(id) => setRole(id as RoomRole)}
      />
    </div>
  );
}
