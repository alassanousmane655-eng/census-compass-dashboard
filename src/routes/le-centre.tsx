import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/le-centre")({
  head: () => pageHead("Le Centre", "Présentation du projet culturel HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="centre" />;
}
