import { createFileRoute } from "@tanstack/react-router";
import { MemberPage } from "@/features/member/MemberPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/membre/")({
  head: () => pageHead("Mon espace membre", "Mon espace membre dans votre espace HAOUSSA."),
  component: Page,
});
function Page() {
  return <MemberPage page="dashboard" />;
}
