import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Users,
  MapPin,
  Heart,
  ChevronDown,
  Globe,
  Clock,
  Check,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/AppShell";
import { ToValidate } from "@/components/common/ToValidate";
import { signIn } from "@/services/store";
import hero from "@/assets/haoussa-community.jpg";
import embroidery from "@/assets/culture-broderie.jpg";
import help from "@/assets/recensement-aide.jpg";
export const FAQ = [
  {
    q: "Qui peut se faire recenser ?",
    a: "Le parcours présente le recensement communautaire au Cameroun. Les critères d’éligibilité définitifs doivent être validés par le Centre. Cette démonstration ne constitue pas une collecte réelle.",
  },
  {
    q: "Quelles informations sont demandées ?",
    a: "Un nom, un prénom, une tranche d’âge, un moyen de contact, un lieu de résidence et une situation professionnelle. La profession, la localité et la participation aux activités sont facultatives.",
  },
  {
    q: "Mes informations seront-elles publiques ?",
    a: "Non. L’Observatoire affiche uniquement des résultats agrégés. Les petits effectifs sont masqués. Les noms et les coordonnées n’y figurent jamais.",
  },
  {
    q: "Puis-je corriger mes informations ?",
    a: "Oui. Votre espace membre permet de mettre à jour votre dossier et de répondre aux corrections demandées. Une modification du nom ou de la résidence d’un dossier validé déclenche une nouvelle vérification.",
  },
  {
    q: "Le recensement est-il obligatoire ?",
    a: "Non. La participation est volontaire. Le choix de recevoir les communications du Centre est distinct et facultatif.",
  },
  {
    q: "Comment exercer mes droits ?",
    a: "Une demande d’accès, rectification, suppression ou opposition peut être créée dans l’espace membre. Le contact officiel et la durée de conservation restent à valider avant la collecte réelle.",
  },
];
export function Faq() {
  return (
    <div className="divide-y border-y">
      {FAQ.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
            {f.q}
            <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
export function Home() {
  return (
    <>
      <section className="relative isolate min-h-[470px] overflow-hidden md:min-h-[520px]">
        <img
          src={hero}
          width={1536}
          height={1024}
          alt="Illustration documentaire générée : une famille haoussa échange autour d’un formulaire dans une cour"
          className="absolute inset-0 h-full w-full object-cover object-[65%_48%]"
        />
        <div className="absolute inset-0 hero-shade md:right-1/2" />
        <div className="container-page relative py-14 md:py-20">
          <div className="max-w-xl text-inverse">
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold">
              <span className="h-px w-7 bg-inverse/60" />
              CENTRE CULTUREL & COMMUNAUTAIRE
            </p>
            <h1 className="text-display">HAOUSSA</h1>
            <p className="mt-5 max-w-md text-2xl font-display font-semibold leading-snug md:text-3xl">
              Notre héritage nous rassemble.
              <br />
              Notre avenir se construit ensemble.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-inverse/85">
              Un lieu de transmission, de rencontre et d’engagement pour la communauté haoussa au
              Cameroun.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="inverse" asChild>
                <Link to="/recensement/formulaire">
                  Se faire recenser <ArrowUpRight />
                </Link>
              </Button>
              <Button variant="outline-inverse" asChild>
                <Link to="/le-centre">
                  Découvrir le Centre <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <span className="absolute bottom-4 right-5 text-[10px] text-inverse/80">
          Illustration générée · communauté haoussa
        </span>
      </section>
      <section className="border-b bg-paper">
        <div className="container-page grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            {
              icon: Users,
              title: "Une communauté, de multiples parcours",
              text: "Relier les personnes, les savoir-faire et les générations.",
            },
            {
              icon: MapPin,
              title: "Un ancrage dans les 10 régions",
              text: "Un recensement structuré, au plus près des territoires.",
            },
            {
              icon: ShieldCheck,
              title: "Une démarche volontaire et protégée",
              text: "Des informations minimales, des résultats anonymes.",
            },
          ].map((x) => (
            <div key={x.title} className="flex gap-4 py-7 md:px-6 first:md:pl-0">
              <x.icon className="size-6 shrink-0 text-copper" />
              <div>
                <h2 className="text-sm leading-normal">{x.title}</h2>
                <p className="mt-2 text-xs text-muted-foreground">{x.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="container-page py-16 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow mb-4">LE RECENSEMENT COMMUNAUTAIRE</p>
            <h2 className="section-title max-w-md">
              Mieux nous connaître.
              <br />
              Mieux agir ensemble.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Derrière chaque dossier, un parcours et des aspirations. Le recensement est le point
              de départ pour orienter les initiatives de la communauté.
            </p>
            <Button variant="link" asChild className="mt-5">
              <Link to="/recensement">
                Comprendre la démarche <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border-t-2 border-primary pt-5">
              <span className="text-sm text-copper">01</span>
              <h3 className="mt-3 text-lg">Je partage mon parcours</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Un profil minimal, ma résidence et mon activité.
              </p>
            </div>
            <div className="border-t-2 border-copper pt-5">
              <span className="text-sm text-copper">02</span>
              <h3 className="mt-3 text-lg">Je garde le contrôle</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Un dossier que je peux suivre et mettre à jour.
              </p>
            </div>
            <div className="border-t-2 border-indigo pt-5">
              <span className="text-sm text-copper">03</span>
              <h3 className="mt-3 text-lg">Nous éclairons l’avenir</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Des indicateurs agrégés pour accompagner les actions.
              </p>
            </div>
            <div className="flex items-center">
              <Button asChild>
                <Link to="/recensement/formulaire">
                  Commencer <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-paper py-16">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">CULTURE & TRANSMISSION</p>
              <h2 className="section-title">Un héritage qui se vit.</h2>
            </div>
            <Button variant="link" asChild>
              <Link to="/culture">
                Explorer la communauté <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Link to="/culture/programmes" className="group md:col-span-2">
              <img
                src={embroidery}
                width={1024}
                height={1024}
                loading="lazy"
                className="h-64 w-full object-cover md:h-80"
                alt="Broderies et savoir-faire textiles haoussa, illustration générée"
              />
              <p className="eyebrow mt-5">SAVOIR-FAIRE</p>
              <h3 className="mt-2 text-xl">
                Les gestes qui traversent les générations{" "}
                <ArrowUpRight className="ml-2 inline size-5" />
              </h3>
            </Link>
            <div className="border-t border-copper pt-5">
              <Globe className="mb-5 size-8 text-copper" />
              <h3 className="text-xl">Langue, mémoire et liens</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                La transmission de la langue, la valorisation du patrimoine et la rencontre entre
                générations sont au cœur du projet du Centre.
              </p>
              <Button variant="link" asChild className="mt-6">
                <Link to="/culture/programmes">
                  Nos axes culturels <ArrowRight />
                </Link>
              </Button>
              <div className="mt-8 border-t pt-5">
                <span className="text-xs text-muted-foreground">PROGRAMMATION OFFICIELLE</span>
                <p className="mt-2 text-sm">À confirmer par le Centre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-3">CHAQUE PARCOURS COMPTE</p>
            <h2 className="section-title">Prenez part à la démarche.</h2>
            <p className="mt-4 text-muted-foreground">
              Volontaire. Accessible. Respectueuse de vos choix.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link to="/recensement/formulaire">
              Se faire recenser <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
export function CensusLanding() {
  return (
    <>
      <div className="container-page py-14">
        <PageHeader
          eyebrow="Recensement communautaire"
          title="Chaque parcours compte."
          description="Mieux connaître les dossiers déclarés, pour construire des actions utiles et adaptées."
        />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed">
              Le recensement est la première étape d’un projet commun : réunir des informations
              minimales sur les parcours, les territoires et les activités de la communauté.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/recensement/formulaire">
                  Commencer mon dossier <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/recensement/faq">Mes questions</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex gap-2">
                <Check className="size-4 text-primary" />
                Volontaire
              </span>
              <span className="flex gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Données protégées
              </span>
              <span className="flex gap-2">
                <SaveIcon />
                Brouillon conservé
              </span>
            </div>
          </div>
          <img
            src={help}
            loading="lazy"
            width={1024}
            height={1024}
            alt="Accompagnement au recensement, illustration générée"
            className="h-72 w-full object-cover"
          />
        </div>
      </div>
      <section className="bg-paper py-14">
        <div className="container-page">
          <h2 className="section-title mb-8">Une démarche en trois temps</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Vous renseignez votre dossier",
              "Le dossier est vérifié",
              "Vous suivez et actualisez votre profil",
            ].map((t, i) => (
              <div key={t} className="border-t border-copper pt-4">
                <p className="text-copper">0{i + 1}</p>
                <h3 className="mt-4 text-xl">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {
                    [
                      "Notice d’information, profil minimal, résidence, activité et participation facultative.",
                      "Un examen humain peut conduire à une validation, une demande de correction ou un refus motivé.",
                      "Votre référence vous permet de retrouver votre dossier dans votre espace membre.",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container-page py-14">
        <h2 className="section-title mb-7">Vos questions, nos réponses</h2>
        <Faq />
      </div>
    </>
  );
}
function SaveIcon() {
  return <Clock className="size-4 text-primary" />;
}
export function PublicContent({ page }: { page: string }) {
  if (page === "faq")
    return (
      <div className="container-page max-w-4xl py-14">
        <PageHeader eyebrow="Recensement" title="Questions fréquentes" />
        <Faq />
      </div>
    );
  if (page === "protection")
    return (
      <div className="container-page max-w-4xl py-14">
        <PageHeader
          eyebrow="Transparence & droits"
          title="Vos données, vos choix."
          description="Notice provisoire — aucune collecte réelle dans cette démonstration."
        />
        <ToValidate>
          Responsable du traitement, contact officiel, base légale et durée de conservation à
          confirmer avant ouverture réelle.
        </ToValidate>
        <div className="mt-8 space-y-7">
          {[
            [
              "Finalité",
              "Mieux connaître les dossiers déclarés de la communauté et orienter les initiatives culturelles et communautaires. Le recensement n’est pas une estimation exhaustive.",
            ],
            [
              "Informations demandées",
              "Nom, prénom, tranche d’âge, contact, région, département, arrondissement, situation professionnelle et secteur. Participation, profession et localité facultatives.",
            ],
            [
              "Accès et confidentialité",
              "Les personnes habilitées consultent les dossiers selon leur rôle et leur territoire. Les résultats publics ne contiennent pas de données nominatives ; les effectifs inférieurs à 10 sont masqués (seuil provisoire).",
            ],
            [
              "Vos droits",
              "Accès, rectification, suppression et opposition. Une demande peut être simulée dans l’espace membre. Les coordonnées officielles pour exercer vos droits seront communiquées par le Centre.",
            ],
            [
              "Conservation dans la démonstration",
              "Le brouillon, le dossier et la session de démonstration restent dans votre navigateur. Aucun compte réel n’est créé, aucun e-mail n’est envoyé et aucune donnée n’est transmise au Centre.",
            ],
          ].map(([t, b]) => (
            <section key={t}>
              <h2 className="text-xl">{t}</h2>
              <p className="mt-3 text-muted-foreground">{b}</p>
            </section>
          ))}
        </div>
      </div>
    );
  if (page === "centre")
    return (
      <div className="container-page py-14">
        <PageHeader
          eyebrow="Le Centre"
          title="HAOUSSA, un lieu de liens."
          description="Préserver notre héritage, nourrir les rencontres, accompagner les parcours."
        />
        <img
          src={hero}
          width={1536}
          height={1024}
          loading="lazy"
          alt="Rencontre communautaire haoussa, illustration générée"
          className="mb-10 h-80 w-full object-cover object-center"
        />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title">Une ambition commune</h2>
            <p className="mt-5 text-muted-foreground">
              Le projet du Centre place la culture, la transmission et la connaissance de la
              communauté au cœur de son action. Le recensement en constitue la première étape.
            </p>
          </div>
          <div className="space-y-6">
            {[
              ["Transmettre", "Valoriser la langue, les mémoires et les savoir-faire."],
              ["Rassembler", "Renforcer les liens entre les générations et les territoires."],
              [
                "Accompagner",
                "Éclairer les besoins à partir d’informations déclarées et vérifiées.",
              ],
            ].map(([t, b]) => (
              <div key={t} className="border-t pt-4">
                <h3 className="text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
        <ToValidate className="mt-10">
          Historique officiel, gouvernance, partenaires, adresse et horaires du Centre non fournis.
        </ToValidate>
      </div>
    );
  const titles: Record<string, string> = {
    culture: "Culture & communauté",
    programmes: "Langue, patrimoine et transmission",
    actualites: "Actualités du Centre",
    agenda: "Agenda communautaire",
    galerie: "Regards sur notre héritage",
  };
  return (
    <div className="container-page py-14">
      <PageHeader
        eyebrow="Un héritage vivant"
        title={titles[page] ?? "Culture & communauté"}
        description="Transmettre les savoirs, faire vivre les liens."
      />
      <nav className="mb-9 flex flex-wrap gap-3" aria-label="Culture">
        {[
          { to: "/culture/programmes", label: "Programmes" },
          { to: "/culture/actualites", label: "Actualités" },
          { to: "/culture/agenda", label: "Agenda" },
          { to: "/culture/galerie", label: "Galerie" },
        ].map((l) => (
          <Button variant="outline" size="sm" asChild key={l.to}>
            <Link to={l.to}>{l.label}</Link>
          </Button>
        ))}
      </nav>
      {page === "agenda" || page === "actualites" ? (
        <div className="border-y py-14 text-center">
          <CalendarDays className="mx-auto mb-5 size-10 text-copper" />
          <h2 className="text-xl">
            {page === "agenda" ? "Programmation à confirmer" : "Publications à confirmer"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Aucune {page === "agenda" ? "date d’événement" : "actualité officielle"} n’a encore été
            fournie par le Centre.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-7 md:grid-cols-2">
            <img
              src={embroidery}
              width={1024}
              height={1024}
              loading="lazy"
              alt="Artisanat et broderie haoussa, illustration générée"
              className="h-80 w-full object-cover"
            />
            <img
              src={hero}
              width={1536}
              height={1024}
              loading="lazy"
              alt="Rencontre entre générations, illustration générée"
              className="h-80 w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Illustrations générées, non photographies officielles du Centre.
          </p>
          {page !== "galerie" && (
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["Langue & mémoire", "Transmission de la langue et valorisation des récits."],
                ["Artisanat & patrimoine", "Broderie, création et partage des savoir-faire."],
                ["Rencontres & engagement", "Liens entre générations, bénévolat et entraide."],
              ].map(([t, b]) => (
                <div key={t} className="border-t border-copper pt-5">
                  <h2 className="text-xl">{t}</h2>
                  <p className="mt-4 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          )}
          <ToValidate className="mt-10">
            Axes proposés à titre de présentation ; programmes, intervenants, calendrier et
            modalités à confirmer.
          </ToValidate>
        </>
      )}
    </div>
  );
}
export function Contact() {
  const [done, setDone] = useState(false);
  return (
    <div className="container-page py-14">
      <PageHeader
        eyebrow="Restons en lien"
        title="Contacter le Centre"
        description="Une question sur le recensement ou sur le projet ?"
      />
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <ToValidate>Adresse, téléphone, e-mail et horaires officiels non fournis.</ToValidate>
          <div>
            <h2 className="text-xl">Une question sur vos données ?</h2>
            <p className="mt-4 text-muted-foreground">
              Votre espace membre permet de simuler une demande d’accès, de rectification, de
              suppression ou d’opposition.
            </p>
            <Button asChild variant="link" className="mt-4">
              <Link to="/membre/demandes">
                Mes demandes <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
        <div>
          {done ? (
            <div role="status" className="border-y py-10">
              <Check className="mb-4 size-8 text-primary" />
              <h2 className="text-xl">Message préparé</h2>
              <p className="mt-4 text-muted-foreground">
                Il n’a pas été envoyé : le contact officiel et le service d’envoi ne sont pas encore
                raccordés.
              </p>
              <Button variant="outline" className="mt-5" onClick={() => setDone(false)}>
                Nouveau message
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="space-y-5"
            >
              <label className="block text-sm font-semibold">
                Nom
                <input required minLength={2} className="field-input mt-2" autoComplete="name" />
              </label>
              <label className="block text-sm font-semibold">
                E-mail
                <input required className="field-input mt-2" type="email" autoComplete="email" />
              </label>
              <label className="block text-sm font-semibold">
                Votre message
                <textarea
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  className="field-input mt-2"
                />
              </label>
              <Button type="submit">
                Préparer le message <ArrowRight />
              </Button>
              <p className="text-xs text-muted-foreground">
                Simulation uniquement. Ne saisissez pas de données personnelles réelles.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export function DemoAccess({ signup = false }: { signup?: boolean }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    navigate = useNavigate();
  function enter(provider: "email" | "google") {
    signIn({ email: email || "membre@haoussa.demo", displayName: name || "Membre démo", provider });
    navigate({ to: "/membre" });
  }
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-md">
        <p className="eyebrow mb-4">Espace membre · démonstration</p>
        <h1 className="mb-5 text-3xl">
          {signup ? "Rejoindre la communauté" : "Bienvenue dans votre espace"}
        </h1>
        <p className="mb-7 text-sm text-muted-foreground">
          Aucun compte réel ni mot de passe n’est créé. Utilisez une identité fictive pour explorer
          le parcours.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enter("email");
          }}
          className="space-y-5"
        >
          <label className="block text-sm font-semibold">
            Nom de démonstration
            <input
              required
              className="field-input mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. Membre démo"
            />
          </label>
          <label className="block text-sm font-semibold">
            E-mail fictif
            <input
              required
              type="email"
              className="field-input mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="membre@haoussa.demo"
            />
          </label>
          <Button type="submit" className="w-full">
            Entrer dans la démonstration <ArrowRight />
          </Button>
        </form>
        <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          OU
          <span className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="w-full" onClick={() => enter("google")}>
          <Globe />
          Simuler un compte Google
        </Button>
        <Button disabled variant="outline" className="mt-3 w-full">
          <Phone />
          Téléphone · bientôt
        </Button>
        <p className="mt-7 text-center text-sm">
          <Link to={signup ? "/connexion" : "/s-inscrire"} className="text-primary underline">
            {signup ? "Déjà membre ? Accéder à la démo" : "Découvrir l’inscription"}
          </Link>
        </p>
      </div>
    </div>
  );
}
