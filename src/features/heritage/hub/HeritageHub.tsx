import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { HERITAGE_ASSETS } from "@/data/heritage-media";
import { BrassRule, HeritageHeader } from "../shared/HeritageShell";
import { UI, useHeritageLang } from "../shared/i18n";

export function HeritageHub() {
  const { t } = useHeritageLang();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);
  const frames = [
    { to: "/heritage/journey", title: t(UI.journey), sub: t(UI.journeySub), img: HERITAGE_ASSETS["CHJ-03"].url, depth: 1.2 },
    { to: "/heritage/musee", title: t(UI.museum), sub: t(UI.museumSub), img: HERITAGE_ASSETS["CHJ-07"].url, depth: 0.6 },
    { to: "/heritage/atlas", title: t(UI.atlas), sub: t(UI.atlasSub), img: null, depth: 1.2 },
  ] as const;
  return (
    <div ref={ref} className="heritage-night-sky relative min-h-screen overflow-hidden"
      onPointerMove={(e) => { if (reduce) return; const r = ref.current!.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}>
      <HeritageHeader overlay />
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 pb-16 pt-28">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center text-[11px] uppercase tracking-[0.4em] text-heritage-brass">
          {t({ fr: "Culture · Art · Histoire · Transmission", en: "Culture · Art · History · Transmission" })}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="mt-4 text-center font-editorial text-5xl font-semibold text-heritage-ivory sm:text-7xl">
          {t({ fr: "Choisissez votre voyage", en: "Choose your journey" })}
        </motion.h1>
        <div className="mt-12 grid gap-6 [perspective:1400px] md:grid-cols-3 md:gap-8">
          {frames.map((f, i) => <Frame key={f.to} f={f} i={i} sx={sx} sy={sy} />)}
        </div>
        <BrassRule className="mx-auto mt-14 w-64" />
      </div>
    </div>
  );
}

type MV = ReturnType<typeof useSpring>;
function Frame({ f, i, sx, sy }: { f: { to: "/heritage/journey" | "/heritage/musee" | "/heritage/atlas"; title: string; sub: string; img: string | null; depth: number }; i: number; sx: MV; sy: MV }) {
  const rotY = useTransform(sx, (v) => v * 14 * f.depth + (i - 1) * -8);
  const rotX = useTransform(sy, (v) => v * -10 * f.depth);
  const x = useTransform(sx, (v) => v * 24 * f.depth);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.15 }} style={{ rotateY: rotY, rotateX: rotX, x }} className="[transform-style:preserve-3d]">
      <Link to={f.to} className="group relative block aspect-[3/4] overflow-hidden border border-heritage-brass/60 bg-heritage-forest shadow-[0_40px_80px_-30px_var(--color-heritage-night)] outline-none transition-colors hover:border-heritage-brass focus-visible:border-heritage-ivory max-md:aspect-[16/10]">
        {f.img ? <img src={f.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
          : <AtlasGlyph />}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-heritage-night via-heritage-night/30 to-transparent" />
        <div aria-hidden className="absolute inset-2 border border-heritage-brass/25" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-center">
          <h2 className="font-editorial text-3xl leading-tight text-heritage-ivory">{f.title}</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-heritage-brass">{f.sub}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function AtlasGlyph() {
  const pts = [[38, 40], [44, 36], [50, 42], [46, 48], [58, 52], [62, 60], [55, 66], [40, 55]];
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full">
      {Array.from({ length: 9 }).map((_, k) => <line key={k} x1={k * 12.5} y1="0" x2={k * 12.5} y2="100" stroke="var(--color-heritage-brass)" strokeOpacity=".08" strokeWidth=".3" />)}
      {Array.from({ length: 9 }).map((_, k) => <line key={`h${k}`} x1="0" y1={k * 12.5} x2="100" y2={k * 12.5} stroke="var(--color-heritage-brass)" strokeOpacity=".08" strokeWidth=".3" />)}
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="var(--color-heritage-brass)" strokeOpacity=".35" strokeWidth=".3" strokeDasharray="1 1" />
      {pts.map(([x, y], k) => <g key={k}><circle cx={x} cy={y} r="2.4" fill="var(--color-heritage-brass)" opacity=".18" /><circle cx={x} cy={y} r=".9" fill="var(--color-heritage-brass)" /></g>)}
    </svg>
  );
}
