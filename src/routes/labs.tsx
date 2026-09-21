import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FAMILIES, parseGradeBand, parseStepParam, type GradeBandId, type LabFamily } from "@/lib/labs";

const FAM_IDS = FAMILIES.map((f) => f.id);

export type LabsSearch = { family?: LabFamily; step?: number; grade?: GradeBandId };

export const Route = createFileRoute("/labs")({
  validateSearch: (s: Record<string, unknown>): LabsSearch => {
    const out: LabsSearch = {};
    if (typeof s.family === "string" && FAM_IDS.includes(s.family as LabFamily)) {
      out.family = s.family as LabFamily;
    }
    const step = parseStepParam(s.step);
    if (step) out.step = step;
    const grade = parseGradeBand(s.grade);
    if (grade) out.grade = grade;
    return out;
  },
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});