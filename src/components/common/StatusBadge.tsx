import { CheckCircle2, CircleDashed, Clock, AlertTriangle, XCircle, Archive, Send } from "lucide-react";
import { STATUS_META, type Tone } from "@/domain/status";
import type { DossierStatus } from "@/domain/types";
import { cn } from "@/lib/utils";

const TONE: Record<Tone, string> = {
  neutral: "bg-neutral-bg text-neutral",
  info: "bg-info-bg text-info",
  warning: "bg-warning-bg text-warning",
  success: "bg-success-bg text-success",
  danger: "bg-danger-bg text-danger",
};

const ICON: Record<DossierStatus, typeof Clock> = {
  brouillon: CircleDashed,
  soumis: Send,
  en_verification: Clock,
  action_requise: AlertTriangle,
  valide: CheckCircle2,
  refuse: XCircle,
  archive: Archive,
};

/** Status = color + label + icon, never color alone (DA §4.2). */
export function StatusBadge({ status, className }: { status: DossierStatus; className?: string }) {
  const m = STATUS_META[status];
  const Icon = ICON[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", TONE[m.tone], className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {m.label}
    </span>
  );
}

export function ToneBadge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", TONE[tone])}>{children}</span>;
}
