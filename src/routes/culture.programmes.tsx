import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/culture/programmes")({
  head: () => pageHead("Programmes culturels", "Programmes culturels du Centre HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="programmes" />;
}
