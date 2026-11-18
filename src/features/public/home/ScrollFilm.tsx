import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import film from "@/assets/home/home-film.mp4.asset.json";
import poster from "@/assets/home/poster.jpg.asset.json";
import ending from "@/assets/home/ending.jpg.asset.json";
import { BANDS, bandOpacity } from "./film-bands";

/** Protected hero copy (Sentinel S-04): two-tone title, primary CTA + secondary link. Do not alter. */
export function HeroCopy() {
  return (
    <div className="max-w-xl text-inverse">
      <p className="mb-7 flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-copper-soft">
        <span className="h-px w-10 bg-copper-soft/70" />
        Centre culturel de la communauté haoussa
      </p>
      <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[4.25rem]">
        <span className="block">Faire vivre</span>
        <span className="block">notre culture.</span>
        <span className="mt-1 block font-semibold text-sand">
          Construire <span className="italic font-medium">notre</span> avenir.
        </span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-inverse/80 md:text-lg">
        Un espace de <strong className="font-semibold text-inverse">transmission</strong>, de{" "}
        <strong className="font-semibold text-inverse">participation</strong> et de
        connaissance pour une communauté vivante au Cameroun.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Button variant="inverse" size="lg" asChild className="shadow-lift">
          <Link to="/recensement/formulaire">
            Se faire recenser <ArrowUpRight />
          </Link>
        </Button>
        <Link to="/le-centre" className="group inline-flex items-center gap-2 border-b border-inverse/40 pb-1 text-sm font-semibold transition-colors hover:border-inverse">
          Découvrir le Centre
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <p className="mt-6 text-xs text-inverse/60">Volontaire · 6 étapes · environ 8 minutes · résultats anonymes</p>
    </div>
  );
}

function StaticHero({ className = "" }: { className?: string }) {
  return (
    <section className={`relative isolate flex min-h-[88svh] items-end overflow-hidden ${className}`}>
      <img src={ending.url} alt="Un homme en grand boubou indigo passe sous une arche sculptée vers la communauté rassemblée" className="absolute inset-0 h-full w-full object-cover object-[62%_40%]" />
      <div aria-hidden className="film-scrim absolute inset-0" />
      <div aria-hidden className="film-floor absolute inset-0" />
      <div className="container-page film-text relative pb-14 pt-28"><HeroCopy /></div>
      <span className="absolute right-4 top-4 text-[10px] text-inverse/70">Images générées · communauté haoussa</span>
    </section>
  );
}

/**
 * Scroll-scrubbed hero (10K Websites standard): blob-fetched video, frame-rate independent lerp,
 * gated seeks, rAF that rests, DOM writes only on change, static fallback for phones / reduced motion / save-data.
 */
