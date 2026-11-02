import type { BusinessImpact } from "../types";

export function ImpactBlock({ impact }: { impact: BusinessImpact }) {
  return (
    <div className="impact-block">
      <div className="impact-row">
        <span className="tag">Impact on Pattern</span>
        <p>{impact.outcome}</p>
      </div>
      <div className="impact-row">
        <span className="tag">Why it's essential</span>
        <p>{impact.whyEssential}</p>
      </div>
    </div>
  );
}
