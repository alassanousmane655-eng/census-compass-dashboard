import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/culture/galerie")({
  head: () => pageHead("Galerie", "Galerie du Centre HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="galerie" />;
}
