import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Pencil,
  Clock,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/common/StatusBadge";
import { fmtDate } from "@/components/common/format";
import {
  DossierSummary,
  ProfileFields,
  ResidenceFields,
  ActivityFields,
} from "@/features/census/CensusForm";
import { profileSchema, residenceSchema, activitySchema } from "@/features/census/validation";
import { STATUS_META } from "@/domain/status";
import {
  CORRECTION_REASONS,
  CORRECTABLE_FIELDS,
  labelOf,
  FRESHNESS_MONTHS,
} from "@/domain/reference";
import type {
  ProfileData,
  ResidenceData,
  ActivityData,
  CorrectableField,
  DataRequestType,
} from "@/domain/types";
import {
  useSession,
  useApp,
  findMemberDossier,
  memberUpdate,
  confirmProfile,
  updatePreferences,
  createDataRequest,
} from "@/services/store";
import { Faq } from "@/features/public/PublicPages";
export function MemberPage({ page = "dashboard" }: { page?: string }) {
  const session = useSession(),
    app = useApp(),
    d = findMemberDossier(app, session?.account.userId);
  if (!session)
    return (
      <div className="py-12">
        <ShieldCheck className="mb-5 size-10 text-primary" />
        <PageHeader
          title="Votre espace membre"
          description="Accédez à la démonstration pour retrouver votre dossier."
        />
        <Button asChild>
          <Link to="/connexion">
            Accéder à la démo <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  if (page === "preferences") return <Preferences />;
  if (page === "demandes") return <Requests />;
  if (page === "aide")
    return (
      <>
        <PageHeader title="Aide & accompagnement" />
        <Faq />
        <Button className="mt-7" variant="outline" asChild>
          <Link to="/contact">
            Contacter le Centre <ArrowRight />
          </Link>
        </Button>
      </>
    );
  if (page === "profil" || page === "corrections")
    return d ? <EditProfile dossierId={d.id} /> : <Empty />;
  if (page === "dossier")
    return (
      <>
        <PageHeader
          eyebrow="Mon recensement"
          title="Mon dossier"
          action={d && <StatusBadge status={d.status} />}
        />
        {!d ? (
          <Empty />
        ) : (
          <>
            <div className="mb-8 border-y py-5">
              <p className="text-xs text-muted-foreground">RÉFÉRENCE</p>
              <p className="mt-1 text-xl font-bold text-primary">{d.reference}</p>
              <p className="mt-3 text-sm">{STATUS_META[d.status].memberHint}</p>
            </div>
            {d.correction && (
              <div className="mb-8 border-l-4 border-warning bg-warning-bg p-5">
                <h2 className="text-lg">Corrections demandées</h2>
                <p className="mt-2 text-sm">
                  {labelOf(CORRECTION_REASONS, d.correction.reasonCode)}
                </p>
                <p className="mt-2 text-sm">
                  Champs :{" "}
                  {d.correction.fields.map((f) => labelOf(CORRECTABLE_FIELDS, f)).join(", ")}
                </p>
                <Button className="mt-4" asChild>
                  <Link to="/membre/corrections">
                    Corriger mon dossier <Pencil />
                  </Link>
                </Button>
              </div>
            )}
            <div className="grid gap-10 xl:grid-cols-2">
              <section>
                <h2 className="mb-6 text-xl">Mes informations</h2>
                <DossierSummary {...d} />
                <Button className="mt-6" variant="outline" asChild>
                  <Link to="/membre/profil">
                    <Pencil />
                    Modifier mon profil
                  </Link>
                </Button>
              </section>
              <section>
                <h2 className="mb-6 text-xl">Historique du dossier</h2>
                <ol className="space-y-6 border-l pl-5">
                  {d.history.map((h, i) => (
                    <li key={i}>
                      <StatusBadge status={h.to} />
                      <p className="mt-2 text-xs text-muted-foreground">
                        {fmtDate(h.at)} · {h.actorLabel}
                      </p>
                      {h.reasonCode && (
                        <p className="mt-1 text-sm">{labelOf(CORRECTION_REASONS, h.reasonCode)}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </>
        )}
      </>
    );
  return (
    <>
      <PageHeader
        eyebrow="Espace membre"
        title={`Bonjour, ${session.account.displayName}.`}
        description="Votre parcours, votre dossier, vos choix."
      />
      {!d ? (
        <Empty />
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-y py-7">
            <div>
              <p className="mb-3 text-xs text-muted-foreground">MON DOSSIER · {d.reference}</p>
              <StatusBadge status={d.status} />
              <p className="mt-3 text-sm text-muted-foreground">
                {STATUS_META[d.status].memberHint}
              </p>
            </div>
            <Button asChild>
              <Link to="/membre/dossier">
                Consulter mon dossier <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            <div className="border-t border-primary pt-5">
              <ClipboardList className="mb-4 size-6 text-primary" />
              <h2 className="text-lg">Mon profil</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Dernière mise à jour : {fmtDate(d.updatedAt)}
              </p>
              <Button variant="link" className="mt-4" asChild>
                <Link to="/membre/profil">
                  Mettre à jour <Pencil />
                </Link>
              </Button>
            </div>
            <div className="border-t border-copper pt-5">
              <CheckCircle2 className="mb-4 size-6 text-copper" />
              <h2 className="text-lg">Profil à jour</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Dernière confirmation : {fmtDate(d.lastConfirmedAt)}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  confirmProfile(d.id);
                  toast.success("Votre profil est confirmé à jour.");
                }}
              >
                <Check />
                Mon profil est à jour
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                Période provisoire : {FRESHNESS_MONTHS} mois.
              </p>
            </div>
            <div className="border-t border-indigo pt-5">
              <ShieldCheck className="mb-4 size-6 text-indigo" />
              <h2 className="text-lg">Mes données</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Accès, rectification, suppression et opposition.
              </p>
              <Button variant="link" className="mt-4" asChild>
                <Link to="/membre/demandes">
                  Exercer mes droits <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
function Empty() {
  return (
    <div className="border-y py-12">
      <ClipboardList className="mb-5 size-10 text-copper" />
      <h2 className="text-2xl">Votre parcours commence ici.</h2>
      <p className="mt-4 max-w-lg text-muted-foreground">
        Vous n’avez pas encore soumis de dossier. Votre brouillon est conservé sur cet appareil.
      </p>
      <Button asChild className="mt-6">
        <Link to="/recensement/formulaire">
          Commencer ou reprendre <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
function EditProfile({ dossierId }: { dossierId: string }) {
  const app = useApp(),
    d = app.dossiers.find((x) => x.id === dossierId);
  const [profile, setProfile] = useState<Partial<ProfileData>>(d?.profile ?? {}),
    [residence, setResidence] = useState<Partial<ResidenceData>>(d?.residence ?? {}),
    [activity, setActivity] = useState<Partial<ActivityData>>(d?.activity ?? {}),
    [errors, setErrors] = useState<Record<string, string>>({});
  if (!d) return <Empty />;
  function save() {
    const p = profileSchema.safeParse(profile),
      r = residenceSchema.safeParse(residence),
      a = activitySchema.safeParse(activity);
    const errs: Record<string, string> = {};
    for (const result of [p, r, a])
      if (!result.success) for (const i of result.error.issues) errs[String(i.path[0])] = i.message;
    setErrors(errs);
    if (!p.success || !r.success || !a.success || !d) return;
    const changed: CorrectableField[] = [];
    if (p.data.firstName !== d.profile.firstName || p.data.lastName !== d.profile.lastName)
      changed.push("identite");
    if (p.data.ageBand !== d.profile.ageBand) changed.push("age");
    if (p.data.contact !== d.profile.contact || p.data.contactType !== d.profile.contactType)
      changed.push("contact");
    if (JSON.stringify(r.data) !== JSON.stringify(d.residence)) changed.push("residence");
    if (JSON.stringify(a.data) !== JSON.stringify(d.activity)) changed.push("activite");
    try {
      memberUpdate(
        d.id,
        { profile: p.data as ProfileData, residence: r.data, activity: a.data as ActivityData },
        changed,
      );
      toast.success(
        d.status === "action_requise"
          ? "Corrections soumises pour vérification."
          : "Profil mis à jour.",
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Mise à jour impossible.");
    }
  }
  return (
    <>
      <PageHeader
        title={d.status === "action_requise" ? "Corriger mon dossier" : "Modifier mon profil"}
        description="La modification du nom ou de la résidence d’un dossier validé entraîne une nouvelle vérification."
      />
      {d.correction && (
        <p className="mb-6 bg-warning-bg p-4 text-sm text-warning">
          {labelOf(CORRECTION_REASONS, d.correction.reasonCode)} —{" "}
          {d.correction.fields.map((f) => labelOf(CORRECTABLE_FIELDS, f)).join(", ")}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        noValidate
        className="max-w-3xl space-y-9"
      >
        <section>
          <h2 className="mb-5 text-xl">Profil</h2>
          <ProfileFields value={profile} onChange={setProfile} errors={errors} />
        </section>
        <section className="border-t pt-7">
          <h2 className="mb-5 text-xl">Résidence</h2>
          <ResidenceFields value={residence} onChange={setResidence} errors={errors} />
        </section>
        <section className="border-t pt-7">
          <h2 className="mb-5 text-xl">Activité</h2>
          <ActivityFields value={activity} onChange={setActivity} errors={errors} />
        </section>
        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            <Check />
            Enregistrer les modifications
          </Button>
          <Button variant="outline" asChild>
            <Link to="/membre/dossier">Retour au dossier</Link>
          </Button>
        </div>
      </form>
    </>
  );
}
function Preferences() {
  const session = useSession();
  const [prefs, setPrefs] = useState(
    session?.account.preferences ?? { email: true, sms: false, actualites: false },
  );
  return (
    <>
      <PageHeader
        title="Mes préférences"
        description="Choisissez les communications que vous souhaitez recevoir."
      />
      <form
        className="max-w-xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          updatePreferences(prefs);
          toast.success("Préférences enregistrées pour cette démonstration.");
        }}
      >
        {(
          [
            { key: "email", label: "Suivi de mon dossier par e-mail" },
            { key: "sms", label: "Suivi de mon dossier par SMS" },
            { key: "actualites", label: "Actualités et activités du Centre" },
          ] as const
        ).map((x) => (
          <label key={x.key} className="flex items-center justify-between gap-4 border-b pb-5">
            <span>{x.label}</span>
            <input
              type="checkbox"
              className="size-5 accent-primary"
              checked={prefs[x.key]}
              onChange={(e) => setPrefs({ ...prefs, [x.key]: e.target.checked })}
            />
          </label>
        ))}
        <p className="text-sm text-muted-foreground">
          Aucun message réel n’est envoyé dans cette démonstration.
        </p>
        <Button type="submit">
          <Check />
          Enregistrer mes préférences
        </Button>
      </form>
    </>
  );
}
function Requests() {
  const app = useApp(),
    session = useSession(),
    d = findMemberDossier(app, session?.account.userId);
  const [type, setType] = useState<DataRequestType>("acces"),
    [message, setMessage] = useState("");
  const requests = app.requests.filter((r) => r.ownerUserId === session?.account.userId);
  return (
    <>
      <PageHeader
        title="Mes données & mes droits"
        description="Les demandes de cette démonstration ne sont pas transmises au Centre."
      />
      <form
        className="mb-10 max-w-xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!session) return;
          createDataRequest(session.account.userId, d?.id, type, message);
          setMessage("");
          toast.success("Demande de démonstration enregistrée.");
        }}
      >
        <label className="block text-sm font-semibold">
          Type de demande
          <select
            className="field-input mt-2"
            value={type}
            onChange={(e) => setType(e.target.value as DataRequestType)}
          >
            <option value="acces">Accès à mes données</option>
            <option value="rectification">Rectification</option>
            <option value="suppression">Suppression</option>
            <option value="opposition">Opposition</option>
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Précisions (facultatif)
          <textarea
            className="field-input mt-2"
            rows={3}
            value={message}
            maxLength={1000}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <Button type="submit">
          Enregistrer ma demande <ArrowRight />
        </Button>
      </form>
      <h2 className="mb-5 text-xl">Mes demandes</h2>
      {requests.length ? (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Type</th>
                <th>Reçue le</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.reference}</td>
                  <td>{r.type}</td>
                  <td>{fmtDate(r.createdAt)}</td>
                  <td>{r.status.replaceAll("_", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="border-y py-6 text-sm text-muted-foreground">Aucune demande enregistrée.</p>
      )}
    </>
  );
}
