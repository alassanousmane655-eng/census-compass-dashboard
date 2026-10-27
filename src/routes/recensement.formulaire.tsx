import { createFileRoute } from "@tanstack/react-router";
import { CensusForm } from "@/features/census/CensusForm";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/recensement/formulaire")({
  head: () => pageHead("Se faire recenser", "Parcours volontaire de recensement en six étapes."),
  component: Page,
});
function Page() {
  return <CensusForm />;
}
