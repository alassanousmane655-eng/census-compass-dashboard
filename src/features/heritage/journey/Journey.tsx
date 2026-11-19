import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { HERITAGE_CHAPTERS, type HeritageChapter } from "@/data/heritage-chapters";
import { HERITAGE_ASSETS, creditLine } from "@/data/heritage-media";
import { cn } from "@/lib/utils";
import { BrassRule, Credit, HeritageHeader } from "../shared/HeritageShell";
import { UI, useHeritageLang } from "../shared/i18n";

const TOTAL = HERITAGE_CHAPTERS.length;
export const pad = (n: number) => String(n).padStart(2, "0");

export function Journey() {
  const [active, setActive] = useState(0);
  const { t } = useHeritageLang();
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("[data-chapter]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <HeritageHeader />
      <nav aria-label={t({ fr: "Chapitres", en: "Chapters" })} className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[11px] font-semibold tabular-nums text-heritage-brass">{pad(active + 1)}</span>
        <span className="text-[10px] text-heritage-ivory/40">/ {pad(TOTAL)}</span>
        {HERITAGE_CHAPTERS.map((c, i) => (
          <a key={c.id} href={`#${c.id}`} aria-label={`${pad(c.n)} ${t(c.title)}`} aria-current={i === active ? "step" : undefined}
            className="group relative flex h-6 items-center">
            <span className={cn("block w-px transition-all", i === active ? "h-6 bg-heritage-brass" : "h-3 bg-heritage-ivory/30 group-hover:bg-heritage-ivory/70")} />
            <span className="pointer-events-none absolute left-4 whitespace-nowrap text-[11px] text-heritage-ivory/0 transition-colors group-hover:text-heritage-ivory/80 group-focus-visible:text-heritage-ivory/80">{t(c.title)}</span>
          </a>
        ))}
      </nav>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-heritage-brass/15 bg-heritage-night/85 px-5 py-3 backdrop-blur md:hidden">
        <span className="text-xs font-semibold tabular-nums text-heritage-brass">{pad(active + 1)} / {pad(TOTAL)}</span>
        <span className="h-px flex-1 bg-heritage-ivory/15"><span className="block h-px bg-heritage-brass transition-all" style={{ width: `${((active + 1) / TOTAL) * 100}%` }} /></span>
        <span className="max-w-[45%] truncate text-xs text-heritage-ivory/70">{t(HERITAGE_CHAPTERS[active].title)}</span>
      </div>
      <main>{HERITAGE_CHAPTERS.map((c, i) => <Chapter key={c.id} c={c} i={i} />)}</main>
      <section className="border-t border-heritage-brass/10 px-6 py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-heritage-brass">{t({ fr: "Mémoire vivante", en: "Living memory" })}</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-editorial text-5xl text-heritage-ivory sm:text-6xl">{t({ fr: "Un héritage qui se transmet.", en: "A heritage passed on." })}</h2>
        <BrassRule className="mx-auto mt-10 w-48" />
        <button type="button" disabled className="mt-10 rounded-full bg-heritage-terracotta px-7 py-3 text-sm font-semibold text-heritage-ivory opacity-90">{t({ fr: "Proposer un document · bientôt", en: "Contribute a document · soon" })}</button>
      </section>
    </>
  );
}

