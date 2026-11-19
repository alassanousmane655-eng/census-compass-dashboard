import { createFileRoute } from "@tanstack/react-router";
import { HeritageHub } from "@/features/heritage/hub/HeritageHub";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/heritage/")({
  head: () => pageHead("Héritage — HAOUSSA Heritage", "Hub patrimonial : voyage cinématique, musée numérique et atlas vivant de la culture haoussa."),
  component: HeritageHub,
});
