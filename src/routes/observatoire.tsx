import { createFileRoute } from "@tanstack/react-router";
import { Observatory } from "@/features/observatory/Observatory";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/observatoire")({
  head: () => pageHead("Observatoire", "Indicateurs agrégés des dossiers déclarés."),
  component: Page,
});
function Page() {
  return <Observatory />;
}
