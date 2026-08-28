import { StatGrid } from "./components/StatGrid";
import { Overview } from "./components/Overview";
import { CaseStudyCard } from "./components/CaseStudyCard";
import { ThemeSectionCard } from "./components/ThemeSectionCard";
import { ValueMatrix } from "./components/ValueMatrix";
import { ValueLens } from "./components/ValueLens";
import { RepoBreakdownTable } from "./components/RepoBreakdownTable";
import { JumpNav } from "./components/charts";
import {
  stats,
  repoTally,
  statusBreakdown,
  overviewBullets,
  values,
  valueTally,
  valueOrder,
  matrixRows,
  cases,
  themes,
  repoBreakdown,
} from "./data";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "matrix", label: "The matrix" },
  { id: "work", label: "Contributions" },
  { id: "by-value", label: "By value" },
  { id: "repo-breakdown", label: "Repo breakdown" },
];

export function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div className="brand-rule" />
        <p className="eyebrow">Contribution report · Pattern</p>
        <h1>My contributions — May 1 to Aug 28, 2026</h1>
        <p className="subhead">
          I opened 151 pull requests across <code>sensors</code>, <code>pattern-exp</code>,{" "}
          <code>agents</code>, <code>pi-toolsmith</code>,{" "}
          <code>sensors-workflow-builder</code>, and <code>data-airflow</code>. Rather than
          file each under one company value, this report scores every contribution against
          all four of Pattern's values as a matrix — Partner Obsession, Data Fanatics, Team
          of Doers, and Game Changers — with a plain-English summary of what each piece of
          work means before the technical detail.
        </p>
        <span className="read-time">≈ 6 min read · expand any case for the full trail</span>
        <JumpNav items={navItems} />
      </header>

      <StatGrid stats={stats} />

      <div id="overview">
        <Overview
          bullets={overviewBullets}
          repoTally={repoTally}
          statusBreakdown={statusBreakdown}
          values={values}
          valueTally={valueTally}
        />
      </div>

      <h2 className="section-title" id="matrix">
        The evaluation matrix
      </h2>
      <p className="section-sub">
        Every contribution below, scored 0–3 on each of Pattern's four values. The value a
        row leans on most is highlighted; most work earns three or four values at once.
      </p>
      <ValueMatrix rows={matrixRows} values={values} order={valueOrder} tally={valueTally} />

      <h2 className="section-title" id="work" style={{ marginTop: 40 }}>
        The contributions
      </h2>
      <p className="section-sub">
        Ordered by depth of write-up: the seven deep-dive investigations first, then the
        cross-cutting clusters. Each carries its own four-value read-out.
      </p>
      {cases.map((study) => (
        <CaseStudyCard study={study} values={values} order={valueOrder} key={study.id} />
      ))}
      {themes.map((section) => (
        <ThemeSectionCard section={section} values={values} order={valueOrder} key={section.id} />
      ))}

      <h2 className="section-title" id="by-value" style={{ marginTop: 40 }}>
        The same work, read back by value
      </h2>
      <p className="section-sub">
        The matrix, transposed: for each value, which contributions earn it and how
        strongly. These are score summaries, not exclusive buckets — a contribution appears
        under every value it scores on.
      </p>
      {valueOrder.map((id) => {
        const def = values.find((v) => v.id === id)!;
        const tally = valueTally.find((t) => t.id === id)!;
        return <ValueLens def={def} rows={matrixRows} weighted={tally.weighted} key={id} />;
      })}

      <h2 className="section-title" id="repo-breakdown" style={{ marginTop: 40 }}>
        Repo breakdown
      </h2>
      <RepoBreakdownTable rows={repoBreakdown} />

      <footer className="notes">
        <p>
          Method: I ran{" "}
          <code>
            gh pr list --repo patterninc/&lt;repo&gt; --author CHAOLIN99 --state all --search
            "created:&gt;=2026-05-01"
          </code>{" "}
          against each repo, then cross-referenced individual PR bodies, review threads, and
          linked run logs for the deep-dive sections, refreshed on 2026-08-28. Counts and
          diff totals are re-derived from GitHub at that date, so a PR listed here as merged
          may have been open in an earlier revision of this report. "Opened"
          dates reflect PR creation, not merge; "Closed" means closed without merging
          (superseded, split into another PR, or abandoned). The diagnose → plan → solve
          narratives are reconstructed from what each PR's own description states about root
          cause, prior failed attempts, and review findings — not from a separate incident
          tracker. The four-value scores (0–3 on each axis) are my own read of how strongly
          each piece of work demonstrates each value, written for a non-technical reader; the
          underlying PRs, dates, and diffs are unchanged from the technical record above.
        </p>
      </footer>
    </div>
  );
}
