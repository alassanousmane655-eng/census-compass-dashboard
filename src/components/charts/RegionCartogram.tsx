import { regionName } from "@/data/territory-utils";
import { formatCell } from "@/domain/stats";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Schematic cartogram of the 10 regions (approximate geographic positions).
 * Deliberately not a precise map: no individual location is ever shown (CdCF §7.3).
 * Always paired with a data table as accessible alternative.
 */
const LAYOUT: Record<string, [number, number, number?]> = {
  EN: [2, 0],
  NO: [2, 1],
  AD: [2, 2],
  NW: [0, 2],
  OU: [1, 3],
  SW: [0, 3],
  LT: [1, 4],
  CE: [2, 3],
  ES: [3, 3],
  SU: [2, 4],
};

export function RegionCartogram({
  values,
  selected,
  onSelect,
  label = "dossiers",
}: {
  values: Record<string, number | null>;
  selected?: string;
  onSelect?: (code: string) => void;
  label?: string;
}) {
  const nums = Object.values(values).filter((v): v is number => typeof v === "number");
  const max = Math.max(1, ...nums);
  const shade = (v: number | null) => {
    if (v === null) return "bg-muted text-muted-foreground border-dashed";
    const r = v / max;
    if (r > 0.75) return "bg-primary text-primary-foreground";
    if (r > 0.5) return "bg-primary-hover text-primary-foreground";
    if (r > 0.25) return "bg-chart-4 text-primary-foreground";
    return "bg-primary-soft text-primary";
  };
  return (
    <div>
      <div
        className="grid grid-cols-4 gap-2"
        role="group"
        aria-label="Carte schématique des régions"
      >
        {Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 4 }).map((__, col) => {
            const code = Object.keys(LAYOUT).find(
              (k) => LAYOUT[k][0] === col && LAYOUT[k][1] === row,
            );
            if (!code) return <div key={`${row}-${col}`} aria-hidden />;
            const v = values[code] === undefined ? 0 : values[code];
            return (
              <Button
                variant="ghost"
                type="button"
                key={code}
                onClick={() => onSelect?.(code)}
                aria-pressed={selected === code}
                aria-label={`${regionName(code)} : ${formatCell(v)} ${label}`}
                className={cn(
                  "flex h-auto aspect-[4/3] flex-col justify-between rounded-md border border-transparent p-2.5 text-left transition-transform hover:-translate-y-0.5",
                  shade(v),
                  selected === code && "ring-[3px] ring-copper ring-offset-2",
                )}
              >
                <span className="text-[11px] font-semibold leading-tight opacity-90">
                  {regionName(code)}
                </span>
                <span className="font-display text-lg font-bold tabular-nums">{formatCell(v)}</span>
              </Button>
            );
          }),
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <i className="h-3 w-3 rounded bg-primary-soft" /> Faible
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-3 w-3 rounded bg-chart-4" /> Moyen
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-3 w-3 rounded bg-primary" /> Élevé
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-3 w-3 rounded border border-dashed border-border bg-muted" /> Masqué
          (petit effectif)
        </span>
      </div>
    </div>
  );
}
