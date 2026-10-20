import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Wordmark + geometric losange mark inspired by textile embroidery. */
export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="HAOUSSA — accueil">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect x="16" y="1" width="21" height="21" rx="3" transform="rotate(45 16 1)" className={inverse ? "fill-inverse" : "fill-primary"} />
        <rect x="16" y="9" width="10" height="10" rx="1.5" transform="rotate(45 16 9)" className="fill-copper" />
      </svg>
      <span className={cn("font-display text-lg font-extrabold tracking-[0.18em]", inverse ? "text-inverse" : "text-primary")}>HAOUSSA</span>
    </Link>
  );
}
