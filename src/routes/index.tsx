import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Accueil — héritage vivant",
      "Culture et recensement communautaire HAOUSSA au Cameroun.",
    ),
  component: Page,
});
function Page() {
  return <Home />;
}
