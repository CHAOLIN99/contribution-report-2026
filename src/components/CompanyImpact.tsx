import type { ImpactPillar } from "../types";

export function CompanyImpact({ pillars }: { pillars: ImpactPillar[] }) {
  return (
    <div className="pillars">
      {pillars.map((p) => (
        <article className="pillar" key={p.id}>
          <div className="pillar-metric">
            <span className="pillar-n">{p.metric}</span>
            <span className="pillar-l">{p.metricLabel}</span>
          </div>
          <h3>{p.headline}</h3>
          <p className="pillar-outcome">{p.outcome}</p>
          <p className="pillar-why">
            <b>Why it's essential:</b> {p.whyEssential}
          </p>
          <p className="pillar-evidence">
            Evidence:{" "}
            {p.evidence.map((e, i) => (
              <span key={e.id}>
                {i > 0 && " · "}
                <a href={`#${e.id}`}>{e.label}</a>
              </span>
            ))}
          </p>
        </article>
      ))}
    </div>
  );
}
