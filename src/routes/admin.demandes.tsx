import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/demandes")({
  head: () =>
    pageHead("Demandes de données", "Demandes de données — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="demandes" />;
}
