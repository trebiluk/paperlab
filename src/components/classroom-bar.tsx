import { Segmented } from "@/components/segmented";
import { READ_LEVELS, ROOM_ROLES, setReadLevel, setRole, useReadLevel, useRole, type ReadLevel, type RoomRole } from "@/lib/lesson";
import { cn } from "@/lib/utils";

export function ClassroomBar({ compact }: { compact?: boolean }) {
  const read = useReadLevel();
  const role = useRole();
  return (
    <div className={cn("flex flex-wrap items-center gap-2", compact && "justify-end")}>
      <Segmented
        label="Reading"
        value={read}
        options={READ_LEVELS.map((l) => ({ id: l.id, name: l.name, title: l.note }))}
        onChange={(id) => setReadLevel(id as ReadLevel)}
      />
      <Segmented
        label="Room"
        value={role}
        options={ROOM_ROLES.map((r) => ({ id: r.id, name: r.name, title: r.note }))}
        onChange={(id) => setRole(id as RoomRole)}
      />
    </div>
  );
}