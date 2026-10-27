import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/secteurs")({
  head: () => pageHead("Secteurs", "Secteurs — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="secteurs" />;
}
