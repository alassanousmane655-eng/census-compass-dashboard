import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/contact")({
  head: () => pageHead("Contact", "Questions et accompagnement HAOUSSA."),
  component: Page,
});
function Page() {
  return <Contact />;
}
