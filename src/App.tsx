import { StatGrid } from "./components/StatGrid";
import { Overview } from "./components/Overview";
import { CaseStudyCard } from "./components/CaseStudyCard";
import { ThemeSectionCard } from "./components/ThemeSectionCard";
import { RepoBreakdownTable } from "./components/RepoBreakdownTable";
import { stats, repoTally, overviewBullets, cases, themes, repoBreakdown } from "./data";

export function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div className="brand-rule" />
        <p className="eyebrow">Contribution report · Pattern</p>
        <h1>My contributions — May 1 to Jul 14, 2026</h1>
        <p className="subhead">
          I opened 67 pull requests across <code>agents</code>, <code>pi-toolsmith</code>,{" "}
          <code>sensors</code>, and <code>data-airflow</code>. Rather than list them all, this
          report walks the four investigations that drove most of them — what broke, how I
          found the cause, what I shipped, and what changed.
        </p>
        <span className="read-time">≈ 4 min read</span>
      </header>

      <StatGrid stats={stats} />

      <Overview bullets={overviewBullets} repoTally={repoTally} />

      <h2 className="section-title">Deep dives</h2>
      <p className="section-sub">
        The four threads that drove most of this window's design, investigation, and cross-repo
        coordination.
      </p>

      {cases.map((study) => (
        <CaseStudyCard study={study} key={study.title} />
      ))}

      <h2 className="section-title" style={{ marginTop: 34 }}>
        Other initiatives
      </h2>
      <p className="section-sub">
        Smaller in scope or less investigation-heavy — kept in a grouped-table format for quick
        scanning.
      </p>

      {themes.map((section) => (
        <ThemeSectionCard section={section} key={section.title} />
      ))}

      <h2 className="section-title" style={{ marginTop: 8 }}>
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
          and review findings — not from a separate incident tracker.
        </p>
      </footer>
    </div>
  );
}
