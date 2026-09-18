import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/foldables")({
  component: FoldablesLayout,
});

function FoldablesLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
