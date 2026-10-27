import { createFileRoute } from "@tanstack/react-router";
import { DemoAccess } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/connexion")({
  head: () => pageHead("Accès membre", "Accéder à la démonstration de votre espace membre."),
  component: Page,
});
function Page() {
  return <DemoAccess />;
}
