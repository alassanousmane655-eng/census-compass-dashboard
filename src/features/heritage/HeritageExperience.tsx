import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform, MotionConfig } from "framer-motion";
import { ArrowDown, Image as ImageIcon, Music, Pause, Play, Video, X } from "lucide-react";
import { HERITAGE_CHAPTERS, type HeritageChapter, type HeritageMedia } from "@/data/heritage-chapters";
import { cn } from "@/lib/utils";

function MediaSlot({ m, className }: { m: HeritageMedia; className?: string }) {
  const Icon = m.kind === "video" ? Video : m.kind === "audio" ? Music : ImageIcon;
  return (
    <figure className={cn("relative overflow-hidden rounded-sm border border-heritage-brass/25", className)}>
      {m.src ? (
        <img src={m.src} alt={m.caption} className="h-full w-full object-cover" />
      ) : (
        <div className="heritage-slot flex h-full min-h-[280px] flex-col items-center justify-center gap-3 text-center">
          <Icon className="h-7 w-7 text-heritage-brass" />
          <p className="text-xs uppercase tracking-[0.25em] text-heritage-ivory/60">{m.kind === "image" ? "Image" : m.kind === "video" ? "Vidéo" : "Son"} à fournir</p>
          <p className="max-w-[70%] font-editorial text-lg italic text-heritage-ivory/80">{m.caption}</p>
        </div>
      )}
      <figcaption className="absolute bottom-0 left-0 right-0 bg-heritage-night/70 px-3 py-1.5 text-[10px] text-heritage-ivory/60">
        Source : {m.source ?? "à documenter"} · Auteur : {m.author ?? "à documenter"} · Droits : {m.rights ?? "à vérifier"}
      </figcaption>
    </figure>
  );
}

function Chapter({ c, index }: { c: HeritageChapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;
  return (
    <section ref={ref} id={c.id} aria-labelledby={`${c.id}-t`} className="relative flex min-h-screen items-center border-t border-heritage-brass/10 py-24">
      <div className={cn("container-page grid items-center gap-12 lg:grid-cols-2", flip && "lg:[&>*:first-child]:order-2")}>
        <motion.div style={{ y }} className="grid gap-4">
          {c.media.map((m, i) => <MediaSlot key={i} m={m} className={i ? "aspect-[16/9]" : "aspect-[4/5]"} />)}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }}>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-heritage-brass">
            <span>{c.n}</span><span className="h-px w-10 bg-heritage-brass/60" />{c.kicker}
          </p>
          <h2 id={`${c.id}-t`} className="mt-5 font-editorial text-5xl font-semibold leading-[1.05] text-heritage-ivory sm:text-6xl">{c.title}</h2>
          <p className="mt-6 text-lg text-heritage-ivory/85">{c.lead}</p>
          <p className="mt-4 text-heritage-ivory/65">{c.body}</p>
          {c.quote && <blockquote className="mt-8 border-l-2 border-heritage-terracotta pl-5 font-editorial text-2xl italic text-heritage-ivory/90">« {c.quote} »</blockquote>}
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-8 text-sm font-semibold text-heritage-brass underline-offset-4 hover:underline">
            {open ? "Refermer" : "En savoir plus"}
          </button>
          {open && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {c.deeper.map((d) => <li key={d} className="rounded-sm border border-heritage-indigo/60 bg-heritage-forest px-3 py-3 text-sm text-heritage-ivory/80">{d}<span className="mt-1 block text-[10px] uppercase tracking-wider text-heritage-ivory/40">Collection à venir</span></li>)}
            </ul>
          )}
          <p className="mt-6 text-[10px] uppercase tracking-wider text-heritage-ivory/35">Texte provisoire · à valider par un historien ou le Centre</p>
        </motion.div>
      </div>
    </section>
  );
}

export function HeritageExperience() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  return (
    <MotionConfig reducedMotion={paused || reduce ? "always" : "never"}>
      <div className="theme-heritage relative">
        <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed left-0 right-0 top-0 z-50 h-0.5 origin-left bg-heritage-brass" />
        <nav aria-label="Chapitres" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
          {HERITAGE_CHAPTERS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="group flex items-center justify-end gap-3 text-[11px] text-heritage-ivory/50 hover:text-heritage-brass">
              <span className="opacity-0 transition-opacity group-hover:opacity-100">{c.kicker}</span>
              <span className="font-semibold tabular-nums">{c.n}</span>
            </a>
          ))}
        </nav>
        <div className="fixed bottom-5 right-5 z-40 flex gap-2">
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Reprendre les animations" : "Mettre en pause les animations"} className="rounded-full border border-heritage-brass/40 bg-heritage-night/80 p-2.5 text-heritage-ivory backdrop-blur hover:border-heritage-brass">
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <Link to="/" className="flex items-center gap-2 rounded-full border border-heritage-brass/40 bg-heritage-night/80 px-4 py-2 text-xs font-semibold text-heritage-ivory backdrop-blur hover:border-heritage-brass">
            <X className="h-4 w-4" /> Quitter Héritage
          </Link>
        </div>

        <header className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div aria-hidden className="heritage-slot absolute inset-0 opacity-60" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent,var(--color-heritage-night))]" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative text-xs uppercase tracking-[0.4em] text-heritage-brass">
            Culture · Art · Histoire · Transmission
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.3 }} className="relative mt-6 font-editorial text-6xl font-semibold leading-none text-heritage-ivory sm:text-8xl">
            Midnight <em className="text-heritage-brass">Heritage</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} className="relative mt-6 max-w-xl text-lg text-heritage-ivory/75">
            Un voyage immersif au cœur de la culture, du patrimoine et des traditions vivantes haoussa.
          </motion.p>
          <motion.a href="#terre" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="relative mt-12 flex items-center gap-2 rounded-full border border-heritage-brass px-6 py-3 text-sm font-semibold text-heritage-ivory hover:bg-heritage-brass hover:text-heritage-night">
            Entrer <ArrowDown className="h-4 w-4" />
          </motion.a>
        </header>

        {HERITAGE_CHAPTERS.map((c, i) => <Chapter key={c.id} c={c} index={i} />)}

        <section className="border-t border-heritage-brass/10 px-6 py-32 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-heritage-brass">Mémoire vivante</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-editorial text-5xl font-semibold text-heritage-ivory sm:text-6xl">Un héritage qui se transmet.</h2>
          <p className="mx-auto mt-6 max-w-xl text-heritage-ivory/70">Archives, témoignages de familles, œuvres d’artistes, travaux d’historiens : cette mémoire numérique se construira avec vous.</p>
          <button type="button" disabled title="Envoi disponible dans une prochaine version" className="mt-10 rounded-full bg-heritage-terracotta px-7 py-3 text-sm font-semibold text-heritage-ivory opacity-90">
            Proposer un document · bientôt
          </button>
        </section>
      </div>
    </MotionConfig>
  );
}
