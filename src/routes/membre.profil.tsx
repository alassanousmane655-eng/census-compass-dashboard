import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "@/features/member/MemberPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/membre/profil")({
  head: () => pageHead("Mon profil", "Mon profil dans votre espace HAOUSSA."),
  component: Page,
});
function Page() {
  return <MemberPage page="profil" />;
}
