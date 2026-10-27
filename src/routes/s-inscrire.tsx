import { createFileRoute } from "@tanstack/react-router";
import { DemoAccess } from "@/features/public/PublicPages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/s-inscrire")({
  head: () =>
    pageHead(
      "Inscription de démonstration",
      "Explorer le parcours membre avec une identité fictive.",
    ),
  component: Page,
});
function Page() {
  return <DemoAccess signup />;
}
