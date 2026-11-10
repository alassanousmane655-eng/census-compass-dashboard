import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { REGION_SHAPES, MAP_WIDTH, MAP_HEIGHT } from "@/data/region-shapes";
import { REGION_MEDIA } from "@/data/region-media";
import { regionName } from "@/data/territory-utils";
import { countBy, suppress, formatCell } from "@/domain/stats";
import { buildPersona } from "@/domain/persona";
import type { Dossier } from "@/domain/types";
import { Button } from "@/components/ui/button";
import { PersonaCard } from "./PersonaCard";
import { cn } from "@/lib/utils";

/** North → south tour order for the previous/next controls. */
const ORDER = ["EN", "NO", "AD", "NW", "OU", "LT", "SW", "CE", "ES", "SU"];
const EASE = [0.65, 0, 0.35, 1] as const;
const DEMO_NOW = new Date("2026-10-27");

function fit(code: string | null) {
  const shape = REGION_SHAPES.find((s) => s.code === code);
  if (!shape) return { x: 0, y: 0, scale: 1 };
  const [x, y, w, h] = shape.bbox;
  const scale = Math.min(4, Math.min(MAP_WIDTH / w, MAP_HEIGHT / h) * 0.78);
  return { x: MAP_WIDTH / 2 - (x + w / 2) * scale, y: MAP_HEIGHT / 2 - (y + h / 2) * scale, scale };
}

