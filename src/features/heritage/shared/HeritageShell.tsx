import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI, useHeritageLang } from "./i18n";

export function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-8 w-8 text-heritage-brass", className)} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M20 2 38 20 20 38 2 20Z" />
      <path d="M20 9 31 20 20 31 9 20Z" />
      <path d="M20 15 25 20 20 25 15 20Z" fill="currentColor" />
      <path d="M20 2v7M38 20h-7M20 38v-7M2 20h7" />
    </svg>
  );
}

export function BrassRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3 text-heritage-brass", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-heritage-brass/70" />
      <span className="h-2 w-2 rotate-45 border border-heritage-brass" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-heritage-brass/70" />
    </div>
  );
}

export function LangToggle() {
  const { lang, setLang } = useHeritageLang();
  return (
    <div role="group" aria-label="Langue / Language" className="flex rounded-full border border-heritage-brass/40 p-0.5 text-[11px] font-semibold">
      {(["fr", "en"] as const).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("rounded-full px-2.5 py-1 uppercase transition-colors", lang === l ? "bg-heritage-brass text-heritage-night" : "text-heritage-ivory/70 hover:text-heritage-ivory")}>
          {l}
        </button>
      ))}
    </div>
  );
}

/** Shared header for every Heritage experience. The exit control is always visible. */
export function HeritageHeader({ overlay = false }: { overlay?: boolean }) {
  const { t } = useHeritageLang();
  const pathname = useLocation({ select: (s) => s.pathname });
  const inHub = pathname === "/heritage" || pathname === "/heritage/";
  const links = [
    { to: "/heritage/journey", label: t(UI.journey) },
    { to: "/heritage/musee", label: t(UI.museum) },
    { to: "/heritage/atlas", label: t(UI.atlas) },
  ] as const;
  return (
    <header className={cn("z-40 w-full", overlay ? "absolute inset-x-0 top-0" : "sticky top-0 border-b border-heritage-brass/15 bg-heritage-night/85 backdrop-blur-md")}>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 sm:px-8">
        {inHub ? (
          <Link to="/" className="flex items-center gap-2 rounded-full border border-heritage-brass/40 px-3 py-1.5 text-xs font-semibold text-heritage-ivory/85 hover:border-heritage-brass hover:text-heritage-ivory">
            <ArrowLeft className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{t(UI.exitHaoussa)}</span><span className="sm:hidden">HAOUSSA</span>
          </Link>
        ) : (
          <Link to="/heritage" className="flex items-center gap-2 rounded-full border border-heritage-brass/40 px-3 py-1.5 text-xs font-semibold text-heritage-ivory/85 hover:border-heritage-brass hover:text-heritage-ivory">
            <ArrowLeft className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{t(UI.exitHeritage)}</span><span className="sm:hidden">Hub</span>
          </Link>
        )}
        <Link to="/heritage" className="mx-auto flex items-center gap-3" aria-label="HAOUSSA HERITAGE">
          <Diamond className="h-7 w-7" />
          <span className="hidden font-editorial text-lg tracking-[0.3em] text-heritage-ivory sm:inline">{t(UI.brand)}</span>
        </Link>
        <nav aria-label="Expériences Héritage" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={cn("rounded-full px-3 py-1.5 text-xs transition-colors", pathname.startsWith(l.to) ? "bg-heritage-brass/15 text-heritage-brass" : "text-heritage-ivory/65 hover:text-heritage-ivory")}>{l.label}</Link>
          ))}
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}

export function HeritagePage({ children }: { children: ReactNode }) {
  return <div className="theme-heritage min-h-screen font-sans antialiased">{children}</div>;
}

export function Credit({ text, className }: { text: string; className?: string }) {
  return <p className={cn("text-[10px] leading-relaxed text-heritage-ivory/55", className)}>{text}</p>;
}
