import { createFileRoute } from "@tanstack/react-router";
import { PublicContent } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/culture/agenda")({
  head: () => pageHead("Agenda", "Agenda du Centre HAOUSSA."),
  component: Page,
});
function Page() {
  return <PublicContent page="agenda" />;
}
