import { createFileRoute } from "@tanstack/react-router";
import { Journey } from "@/features/heritage/journey/Journey";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/heritage/journey")({
  head: () => pageHead("Voyage cinématique", "Sept chapitres pour traverser l’histoire, l’art et les traditions vivantes haoussa."),
  component: Journey,
});
