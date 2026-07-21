import type { ThemeSection } from "../types";
import { PrTable } from "./PrTable";

export function ThemeSectionCard({ section }: { section: ThemeSection }) {
  return (
    <section className="theme">
      <h3>{section.title}</h3>
      <p className="theme-desc">{section.description}</p>
      <div className="plain-summary">
        <span className="tag">In plain terms</span>
        <p>{section.plainSummary}</p>
      </div>
      <PrTable rows={section.prTable} />
    </section>
  );
}
