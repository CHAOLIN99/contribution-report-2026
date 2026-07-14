import type { ReactNode } from "react";

interface OverviewProps {
  bullets: ReactNode[];
  repoTally: { repo: string; count: number }[];
}

export function Overview({ bullets, repoTally }: OverviewProps) {
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
      <div className="repo-tally">
        {repoTally.map((r) => (
          <span className="repo-chip" key={r.repo}>
            {r.repo} — <b>{r.count}</b> PR{r.count === 1 ? "" : "s"}
          </span>
        ))}
      </div>
    </div>
  );
}
