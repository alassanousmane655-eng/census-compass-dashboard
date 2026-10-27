import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/exports")({
  head: () => pageHead("Exports agrégés", "Exports agrégés — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="exports" />;
}
