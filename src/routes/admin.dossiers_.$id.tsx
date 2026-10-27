import { createFileRoute } from "@tanstack/react-router";
import { AdminDossier } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/dossiers_/$id")({
  head: () => pageHead("Examen du dossier", "Vérification humaine des dossiers de démonstration."),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <AdminDossier key={id} id={id} />;
}
