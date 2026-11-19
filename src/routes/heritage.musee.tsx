import { createFileRoute } from "@tanstack/react-router";
import { Museum } from "@/features/heritage/museum/Museum";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/heritage/musee")({
  head: () => pageHead("Musée numérique", "Collection documentaire haoussa : objets, matériaux, périodes, sources et droits."),
  component: Museum,
});
