import { StatGrid } from "./components/StatGrid";
import { Overview } from "./components/Overview";
import { CaseStudyCard } from "./components/CaseStudyCard";
import { ThemeSectionCard } from "./components/ThemeSectionCard";
import { ValueSection } from "./components/ValueSection";
import { RepoBreakdownTable } from "./components/RepoBreakdownTable";
import { JumpNav } from "./components/charts";
import {
  stats,
  repoTally,
  statusBreakdown,
  overviewBullets,
  values,
  valueTally,
  cases,
  themes,
  repoBreakdown,
} from "./data";

const navItems = [
  { id: "overview", label: "Overview" },
  ...values.map((v) => ({ id: v.id, label: v.name })),
  { id: "repo-breakdown", label: "Repo breakdown" },
];

export function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div className="brand-rule" />
        <p className="eyebrow">Contribution report · Pattern</p>
        <h1>My contributions — May 1 to Jul 16, 2026</h1>
        <p className="subhead">
          I opened 73 pull requests across <code>agents</code>, <code>pi-toolsmith</code>,{" "}
          <code>sensors</code>, and <code>data-airflow</code>. Rather than list them all, this
          report is organized around Pattern's four company values — Data Fanatics, Game
          Changers, Partner Obsession, and Team of Doers — with a plain-English summary of what
          each piece of work means before the technical detail.
        </p>
        <span className="read-time">≈ 3 min read · expand any case for the full trail</span>
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

      {values.map((def) => (
        <ValueSection def={def} key={def.id}>
          {cases
            .filter((c) => c.value === def.id)
            .map((study) => (
              <CaseStudyCard study={study} key={study.id} />
            ))}
          {themes
            .filter((t) => t.value === def.id)
            .map((section) => (
              <ThemeSectionCard section={section} key={section.title} />
            ))}
        </ValueSection>
      ))}

      <h2 className="section-title" id="repo-breakdown" style={{ marginTop: 8 }}>
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
          linked run logs for the four deep-dive sections, on 2026-07-14. "Opened" dates reflect
          PR creation, not merge; "Closed" means closed without merging (superseded, split into
          another PR, or abandoned). The diagnose → plan → solve narratives are reconstructed
          from what each PR's own description states about root cause, prior failed attempts,
          and review findings — not from a separate incident tracker. The company-value grouping
          and "In plain terms" summaries are my own read of which value each piece of work best
          demonstrates, written for a non-technical reader; the underlying PRs, dates, and diffs
          are unchanged from the technical record above.
        </p>
      </footer>
    </div>
  );
}