export function ImmersiveObservatory({ dossiers }: { dossiers: Dossier[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const counts = useMemo(() => countBy(dossiers.filter((d) => d.submittedAt), (d) => d.residence.regionCode), [dossiers]);
  const maxN = Math.max(1, ...Object.values(counts));
  const persona = useMemo(() => (sel ? buildPersona(dossiers, sel, DEMO_NOW, maxN) : null), [dossiers, sel, maxN]);
  const media = sel ? REGION_MEDIA[sel] : null;
  const view = fit(sel);

  const step = (dir: 1 | -1) => {
    const i = ORDER.indexOf(sel ?? "EN");
    setSel(ORDER[(i + dir + ORDER.length) % ORDER.length]);
  };

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const level = (code: string) => {
    const v = suppress(counts[code] ?? 0);
    if (v === null) return "fill-stage-foreground/5";
    const r = v / maxN;
    return r > 0.66 ? "fill-gold/45" : r > 0.33 ? "fill-gold/28" : "fill-gold/14";
  };
  const focus = hover ?? sel;

  return (
    <section aria-labelledby="immersive-title" className="relative mb-14 overflow-hidden rounded-2xl bg-stage text-stage-foreground shadow-lift">
      {/* Background photography */}
      <AnimatePresence>
        {media && (
          <motion.div
            key={sel}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.18 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.9 }, scale: { duration: 14, ease: "linear" } }}
          >
            <img src={media.src} alt={`${media.place}, ${regionName(sel!)}`} className="h-full w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
      <div aria-hidden className="stage-veil absolute inset-0" />

      <div className="relative grid min-h-[720px] gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="flex flex-col">
          <div className="flex min-h-[92px] items-start justify-between gap-4">
            <AnimatePresence mode="wait">
              {sel ? (
                <motion.div key={sel} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{media?.biome}</p>
                  <h2 id="immersive-title" className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                    {regionName(sel)}
                  </h2>
                  <p className="mt-2 text-sm text-stage-foreground/75">
                    {formatCell(suppress(counts[sel] ?? 0))} dossiers soumis · {media?.place}
                  </p>
                </motion.div>
              ) : (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                    <span className="h-px w-8 bg-gold" /> Explorer le territoire
                  </p>
                  <h2 id="immersive-title" className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                    Dix régions. <span className="text-stage-foreground/55">Une même attention.</span>
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative mx-auto mt-4 aspect-[1000/1497] w-full max-w-[440px]">
            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="h-full w-full overflow-visible" role="group" aria-label="Carte des régions du Cameroun">
              <motion.g initial={false} animate={view} transition={{ duration: 1.2, ease: EASE }} style={{ originX: 0, originY: 0 }}>
                {REGION_SHAPES.map((s) => {
                  const active = sel === s.code;
                  const dim = sel && !active;
                  return (
                    <motion.path
                      key={s.code}
                      d={s.d}
                      vectorEffect="non-scaling-stroke"
                      tabIndex={0}
                      role="button"
                      aria-pressed={active}
                      aria-label={`${regionName(s.code)} : ${formatCell(suppress(counts[s.code] ?? 0))} dossiers soumis`}
                      onClick={() => setSel(active ? null : s.code)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSel(active ? null : s.code);
                        }
                      }}
                      onPointerEnter={() => setHover(s.code)}
                      onPointerLeave={() => setHover(null)}
                      onFocus={() => setHover(s.code)}
                      onBlur={() => setHover(null)}
                      animate={{ opacity: dim ? 0.18 : 1 }}
                      transition={{ duration: 0.6 }}
                      className={cn(
                        "cursor-pointer stroke-stage-foreground/70 outline-none transition-[fill] duration-300 [stroke-width:1.25]",
                        active ? "fill-gold/10 stroke-gold [stroke-width:2]" : level(s.code),
                        hover === s.code && !active && "fill-gold/60 stroke-gold",
                      )}
                    />
                  );
                })}
              </motion.g>
            </svg>
            {!sel && focus && (
              <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-stage/85 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                {regionName(focus)} · {formatCell(suppress(counts[focus] ?? 0))}
              </div>
            )}
          </div>

          {sel && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSel(null)} className="border-stage-foreground/30 bg-transparent text-stage-foreground hover:bg-stage-foreground/10 hover:text-stage-foreground">
                <ArrowLeft /> Retour au Cameroun
              </Button>
              <Button variant="ghost" size="icon" aria-label="Région précédente" onClick={() => step(-1)} className="text-stage-foreground hover:bg-stage-foreground/10 hover:text-stage-foreground">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Région suivante" onClick={() => step(1)} className="text-stage-foreground hover:bg-stage-foreground/10 hover:text-stage-foreground">
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>

        <div className="flex min-h-[560px] flex-col justify-center">
          <AnimatePresence mode="wait">
            {!sel ? (
              <motion.div key="list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                <p className="max-w-md text-base text-stage-foreground/75">
                  Choisissez une région pour plonger dans son paysage et découvrir son profil type : un personnage fictif, calculé uniquement à partir des chiffres agrégés.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-2">
                  {ORDER.map((c) => (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => setSel(c)}
                        onPointerEnter={() => setHover(c)}
                        onPointerLeave={() => setHover(null)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border border-stage-foreground/15 px-3 py-2.5 text-left text-sm transition-colors hover:border-gold hover:bg-stage-foreground/5",
                          hover === c && "border-gold",
                        )}
                      >
                        <span className="font-medium">{regionName(c)}</span>
                        <span className="tabular-nums text-gold">{formatCell(suppress(counts[c] ?? 0))}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div key={`card-${sel}`} initial={{ opacity: 0, y: 30, rotateY: -25 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, delay: 0.35, ease: EASE }}>
                {persona ? (
                  <PersonaCard persona={persona} />
                ) : (
                  <div className="mx-auto max-w-[340px] rounded-xl border border-dashed border-stage-foreground/30 p-8 text-center">
                    <p className="font-display text-lg font-bold">Données insuffisantes</p>
                    <p className="mt-2 text-sm text-stage-foreground/70">Moins de 10 dossiers dans cette région : aucun profil type n’est construit, pour protéger les personnes.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {media && (
        <p className="relative px-6 pb-4 text-right text-[10px] text-stage-foreground/55 sm:px-10">
          Photo : {media.place} · {media.author} ·{" "}
          <a href={media.sourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-gold">
            {media.license}, Wikimedia Commons
          </a>
        </p>
      )}
    </section>
  );
}
