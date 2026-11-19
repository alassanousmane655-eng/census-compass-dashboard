import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HeritageI18nProvider } from "@/features/heritage/shared/i18n";
import { HeritagePage } from "@/features/heritage/shared/HeritageShell";
export const Route = createFileRoute("/heritage")({ component: Layout });
function Layout() {
  return <HeritageI18nProvider><HeritagePage><Outlet /></HeritagePage></HeritageI18nProvider>;
}
