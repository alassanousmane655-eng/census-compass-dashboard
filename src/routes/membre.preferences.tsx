import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "@/features/member/MemberPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/membre/preferences")({
  head: () => pageHead("Mes préférences", "Mes préférences dans votre espace HAOUSSA."),
  component: Page,
});
function Page() {
  return <MemberPage page="preferences" />;
}
