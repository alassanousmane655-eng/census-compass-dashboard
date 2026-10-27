import { useState } from "react";
import { PageHeader } from "@/components/layout/AppShell";
import { RegionCartogram } from "@/components/charts/RegionCartogram";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/data/territories";
import { SECTORS, SITUATIONS } from "@/domain/reference";
import {
  countBy,
  suppress,
  formatCell,
  PENDING,
  median,
  processingDays,
  INDICATORS,
} from "@/domain/stats";
import { useApp } from "@/services/store";
import { regionName } from "@/data/territory-utils";
import type { Dossier } from "@/domain/types";
export function AggregateView({ dossiers }: { dossiers: Dossier[] }) {
  const [region, setRegion] = useState("");
  const rows = dossiers.filter(
    (d) => d.submittedAt && (!region || d.residence.regionCode === region),
  );
  const counts = countBy(
    dossiers.filter((d) => d.submittedAt),
    (d) => d.residence.regionCode,
  );
  const values = Object.fromEntries(REGIONS.map((r) => [r.code, suppress(counts[r.code] ?? 0)]));
  const days = rows.map(processingDays).filter((v): v is number => v !== null && v >= 0);
  const metrics = [
    { id: "soumis", value: formatCell(suppress(rows.length)) },
    {
      id: "valides",
      value: formatCell(suppress(rows.filter((d) => d.status === "valide").length)),
    },
    {
      id: "attente",
      value: formatCell(suppress(rows.filter((d) => PENDING.includes(d.status)).length)),
    },
    { id: "delai", value: days.length >= 10 ? `${median(days)} j` : "—" },
  ];
  const sectors = countBy(rows, (d) => d.activity.sectorCode),
    situations = countBy(rows, (d) => d.activity.situation);
  const months = countBy(rows, (d) => d.submittedAt?.slice(0, 7) ?? "");
  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <label className="text-sm font-semibold">
          Territoire
          <select
            className="field-input mt-2 min-w-48"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Tous les territoires du périmètre</option>
            {REGIONS.filter((r) => r.code in counts).map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <p className="max-w-lg text-xs text-muted-foreground">
          Données fictives · état de la démonstration au 27 octobre 2026. Non exhaustif. Petits
          effectifs masqués (seuil provisoire : 10).
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.id} className="border-t-2 border-primary bg-paper p-5">
            <p className="text-sm text-muted-foreground">{INDICATORS[m.id].label}</p>
            <p className="mt-4 text-3xl font-bold text-primary">{m.value}</p>
            <details className="mt-4 text-xs text-muted-foreground">
              <summary className="cursor-pointer">Définition & limites</summary>
              <p className="mt-2">
                {INDICATORS[m.id].formula} {INDICATORS[m.id].limits}
              </p>
              <p className="mt-2">{INDICATORS[m.id].period}</p>
            </details>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <section>
          <h2 className="mb-6 text-xl">Répartition territoriale</h2>
          <div className="max-w-md">
            <RegionCartogram
              values={values}
              selected={region}
              onSelect={(c) => setRegion(region === c ? "" : c)}
            />
          </div>
        </section>
        <section>
          <h2 className="mb-6 text-xl">Dossiers soumis par région</h2>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Région</th>
                  <th>Dossiers soumis</th>
                </tr>
              </thead>
              <tbody>
                {REGIONS.map((r) => (
                  <tr key={r.code}>
                    <td>{r.name}</td>
                    <td>{formatCell(values[r.code])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <Breakdown
          title="Secteurs d’activité"
          entries={SECTORS.map((s) => ({ label: s.label, value: sectors[s.code] ?? 0 }))}
        />
        <Breakdown
          title="Situations professionnelles"
          entries={SITUATIONS.map((s) => ({ label: s.label, value: situations[s.value] ?? 0 }))}
        />
        <section className="xl:col-span-2">
          <h2 className="mb-6 text-xl">Évolution des soumissions mensuelles</h2>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>Dossiers soumis</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(months)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([month, count]) => (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{formatCell(suppress(count))}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
function Breakdown({
  title,
  entries,
}: {
  title: string;
  entries: { label: string; value: number }[];
}) {
  return (
    <section>
      <h2 className="mb-6 text-xl">{title}</h2>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Dossiers soumis</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.label}>
                <td>{e.label}</td>
                <td>{formatCell(suppress(e.value))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export function Observatory() {
  const app = useApp();
  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Observatoire communautaire"
        title="Des parcours, des territoires, des perspectives."
        description="Indicateurs agrégés des dossiers déclarés. Aucun nom ni contact n’est publié."
      />
      <AggregateView dossiers={app.dossiers} />
    </div>
  );
}
