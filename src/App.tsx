import { StatGrid } from "./components/StatGrid";
import { Overview } from "./components/Overview";
import { CaseStudyCard } from "./components/CaseStudyCard";
import { ThemeSectionCard } from "./components/ThemeSectionCard";
import { ValueMatrix } from "./components/ValueMatrix";
import { ValueLens } from "./components/ValueLens";
import { RepoBreakdownTable } from "./components/RepoBreakdownTable";
import { JumpNav } from "./components/charts";
import { CompanyImpact } from "./components/CompanyImpact";
import { RankingTable } from "./components/RankingTable";
import {
  stats,
  repoTally,
  statusBreakdown,
  overviewBullets,
  values,
  valueTally,
  valueOrder,
  matrixRows,
  rankedCards,
  cardTitles,
  repoBreakdown,
  pillars,
} from "./data";

const navItems = [
  { id: "impact", label: "Impact on Pattern" },
  { id: "ranking", label: "Ranking" },
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
        <h1>My contributions to Pattern, May 1 to Nov 2, 2026</h1>
        <p className="subhead">
          Over six months as an intern I opened 275 pull requests across seven repos
          (<code>sensors</code>, <code>pattern-exp</code>,{" "}
          <code>sensors-workflow-builder</code>, <code>agents</code>,{" "}
          <code>pi-toolsmith</code>, <code>white-glove</code>, and{" "}
          <code>data-airflow</code>) and closed 109 ClickUp tickets. The report opens with
          what that work changed for Pattern as a business and why each change matters.
          After that, every contribution is scored against Pattern's four values: Partner
          Obsession, Data Fanatics, Team of Doers, and Game Changers. Each one has an
          "Impact on Pattern" read-out and a plain-English summary before the technical
          detail.
        </p>
        <span className="read-time">≈ 3 min for the impact summary · ≈ 10 min for everything</span>
        <JumpNav items={navItems} />
      </header>

      <StatGrid stats={stats} />

      <h2 className="section-title" id="impact">
        Impact on Pattern
      </h2>
      <p className="section-sub">
        Six outcomes the work adds up to, each with the number behind it and why it
        matters to the business. Every card links to the contributions that back it.
      </p>
      <CompanyImpact pillars={pillars} />

      <h2 className="section-title" id="ranking">
        Every contribution, ranked by value to Pattern
      </h2>
      <p className="section-sub">
        Each contribution answers four questions, and the points add up to a score out of 10.
        Ties go to higher business stakes, then to stronger proof in production. The cards
        further down follow this order.
      </p>
      <RankingTable labels={cardTitles} />

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
        In rank order, highest value to Pattern first. Each card shows its rank and score,
        an "Impact on Pattern" read-out, and a four-value score.
      </p>
      {rankedCards.map((c) =>
        c.kind === "case" ? (
          <CaseStudyCard
            study={c.item}
            values={values}
            order={valueOrder}
            rank={c.rank}
            score={c.score}
            key={c.item.id}
          />
        ) : (
          <ThemeSectionCard
            section={c.item}
            values={values}
            order={valueOrder}
            rank={c.rank}
            score={c.score}
            key={c.item.id}
          />
        )
      )}

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

      <h2 className="section-title" id="adds-up" style={{ marginTop: 40 }}>
        What this adds up to
      </h2>
      <div className="overview">
        <p>
          The pattern across six months is consistent. I measure before I change
          anything, so fixes land on real causes. I follow work into other teams'
          systems when that's where the bug lives. I'm willing to delete my own work
          when the evidence says it's wrong. The outcomes are the ones Pattern cares
          about: brand automations that go through, brand data that stays separate,
          production errors that stop, and releases that can't quietly break.
        </p>
      </div>

      <footer className="notes">
        <p>
          Method: I ran{" "}
          <code>
            gh pr list --repo patterninc/&lt;repo&gt; --author CHAOLIN99 --state all --search
            "created:&gt;=2026-05-01"
          </code>{" "}
          against each repo, then cross-referenced individual PR bodies, review threads, and
          linked run logs for the deep-dive sections, refreshed on 2026-11-02. ClickUp counts are tickets assigned to me
          and closed between May 1 and Nov 2. Production impact numbers come from
          read-only queries and log analysis noted in each card. Counts and diff totals
          are re-derived from GitHub at that date, so a PR listed here as merged
          may have been open in an earlier revision of this report. "Opened"
          dates reflect PR creation, not merge; "Closed" means closed without merging
          (superseded, split into another PR, or abandoned). The diagnose → plan → solve
          narratives are reconstructed from what each PR's own description states about root
          cause, prior failed attempts, and review findings — not from a separate incident
          tracker. The 1–10 ranking adds four scores (business stakes 0–3, proven in production 0–3,
          size 0–2, reach 0–2) and is my own judgment of value to Pattern. The four-value scores (0–3 on each axis) are my own read of how strongly
          each piece of work demonstrates each value, written for a non-technical reader; the
          underlying PRs, dates, and diffs are unchanged from the technical record above.
        </p>
      </footer>
    </div>
  );
}
