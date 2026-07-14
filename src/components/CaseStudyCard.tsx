import { Fragment } from "react";
import type { CaseStudy } from "../types";
import { PrTable } from "./PrTable";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="case">
      <div className="case-head">
        <h3>{study.title}</h3>
        <span className="case-ticket">{study.ticket}</span>
      </div>
      <p className="case-lead">{study.lead}</p>
      <div className="case-signal">
        <span className="tag">Signal</span>
        <span>{study.signal}</span>
      </div>
      {study.narrative.map((paragraph, i) => (
        <p className="narrative" key={i}>
          {paragraph}
        </p>
      ))}

      <div className="flow">
        {study.flow.map((step, i) => (
          <div className={`flow-step${step.setBack ? " set-back" : ""}`} key={i}>
            <div className="fdate">{step.date}</div>
            <div className="flabel">{step.label}</div>
            <p>{step.body}</p>
          </div>
        ))}
      </div>

      {study.metricFlow && (
        <div className="metric-flow">
          {study.metricFlow.items.map((item, i) => (
            <Fragment key={item.label}>
              {i > 0 && <span className="mf-arrow">→</span>}
              <div className="mf-item">
                <div className={`mf-n${item.variant ? ` ${item.variant}` : ""}`}>{item.value}</div>
                <div className="mf-l">{item.label}</div>
              </div>
            </Fragment>
          ))}
          {study.metricFlow.note && <div className="mf-note">{study.metricFlow.note}</div>}
        </div>
      )}

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
