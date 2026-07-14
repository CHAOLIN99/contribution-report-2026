import type { ThemeSection } from "../types";
import { PrTable } from "./PrTable";

export function ThemeSectionCard({ section }: { section: ThemeSection }) {
  return (
    <section className="theme">
      <h3>{section.title}</h3>
      <p className="theme-desc">{section.description}</p>
      <PrTable rows={section.prTable} />
    </section>
  );
}
