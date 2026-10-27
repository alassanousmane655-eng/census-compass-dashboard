import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, adminLinks } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ToValidate } from "@/components/common/ToValidate";
import { fmtDate } from "@/components/common/format";
import {
  useApp,
  useActingStaff,
  decide,
  updateStaff,
  updateRequest,
  updateContent,
  logAudit,
} from "@/services/store";
import { can, canReadDossier, inScope, ROLE_LABELS } from "@/domain/permissions";
import { allowedTargets, STATUS_META } from "@/domain/status";
import { findDuplicates } from "@/domain/duplicates";
import { REGIONS } from "@/data/territories";
import { regionName } from "@/data/territory-utils";
import {
  SECTORS,
  CORRECTION_REASONS,
  REFUSAL_REASONS,
  CORRECTABLE_FIELDS,
} from "@/domain/reference";
import { countBy, formatCell, suppress } from "@/domain/stats";
import { AggregateView } from "@/features/observatory/Observatory";
import { CensusForm, DossierSummary } from "@/features/census/CensusForm";
import type { Dossier, DossierStatus, CorrectableField, StaffRole } from "@/domain/types";
export function AdminPage({ page = "dashboard" }: { page?: string }) {
  const app = useApp(),
    staff = useActingStaff();
  const entry = adminLinks.find((l) => l.to === `/admin/${page}`);
  const denied =
    staff.status !== "actif" || (entry?.permission && !can(staff.role, entry.permission));
  if (denied)
    return (
      <>
        <PageHeader
          title="Accès non autorisé"
          description="Ce rôle de démonstration ne peut pas consulter cette page."
        />
        <Button asChild variant="outline">
          <Link to="/admin">Retour à la vue d’ensemble</Link>
        </Button>
      </>
    );
  const dossiers = app.dossiers.filter((d) => canReadDossier(staff, d));
  if (page === "saisie") return <CensusForm assisted />;
  if (page === "dossiers") return <DossierQueue />;
  if (page === "doublons")
    return (
      <>
        <PageHeader
          title="Doublons potentiels"
          description="Un signal à examiner humainement, jamais une fusion automatique."
        />
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Dossier A</th>
                <th>Dossier B</th>
                <th>Signaux</th>
              </tr>
            </thead>
            <tbody>
              {findDuplicates(dossiers)
                .slice(0, 50)
                .map((p) => (
                  <tr key={`${p.a.id}-${p.b.id}`}>
                    <td>
                      <Link
                        to="/admin/dossiers/$id"
                        params={{ id: p.a.id }}
                        className="text-primary underline"
                      >
                        {p.a.reference}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to="/admin/dossiers/$id"
                        params={{ id: p.b.id }}
                        className="text-primary underline"
                      >
                        {p.b.reference}
                      </Link>
                    </td>
                    <td>{p.reasons.join(" · ")}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  if (page === "territoires")
    return (
      <>
        <PageHeader
          title="Référentiel territorial"
          description="10 régions · 58 départements · 360 arrondissements"
        />
        {REGIONS.map((r) => (
          <details key={r.code} className="mb-3 border-b pb-4">
            <summary className="cursor-pointer font-semibold">
              {r.name} · {r.departments.length} départements
            </summary>
            <div className="ml-5 mt-4 space-y-3">
              {r.departments.map((d) => (
                <details key={d.code}>
                  <summary className="cursor-pointer text-sm">
                    {d.name} · {d.arrondissements.length} arrondissements
                  </summary>
                  <p className="ml-5 mt-2 text-sm text-muted-foreground">
                    {d.arrondissements.map((a) => a.name).join(", ")}
                  </p>
                </details>
              ))}
            </div>
          </details>
        ))}
        <ToValidate className="mt-6">
          Le référentiel est en lecture seule dans cette démonstration ; une modification doit faire
          l’objet d’une validation officielle.
        </ToValidate>
      </>
    );
  if (page === "secteurs")
    return (
      <>
        <PageHeader title="Secteurs d’activité" />
        <SimpleTable headers={["Code", "Secteur"]} rows={SECTORS.map((s) => [s.code, s.label])} />
      </>
    );
  if (page === "utilisateurs")
    return (
      <>
        <PageHeader
          title="Utilisateurs & rôles"
          description="Comptes fictifs et périmètres de démonstration."
        />
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Périmètre</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {app.staff.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>
                    <select
                      aria-label={`Rôle de ${u.name}`}
                      className="field-input text-xs"
                      value={u.role}
                      onChange={(e) => {
                        updateStaff(staff, u.id, { role: e.target.value as StaffRole });
                        toast.success("Rôle de démonstration modifié.");
                      }}
                    >
                      {Object.entries(ROLE_LABELS)
                        .filter(([r]) => r !== "membre")
                        .map(([r, label]) => (
                          <option key={r} value={r}>
                            {label}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="field-input text-xs"
                      aria-label={`Périmètre de ${u.name}`}
                      value={u.scope}
                      onChange={(e) => updateStaff(staff, u.id, { scope: e.target.value })}
                    >
                      <option value="national">National</option>
                      {REGIONS.map((r) => (
                        <option key={r.code} value={r.code}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={u.id === staff.id}
                      onClick={() =>
                        updateStaff(staff, u.id, {
                          status: u.status === "actif" ? "suspendu" : "actif",
                        })
                      }
                    >
                      {u.status === "actif" ? "Suspendre" : "Réactiver"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  if (page === "contenu")
    return (
      <>
        <PageHeader
          title="Contenu public"
          description="États de publication fictifs. Les textes officiels restent à confirmer."
        />
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Type</th>
                <th>État</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {app.content.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.kind}</td>
                  <td>{c.status}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updateContent(c.id, c.status === "publie" ? "depublie" : "publie");
                        toast.success("État de démonstration modifié.");
                      }}
                    >
                      {c.status === "publie" ? "Dépublier" : "Publier"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  if (page === "demandes")
    return (
      <>
        <PageHeader title="Demandes relatives aux données" />
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Type</th>
                <th>Date</th>
                <th>État</th>
                <th>Précisions</th>
              </tr>
            </thead>
            <tbody>
              {app.requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.reference}</td>
                  <td>{r.type}</td>
                  <td>{fmtDate(r.createdAt)}</td>
                  <td>
                    <select
                      aria-label={`État de ${r.reference}`}
                      className="field-input text-sm"
                      value={r.status}
                      onChange={(e) => {
                        updateRequest(staff, r.id, e.target.value as typeof r.status);
                        toast.success("Demande mise à jour dans la démo.");
                      }}
                    >
                      {["recue", "en_cours", "traitee", "rejetee"].map((s) => (
                        <option key={s} value={s}>
                          {s.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{r.message || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Modifier l’état ne supprime ni ne transmet réellement des données.
        </p>
      </>
    );
  if (page === "audit")
    return (
      <>
        <PageHeader title="Journal d’audit" description="Historique des actions simulées." />
        <SimpleTable
          headers={["Date", "Acteur", "Action", "Cible", "Périmètre"]}
          rows={app.audit
            .filter((a) => inScope(staff.scope, a.scope))
            .map((a) => [fmtDate(a.at), a.actor, a.action, a.target, a.scope])}
        />
      </>
    );
  if (page === "campagnes")
    return (
      <>
        <PageHeader
          title="Campagnes de recensement"
          description="Calendrier fictif de démonstration, non programme officiel."
        />
        <SimpleTable
          headers={["Campagne", "Périmètre", "Début", "Fin", "Objectif fictif", "État"]}
          rows={app.campaigns
            .filter((c) => inScope(staff.scope, c.regionCode))
            .map((c) => [
              c.name,
              regionName(c.regionCode),
              fmtDate(c.startsAt),
              fmtDate(c.endsAt),
              String(c.target),
              c.status,
            ])}
        />
      </>
    );
  if (page === "parametres")
    return (
      <>
        <PageHeader title="Paramètres & décisions à valider" />
        <ToValidate>
          Critères d’éligibilité, définition de profil à jour (12 mois), seuil de masquage (10),
          notice juridique, coordonnées officielles et durée de conservation.
        </ToValidate>
        <p className="mt-7 text-sm text-muted-foreground">
          Aucune modification de ces règles provisoires n’est disponible avant validation par le
          Centre.
        </p>
      </>
    );
  if (page === "exports")
    return (
      <>
        <PageHeader
          title="Exports agrégés"
          description="Fichier sans nom, téléphone, e-mail ni référence individuelle."
        />
        <Button
          onClick={() => {
            const counts = countBy(
              dossiers.filter((d) => d.submittedAt),
              (d) => d.residence.regionCode,
            );
            const csv =
              "Région;Dossiers soumis\n" +
              REGIONS.filter((r) => inScope(staff.scope, r.code))
                .map((r) => `${r.name};${formatCell(suppress(counts[r.code] ?? 0))}`)
                .join("\n");
            const url = URL.createObjectURL(
              new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }),
            );
            const a = document.createElement("a");
            a.href = url;
            a.download = "haoussa-demo-agrege.csv";
            a.click();
            URL.revokeObjectURL(url);
            logAudit(staff, "export_agrege", "Dossiers par région");
            toast.success("Export agrégé téléchargé.");
          }}
        >
          <Download />
          Télécharger les dossiers par région
        </Button>
      </>
    );
  return (
    <>
      <PageHeader
        eyebrow="Pilotage du recensement"
        title="Vue d’ensemble"
        description={`${ROLE_LABELS[staff.role]} · ${staff.scope === "national" ? "Périmètre national" : regionName(staff.scope)} · données fictives`}
      />
      {can(staff.role, "stats.lire") ? (
        <AggregateView
          dossiers={app.dossiers.filter((d) => inScope(staff.scope, d.residence.regionCode))}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {adminLinks
            .filter((l) => l.permission && can(staff.role, l.permission))
            .map((l) => (
              <Button
                asChild
                key={l.to}
                variant="outline"
                className="h-20 justify-start rounded-md"
              >
                <Link to={l.to}>
                  <l.icon />
                  {l.label}
                  <ArrowRight />
                </Link>
              </Button>
            ))}
        </div>
      )}
    </>
  );
}
function SimpleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && (
        <p className="py-8 text-sm text-muted-foreground">Aucun élément dans ce périmètre.</p>
      )}
    </div>
  );
}
function DossierQueue() {
  const app = useApp(),
    staff = useActingStaff();
  const [q, setQ] = useState(""),
    [status, setStatus] = useState(""),
    [region, setRegion] = useState(""),
    [page, setPage] = useState(0);
  const rows = app.dossiers.filter(
    (d) =>
      canReadDossier(staff, d) &&
      (!status || d.status === status) &&
      (!region || d.residence.regionCode === region) &&
      `${d.reference} ${d.profile.firstName} ${d.profile.lastName}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="Dossiers de recensement"
        description={`${rows.length} dossiers dans votre périmètre`}
      />
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <label className="text-sm">
          Recherche
          <input
            className="field-input mt-2"
            placeholder="Référence ou nom"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <label className="text-sm">
          Statut
          <select
            className="field-input mt-2"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Tous les statuts</option>
            {Object.entries(STATUS_META).map(([s, m]) => (
              <option key={s} value={s}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Région
          <select
            className="field-input mt-2"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Toutes les régions autorisées</option>
            {REGIONS.filter((r) => inScope(staff.scope, r.code)).map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Nom</th>
              <th>Région</th>
              <th>Soumis le</th>
              <th>Statut</th>
              <th>Dossier</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(page * 20, (page + 1) * 20).map((d) => (
              <tr key={d.id}>
                <td className="whitespace-nowrap font-semibold">{d.reference}</td>
                <td>
                  {d.profile.firstName} {d.profile.lastName}
                </td>
                <td>{regionName(d.residence.regionCode)}</td>
                <td>{fmtDate(d.submittedAt)}</td>
                <td>
                  <StatusBadge status={d.status} />
                </td>
                <td>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin/dossiers/$id" params={{ id: d.id }}>
                      Examiner <ArrowRight />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && <p className="py-8">Aucun dossier ne correspond aux filtres.</p>}
      <div className="mt-5 flex items-center justify-between gap-3">
        <Button variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>
          Précédent
        </Button>
        <span className="text-sm">
          Page {page + 1} / {Math.max(1, Math.ceil(rows.length / 20))}
        </span>
        <Button
          variant="outline"
          disabled={(page + 1) * 20 >= rows.length}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </Button>
      </div>
    </>
  );
}
export function AdminDossier({ id }: { id: string }) {
  const app = useApp(),
    staff = useActingStaff(),
    d = app.dossiers.find((d) => d.id === id);
  const [target, setTarget] = useState<DossierStatus>("valide"),
    [reason, setReason] = useState(""),
    [fields, setFields] = useState<CorrectableField[]>([]);
  if (!d || !canReadDossier(staff, d) || staff.status !== "actif")
    return (
      <PageHeader
        title="Dossier indisponible"
        description="Ce dossier est absent ou hors de votre périmètre."
      />
    );
  const targets = allowedTargets(d.status, staff.role);
  return (
    <>
      <PageHeader title={d.reference} action={<StatusBadge status={d.status} />} />
      <Button variant="link" asChild className="mb-7">
        <Link to="/admin/dossiers">Retour à la file</Link>
      </Button>
      <div className="grid gap-10 xl:grid-cols-2">
        <section>
          <h2 className="mb-5 text-xl">Informations déclarées</h2>
          <DossierSummary {...d} />
          <h2 className="mb-5 mt-9 text-xl">Historique</h2>
          <ol className="space-y-4">
            {d.history.map((h, i) => (
              <li key={i}>
                <StatusBadge status={h.to} />
                <p className="mt-1 text-xs text-muted-foreground">
                  {fmtDate(h.at)} · {h.actorLabel} {h.reasonCode && `· ${h.reasonCode}`}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="mb-5 text-xl">Vérification & décision</h2>
          {!targets.length ? (
            <p className="text-muted-foreground">
              Aucune décision disponible pour ce statut et ce rôle.
            </p>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const to = targets.includes(target) ? target : targets[0];
                try {
                  decide(staff, d.id, to, { reasonCode: reason || undefined, fields });
                  toast.success("Décision enregistrée.");
                  setReason("");
                  setFields([]);
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : "Décision impossible.");
                }
              }}
            >
              <label className="block text-sm font-semibold">
                Décision
                <select
                  className="field-input mt-2"
                  value={targets.includes(target) ? target : targets[0]}
                  onChange={(e) => {
                    setTarget(e.target.value as DossierStatus);
                    setReason("");
                  }}
                >
                  {targets.map((t) => (
                    <option key={t} value={t}>
                      {STATUS_META[t].label}
                    </option>
                  ))}
                </select>
              </label>
              {["action_requise", "refuse"].includes(target) && targets.includes(target) && (
                <label className="block text-sm font-semibold">
                  Motif obligatoire
                  <select
                    required
                    className="field-input mt-2"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">Choisir un motif</option>
                    {(target === "refuse" ? REFUSAL_REASONS : CORRECTION_REASONS).map((r) => (
                      <option key={r.code} value={r.code}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {target === "action_requise" && targets.includes(target) && (
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold">Champs à corriger</legend>
                  {CORRECTABLE_FIELDS.map((f) => (
                    <label key={f.value} className="mb-3 flex gap-3 text-sm">
                      <input
                        type="checkbox"
                        className="size-4 accent-primary"
                        checked={fields.includes(f.value)}
                        onChange={(e) =>
                          setFields(
                            e.target.checked
                              ? [...fields, f.value]
                              : fields.filter((v) => v !== f.value),
                          )
                        }
                      />
                      {f.label}
                    </label>
                  ))}
                </fieldset>
              )}
              <Button type="submit">
                <Check />
                Enregistrer la décision
              </Button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
