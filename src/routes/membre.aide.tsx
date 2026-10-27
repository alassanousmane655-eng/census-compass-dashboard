import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "@/features/member/MemberPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/membre/aide")({
  head: () => pageHead("Aide membre", "Aide membre dans votre espace HAOUSSA."),
  component: Page,
});
function Page() {
  return <MemberPage page="aide" />;
}
