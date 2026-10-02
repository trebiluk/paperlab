import { useEffect } from "react";
import { bootHubLang } from "@/lib/hub-lang";

export function HubLangBoot() {
  useEffect(() => {
    bootHubLang();
  }, []);
  return null;
}