export function ScrollFilm() {
  const [mode, setMode] = useState<"film" | "static">("film");
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bandEls = useRef<(HTMLDivElement | null)[]>([]);
  const rail = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const isStatic = window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 767px)").matches || !!conn?.saveData;
    if (isStatic) { setMode("static"); return; }
    const v = video.current!, el = wrap.current!;
    let alive = true, url = "";
    let target = 0, shown = 0, raf: number | null = null, last = 0, onScreen = true;
    let busy = false, pending: number | null = null;
    const cache: string[] = [];
    let lastCount = "";

    const seek = (t: number) => {
      if (!v.duration) return;
      if (busy) { pending = t; return; }
      busy = true; v.currentTime = t;
    };
    const onSeeked = () => { busy = false; if (pending !== null) { const t = pending; pending = null; seek(t); } };
    const onErr = () => { busy = false; pending = null; };
    v.addEventListener("seeked", onSeeked); v.addEventListener("error", onErr);

    const paint = (p: number) => {
      BANDS.forEach((b, i) => {
        const o = bandOpacity(p, b.range).toFixed(3);
        const node = bandEls.current[i];
        if (node && cache[i] !== o) {
          cache[i] = o;
          node.style.opacity = o;
          node.style.setProperty("--k", o);
          node.style.transform = `translate3d(0, ${(1 - Number(o)) * 18}px, 0)`;
          node.style.visibility = Number(o) < 0.01 ? "hidden" : "visible";
        }
      });
      if (rail.current) rail.current.style.transform = `scaleY(${p.toFixed(3)})`;
      const idx = String(Math.min(3, 1 + Math.floor(p * 3 - 0.0001)) || 1).padStart(2, "0");
      if (counter.current && idx !== lastCount) { lastCount = idx; counter.current.textContent = idx; }
    };
    const progress = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    };
    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now)); last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) { shown = target; raf = null; last = 0; } else raf = requestAnimationFrame(tick);
      seek(shown * (v.duration || 0) * 0.999);
      paint(shown);
    };
    const onScroll = () => { target = progress(); if (raf === null && onScreen) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) onScroll(); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    target = shown = progress(); paint(shown);

    (async () => {
      try {
        const res = await fetch(film.url);
        const total = Number(res.headers.get("Content-Length")) || film.size;
        const reader = res.body!.getReader();
        const chunks: Uint8Array[] = []; let got = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value); got += value.length;
          if (alive) setLoaded(Math.min(1, got / total));
        }
        if (!alive) return;
        url = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: "video/mp4" }));
        v.src = url;
        v.addEventListener("loadedmetadata", () => { setLoaded(1); seek(shown * v.duration * 0.999); }, { once: true });
      } catch { /* poster stays: the page is complete without the video */ }
    })();

    return () => {
      alive = false; io.disconnect();
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      v.removeEventListener("seeked", onSeeked); v.removeEventListener("error", onErr);
      if (raf) cancelAnimationFrame(raf);
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  if (mode === "static") return <StaticHero />;
  return (
    <>
      <StaticHero className="md:hidden" />
      <div ref={wrap} className="relative hidden h-[420vh] md:block" aria-label="Film d’ouverture : du savoir-faire à la communauté">
        <div className="sticky top-0 h-screen overflow-hidden bg-foreground">
          <img src={poster.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <video ref={video} muted playsInline preload="none" aria-hidden tabIndex={-1} className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]" />
          <div aria-hidden className="film-scrim absolute inset-0" />

          {BANDS.map((b, i) => (
            <div key={b.id} ref={(n) => { bandEls.current[i] = n; }} style={{ opacity: i === 0 ? 1 : 0 }}
              className={`film-band film-text absolute inset-0 flex ${b.final ? "items-end" : "items-center"}`}>
              <div className={`container-page relative ${b.final ? "pb-16" : ""}`}>
                {b.final ? <HeroCopy /> : (
                  <div className={b.align === "left" ? "max-w-md" : "max-w-md lg:ml-[8%]"}>
                    <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-copper-soft">
                      <span className="tabular-nums">{b.n}</span><span className="h-px w-10 bg-copper-soft/70" />{b.kicker}
                    </p>
                    <p className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-inverse lg:text-6xl">{b.title}</p>
                    <p className="mt-4 text-lg text-inverse/80">{b.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div aria-hidden className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 text-inverse/80">
            <span ref={counter} className="text-xs font-semibold tabular-nums">01</span>
            <span className="relative h-28 w-px bg-inverse/25"><span ref={rail} className="absolute inset-0 origin-top bg-copper-soft" style={{ transform: "scaleY(0)" }} /></span>
            <span className="text-xs tabular-nums text-inverse/50">03</span>
          </div>
          {loaded < 1 && (
            <svg aria-hidden viewBox="0 0 48 48" className="absolute bottom-6 right-6 h-8 w-8 -rotate-90 text-copper-soft">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="126" strokeDashoffset={126 - 126 * loaded} />
            </svg>
          )}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-inverse/60">Faites défiler</p>
          <span className="absolute left-4 top-4 text-[10px] text-inverse/70">Images générées · communauté haoussa</span>
        </div>
      </div>
    </>
  );
}
