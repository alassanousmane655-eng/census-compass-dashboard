import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/")({
  head: () =>
    pageHead(
      "Pilotage du recensement",
      "Pilotage du recensement — administration de démonstration.",
    ),
  component: Page,
});
function Page() {
  return <AdminPage page="dashboard" />;
}
