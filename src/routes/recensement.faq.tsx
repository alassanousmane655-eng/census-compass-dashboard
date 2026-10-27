import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/recensement/faq")({
  head: () =>
    pageHead("Questions sur le recensement", "Questions sur le recensement : démarche HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="faq" />;
}
