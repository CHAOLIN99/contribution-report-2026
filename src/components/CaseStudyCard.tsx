import type { CaseStudy, ValueDef, ValueId } from "../types";
import { PrTable } from "./PrTable";
import { CompareBar } from "./charts";
import { ValueScorecard } from "./ValueScorecard";
import { ImpactBlock } from "./ImpactBlock";
import { RankBadge } from "./RankBadge";

export function CaseStudyCard({
  study,
  values,
  order,
  rank,
  score,
}: {
  study: CaseStudy;
  values: ValueDef[];
  order: ValueId[];
  rank: number;
  score: number;
}) {
  return (
    <div className={`case case-accent-${study.primary}`} id={study.id}>
      <div className="case-head">
        <h3>{study.title}</h3>
        <span className="case-ticket">{study.ticket}</span>
        <RankBadge rank={rank} score={score} />
      </div>
      <p className="case-lead">{study.lead}</p>
      <div className="plain-summary">
        <span className="tag">In plain terms</span>
        <p>{study.plainSummary}</p>
      </div>

      <ImpactBlock impact={study.impact} />

      <ValueScorecard item={study} values={values} order={order} />

      <div className="case-signal">
        <span className="tag">Signal</span>
        <span>{study.signal}</span>
      </div>
      {study.narrative.map((paragraph, i) => (
        <p className="narrative" key={i}>
          {paragraph}
        </p>
      ))}

      {study.metricFlow && (
        <div className="metric-flow">
          <CompareBar metricFlow={study.metricFlow} />
          {study.metricFlow.note && <div className="mf-note">{study.metricFlow.note}</div>}
        </div>
      )}

      <details className="flow-details">
        <summary>See the full investigation ({study.flow.length} steps)</summary>
        <div className="flow">
          {study.flow.map((step, i) => (
            <div className={`flow-step${step.setBack ? " set-back" : ""}`} key={i}>
              <div className="fdate">{step.date}</div>
              <div className="flabel">{step.label}</div>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </details>

      <div className="result-callout">{study.result}</div>

      {study.prTable && (
        <>
          <p className="evidence-label">PRs in this case</p>
          <PrTable rows={study.prTable} />
        </>
      )}
    </div>
  );
}
