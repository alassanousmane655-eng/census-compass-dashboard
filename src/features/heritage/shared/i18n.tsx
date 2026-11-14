import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/** Heritage-only languages. "ha" is reserved: add strings and enable it when Hausa texts are validated. */
export type HeritageLang = "fr" | "en";
export type L = { fr: string; en: string; ha?: string };

const Ctx = createContext<{ lang: HeritageLang; setLang: (l: HeritageLang) => void }>({ lang: "fr", setLang: () => {} });
const KEY = "haoussa.heritage.lang";

export function HeritageI18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<HeritageLang>("fr");
  useEffect(() => {
    const v = window.localStorage.getItem(KEY);
    if (v === "fr" || v === "en") setLangState(v);
  }, []);
  const setLang = (l: HeritageLang) => {
    setLangState(l);
    try { window.localStorage.setItem(KEY, l); } catch { /* storage unavailable */ }
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useHeritageLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = (s: L) => s[lang] ?? s.fr;
  return { lang, setLang, t };
}

export const UI = {
  brand: { fr: "HAOUSSA HERITAGE", en: "HAOUSSA HERITAGE" },
  exitHaoussa: { fr: "Retour à HAOUSSA", en: "Back to HAOUSSA" },
  exitHeritage: { fr: "Retour à Héritage", en: "Exit to Heritage" },
  journey: { fr: "Voyage cinématique", en: "Cinematic Heritage Journey" },
  museum: { fr: "Musée numérique", en: "Digital Heritage Museum" },
  atlas: { fr: "Atlas vivant", en: "Living Heritage Atlas" },
  journeySub: { fr: "Un voyage à travers l’histoire", en: "A timeless journey through history" },
  museumSub: { fr: "Explorer les collections", en: "Explore our collections" },
  atlasSub: { fr: "Découvrir les territoires", en: "Discover our lands" },
  deeper: { fr: "Approfondir", en: "Go deeper" },
  close: { fr: "Refermer", en: "Close" },
  provisional: { fr: "Texte provisoire · à valider par un historien ou le Centre", en: "Provisional text · to be validated by a historian or the Centre" },
  toDocument: { fr: "à documenter", en: "to be documented" },
  rightsToCheck: { fr: "droits à vérifier", en: "rights to be verified" },
} satisfies Record<string, L>;
