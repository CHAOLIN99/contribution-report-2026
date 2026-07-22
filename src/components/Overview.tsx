import type { ReactNode } from "react";
import type { PillStatus, ValueDef, ValueId } from "../types";
import { RepoBarChart, StatusBar } from "./charts";

interface OverviewProps {
  bullets: ReactNode[];
  repoTally: { repo: string; count: number }[];
  statusBreakdown: { label: string; count: number; variant: PillStatus }[];
  values: ValueDef[];
  valueTally: { id: ValueId; weighted: number; touches: number; primaries: number }[];
}

export function Overview({ bullets, repoTally, statusBreakdown, values, valueTally }: OverviewProps) {
  const totalPrs = statusBreakdown.reduce((sum, s) => sum + s.count, 0);
  return (
    <div className="overview">
      <h2>The short version</h2>
      <p>
        Instead of filing each piece of work under one company value, I scored
        every contribution against <b>all four values at once</b> — a matrix, not
        a set of buckets. Most work turns out to serve three or four values, so
        the interesting question is <em>how strongly</em> each one shows up:
      </p>
      <ul>
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
      <p className="closer">
        The <a href="#matrix">matrix below</a> is the spine of the report: one row
        per contribution, scored 0–3 on each value. Under it, each contribution is
        written up with a plain-English summary, its four-value read-out, then the
        technical trail — and finally the same scores read back <a href="#by-value">by value</a>.
      </p>

      <div className="overview-value-tally">
        {valueTally.map((v) => {
          const def = values.find((d) => d.id === v.id)!;
          return (
            <a className={`value-chip value-chip-${v.id}`} href={`#${v.id}`} key={v.id}>
              {def.name} <b>{v.weighted}</b> pts
            </a>
          );
        })}
      </div>
      <p className="value-tally-note">
        Points are the sum of that value's 0–3 scores across all nine
        contributions; every value is earned by multiple pieces of work, which is
        the point of scoring them as a matrix rather than assigning one owner each.
      </p>

      <div className="mini-dash">
        <div className="mini-dash-col">
          <p className="mini-dash-label">{totalPrs} PRs by status</p>
          <StatusBar segments={statusBreakdown} />
        </div>
        <div className="mini-dash-col">
          <p className="mini-dash-label">By repo</p>
          <RepoBarChart rows={repoTally} />
        </div>
      </div>
    </div>
  );
}
