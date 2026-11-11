import { useCallback, useState } from "react";
import { PageHeader } from "@/components/layout/AppShell";
import { REGIONS } from "@/data/territories";
import { SECTORS, SITUATIONS } from "@/domain/reference";
import { countBy, suppress, formatCell, PENDING, median, processingDays, INDICATORS } from "@/domain/stats";
import { useApp } from "@/services/store";
import { regionName } from "@/data/territory-utils";
import type { Dossier } from "@/domain/types";
import { ImmersiveObservatory } from "./immersive/ImmersiveObservatory";

function SectionTitle({ n, children }: { n: string; children: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-6 bg-border" />
      {children}
    </h2>
  );
}

/** Aggregated indicators. The region filter comes from the immersive map (single regional instrument). */
export function AggregateView({ dossiers, region = "" }: { dossiers: Dossier[]; region?: string }) {
  const submitted = dossiers.filter((d) => d.submittedAt);
  const rows = submitted.filter((d) => !region || d.residence.regionCode === region);
  const counts = countBy(submitted, (d) => d.residence.regionCode);
  const days = rows.map(processingDays).filter((v): v is number => v !== null && v >= 0);
  const metrics = [
    { id: "soumis", value: formatCell(suppress(rows.length)) },
    { id: "valides", value: formatCell(suppress(rows.filter((d) => d.status === "valide").length)) },
    { id: "attente", value: formatCell(suppress(rows.filter((d) => PENDING.includes(d.status)).length)) },
    { id: "delai", value: days.length >= 10 ? `${median(days)} j` : "—" },
  ];
  const sectors = countBy(rows, (d) => d.activity.sectorCode);
  const situations = countBy(rows, (d) => d.activity.situation);
  const months = countBy(rows, (d) => d.submittedAt?.slice(0, 7) ?? "");
  const monthRows = Object.entries(months).sort(([a], [b]) => a.localeCompare(b));
  const maxMonth = Math.max(1, ...monthRows.map(([, v]) => suppress(v) ?? 0));
  const scope = region ? regionName(region) : "Ensemble du Cameroun";
  return (
    <div className="space-y-16">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionTitle n="02">Les indicateurs essentiels</SectionTitle>
          <p className="mb-6 text-sm font-semibold text-primary">{scope}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.id} className="bg-paper p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{INDICATORS[m.id].label}</p>
              <p className="mt-3 font-display text-4xl font-extrabold tabular-nums text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle n="03">Profil socioéconomique</SectionTitle>
        <div className="grid gap-10 xl:grid-cols-2">
          <Bars title="Secteurs d’activité" entries={SECTORS.map((s) => ({ label: s.label, value: sectors[s.code] ?? 0 }))} />
          <Bars title="Situations professionnelles" entries={SITUATIONS.map((s) => ({ label: s.label, value: situations[s.value] ?? 0 }))} />
        </div>
      </section>

      <section>
        <SectionTitle n="04">Évolution et tendances</SectionTitle>
        <div className="rounded-xl border bg-paper p-6">
          <p className="mb-6 text-sm font-semibold">Soumissions mensuelles · {scope}</p>
          <div className="flex h-48 items-end gap-2" role="img" aria-label="Évolution mensuelle des soumissions">
            {monthRows.map(([m, v]) => {
              const s = suppress(v);
              return (
                <div key={m} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] tabular-nums text-muted-foreground">{formatCell(s)}</span>
                  <div className="w-full rounded-t bg-primary/80" style={{ height: `${((s ?? 0) / maxMonth) * 140}px` }} />
                  <span className="text-[10px] text-muted-foreground">{m.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle n="05">Méthodologie et transparence</SectionTitle>
        <details className="rounded-xl border bg-paper p-6">
          <summary className="cursor-pointer font-semibold">Définitions, sources, seuils et limites</summary>
          <dl className="mt-5 grid gap-5 text-sm md:grid-cols-2">
            {["soumis", "valides", "attente", "delai"].map((id) => (
              <div key={id}>
                <dt className="font-semibold">{INDICATORS[id].label}</dt>
                <dd className="mt-1 text-muted-foreground">{INDICATORS[id].formula} {INDICATORS[id].limits} {INDICATORS[id].period}.</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs text-muted-foreground">
            Données fictives · état de la démonstration au 27 octobre 2026. Non exhaustif. Petits effectifs masqués (seuil provisoire : 10).
          </p>
        </details>
        <details className="mt-4 rounded-xl border bg-paper p-6">
          <summary className="cursor-pointer font-semibold">Voir les données régionales en tableau</summary>
          <div className="table-scroll mt-4">
            <table className="data-table">
              <thead><tr><th>Région</th><th>Dossiers soumis</th></tr></thead>
              <tbody>
                {REGIONS.map((r) => (
                  <tr key={r.code}><td>{r.name}</td><td>{formatCell(suppress(counts[r.code] ?? 0))}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </div>
  );
}

function Bars({ title, entries }: { title: string; entries: { label: string; value: number }[] }) {
  const shown = entries.map((e) => ({ ...e, s: suppress(e.value) })).filter((e) => e.s).sort((a, b) => b.s! - a.s!);
  const hidden = entries.reduce((n, e) => n + (suppress(e.value) === null ? e.value : 0), 0);
  const list = hidden ? [...shown, { label: "Autres catégories réunies", value: hidden, s: suppress(hidden) }] : shown;
  const max = Math.max(1, ...list.map((e) => e.s ?? 0));
  return (
    <div className="rounded-xl border bg-paper p-6">
      <p className="mb-5 text-sm font-semibold">{title}</p>
      <ul className="space-y-4">
        {list.map((e) => (
          <li key={e.label}>
            <div className="flex justify-between text-sm"><span>{e.label}</span><span className="font-semibold tabular-nums">{formatCell(e.s)}</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${((e.s ?? 0) / max) * 100}%` }} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Observatory() {
  const app = useApp();
  const [region, setRegion] = useState("");
  const onRegion = useCallback((c: string | null) => setRegion(c ?? ""), []);
  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Observatoire communautaire"
        title="Des parcours, des territoires, des perspectives."
        description="Indicateurs agrégés des dossiers déclarés. Aucun nom ni contact n’est publié."
      />
      <h2 className="sr-only">01 — Exploration territoriale</h2>
      <ImmersiveObservatory dossiers={app.dossiers} onRegionChange={onRegion} />
      <AggregateView dossiers={app.dossiers} region={region} />
    </div>
  );
}
