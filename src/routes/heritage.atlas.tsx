import { createFileRoute } from "@tanstack/react-router";
import { Atlas } from "@/features/heritage/atlas/Atlas";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/heritage/atlas")({
  head: () => pageHead("Atlas vivant", "Exploration géographique et historique des territoires de la culture haoussa."),
  component: Atlas,
});
