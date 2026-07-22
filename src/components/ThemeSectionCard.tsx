import type { ThemeSection, ValueDef, ValueId } from "../types";
import { PrTable } from "./PrTable";
import { ValueScorecard } from "./ValueScorecard";

export function ThemeSectionCard({
  section,
  values,
  order,
}: {
  section: ThemeSection;
  values: ValueDef[];
  order: ValueId[];
}) {
  return (
    <section className={`case case-accent-${section.primary}`} id={section.id}>
      <div className="case-head">
        <h3>{section.title}</h3>
      </div>
      <p className="theme-desc">{section.description}</p>
      <div className="plain-summary">
        <span className="tag">In plain terms</span>
        <p>{section.plainSummary}</p>
      </div>

      <ValueScorecard item={section} values={values} order={order} />

      <p className="evidence-label">PRs in this cluster</p>
      <PrTable rows={section.prTable} />
    </section>
  );
}
