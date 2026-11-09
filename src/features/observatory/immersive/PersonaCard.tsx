import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { animate, motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Persona } from "@/domain/persona";
import { SECTOR_TITLE } from "@/domain/persona";
import { SECTORS, SITUATIONS, AGE_BANDS, labelOf } from "@/domain/reference";
import { departmentName, regionName } from "@/data/territory-utils";
import { styleFor } from "./bust-style";
import { cn } from "@/lib/utils";

const PersonaBust3D = lazy(() => import("./PersonaBust3D"));

/** Decide once on the client: real 3D on capable desktops, depth effect elsewhere. */
function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      gl = false;
    }
    setOk(wide && !calm && mem >= 4 && gl);
  }, []);
  return ok;
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);
  useEffect(() => {
    const c = animate(prev.current, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    prev.current = value;
    return () => c.stop();
  }, [value]);
  return <span ref={ref}>0</span>;
}

function FlatBust({ sector }: { sector: string }) {
  const s = styleFor(sector);
  return (
    <motion.svg
      key={sector}
      viewBox="0 0 200 200"
      className="h-full w-full"
      initial={{ scaleY: 0.85, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 14 }}
      aria-hidden
    >
      <path d="M30 200 C30 140 60 125 100 125 C140 125 170 140 170 200Z" className={cn("fill-current", s.garmentClass)} />
      <ellipse cx="100" cy="128" rx="26" ry="7" className="fill-gold" />
      <rect x="88" y="100" width="24" height="28" rx="8" className="fill-copper" />
      <ellipse cx="100" cy="78" rx="34" ry="38" className="fill-copper" />
      {s.headwear !== "none" && <rect x="66" y="40" width="68" height="20" rx="8" className="fill-gold" />}
    </motion.svg>
  );
}

export function PersonaCard({ persona }: { persona: Persona }) {
  const can3D = useCan3D();
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 }), sy = useSpring(ry, { stiffness: 120, damping: 14 });
  const glare = useTransform(sy, [-12, 12], ["0%", "100%"]);

  return (
    <motion.article
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="persona-card relative mx-auto w-full max-w-[340px] select-none p-[2px]"
      aria-label={`Profil type fictif, ${regionName(persona.regionCode)}`}
    >
      <div className="persona-card-inner relative overflow-hidden px-6 pb-6 pt-5 text-stage-foreground">
        <motion.div aria-hidden className="persona-glare pointer-events-none absolute inset-0" style={{ backgroundPositionX: glare }} />
        <div className="relative flex items-start justify-between">
          <div className="leading-none">
            <p className="font-display text-5xl font-extrabold text-gold tabular-nums">
              <Counter value={persona.rating} />
            </p>
            <p className="mt-1 text-xs font-bold tracking-[0.2em] text-gold/80">{persona.sectorCode}</p>
            <p className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-stage-foreground/70">{persona.regionCode}</p>
          </div>
          <span className="rounded-full border border-gold/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
            Personnage fictif
          </span>
        </div>

        <div className="relative -mt-6 h-48">
          {can3D ? (
            <ClientOnly fallback={<FlatBust sector={persona.sectorCode} />}>
              <Suspense fallback={<FlatBust sector={persona.sectorCode} />}>
                <PersonaBust3D sector={persona.sectorCode} />
              </Suspense>
            </ClientOnly>
          ) : (
            <FlatBust sector={persona.sectorCode} />
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={persona.regionCode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative text-center"
          >
            <h3 className="font-display text-xl font-bold">{SECTOR_TITLE[persona.sectorCode] ?? "Profil type"}</h3>
            <p className="mt-1 text-xs text-stage-foreground/70">
              {labelOf(SITUATIONS, persona.situation)} · {labelOf(AGE_BANDS, persona.ageBand)} ans
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="relative my-4 h-px bg-gold/30" />

        <dl className="relative grid grid-cols-2 gap-x-6 gap-y-2.5">
          {persona.stats.map((s) => (
            <div key={s.key} className="flex items-center gap-3">
              <dt className="sr-only">{s.label}</dt>
              <dd className="w-8 font-display text-lg font-bold tabular-nums text-gold">
                <Counter value={s.value} />
              </dd>
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.16em] text-stage-foreground/80" aria-hidden>
                  {s.key}
                </p>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-stage-foreground/15">
                  <motion.div className="h-full bg-gold" initial={false} animate={{ width: `${s.value}%` }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              </div>
            </div>
          ))}
        </dl>

        <div className="relative mt-5 rounded-md bg-stage-foreground/5 px-3 py-2.5 text-xs">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold/90">Zone de prédilection</p>
          <p className="mt-1 font-semibold">{departmentName(persona.departmentCode)}</p>
          <p className="text-stage-foreground/70">{labelOf(SECTORS, persona.sectorCode)}</p>
        </div>
        <p className="relative mt-3 text-center text-[10px] leading-snug text-stage-foreground/60">
          Construit à partir de {persona.sample.toLocaleString("fr-FR")} dossiers agrégés. Ne représente aucune personne réelle.
        </p>
      </div>
    </motion.article>
  );
}
