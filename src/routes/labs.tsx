import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FAMILIES, type LabFamily } from "@/lib/labs";

const FAM_IDS = FAMILIES.map((f) => f.id);

export const Route = createFileRoute("/labs")({
  validateSearch: (s: Record<string, unknown>): { family?: LabFamily } => {
    if (typeof s.family === "string" && FAM_IDS.includes(s.family as LabFamily)) {
      return { family: s.family as LabFamily };
    }
    return {};
  },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
