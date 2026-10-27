import { createFileRoute } from "@tanstack/react-router";
import { CensusLanding } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/recensement/")({
  head: () =>
    pageHead("Recensement communautaire", "Une démarche volontaire pour partager votre parcours."),
  component: Page,
});
function Page() {
  return <CensusLanding />;
}
