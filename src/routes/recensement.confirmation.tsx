import { createFileRoute } from "@tanstack/react-router";
import { Confirmation } from "@/features/census/CensusForm";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/recensement/confirmation")({
  validateSearch: (s: Record<string, unknown>) => ({ ref: typeof s.ref === "string" ? s.ref : "" }),
  head: () => pageHead("Confirmation du dossier", "Suivre votre dossier de démonstration HAOUSSA."),
  component: Page,
});
function Page() {
  const { ref } = Route.useSearch();
  return <Confirmation reference={ref} />;
}
