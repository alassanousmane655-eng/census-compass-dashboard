import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/culture/actualites")({
  head: () => pageHead("Actualités", "Actualités du Centre HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="actualites" />;
}
