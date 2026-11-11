import { createFileRoute } from "@tanstack/react-router";
import { HeritageExperience } from "@/features/heritage/HeritageExperience";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/heritage")({
  head: () => pageHead("Héritage — Midnight Heritage", "Voyage immersif au cœur de la culture, du patrimoine et des traditions vivantes haoussa."),
  component: Page,
});
function Page() {
  return <HeritageExperience />;
}
