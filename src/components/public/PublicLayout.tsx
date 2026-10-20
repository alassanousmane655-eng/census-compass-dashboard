import { Link } from "@tanstack/react-router";
import { Menu, X, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useSession } from "@/services/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/le-centre", label: "Le Centre" },
  { to: "/culture", label: "Culture & communauté" },
  { to: "/recensement", label: "Recensement" },
  { to: "/observatoire", label: "Observatoire" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const linkCls = overlay ? "text-inverse/85 hover:text-inverse" : "text-muted-foreground hover:text-foreground";
  return (
    <header className={cn("z-40 w-full", overlay ? "absolute inset-x-0 top-0" : "sticky top-0 border-b border-border bg-background/90 backdrop-blur")}>
      <div className="container-page flex h-18 items-center justify-between gap-6 py-4">
        <Logo inverse={overlay} />
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={cn("text-sm font-medium transition-colors", linkCls)} activeProps={{ className: overlay ? "text-inverse" : "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <Button asChild variant={overlay ? "outline-inverse" : "ghost"} size="sm">
              <Link to="/membre"><UserRound /> Mon espace</Link>
            </Button>
          ) : (
            <Button asChild variant={overlay ? "outline-inverse" : "ghost"} size="sm">
              <Link to="/connexion">Connexion</Link>
            </Button>
          )}
          <Button asChild variant={overlay ? "inverse" : "default"} size="sm">
            <Link to="/recensement/inscription">Se faire recenser</Link>
          </Button>
        </div>
        <button
          className={cn("rounded-full p-2 lg:hidden", overlay ? "text-inverse" : "text-foreground")}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-paper lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Navigation mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2">
              <Button asChild><Link to="/recensement/inscription">Se faire recenser</Link></Button>
              <Button asChild variant="outline"><Link to={session ? "/membre" : "/connexion"}>{session ? "Mon espace" : "Connexion"}</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-24 bg-indigo text-inverse">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo inverse />
          <p className="mt-4 text-sm text-inverse/70">Culture vivante. Communauté unie. Avenir partagé.</p>
          <p className="mt-2 text-xs text-inverse/50">Signature provisoire, à valider.</p>
        </div>
        {[
          { t: "Le Centre", l: [["/le-centre", "Présentation"], ["/culture", "Culture & communauté"], ["/culture/agenda", "Agenda"]] },
          { t: "Recensement", l: [["/recensement", "Pourquoi se faire recenser"], ["/recensement/fonctionnement", "Fonctionnement"], ["/recensement/faq", "Questions fréquentes"], ["/recensement/protection-des-donnees", "Protection des données"]] },
          { t: "Accès", l: [["/recensement/inscription", "Se faire recenser"], ["/connexion", "Connexion membre"], ["/observatoire", "Observatoire"], ["/admin", "Espace équipe (démo)"]] },
        ].map((col) => (
          <div key={col.t}>
            <h2 className="text-sm font-semibold tracking-wide text-inverse">{col.t}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.l.map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-inverse/70 hover:text-inverse">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-inverse/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-inverse/55 md:flex-row md:justify-between">
          <span>© 2026 Centre culturel de la communauté haoussa au Cameroun</span>
          <span>Version de démonstration — données fictives, aucune donnée réelle.</span>
        </div>
      </div>
    </footer>
  );
}

export function PublicPage({ children, overlay = false }: { children: ReactNode; overlay?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Aller au contenu</a>
      <PublicHeader overlay={overlay} />
      <main id="contenu" className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary-soft">
      <div className="pointer-events-none absolute -right-10 top-0 h-full w-1/3 text-primary/[0.06] motif-textile" aria-hidden />
      <div className="container-page relative py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-primary md:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
