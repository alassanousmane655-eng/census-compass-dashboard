import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/features/admin/AdminPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/admin/doublons")({
  head: () =>
    pageHead("Doublons potentiels", "Doublons potentiels — administration de démonstration."),
  component: Page,
});
function Page() {
  return <AdminPage page="doublons" />;
}
