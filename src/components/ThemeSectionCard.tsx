import type { ThemeSection, ValueDef, ValueId } from "../types";
import { PrTable } from "./PrTable";
import { ValueScorecard } from "./ValueScorecard";
import { ImpactBlock } from "./ImpactBlock";
import { RankBadge } from "./RankBadge";

export function ThemeSectionCard({
  section,
  values,
  order,
  rank,
  score,
}: {
  section: ThemeSection;
  values: ValueDef[];
  order: ValueId[];
  rank: number;
  score: number;
}) {
  return (
    <section className={`case case-accent-${section.primary}`} id={section.id}>
      <div className="case-head">
        <h3>{section.title}</h3>
        <RankBadge rank={rank} score={score} />
      </div>
      <p className="theme-desc">{section.description}</p>
      <div className="plain-summary">
        <span className="tag">In plain terms</span>
        <p>{section.plainSummary}</p>
      </div>

      <ImpactBlock impact={section.impact} />

      <ValueScorecard item={section} values={values} order={order} />

      <p className="evidence-label">PRs in this cluster</p>
      <PrTable rows={section.prTable} />
    </section>
  );
}
