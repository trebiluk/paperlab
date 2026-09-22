import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { restoreHubBaseUrl } from "./lib/hub-base";

const handle = createStartHandler(defaultStreamHandler);

/**
 * Production router basepath is `/paperlab`. The hub strips that prefix, so
 * restore it before TanStack matches routes and `/_serverFn` calls.
 * Dev injects a root basepath and this is a no-op.
 */
export default {
  async fetch(request: Request, requestOpts?: Parameters<typeof handle>[1]) {
    return handle(restoreHubBaseUrl(request, process.env.TSS_ROUTER_BASEPATH), requestOpts);
  },
};
