import { useState, useEffect } from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "lang";
const EVENT_NAME = "langchange";

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "es") {
        setLangState(saved);
      }
    } catch {
      // localStorage blocked (e.g. Safari with strict privacy settings)
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<Lang>;
      setLangState(customEvent.detail);
    };

    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const setLang = (newLang: Lang) => {
    const scrollY = window.scrollY;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // localStorage blocked
    }
    setLangState(newLang);
    window.dispatchEvent(new CustomEvent<Lang>(EVENT_NAME, { detail: newLang }));

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    });
  };

  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return { lang, setLang, toggleLang };
}