function Chapter({ c, i }: { c: HeritageChapter; i: number }) {
  const { t, lang } = useHeritageLang();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // All values derive from scroll progress: scrolling back restores every previous state exactly.
  const scale = useTransform(p, [0, 0.5, 1], [1.12, 1, 1.04]);
  const imgOpacity = useTransform(p, [0.05, 0.3, 0.8, 0.98], [0, 1, 1, 0.2]);
  const textY = useTransform(p, [0.15, 0.4], [40, 0]);
  const textOpacity = useTransform(p, [0.18, 0.38, 0.78, 0.92], [0, 1, 1, 0]);
  const annot = useTransform(p, [0.38, 0.55], [0, 1]);
  const a = c.image ? HERITAGE_ASSETS[c.image] : undefined;
  const flip = i % 2 === 1;
  return (
    <section ref={ref} id={c.id} data-chapter data-i={i} aria-labelledby={`${c.id}-t`} className="relative h-[190vh]">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        {a ? <motion.img src={a.url} alt="" aria-hidden style={{ opacity: imgOpacity }} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
          : <div aria-hidden className="heritage-slot absolute inset-0" />}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-heritage-night via-heritage-night/70 to-heritage-night/30" />
        <div className={cn("relative mx-auto grid w-full max-w-[1400px] items-center gap-8 px-5 md:px-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16", flip && "lg:[&>*:first-child]:order-2")}>
          {a ? (
            <motion.figure style={{ scale, opacity: imgOpacity }} className="relative mx-auto w-full max-w-[min(100%,calc((100svh-14rem)*var(--ar)))]"
              {...{ style: { scale, opacity: imgOpacity, ["--ar" as string]: a.width / a.height } }}>
              <div className="relative border border-heritage-brass/40 p-1.5">
                <img src={a.url} alt={t(c.title)} width={a.width} height={a.height} className="block h-auto w-full" />
                {c.annotations?.map((n, k) => <Annotation key={k} n={n} label={t(n.label)} o={annot} />)}
              </div>
              <Credit text={creditLine(a, lang)} className="mt-2" />
            </motion.figure>
          ) : (
            <motion.div style={{ opacity: imgOpacity }} className="relative hidden aspect-[4/5] max-h-[70svh] items-center justify-center border border-heritage-brass/30 lg:flex">
              <div aria-hidden className="heritage-frieze absolute inset-6" />
              <span className="relative font-editorial text-[10rem] leading-none text-heritage-brass/80">{pad(c.n)}</span>
            </motion.div>
          )}
          <motion.div style={{ y: textY, opacity: textOpacity }} className="max-lg:pb-16">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-heritage-brass">
              <span className="tabular-nums">{pad(c.n)} / {pad(TOTAL)}</span><span className="h-px w-10 bg-heritage-brass/60" />{t(c.title)}
            </p>
            <h2 id={`${c.id}-t`} className="mt-5 font-editorial text-4xl font-semibold leading-[1.02] text-heritage-ivory sm:text-6xl">{t(c.headline)}</h2>
            <p className="mt-5 max-w-md text-base text-heritage-ivory/80 sm:text-lg">{t(c.lead)}</p>
            <BrassRule className="mt-7 w-40" />
            {c.quote && <blockquote className="mt-6 border-l-2 border-heritage-terracotta pl-4 font-editorial text-xl italic text-heritage-ivory/85">« {t(c.quote)} »</blockquote>}
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-6 text-sm font-semibold text-heritage-brass underline-offset-4 hover:underline">{open ? t(UI.close) : t(UI.deeper)}</button>
            {open && (
              <div className="mt-4 max-w-md space-y-3 border-l border-heritage-indigo pl-4 text-sm text-heritage-ivory/75">
                <p>{t(c.body)}</p>
                {c.deeper.map((d, k) => <p key={k}><strong className="text-heritage-ivory">{t(d.title)}</strong> — {t(d.text)}</p>)}
                {c.gallery && <div className="flex gap-2 pt-1">{c.gallery.map((g) => <img key={g} src={HERITAGE_ASSETS[g].url} alt="" className="h-16 w-16 border border-heritage-brass/30 object-cover" />)}</div>}
              </div>
            )}
            <p className="mt-6 text-[10px] uppercase tracking-wider text-heritage-ivory/40">{t(UI.provisional)}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Annotation({ n, label, o }: { n: { x: number; y: number; side: "left" | "right" }; label: string; o: MotionValue<number> }) {
  const w = useTransform(o, [0, 1], ["0%", "100%"]);
  return (
    <motion.div style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: o }} className="pointer-events-none absolute">
      <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rotate-45 border border-heritage-brass bg-heritage-night/60" />
      <div className={cn("absolute top-0 flex w-24 items-center sm:w-32", n.side === "right" ? "left-2" : "right-2 flex-row-reverse")}>
        <motion.span style={{ width: w }} className="h-px bg-heritage-brass" />
      </div>
      <span className={cn("absolute -top-3 whitespace-nowrap rounded-sm bg-heritage-night/75 px-2 py-0.5 font-editorial text-sm text-heritage-ivory backdrop-blur-sm sm:text-base", n.side === "right" ? "left-28 sm:left-36" : "right-28 sm:right-36")}>{label}</span>
    </motion.div>
  );
}
