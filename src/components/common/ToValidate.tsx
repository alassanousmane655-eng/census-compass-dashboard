import { ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

/** Visible marker for decisions the Centre must still take (CdCF « [À VALIDER] »). */
export function ToValidate({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-3 rounded-xl border border-dashed border-warning/50 bg-warning-bg/60 p-4 text-sm text-foreground", className)}>
      <ShieldQuestion className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
      <div>
        <span className="font-semibold text-warning">À valider par le Centre — </span>
        {children}
      </div>
    </div>
  );
}
