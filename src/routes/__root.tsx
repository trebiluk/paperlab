import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { APP_NAME, APP_TAGLINE } from "@/lib/brand";
import appCss from "../styles.css?url";

/** Public file URL. Vite `base` is `/` in dev and `/paperlab/` in the hub build. */
function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_TAGLINE },
      { name: "theme-color", content: "#1f5c4e" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: publicAsset("/favicon.svg") },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: publicAsset("/__grok/manifest.webmanifest") },
      { rel: "apple-touch-icon", href: publicAsset("/__grok/icon-180.png") },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
