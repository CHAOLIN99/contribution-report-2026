import type { ReactNode } from "react";
import type { PillStatus, ValueDef, ValueId } from "../types";
import { RepoBarChart, StatusBar } from "./charts";

interface OverviewProps {
  bullets: ReactNode[];
  repoTally: { repo: string; count: number }[];
  statusBreakdown: { label: string; count: number; variant: PillStatus }[];
  values: ValueDef[];
  valueTally: { id: ValueId; count: number }[];
}

export function Overview({ bullets, repoTally, statusBreakdown, values, valueTally }: OverviewProps) {
  const totalPrs = statusBreakdown.reduce((sum, s) => sum + s.count, 0);
  return (
    <div className="overview">
      <h2>The short version</h2>
      <p>Four company values account for most of this window's work:</p>
      <ul>
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
      <p className="closer">
        Each value is written up below with a plain-English summary first, then the
        technical trail — signal → diagnosis → what I shipped → result — with every PR
        linked inline where it mattered.
      </p>

      <div className="overview-value-tally">
        {valueTally.map((v) => {
          const def = values.find((d) => d.id === v.id)!;
          return (
            <a className={`value-chip value-chip-${v.id}`} href={`#${v.id}`} key={v.id}>
              {def.name} <b>{v.count}</b>
            </a>
          );
        })}
      </div>
      <p className="value-tally-note">
        PRs individually called out in a case study or table below, by the value they
        best demonstrate; total counts above include additional smaller PRs folded into
        each repo's aggregate but not written up one by one.
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
