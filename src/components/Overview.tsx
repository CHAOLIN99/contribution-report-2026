import type { ReactNode } from "react";
import type { PillStatus } from "../types";
import { RepoBarChart, StatusBar } from "./charts";

interface OverviewProps {
  bullets: ReactNode[];
  repoTally: { repo: string; count: number }[];
  statusBreakdown: { label: string; count: number; variant: PillStatus }[];
}

export function Overview({ bullets, repoTally, statusBreakdown }: OverviewProps) {
  const totalPrs = statusBreakdown.reduce((sum, s) => sum + s.count, 0);
  return (
    <div className="overview">
      <h2>The short version</h2>
      <p>Four investigations account for most of this window's work:</p>
      <ul>
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
      <p className="closer">
        Each is written up below as <b>signal → diagnosis → what I shipped → result</b>,
        with every PR linked inline where it mattered. Smaller work stays in the tables
        further down.
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
