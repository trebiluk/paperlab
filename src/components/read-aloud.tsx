import { useState } from "react";
import { useHubLang, useHubT } from "@/lib/hub-lang";

type Who = {
  say?: (text: string) => void;
  voiceFor?: (lang?: string) => unknown;
};

export function ReadAloud({ text }: { text: string }) {
  const lang = useHubLang();
  const t = useHubT();
  const [miss, setMiss] = useState(false);
  const quiet = lang === "rw" || lang === "ti";
  const note = t("noVoice", "No voice yet. Read the words.");

  return (
    <div>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center gap-1 border-2 border-ink px-2 text-sm font-medium"
        onClick={() => {
          const prefs = (window as Window & { KulibertPrefs?: Who }).KulibertPrefs;
          const voice = prefs?.voiceFor?.(lang);
          if (!prefs?.say || !voice) {
            setMiss(true);
            prefs?.say?.(text);
            return;
          }
          setMiss(false);
          prefs.say(text);
        }}
      >
        <span aria-hidden>🔊</span>
        {t("readAloud", "Read aloud")}
      </button>
      {quiet || miss ? <p className="mt-2 text-sm text-ink-soft">{note}</p> : null}
    </div>
  );
}
