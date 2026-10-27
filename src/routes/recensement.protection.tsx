import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/recensement/protection")({
  head: () => pageHead("Protection des données", "Protection des données : démarche HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="protection" />;
}
