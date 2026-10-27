import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/utilisateurs")({
  head: () =>
    pageHead("Utilisateurs et rôles", "Utilisateurs et rôles — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="utilisateurs" />;
}
