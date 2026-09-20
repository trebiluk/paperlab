import { createFileRoute, redirect } from "@tanstack/react-router";

/** Leftover cube-only CCSS plan. The cube plan now lives with the others. */
export const Route = createFileRoute("/teacher")({
  beforeLoad: () => {
    throw redirect({ to: "/plans/$id", params: { id: "cube" } });
  },
  component: () => null,
});
