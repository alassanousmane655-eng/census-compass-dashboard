import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/culture/")({
  head: () => pageHead("Culture et communauté", "Patrimoine et transmission haoussa."),
  component: Page,
});
function Page() {
  return <PublicContent page="culture" />;
}
