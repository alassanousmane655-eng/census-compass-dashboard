import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import craft from "@/assets/home/craft.jpg.asset.json";
import identity from "@/assets/home/identity.jpg.asset.json";
import community from "@/assets/home/community.jpg.asset.json";

const PANELS = [
  { img: craft.url, n: "01", kicker: "Savoir-faire", title: "Se faire recenser", text: "Six étapes, environ 8 minutes, pour compter et être compté.", to: "/recensement", alt: "Une main s’apprête à prendre un bonnet brodé indigo posé sur une table" },
  { img: identity.url, n: "02", kicker: "Identité", title: "Explorer l’Observatoire", text: "Les dix régions, en chiffres agrégés et anonymes.", to: "/observatoire", alt: "Un homme ajuste son bonnet brodé sous une arche sculptée" },
  { img: community.url, n: "03", kicker: "Communauté", title: "Entrer dans Héritage", text: "Un voyage cinématique au cœur de la culture haoussa.", to: "/heritage", alt: "Un homme en boubou indigo avance vers la communauté rassemblée" },
] as const;

export function HomeTriptych() {
  return (
    <section aria-label="Trois portes d’entrée" className="bg-foreground py-3">
      <div className="grid gap-3 px-3 md:grid-cols-3">
        {PANELS.map((p) => (
          <Link key={p.to} to={p.to} className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-soft md:aspect-[3/4]">
            <img src={p.img} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
            <div aria-hidden className="film-floor absolute inset-0" />
            <div className="film-text absolute inset-x-0 bottom-0 p-6 text-inverse lg:p-8">
              <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-copper-soft">
                <span className="tabular-nums">{p.n}</span><span className="h-px w-8 bg-copper-soft/70" />{p.kicker}
              </p>
              <h2 className="mt-4 flex items-center gap-2 font-display text-2xl font-extrabold leading-tight lg:text-3xl">
                {p.title}<ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </h2>
              <p className="mt-2 max-w-xs text-sm text-inverse/75">{p.text}</p>
            </div>
          </Link>
        ))}
      </div>
      <p className="px-4 pt-2 text-right text-[10px] text-inverse/50">Images générées · à remplacer par des photographies documentées</p>
    </section>
  );
}
