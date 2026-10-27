import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/dossiers")({
  head: () => pageHead("File des dossiers", "File des dossiers — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="dossiers" />;
}
