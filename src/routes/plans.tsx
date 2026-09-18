import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/plans")({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
