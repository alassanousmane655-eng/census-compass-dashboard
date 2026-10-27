import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "@/features/member/MemberPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/membre/demandes")({
  head: () =>
    pageHead("Mes données et mes droits", "Mes données et mes droits dans votre espace HAOUSSA."),
  component: Page,
});
function Page() {
  return <MemberPage page="demandes" />;
}
