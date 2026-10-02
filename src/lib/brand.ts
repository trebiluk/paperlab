export const APP_NAME = "BertyBot's PaperLab";
export const APP_KICKER = "BertyBot's";
export const APP_SHORT = "PaperLab";
export const APP_TAGLINE = "One sheet of paper. Real technology education.";

/** Visible build mark so a live door can be checked after deploy. Bump on every release. */
export const APP_VERSION = "PL 1.1.0";
export const APP_REV = "2026-10-01-pl-1.1.0";

export function pageTitle(page?: string) {
  return page ? `${page} · ${APP_NAME}` : APP_NAME;
}
