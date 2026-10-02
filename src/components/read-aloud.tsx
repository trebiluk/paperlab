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
    <div className="mt-4">
      <button
        type="button"
        className="inline-flex min-h-11 items-center border-2 border-ink px-4 text-sm font-medium"
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
        {t("readAloud", "Read aloud")}
      </button>
      {quiet || miss ? <p className="mt-2 text-sm text-ink-soft">{note}</p> : null}
    </div>
  );
}
