export const APP_NAME = "BertyBot's PaperLab";
export const APP_KICKER = "BertyBot's";
export const APP_SHORT = "PaperLab";
export const APP_TAGLINE = "One sheet of paper. Real technology education.";

export function pageTitle(page?: string) {
  return page ? `${page} · ${APP_NAME}` : APP_NAME;
}
