import type {
  CaseStudy,
  MatrixRow,
  MetricFlow,
  PrRow,
  RepoBreakdownRow,
  Scored,
  StatItem,
  ThemeSection,
  ValueDef,
  ValueId,
} from "./types";
import { pillLabel } from "./types";
import { existingImpact, recentThemes } from "./impact";

export { pillars } from "./impact";

export const values: ValueDef[] = [
  {
    id: "partner-obsession",
    name: "Partner Obsession",
    officialLine:
      "Prioritizing the success and profitability of the brands they partner with.",
    plainLine:
      "Protecting the partner brands' data, uptime, and day-to-day product experience is the point of the work, not a side effect of it.",
  },
  {
    id: "data-fanatics",
    name: "Data Fanatics",
    officialLine:
      "Using proprietary tech and analytics to guide e-commerce strategy.",
    plainLine:
      "Decisions get made from real numbers, not guesses — measuring what's actually happening before changing anything.",
  },
  {
    id: "team-of-doers",
    name: "Team of Doers",
    officialLine: "Working collaboratively and taking accountability.",
    plainLine:
      "Following through across other teams' systems and repos so the whole thing works end to end, not just my own piece of it.",
  },
  {
    id: "game-changers",
    name: "Game Changers",
    officialLine: "Constantly innovating within the global digital market.",
    plainLine:
      "Willing to question an existing plan — including my own already-built work — and redo it when the evidence says there's a better way.",
  },
];

export const stats: StatItem[] = [
  { value: "275", label: "Total PRs" },
  { value: "211", label: "Merged" },
  { value: "22", label: "Still open" },
  { value: "109", label: "ClickUp tickets closed" },
  { value: "+114,360", label: "Lines added", variant: "add" },
  { value: "-15,680", label: "Lines removed", variant: "del" },
];

export const repoTally = [
  { repo: "sensors", count: 209 },
  { repo: "pattern-exp", count: 28 },
  { repo: "sensors-workflow-builder", count: 17 },
  { repo: "agents", count: 8 },
  { repo: "pi-toolsmith", count: 6 },
  { repo: "white-glove", count: 5 },
  { repo: "data-airflow", count: 2 },
];

export const statusBreakdown = [
  { label: pillLabel.merged, count: 211, variant: "merged" as const },
  { label: pillLabel.open, count: 22, variant: "open" as const },
  { label: pillLabel.unmerged, count: 42, variant: "unmerged" as const },
];

export const overviewBullets = [
  <>
    <b>Partner Obsession</b>: the widest axis. Every contribution scores on it,
    because protecting partner brands' data, uptime, and automations is the
    throughline. It is strongest in brand-data separation, the fixes for
    production errors real users saw, and unblocking the automations that act
    for brands.
  </>,
  <>
    <b>Data Fanatics</b>: measuring before changing. It is strongest in the
    performance fixes, in making failures attributable before fixing them, and
    in re-querying production before trusting a ticket. That step caught a
    migration that would have failed to deploy and a release gate that had never
    run.
  </>,
  <>
    <b>Team of Doers</b>: following through across seven repos owned by several
    teams. That includes long rollouts nobody else was watching, like the
    one-service-at-a-time credential migration, and fixes landed in other teams'
    services when that's where the bug lived.
  </>,
  <>
    <b>Game Changers</b>: undoing sunk-cost work when the evidence says so. That
    means deleting ~1,000 lines mid-project, reverting a half-built test suite,
    proving "green" checks weren't real, and deleting insecure routes rather than
    patching them.
  </>,
];


function prRef(label: string, url: string) {
  return (
    <a className="pr-ref" href={url}>
      {label}
    </a>
  );
}

const PR = (repo: string, n: number) =>
  `https://github.com/patterninc/${repo}/pull/${n}`;

// ---- Case 1: partitioning ----
const case1MetricFlow: MetricFlow = {
  before: { value: "39M / 47GB", label: "before", raw: 39_000_000 },
  after: { value: "1.6M / 7.7GB", label: "after (triggered only)", raw: 1_600_000 },
  extra: [{ value: "1 of 16", label: "partitions per query" }],
  note: (
    <>
      then a 24–48h soak + <code>DROP TABLE …_old</code> reclaims ~47GB
    </>
  ),
};

// ---- Case 4: PR evidence table ----
const case4Prs: PrRow[] = [
  {
    repo: "sensors",
    number: 1091,
    url: PR("sensors", 1091),
    title: "terraform(sensors-api): enable org access enforcement in production",
    status: "merged",
    added: 1,
    removed: 0,
    opened: "Jul 14",
  },
  {
    repo: "sensors",
    number: 1089,
    url: PR("sensors", 1089),
    title:
      "fix(sensors-api): allow omitted org_id on wildcard-permitted routes (PI-7920)",
    status: "merged",
    added: 22,
    removed: 0,
    opened: "Jul 13",
  },
  {
    repo: "sensors",
    number: 1088,
    url: PR("sensors", 1088),
    title: "terraform(sensors-api): enable org access enforcement in staging",
    status: "merged",
    added: 1,
    removed: 0,
    opened: "Jul 13",
  },
  {
    repo: "sensors",
    number: 1115,
    url: PR("sensors", 1115),
    title: "[PI-7627] Fix staging deploy-gate wildcard org access on sensor config",
    status: "merged",
    added: 61,
    removed: 4,
    opened: "Jul 22",
  },
  {
    repo: "sensors",
    number: 1084,
    url: PR("sensors", 1084),
    title: "PI-7901: enforce org scope on read endpoints (flag-independent)",
    status: "merged",
    added: 1614,
    removed: 251,
    opened: "Jul 8",
  },
  {
    repo: "sensors",
    number: 1077,
    url: PR("sensors", 1077),
    title:
      "PI-7873: org-scoped GET /api/sensors/:sensorId/resources (flag-independent)",
    status: "merged",
    added: 656,
    removed: 39,
    opened: "Jul 6",
  },
  {
    repo: "sensors",
    number: 1076,
    url: PR("sensors", 1076),
    title: "PI-7874: case-insensitive org-id comparison (gate + rowOrgAccess)",
    status: "merged",
    added: 65,
    removed: 4,
    opened: "Jul 6",
  },
  {
    repo: "sensors",
    number: 1020,
    url: PR("sensors", 1020),
    title:
      "docs(sensors-api): document org_id enforcement on all 11 M2M-scoped routes (PI-7092)",
    status: "merged",
    added: 603,
    removed: 23,
    opened: "Jun 15",
  },
  {
    repo: "sensors",
    number: 1040,
    url: PR("sensors", 1040),
    title: "PI-5083: Migrate sensor export latest assets to org_id tenancy",
    status: "merged",
    added: 761,
    removed: 49,
    opened: "Jun 19",
  },
  {
    repo: "sensors",
    number: 1042,
    url: PR("sensors", 1042),
    title:
      "fix(sensors-api): PI-5941 GET /api/sources collection-scoped discoverability",
    status: "merged",
    added: 226,
    removed: 27,
    opened: "Jun 22",
  },
  {
    repo: "sensors",
    number: 1001,
    url: PR("sensors", 1001),
    title:
      "feat(sensors-api): remap staging org_ids to prod for data queries (PI-6650)",
    status: "unmerged",
    added: 487,
    removed: 43,
    opened: "Jun 3",
  },
  {
    repo: "sensors",
    number: 1124,
    url: PR("sensors", 1124),
    title: "[PI-7921] Retire ORG_ACCESS_ENFORCEMENT_ENABLED flag",
    status: "merged",
    added: 145,
    removed: 538,
    opened: "Jul 27",
  },
  {
    repo: "sensors",
    number: 1130,
    url: PR("sensors", 1130),
    title: "[PI-7921] Remove ORG_ACCESS_ENFORCEMENT_ENABLED terraform wiring",
    status: "merged",
    added: 1,
    removed: 15,
    opened: "Jul 28",
  },
  {
    repo: "sensors",
    number: 1224,
    url: PR("sensors", 1224),
    title: "[PI-8179] Self-heal org_directory for integration-token principals",
    status: "merged",
    added: 1560,
    removed: 59,
    opened: "Aug 17",
  },
  {
    repo: "sensors",
    number: 1263,
    url: PR("sensors", 1263),
    title: "[PI-8179] Catalog org_directory self-heal Datadog monitors",
    status: "merged",
    added: 52,
    removed: 53,
    opened: "Aug 27",
  },
];

const case2MetricFlow: MetricFlow = {
  before: { value: "~217,000", label: "sequential scan cost", raw: 217_000 },
  after: { value: "~19", label: "index-scan plan cost", raw: 19 },
  note: <>~11,400× cheaper, read from the query's own EXPLAIN output</>,
};

const case3MetricFlow: MetricFlow = {
  before: { value: "~720 + ~360", label: "workflow + terraform lines", raw: 1080 },
  after: { value: "0", label: "deleted, redundant w/ Datadog", raw: 0 },
  extra: [{ value: "45 → 15", label: "endpoints, ranked by traffic" }],
};

const case5MetricFlow: MetricFlow = {
  before: { value: "0 of 5", label: "services on IAM auth", raw: 0 },
  after: { value: "4 of 5", label: "flipped in stage, one per apply", raw: 4 },
  extra: [{ value: "24–72h", label: "soak clock between flips" }],
  note: (
    <>
      prod proxy now runs <code>RequireTLS: true</code> with an IAM auth block
      standing by
    </>
  ),
};

const case6MetricFlow: MetricFlow = {
  before: { value: "500-row chunk", label: "aborted by one duplicate", raw: 500 },
  after: { value: "1 row skipped", label: "conflict becomes a no-op", raw: 1 },
  extra: [{ value: "5", label: "bounded failure reasons, was NULL" }],
  note: (
    <>
      and the uniqueness key widened to include <code>org_id</code>, so one org
      no longer wins the asset for all of them
    </>
  ),
};

const case7MetricFlow: MetricFlow = {
  before: { value: "797", label: "Datadog→Slack alerts / 14d", raw: 797 },
  after: { value: "≤319", label: "target after rerouting (−60%)", raw: 319 },
  extra: [{ value: "0", label: "reduction in prod coverage" }],
  note: <>staging groups rerouted to a stage channel, not silenced</>,
};

const baseCases: Omit<CaseStudy, "impact">[] = [
  {
    id: "partitioning",
    navLabel: "ACU blow-up",
    matrixLabel: "sensor_version_state partitioning",
    title: "Partitioning sensor_version_state to stop an ACU blow-up",
    ticket: "PI-7372",
    primary: "data-fanatics",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 1,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            The fix came from <b>measuring real usage</b> — auditing 39M rows of
            actual write/read behavior — rather than assumptions. That's the
            value's own definition in practice: use real data to optimize the
            system, don't guess at what to change.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            Cutting Aurora ACU pressure and write latency protects the cloud
            cost and uptime of the product partner brands depend on.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            The live-data cutover carried its own drift guard that aborts the
            swap rather than risk corrupting prod — a safety mechanism that
            didn't exist before.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            The cutover ran as one sequenced runbook — pausing the batch-eval
            workers and the expiry Lambda, flipping the flag, resuming only once
            it was confirmed live.
          </>
        ),
      },
    ],
    lead: (
      <>
        Cut a <b>39M-row / 47GB</b> table down to <b>1.6M / 7.7GB</b> and made
        every query touch one partition instead of sixteen.
      </>
    ),
    plainSummary: (
      <>
        One of our databases had quietly grown to 39 million rows and was
        driving up cloud costs and slowing down writes. Instead of guessing at
        a fix, I measured what was actually being stored — and found 93% of
        it was never read again by anything. Shrinking the table to just the
        data that's actually used cut it by 96% and made every lookup faster,
        with no loss of anything anyone needed.
      </>
    ),
    signal: (
      <>
        <code>PI-7372</code> came in as an audit ticket — map every
        read/write site for <code>sensor_version_state</code> and evaluate
        moving it into Heimdall (extending <code>sensor_version_evals</code>)
        instead of Postgres. Doing that audit is what surfaced the more
        urgent problem: the table had grown to ~39M rows / 47GB, every
        per-sensor query scanned the whole thing, and in staging and prod
        that showed up as Aurora ACU pressure and slow batch-eval writes.
      </>
    ),
    narrative: [
      <>
        The audit closed off a near-term Heimdall move on its own:{" "}
        <code>SensorsController.putSensor</code> and <code>patchSensor</code>{" "}
        wrap state writes in the same transaction as <code>sensor_versions</code>{" "}
        and <code>sensor_action_assets</code>, which Heimdall can't join into,
        and <code>BatchActionExecutor</code> / <code>GenerateActionAssetProcessor</code>{" "}
        both aggregate 400k+ JSONB rows per call — latency a cross-service
        read wasn't going to beat. With the migration parked, I audited the
        writes instead: workers wrote a state row for <b>every</b> evaluation,
        but only <em>triggered</em> rows are ever read anywhere in the
        codebase — non-triggered writes were ~93% of volume for zero
        downstream use. The fix had two parts that had to land in order: (1)
        partition the table by <code>HASH(sensor_id)</code> so per-sensor
        reads and bulk expiry/turn-off updates prune to one partition instead
        of scanning all sixteen, and (2) stop writing non-triggered rows so
        the lean table stays lean. Since it was a live-data cutover, the
        migration carried its own drift guard that aborts the swap rather
        than risk corrupting the table.
      </>,
    ],
    flow: [
      {
        date: "Jun 4 · dev-validated",
        label: (
          <>Shipped the partition migration and query changes {prRef("#1002", PR("sensors", 1002))}</>
        ),
        body: (
          <>
            16-way <code>HASH(sensor_id)</code> partition, composite primary
            key, cloned indexes/FKs, a drift guard, and the five call sites
            updated to filter by <code>sensor_id</code> so they prune. Merged
            behind a hold — dev-rehearsed only, prod cutover deferred to its
            own runbook.
          </>
        ),
      },
      {
        date: "early Jun · cutover attempt #1",
        label: "A full-table copy blew the 300s Lambda timeout",
        setBack: true,
        body: (
          <>
            The one-time <code>INSERT … SELECT</code> to populate the
            partitioned twin timed out inside the prod migration Lambda's
            300s cap (run #836); a manual multi-hour retry still didn't
            finish. Copying all 39M rows was never going to fit the window.
          </>
        ),
      },
      {
        date: "Jun 9",
        label: <>Root cause → copy only the triggered rows {prRef("#1011", PR("sensors", 1011))}</>,
        body: (
          <>
            Because non-triggered rows have no reader, the copy only needs
            the ~1.3M triggered rows (~3% of the table). One filter clause
            turned a copy that couldn't finish into one that fits the 300s
            window comfortably. Paired with #1008 so new non-triggered
            writes don't undo the shrink.
          </>
        ),
      },
      {
        date: "Jun 9 · same day",
        label: <>Cutover #2 — the drift guard caught a type mismatch {prRef("#1014", PR("sensors", 1014))}</>,
        setBack: true,
        body: (
          <>
            Prod declared five key columns as unbounded <code>varchar</code>;
            my twin had created them as <code>varchar(255)</code>. The drift
            guard did its job — aborted the swap instead of silently
            truncating, rolled back cleanly, left prod untouched. I recreated
            the columns unbounded and added a metadata-only widening pass for
            any stale twin.
          </>
        ),
      },
      {
        date: "Jun 8–9 · coordinated cutover",
        label: <>Stopped the leak going forward {prRef("#1008", PR("sensors", 1008))}</>,
        body: (
          <>
            Cutover order: pause the batch-eval workers and the expiry Lambda
            → run the filtered migration → verify row counts → flip{" "}
            <code>SENSOR_STATE_TRIGGERED_ONLY=true</code> so workers skip
            non-triggered upserts and hard-delete on turn-off/expiry → resume
            workers only once the flag is confirmed live, so nothing refills
            the fresh table.
          </>
        ),
      },
    ],
    metricFlow: case1MetricFlow,
    result: (
      <>
        <b>Result:</b> reads and bulk updates now prune to a single
        partition instead of scanning all sixteen, the table stopped growing
        on writes nothing reads, and the drift guard caught a real type
        mismatch <em>before</em> it reached prod data.
      </>
    ),
  },
  {
    id: "claim-path",
    navLabel: "Query-plan fix",
    matrixLabel: "claim-path query-plan fix",
    title: "A query-plan regression on the claim path",
    ticket: "actions-processor",
    primary: "data-fanatics",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 1,
      "game-changers": 2,
    },
    valueLines: [
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            The diagnosis came from the database's own <code>EXPLAIN</code>{" "}
            data — a measured <b>~217,000 vs ~19</b> cost — not a hunch.
            Optimizing the system starts with trusting what the data says over
            what seems intuitively true.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            I caught my <em>own</em> over-strict deploy gate in practice and
            replaced it with a narrower fix plus a written policy, instead of
            letting it quietly cause its own outages.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            The fix removed a claim-path slowdown that degraded the action
            pipeline partner workflows run through under backlog.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            The code-level net got replaced with a migration policy the whole
            team now follows — no out-of-band migrations, every DB hotfix ships
            its migration in the same PR.
          </>
        ),
      },
    ],
    lead: (
      <>
        Found a claim query running at ~<b>217,000</b> cost where the right
        index-scan plan costs ~<b>19</b> — by reading its{" "}
        <code>EXPLAIN</code> output, not guessing.
      </>
    ),
    plainSummary: (
      <>
        Work was getting randomly stuck, and separately a busy period made a
        core system crawl. Rather than guess at the cause, I measured exactly
        how the database was running the slow request and found it was doing
        over 11,000× more work than it needed to. Rewriting that one query
        removed the slowdown — a fix that only comes from reading the actual
        evidence, not from a hunch.
      </>
    ),
    signal: (
      <>
        Batches were getting stuck in a "fetching" state after ECS scaled
        workers down mid-claim. Separately, weeks later, a staging incident
        showed the action-claim query degrading badly under backlog.
      </>
    ),
    narrative: [
      <>
        I fixed the scale-down bug first ({prRef("#935", PR("sensors", 935))}
        , May 6): batches claimed by a worker that got scaled away never
        released, so nothing else could pick them up. The bigger story came
        later. Rather than guess at the slow query, I pulled its plan
        directly — the OR-based claim clause forced a sequential scan plus
        sort at ~<b>217,000</b> cost, while a pending-only query against the
        right partial index cost ~<b>19</b>. That's a gap no amount of code
        review catches without actually running <code>EXPLAIN</code>.
      </>,
    ],
    flow: [
      {
        date: "Jun 26 · hotfix",
        label: (
          <>
            Split the claim query around the plan gap{" "}
            {prRef("#1053", PR("sensors", 1053))} →{" "}
            {prRef("#1055", PR("sensors", 1055))}
          </>
        ),
        body: (
          <>
            <code>claimNextActions</code> split into a pending-first query
            (hits <code>idx_triggered_actions_pending</code>) with a rare
            stale-in-flight fallback on its own partial index. #1053 carried
            an unrelated dependency, so I closed it and shipped #1055 — a
            hotfix-only cut without the coupling — to get the fix out fast.
          </>
        ),
      },
      {
        date: "Jun 29",
        label: <>A stale migration bundle blocked the next deploy {prRef("#1056", PR("sensors", 1056))}</>,
        setBack: true,
        body: (
          <>
            Staging's <code>knex_migrations</code> already recorded #1055's
            migration from the incident hotfix, so Knex's{" "}
            <code>validateMigrationList</code> hard-failed with "the
            migration directory is corrupt" and blocked <em>all</em> pending
            migrations. #1056 added a reconciliation step to prune stale rows
            before migrating, plus a gate requiring staging to migrate before
            prod could be approved.
          </>
        ),
      },
      {
        date: "Jul 1–2 · course-correct",
        label: (
          <>
            Reverted the over-strict fix, shipped the durable one{" "}
            {prRef("#1063", PR("sensors", 1063))} (closes{" "}
            {prRef("#1062", PR("sensors", 1062))})
          </>
        ),
        setBack: true,
        body: (
          <>
            #1056 had two problems in practice: its reconciliation only
            self-heals <em>idempotent</em> migrations (most of this repo's
            aren't), and its new gate also hard-failed on <code>skipped</code>{" "}
            runs — the normal case for engine-only commits — which blocked
            its own deploy. #1063 reverted the reconcile code, softened the
            gate to fail only on an actual migration <code>failure</code>,
            and replaced the code-level net with a policy: no out-of-band
            migrations, and any DB hotfix ships its migration file in the
            same PR.
          </>
        ),
      },
    ],
    metricFlow: case2MetricFlow,
    result: (
      <>
        <b>Result:</b> the claim query now runs an index scan instead of a
        217k-cost sequential scan under backlog — and, just as important, my
        own over-correction to the deploy gate got caught in practice and
        replaced with a narrower fix plus a documented policy, instead of
        quietly causing its own outages.
      </>
    ),
  },
  {
    id: "deploy-gate",
    navLabel: "Deploy gate",
    matrixLabel: "stage→prod deploy gate",
    title: "A deploy-gate suite — with Datadog picking what to test",
    ticket: "PI-6787",
    primary: "game-changers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 1,
      "game-changers": 3,
    },
    valueLines: [
      {
        value: "game-changers",
        score: 3,
        line: (
          <>
            The bold move wasn't building the gate — it was challenging an
            already-approved, partially-built plan mid-project and deleting{" "}
            <b>~1,000 lines</b> of sunk-cost work once the evidence said there
            was a better way. Being bold enough to undo your own work is what
            this value asks for.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            I let <b>90 days of production traffic</b> — not intuition — rank
            which 15 of ~45 endpoints were worth gating, and that data flipped
            a real scope call.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            The gate stops a broken change from reaching partner-facing prod
            when only manual review stood in the way before.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            It sits deliberately <em>behind</em> the shared Datadog/PagerDuty
            stack rather than duplicating another team's tooling.
          </>
        ),
      },
    ],
    lead: (
      <>
        Built a stage→prod deploy gate, let 90 days of Datadog traffic rank
        the <b>15</b> endpoints worth gating, and deleted a redundant{" "}
        <b>~720-line</b> home-grown monitor.
      </>
    ),
    plainSummary: (
      <>
        Before this, a broken change could reach real customers with only
        manual review standing in the way. I built an automated safety check
        that runs before every release. Partway through, the evidence showed
        we were about to ship a ~1,000-line custom monitoring system that
        duplicated a tool we already paid for — so I challenged the original
        plan, deleted the redundant build, and shipped something leaner that
        works alongside what we already had.
      </>
    ),
    signal: (
      <>
        <code>PI-6787</code> landed as a research-and-design epic, not an
        implementation ticket: sensors-api had no synthetic coverage between
        a stage deploy and a prod deploy, and before writing any tests the
        ask was a recommendation on tooling and workflow design. The real
        question wasn't "add tests," it was which of ~45 endpoints were worth
        gating on, and whether Datadog already solved part of the problem.
      </>
    ),
    narrative: [
      <>
        First, Datadog had to actually see individual endpoints.{" "}
        {prRef("#965", PR("sensors", 965))} (May 14) found APM was only
        recording HTTP-method names — <code>GET</code>, <code>POST</code> —
        because <code>dd-trace</code> was configured at the infra layer but
        never loaded in the process. Importing the tracer as the very first
        line of <code>app.ts</code>, ahead of Express/pg/http, let
        auto-instrumentation record the real route (
        <code>GET /api/sensors/:sensorId</code>). That one change unlocked
        everything below.
      </>,
      <>
        With per-endpoint data, I ranked endpoints by <b>
          90 days of production traffic (Feb 26 – May 26)
        </b>{" "}
        rather than by what looked important. That flipped one real scope
        call: <code>agentsRoutes.ts</code> was excluded from the original
        45-endpoint plan, but the data showed it carried 4 of the top 5
        business endpoints by volume — so it moved in-scope, and the target
        narrowed from a blind 45 to a focused, traffic-ranked 15.
      </>,
    ],
    flow: [
      {
        date: "May 15",
        label: <>First synthetic suite {prRef("#968", PR("sensors", 968))}</>,
        body: (
          <>
            22 endpoints wired into a Bruno collection with a{" "}
            <code>prod-safe.txt</code> allowlist restricting prod runs to
            read-only GETs, run on a schedule and after every deploy.
          </>
        ),
      },
      {
        date: "May 26 · scope pivot mid-PR",
        label: (
          <>
            Cut a ~720-line home-grown monitor before it shipped{" "}
            {prRef("#982", PR("sensors", 982))}
          </>
        ),
        setBack: true,
        body: (
          <>
            The original plan was a scheduled heartbeat with an SSM
            auto-pause kill switch, CloudWatch alarm, IAM split, and tiered
            Slack alerts — ~720 lines of workflow + ~360 of Terraform. Two
            review passes converged on the same finding: Datadog's APM,
            health checks, and synthetics <em>already</em> covered prod
            monitoring end-to-end into PagerDuty, so the canary re-solved a
            solved problem while adding attack surface (a kill switch nothing
            armed). I deleted it wholesale — net <b>-1,027 lines</b> — and
            replaced it with a deploy-gate model: the stage run blocks every
            prod deploy on failure; the prod run is advisory; a 2h/6h cron is
            a Slack-only backup behind Datadog, not a replacement for it.
          </>
        ),
      },
      {
        date: "Jun 1",
        label: (
          <>
            Diagnosed a false "API contract broken" page{" "}
            {prRef("#997", PR("sensors", 997))}
          </>
        ),
        setBack: true,
        body: (
          <>
            The gate paged on-call as a contract violation, but the six
            failing endpoints all returned healthy <code>200</code>s — only
            schema validation failed, with a bare <code>expecting ';'</code>.
            Running the pinned <code>@usebruno/cli@3.3.0</code> directly
            showed the cause: Bruno's sandboxed <code>require()</code> has no
            JSON loader, so <code>require("./x.json")</code> evaluates the
            file <em>as JavaScript</em> and chokes on the first{" "}
            <code>"key":</code>. I emitted schemas as <code>.js</code>{" "}
            modules, added a lint guard against regressing to{" "}
            <code>.json</code>, and split tooling errors from contract breaks
            so a tooling bug can't page on-call as a contract failure again.
          </>
        ),
      },
      {
        date: "Aug 17–18 · the gate that had never actually passed",
        label: (
          <>
            A green check that was <code>tee</code>'s exit code{" "}
            {prRef("#1222", PR("sensors", 1222))} (closes{" "}
            {prRef("#1226", PR("sensors", 1226))})
          </>
        ),
        setBack: true,
        body: (
          <>
            The sensors-api auth matrix — the job that proves every protected
            route rejects the wrong token — had been reporting success while its
            own log read{" "}
            <code>failed to mint SENSORS_API_TOKEN_CORRECT … (status 410)</code>
            . The step piped the script through <code>tee</code> and then read{" "}
            <code>$?</code>, so it captured <code>tee</code>'s zero, not the
            script's. The matrix had never passed once. The fix sets{" "}
            <code>pipefail</code> so the job can fail, mints the token per run
            from credentials that already exist rather than a secret nobody had
            provisioned, and keeps exit 2 (stage unreachable) distinct from exit
            1 (auth wiring broken). I proved all three states on real runs: a
            clean pass at 22 requests, a forced red at 11 failures, and a forced
            exit 2. Follow-ups fail closed on an empty token file (
            {prRef("#1258", PR("sensors", 1258))}) rather than letting "0
            requests" read as an auth regression.
          </>
        ),
      },
      {
        date: "May 18 – Aug 27 · ongoing hardening",
        label: "Coverage and reliability follow-through",
        body: (
          <>
            Workflow hardening ({prRef("#969", PR("sensors", 969))}), cron
            re-enabled ({prRef("#971", PR("sensors", 971))}), webhook Slack
            alerting + a Bruno query-param fix (
            {prRef("#975", PR("sensors", 975))}), pnpm/tag unblock (
            {prRef("#991", PR("sensors", 991))}), an alarm-mute runbook (
            {prRef("#999", PR("sensors", 999))}), muting a fixture-stale
            endpoint instead of letting it false-fail (
            {prRef("#1000", PR("sensors", 1000))}), a CI declaration-emit
            race fix ({prRef("#1012", PR("sensors", 1012))}), wiring the
            Datadog-ranked endpoints into the gate (
            {prRef("#1023", PR("sensors", 1023))}), M2M client coverage (
            {prRef("#1049", PR("sensors", 1049))}), a fix to the staging gate's
            wildcard org-access handling on sensor-config routes (
            {prRef("#1115", PR("sensors", 1115))}), making the gate's Bruno
            install hermetic and unbreaking two dead lanes (
            {prRef("#1206", PR("sensors", 1206))}), committing the Terraform
            provider lockfiles ({prRef("#1207", PR("sensors", 1207))}), and
            surviving a real GitHub release-hosting outage that failed{" "}
            <code>terraform init</code> four times in one day (
            {prRef("#1227", PR("sensors", 1227))}).
          </>
        ),
      },
    ],
    metricFlow: case3MetricFlow,
    result: (
      <>
        <b>Result:</b> a stage→prod gate that blocks bad deploys on real
        endpoint coverage chosen from production traffic data — sitting
        deliberately behind Datadog instead of duplicating it — plus an auth
        matrix that can now actually fail, which is the only reason its green
        check means anything.
      </>
    ),
  },
  {
    id: "org-access",
    navLabel: "Org access",
    matrixLabel: "org & tenancy access hardening",
    title: "Org & tenancy access hardening",
    ticket: "PI-6651 → PI-7873 / 7901 / 7920 → PI-7921 / 8179",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 1,
      "team-of-doers": 2,
      "game-changers": 2,
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            Tenancy boundaries are the literal mechanism that keeps one partner
            brand's data invisible to every other brand. Closing those gaps
            carefully — and watching the rollout instead of walking away after
            merge — is what long-term trust with the brands requires.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            I closed it route-by-route without over-rejecting the M2M callers
            that other teams' systems — the agents service, cache warmers,
            cross-org reads — depend on.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: (
          <>
            I watched the staged rollout on real smoke-run data and caught the
            one regression the same day it surfaced.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            Org scoping shipped flag-<em>independently</em>, so a user-token
            caller was protected even while the enforcement flag was still off —
            and once prod had soaked, I deleted the killswitch and its
            fail-<em>open</em> branches entirely rather than leaving a retired
            flag in the codebase forever.
          </>
        ),
      },
    ],
    lead: (
      <>
        Closed org-scoping gaps route by route across read and write paths —
        caught the one regression the staged rollout produced the{" "}
        <b>same day</b>, and landed prod enforcement.
      </>
    ),
    plainSummary: (
      <>
        Every partner brand's data has to stay separate from every other
        brand's data — that boundary is the foundation of trust with the
        brands we work with. An audit found a few places where that
        separation could be bypassed. I closed each one carefully, route by
        route, because moving too fast risked locking out legitimate internal
        tools as much as leaving a gap open risked a real breach. When the
        rollout did cause one hiccup, I caught and fixed it the same day —
        before it reached a real customer — and production enforcement is now
        live.
      </>
    ),
    signal: (
      <>
        A security audit surfaced org-scoping gaps across sensors-api
        routes: some trusted a client-supplied <code>org_id</code> without
        verifying membership, and org-id comparisons weren't
        case-normalized.
      </>
    ),
    narrative: [
      <>
        I closed this route-family by route-family rather than as one flag
        flip — over-restricting a legitimate M2M caller was as real a risk as
        leaving a gap open. {prRef("#1076", PR("sensors", 1076))} made org-id
        comparisons case-insensitive at both the gate and row-access layers.{" "}
        {prRef("#1077", PR("sensors", 1077))} and{" "}
        {prRef("#1084", PR("sensors", 1084))} extended flag-independent org
        scoping to the remaining read endpoints, so a user-token caller is
        scoped to their real memberships even while enforcement is off — with
        a fail-closed <code>403</code> if scope can't be resolved.{" "}
        {prRef("#1020", PR("sensors", 1020))} documented enforcement across
        all eleven M2M-scoped routes.
      </>,
    ],
    flow: [
      {
        date: "Jul 13 · staged rollout, regression found",
        label: "Enforcement in staging broke 5 wildcard-permitted routes",
        setBack: true,
        body: (
          <>
            Once <code>ORG_ACCESS_ENFORCEMENT_ENABLED</code> was staged for a
            real flip, M2M clients on the 12 routes marked{" "}
            <code>allowWildcards: true</code> — cache warmers, the agents
            service, cross-org reads — started getting rejected with{" "}
            <code>MISSING_ORG_ID</code>. Root cause:{" "}
            <code>requireOrgAccess.ts</code> wasn't distinguishing "no org_id
            supplied" from "org_id required and absent" on routes that had
            opted into wildcards.
          </>
        ),
      },
      {
        date: "Jul 13",
        label: <>Scoped fix, not a rollback {prRef("#1089", PR("sensors", 1089))}</>,
        body: (
          <>
            The fix only changes behavior on routes that already had{" "}
            <code>allowWildcards: true</code> — all reads, none
            create/update/delete. M2M callers keep their unrestricted scope;
            user-token callers narrow to their own <code>accessibleOrgIds</code>
            , covered by new spec cases for both. Strict routes are untouched
            and still 400 on a missing <code>org_id</code>. Staging's
            enforcement flag ({prRef("#1088", PR("sensors", 1088))}) went
            ahead only after this landed.
          </>
        ),
      },
      {
        date: "Jul 22 · prod enforcement live",
        label: (
          <>
            Prod enforcement flag merged after the soak cleared{" "}
            {prRef("#1091", PR("sensors", 1091))}
          </>
        ),
        body: (
          <>
            Staging stayed green on every smoke run after the #1089 fix, the
            48h soak cleared, and the unrelated{" "}
            <code>sensor-variables-lifecycle</code> CI failure was confirmed
            independent — so the prod tfvars flip merged on Jul 22. A separate
            backport-only PR ({prRef("#1092", PR("sensors", 1092))}) was closed
            in favor of it, and a follow-up ({prRef("#1115", PR("sensors", 1115))})
            tidied the staging gate's wildcard handling on sensor-config routes.
          </>
        ),
      },
      {
        date: "Jul 27–28 · deleting the killswitch, in the right order",
        label: (
          <>
            Retired the flag in two PRs, code before infra{" "}
            {prRef("#1124", PR("sensors", 1124))} →{" "}
            {prRef("#1130", PR("sensors", 1130))}
          </>
        ),
        body: (
          <>
            Once prod had soaked well past the 48h bar — 403s low and
            non-climbing, 401s unchanged pre- and post-flip, 5xx flat, all P1
            monitors OK — I made enforcement unconditional and deleted the
            killswitch, its nine flag sites, and the dead{" "}
            <code>forceOrgScope</code> plumbing that existed only to force the
            org lookup while the flag was off. The Terraform removal was
            deliberately held back to a second PR: dropping the env var while
            the old image was still reading it would have produced a task
            definition with no variable and silently flipped enforcement{" "}
            <em>off</em>. One of the flag sites{" "}
            (<code>responsePolicyOrgAccess</code>) wasn't in the ticket's
            original eight-site inventory — the grep sweep only came back clean
            because I looked for it.
          </>
        ),
      },
      {
        date: "Aug 17–27 · the gap tenancy created",
        label: (
          <>
            Self-heal for integration-token principals{" "}
            {prRef("#1224", PR("sensors", 1224))},{" "}
            {prRef("#1263", PR("sensors", 1263))}
          </>
        ),
        body: (
          <>
            Tightened tenancy exposed its own edge: integration tokens are bound
            by <code>orgCode</code> rather than a UUID, so{" "}
            <code>org_directory</code> was never warmed for them and otherwise
            valid requests came back <code>403</code> or empty. The fix resolves
            the org by code through AdminCzar and best-effort upserts the row,
            behind a default-off flag, wrapped so it can never throw back into
            the request path and fail-closed to today's behavior if the lookup
            fails. It ships with an ADR recording why two simpler options were
            rejected, and four Datadog monitors — the <code>code_mismatch</code>{" "}
            one rated P1 because it would mean a cross-tenant resolution.
          </>
        ),
      },
    ],
    result: (
      <>
        <b>Result:</b> org-scoping closed across read and write paths with
        case-insensitive comparisons and documented M2M contracts — and
        because I watched the staged rollout rather than fire-and-forgetting
        it, the one regression got caught, root-caused, and fixed same-day.
        Production enforcement went live on Jul 22, soaked, and the killswitch
        that guarded it is now deleted rather than left behind as permanent
        dead weight.
      </>
    ),
    prTable: case4Prs,
  },
  {
    id: "iam-db-auth",
    navLabel: "DB passwords",
    matrixLabel: "retiring database passwords",
    title: "Retiring database passwords, one service at a time",
    ticket: "PI-1430 → PI-8168 / 8174 / 8937",
    primary: "team-of-doers",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 2,
      "team-of-doers": 3,
      "game-changers": 3,
    },
    valueLines: [
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            Twelve sequenced PRs over a month, with <b>one service per apply</b>{" "}
            and a 24–72h soak as a <em>merge</em> gate rather than a suggestion.
            Nobody was watching this closely enough to catch a shortcut — the
            discipline had to come from owning the outcome, not from review
            pressure.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 3,
        line: (
          <>
            Long-lived database passwords are the definition of "it has always
            worked this way." Replacing them with short-lived, automatically
            issued credentials — <em>before</em> an incident forced the
            conversation — is choosing to change something that wasn't visibly
            broken.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            A botched credential cutover takes the whole platform down for every
            partner brand at once. Every step was built to be reversible in
            seconds, and the one service whose code couldn't support the new
            mode was excluded by name rather than swept along with the rest.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 2,
        line: (
          <>
            Each flip carried its own evidence: pre-merge baselines recorded
            separately from post-apply proof, connection-failure metrics,
            invocation counts, and a live alarm on unencrypted connections that
            I fire-tested rather than assumed worked.
          </>
        ),
      },
    ],
    lead: (
      <>
        Moved the platform off long-lived database passwords onto short-lived
        IAM credentials across <b>dev → stage → prod</b> — twelve PRs, one
        service per apply, zero auth failures.
      </>
    ),
    plainSummary: (
      <>
        Our services logged into the database with permanent passwords stored as
        secrets — the kind of thing that is fine until the day it isn't. I moved
        them onto credentials that are issued fresh, expire on their own, and
        can't be copied out and reused. The risk in a change like this is that
        getting it wrong locks every service out of the database at once, so I
        did it one service at a time, waited a full day between each, and made
        every step undoable in seconds. Nothing went down.
      </>
    ),
    signal: (
      <>
        <code>PI-1430</code> laid the groundwork in June — the proxy resources
        and the code path to authenticate with a signed token instead of a
        password. Turning it on was the hard part, and it split into two
        tracks: <code>PI-8174</code> to make the connection encrypted and the
        proxy willing to accept IAM, and <code>PI-8168</code> to move each
        individual service across. Either one applied out of order locks
        services out of the database.
      </>
    ),
    narrative: [
      <>
        The order was the whole design. Requiring encryption on the proxy before
        every client speaks encrypted gets you{" "}
        <code>FATAL 28000</code> across the fleet, so encryption went on the{" "}
        <em>clients</em> first ({prRef("#1140", PR("sensors", 1140))},{" "}
        {prRef("#1141", PR("sensors", 1141))}), rehearsed on a dev canary (
        {prRef("#1139", PR("sensors", 1139))}), and only then became a proxy
        requirement in prod ({prRef("#1213", PR("sensors", 1213))}) two weeks
        later. The IAM auth block on the prod proxy landed as its own separate
        merge ({prRef("#1235", PR("sensors", 1235))}) that deliberately moved{" "}
        <em>no</em> service onto it — adding the capability and using it are two
        different changes, and combining them would have meant one plan review
        covering two failure modes.
      </>,
      <>
        The Terraform wiring ({prRef("#1149", PR("sensors", 1149))}) was built
        so that each service flips by adding its name to a list — which made
        every subsequent flip a one-line diff whose blast radius was legible on
        sight. It also encodes an exclusion: <code>actions-response-dispatcher</code>{" "}
        has no IAM branch in its connection code, so wiring it up would produce
        an authentication failure the moment it was flipped. Rather than trust a
        comment, the configuration <em>rejects</em> that service name outright.
      </>,
    ],
    flow: [
      {
        date: "Jul 29 · blocked by its own prerequisite",
        label: (
          <>
            A pending migration deadlocked the deploy{" "}
            {prRef("#1143", PR("sensors", 1143))}
          </>
        ),
        setBack: true,
        body: (
          <>
            The migration that creates the new database role couldn't run,
            because the Lambda that runs migrations needed permissions that
            Terraform hadn't applied yet — and Terraform ran after migrations.
            Fixing it meant reordering the deployment so the migration Lambda's
            code, environment, and permissions are applied <em>before</em>{" "}
            migrations execute, without letting the Lambda be deployed twice
            outside Terraform's ownership.
          </>
        ),
      },
      {
        date: "Aug 5 · a crash-loop found before it shipped",
        label: (
          <>
            Removing the password would have killed the workers at boot{" "}
            {prRef("#1157", PR("sensors", 1157))}
          </>
        ),
        setBack: true,
        body: (
          <>
            Both workers demanded <code>DB_PASSWORD</code> at startup as a
            hard requirement left over from an earlier design, even though the
            actual connection builder had owned that validation for a while. So
            the very change that makes IAM work — omitting the password from the
            task definition — would have crash-looped them on the first deploy.
            The specs now assert that boot succeeds with no password set. The
            same PR made the migration's rollback path revoke grants instead of
            dropping the role (the proxy secret still points at it), and shipped
            a second migration because the first had already been recorded and
            would never re-run.
          </>
        ),
      },
      {
        date: "Aug 10 → 27 · four flips, four soaks",
        label: (
          <>
            Lowest blast radius first{" "}
            {prRef("#1198", PR("sensors", 1198))} →{" "}
            {prRef("#1210", PR("sensors", 1210))} →{" "}
            {prRef("#1232", PR("sensors", 1232))} →{" "}
            {prRef("#1262", PR("sensors", 1262))}
          </>
        ),
        body: (
          <>
            Ordered by what breaks if it's wrong: a scheduled, read-mostly
            Lambda first; then the Kafka-triggered relay; then the hourly
            cleanup job; then the first ECS worker. Each PR carries an explicit
            "not in this PR" list so the next one can't quietly widen. One
            of them is stamped{" "}
            <b>"do not merge before 2026-08-14T14:33Z"</b> — the soak clock for
            the previous flip, to the minute. Each also names the specific way
            it could go wrong: on the Kafka relay, that a replaced event-source
            mapping would silently skip in-flight offsets, so a plan showing a
            replace means <em>stop</em>.
          </>
        ),
      },
      {
        date: "Aug 19 · a hazard the rollout didn't own",
        label: "Concurrent CI runs were parking prod workers on a mutable tag",
        setBack: true,
        body: (
          <>
            Watching these applies surfaced something unrelated to IAM: when one
            deployment cancels another mid-run, the Terraform apply leaves all
            three production workers pointed at <code>:latest</code> until CI
            re-pins them to a commit. That got written into the flip PRs as a
            pre-merge and post-apply check — re-read the live image tags
            immediately before merging, and again after — so the credential
            rollout didn't become the thing that shipped an unpinned image to
            production.
          </>
        ),
      },
    ],
    metricFlow: case5MetricFlow,
    result: (
      <>
        <b>Result:</b> production now requires encrypted database connections
        and carries an IAM auth block; four of the five eligible services run on
        short-lived credentials in stage with zero authentication failures
        across every soak window; and the one service that couldn't safely make
        the move is excluded by a rule rather than by memory.
      </>
    ),
  },
  {
    id: "failure-attribution",
    navLabel: "Attribution",
    matrixLabel: "making pipeline failures attributable",
    title: "Making failures measurable before trying to fix them",
    ticket: "PI-8729 → PI-8751",
    primary: "data-fanatics",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 1,
      "game-changers": 2,
    },
    valueLines: [
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            The first PR of this arc changed <b>nothing about what executes</b>.
            It only made failures attributable — because until a failure can be
            counted by cause, every later fix is a guess and no one can tell
            whether it worked. Instrumenting before intervening is this value in
            its purest form.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            The bug being chased was silently producing one asset per batch
            where every partner org should have gotten its own — a correctness
            problem in partner-facing output, not just noise in a log.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            Reviewing my own PR against its own acceptance criteria caught a
            data-exposure bug I had just written, and the eventual fix landed
            behind a toggle that ships dark so the enqueue change can be
            reverted independently of the migration underneath it.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            The shared error-handling change was split into its own PR because
            it touches a library the API team depends on too, not only the
            engine I was working in.
          </>
        ),
      },
    ],
    lead: (
      <>
        Every pipeline failure was landing as an empty status and an unusable
        error blob. I made them <b>attributable first</b> — then the data named
        the actual bug.
      </>
    ),
    plainSummary: (
      <>
        A part of our automation pipeline was failing, and nobody could say why
        — every failure was recorded the same anonymous way, so you couldn't
        tell a database conflict from a timeout from a downstream outage. Rather
        than guess at a fix, I first made every failure record what actually
        caused it. Once that was in place the pattern was obvious: the system
        was treating work for different partner brands as duplicates of each
        other, so one brand's result overwrote the rest. That fix would have
        been very hard to find by reading code.
      </>
    ),
    signal: (
      <>
        Asset-generation actions were failing, and every failure of every cause
        looked identical in the database: an empty status column and an error
        field holding the database driver's generic{" "}
        <code>Failed query: insert into …</code>. You could not attribute a
        failure to a cause, a workflow node, or a sensor without opening a
        database session and reasoning by hand.
      </>
    ),
    narrative: [
      <>
        The blocker was one level down. The error the code could see was a
        wrapper; the useful parts — the SQL state code and the name of the
        constraint that was violated — lived further along a chain of nested
        causes. Worse, the existing walk took the first error carrying{" "}
        <em>any</em> recognized field and stopped, so a transport-level wrapper
        like <code>ECONNRESET</code> would shadow the constraint name
        underneath it. {prRef("#1195", PR("sensors", 1195))} walks the whole
        chain and takes the first value for <em>each field independently</em>.
        It shipped separately because it changes a shared library the API
        depends on, not just the engine.
      </>,
      <>
        On top of that, {prRef("#1196", PR("sensors", 1196))} stored the SQL
        state and constraint name in their own columns, and mapped every failure
        to one of five bounded reasons through a single function that feeds{" "}
        <em>both</em> the database column and the dashboard metric — so the two
        can't disagree. Status codes are consulted before message text, because
        a rejection whose body happens to mention a timeout is a downstream
        failure, not a timeout. The whole PR is explicitly zero-behavior-change:
        it makes the problem measurable and nothing else.
      </>,
    ],
    flow: [
      {
        date: "Aug 10 · caught in my own review",
        label: "The logging change was leaking the data it was meant to scrub",
        setBack: true,
        body: (
          <>
            Re-reading the PR against its own acceptance criteria turned up a
            gap I had written myself: the error text was being sanitized before
            going into the database column, but two functions logged the{" "}
            <em>raw</em> error one line earlier. Because a failed query message
            carries its bound parameters, every terminal failure was emitting
            trigger context, action configuration, and org IDs into the logs.
            Both paths now log the sanitized value, with a test per path that
            fails if the order is ever swapped back — and I verified the tests
            actually catch it by reverting the fix and watching them go red.
          </>
        ),
      },
      {
        date: "Aug 13 · the widgets didn't reconcile",
        label: (
          <>
            Honest dashboards over impressive ones{" "}
            {prRef("#1208", PR("sensors", 1208))}
          </>
        ),
        body: (
          <>
            The dashboard shipped with a list of known problems rather than a
            claim of completeness: some panels counted log events instead of
            actions, metric panels were unscoped while log panels were filtered,
            and until the log facets existed several widgets would return
            nothing — which looks exactly like "no failures." This PR closed
            those gaps, but naming them up front is what kept anyone from
            trusting a panel that wasn't yet trustworthy.
          </>
        ),
      },
      {
        date: "Aug 21 · what the data actually said",
        label: (
          <>
            One org was winning the asset for all of them{" "}
            {prRef("#1240", PR("sensors", 1240))}
          </>
        ),
        body: (
          <>
            With failures attributable, the dominant cause resolved to a single
            constraint: batched asset actions were colliding on a uniqueness key
            that didn't include the org. So instead of each org getting its own
            asset, the first one through won and the rest failed. The fix widens
            the key to include the org, queues one action per batch-and-node
            rather than fanning out per org, persists the real database cause
            instead of the driver's generic message, and stops retry counts from
            being bumped on failures that will never succeed.
          </>
        ),
      },
      {
        date: "Aug 27–28 · shipped dark, on purpose",
        label: (
          <>
            Idempotent inserts and a reversible toggle{" "}
            {prRef("#1260", PR("sensors", 1260))},{" "}
            {prRef("#1269", PR("sensors", 1269))}
          </>
        ),
        body: (
          <>
            A duplicate insert used to abort an entire 500-row chunk; it is now
            a no-op on that one row. The remaining enqueue changes sit behind a
            default-off toggle so they can be rolled back independently of the
            migration beneath them. The follow-up hardens the rollout itself:
            terminally failed rows no longer suppress a re-enqueue, the required
            index is enforced by a boot-time guard rather than a note in the
            runbook, and the rollout's own signals are emitted as metrics so the
            flip can be watched instead of assumed.
          </>
        ),
      },
    ],
    metricFlow: case6MetricFlow,
    result: (
      <>
        <b>Result:</b> failures now carry their SQL state, constraint, and a
        bounded reason into both the database and the dashboard from one shared
        function — and that instrumentation, not code reading, is what named the
        real bug: a uniqueness key that treated different partner orgs as
        duplicates of each other.
      </>
    ),
  },
  {
    id: "alert-noise",
    navLabel: "Alert noise",
    matrixLabel: "alert taxonomy & noise reduction",
    title: "797 alerts in two weeks, and why counting them the obvious way lies",
    ticket: "PI-8703",
    primary: "data-fanatics",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 2,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            The whole contribution is a measurement argument: a{" "}
            <b>1,022-event baseline</b> that identified three noise sources as a
            third of all volume, a target stated as a number, and — the part
            that matters — catching that the <em>obvious</em> metric would have
            scored a perfectly successful change as having done nothing.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            At that density a genuine production incident is easy to miss.
            Restoring signal in the incident channel is directly about how fast
            a partner-affecting outage gets noticed.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            These monitors aren't managed as code — the document{" "}
            <em>is</em> the propagation mechanism — so I kept the written record
            reconciled against live configuration after every change, because a
            stale doc is how the next person's edit goes wrong.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            The reflex fix is to silence the noisy monitors. I rejected that and
            rerouted instead, so nothing lost the ability to fire.
          </>
        ),
      },
    ],
    lead: (
      <>
        Cut alert volume in a production incident channel by a target{" "}
        <b>60%</b> with <b>zero</b> reduction in production coverage — by
        rerouting, not silencing.
      </>
    ),
    plainSummary: (
      <>
        Our production incident channel was getting around 800 automated alerts
        every two weeks, most of them from our test environment. At that volume
        a real outage scrolls past unnoticed. The easy fix — turning the noisy
        alerts off — would have quietly reduced our ability to detect real
        problems, so instead I sent the test-environment alerts to a separate
        channel and left every alert able to fire. I also had to be careful
        about how success was measured: the obvious way of counting would have
        made a completely successful change look like it had done nothing.
      </>
    ),
    signal: (
      <>
        <code>#sensors-engine-alerts</code> — the channel a production incident
        is supposed to surface in — carried <b>1,022</b> alert events over
        roughly two weeks, <b>797</b> of them delivered to Slack. Most of that
        was staging traffic landing in a production channel, and three
        individual sources accounted for a third of the total on their own.
      </>
    ),
    narrative: [
      <>
        The constraint shaped the solution. These monitors are multi-environment
        by design and carry exactly one threshold set between them — only the
        message text can vary per environment. So per-environment thresholds
        would require splitting every monitor into separate production and
        staging copies, which mints new identifiers and throws away the alert
        history that makes tuning possible later. Routing achieves the same
        outcome without paying that cost: staging groups point at a staging
        channel, production groups keep going to the incident channel, and no
        monitor loses the ability to fire. A few monitors were genuinely
        mis-tuned and were retuned — but each retune is defended by baseline
        evidence, and none reduces production coverage.
      </>,
      <>
        The measurement choice is the part I'd defend hardest. The natural
        metric is the count of alert events — but rerouting doesn't change how
        often a monitor changes state, so measured in events a{" "}
        <em>perfectly successful</em> reroute still reads ~1,022 and looks like
        it accomplished nothing. The acceptance criterion is therefore stated in
        delivered Slack messages, with a separate criterion asserting zero
        reduction in production alert transitions, so the change can't succeed
        on the headline number by quietly costing coverage.
      </>,
    ],
    flow: [
      {
        date: "Aug 6",
        label: (
          <>
            Taxonomy, corrected inventory, and a live routing test{" "}
            {prRef("#1175", PR("sensors", 1175))}
          </>
        ),
        body: (
          <>
            Tier definitions, routing recipes, and a monitor catalog reconciled
            against what was actually live — the existing catalog had drifted,
            including a stale priority split in the onboarding checklist.
            Delivery was verified with a controlled alert rather than assumed
            from configuration.
          </>
        ),
      },
      {
        date: "Aug 7 & 13 · docs as the propagation mechanism",
        label: (
          <>
            Two reconciliation passes after live changes{" "}
            {prRef("#1179", PR("sensors", 1179))},{" "}
            {prRef("#1211", PR("sensors", 1211))}
          </>
        ),
        body: (
          <>
            The second pass closed a real gap: two "healthy silent" monitors
            still had a bare production channel handle sitting outside their
            routing condition, so if either ever fired on a staging group the
            noise would land right back in the incident channel. Because these
            monitors aren't managed as code, the document is what the next
            person edits from — merging a doc that claims a staging route while
            live configuration says otherwise is precisely how the following
            change goes wrong.
          </>
        ),
      },
      {
        date: "Aug 17–27 · the same discipline, applied again",
        label: (
          <>
            Four new monitors for the self-heal path{" "}
            {prRef("#1263", PR("sensors", 1263))}
          </>
        ),
        body: (
          <>
            The org-directory self-heal work got monitors under the same
            taxonomy, including one rated P1 specifically because it would
            indicate a cross-tenant resolution. They're configured to not treat
            absent data as a failure, since no data is the expected state until
            the feature is switched on — and after review one alert's wording
            was corrected because it implied a customer-facing rejection that
            doesn't actually occur.
          </>
        ),
      },
    ],
    metricFlow: case7MetricFlow,
    result: (
      <>
        <b>Result:</b> staging noise rerouted out of the production incident
        channel against a ≥60% target, with an explicit criterion holding
        production coverage flat — and a written taxonomy that stays reconciled
        with live configuration, because for these monitors the document is the
        only source of truth there is.
      </>
    ),
  },
];

const baseThemes: Omit<ThemeSection, "impact">[] = [
  {
    id: "mcp-integration",
    matrixLabel: "MCP / agent integration",
    title: "MCP / agent integration (sensors-api ↔ agents)",
    primary: "team-of-doers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 0,
      "team-of-doers": 3,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            Two separately-owned systems — agents and sensors — were
            coordinated to act as one. No single team could have shipped this
            end to end on its own.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            It wires sensors data into the agent product partners use, and
            hardens MCP payloads that carry unvalidated Sensors API content
            back to the LLM.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            The rollout was toggle-gated, so the new MCP surface could ship
            dark and be enabled deliberately.
          </>
        ),
      },
    ],
    description: (
      <>
        Wiring sensors-api into the MCP surface used by agents: forwarding
        org/brand/version context through headers, then completing the
        coverage CRUD + provenance envelope, toggle-gated rollout, and
        hardening MCP response payloads that carry unvalidated Sensors API
        content back to the LLM. Extended in PI-8181, which took the
        edit-impact preview built in the API and exposed it as a read tool on
        the shim ({prRef("#1117", PR("pi-toolsmith", 1117))}) wired through to
        the workflow builder ({prRef("#2623", PR("agents", 2623))}) — three
        repos for one capability.
      </>
    ),
    plainSummary: (
      <>
        Our AI agent product and our sensors product are owned by different
        teams and built as separate systems, but need to talk to each other
        reliably. This is the cross-team plumbing work — passing the right
        context between the two systems — so the agents team can build on
        sensors data without either team having to work around the other.
      </>
    ),
    prTable: [
      {
        repo: "agents",
        number: 2528,
        url: PR("agents", 2528),
        title: "[PI-7507] Workflow-builder assignability for sensors-api MCP",
        status: "unmerged",
        added: 142,
        removed: 19,
        opened: "Jul 16",
      },
      {
        repo: "pi-toolsmith",
        number: 1117,
        url: PR("pi-toolsmith", 1117),
        title:
          "[PI-8181] Add get_sensor_version_edit_impact read tool to sensors-api shim",
        status: "merged",
        added: 103,
        removed: 5,
        opened: "Jul 30",
      },
      {
        repo: "agents",
        number: 2623,
        url: PR("agents", 2623),
        title: "[PI-8181] Wire edit-impact preview into sensor-workflow-builder",
        status: "merged",
        added: 61,
        removed: 4,
        opened: "Jul 30",
      },
      {
        repo: "pi-toolsmith",
        number: 1044,
        url: PR("pi-toolsmith", 1044),
        title: "[PI-7507] Sensors API MCP completion — coverage tools + provenance envelope",
        status: "merged",
        added: 644,
        removed: 167,
        opened: "Jul 15",
      },
      {
        repo: "pi-toolsmith",
        number: 1048,
        url: PR("pi-toolsmith", 1048),
        title: "[PI-7507] Bump sensors-api shim to 1.0.1 for deploy",
        status: "merged",
        added: 3,
        removed: 3,
        opened: "Jul 16",
      },
      {
        repo: "pi-toolsmith",
        number: 766,
        url: PR("pi-toolsmith", 766),
        title: "feat(sensors): read org/brand/version from MCP request headers (PI-7357)",
        status: "merged",
        added: 272,
        removed: 107,
        opened: "Jun 3",
      },
      {
        repo: "agents",
        number: 2104,
        url: PR("agents", 2104),
        title: "feat(sensors): emit X-Org-Brand-Id and X-Sensor-Version-Id MCP headers (PI-7357)",
        status: "merged",
        added: 97,
        removed: 1,
        opened: "Jun 2",
      },
      {
        repo: "agents",
        number: 2105,
        url: PR("agents", 2105),
        title: "refactor(sensors): remove injectSensorContext (PI-7357, agents PR-2)",
        status: "unmerged",
        added: 5,
        removed: 318,
        opened: "Jun 2",
      },
      {
        repo: "agents",
        number: 2387,
        url: PR("agents", 2387),
        title: "feat(pi): toggle-gated sensors-api MCP wiring for PI-7507",
        status: "merged",
        added: 57,
        removed: 2,
        opened: "Jul 2",
      },
      {
        repo: "pi-toolsmith",
        number: 951,
        url: PR("pi-toolsmith", 951),
        title: "feat(sensors-api): PI-7507 completion — coverage CRUD/history + provenance envelope",
        status: "merged",
        added: 601,
        removed: 111,
        opened: "Jun 30",
      },
      {
        repo: "pi-toolsmith",
        number: 958,
        url: PR("pi-toolsmith", 958),
        title: "fix(sensors-shim): forward user bearer for lineage-enforced routes",
        status: "merged",
        added: 336,
        removed: 243,
        opened: "Jul 1",
      },
    ],
  },
  {
    id: "source-app-lineage",
    matrixLabel: "source-app lineage & typing",
    title: "Source-app lineage & resource-context typing",
    primary: "team-of-doers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 2,
      "team-of-doers": 3,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            One change landed across three team-owned codebases — sensors,
            agents, and data-airflow — together, rather than three separate
            uncoordinated changes.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 2,
        line: (
          <>
            It promotes JSONB payload fields to typed columns so eval data is
            directly queryable and every automated action traces to its source.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            It closes a gap where an automated action's origin could otherwise
            be lost between systems — and the rollout review found a route that
            granted access when a caller <em>omitted</em> the org and denied it
            when they supplied one, which is exactly backwards.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            Under-tagged data now poisons the derived permission set rather than
            vanishing from it, so having fewer tags can never mean having{" "}
            <em>more</em> access.
          </>
        ),
      },
    ],
    description: (
      <>
        Tier-1 lineage enforcement at the agents invocation boundary, plus
        promoting resource_context payload fields to typed columns across
        sensors and data-airflow. The August rollout ({prRef("#1152", PR("sensors", 1152))},{" "}
        {prRef("#1229", PR("sensors", 1229))}) landed the enforcement code and
        infrastructure wiring with the flag deliberately off in every
        environment, then closed the holes a review found before they could ship
        behind it: a results route that failed <em>open</em> when the org was
        omitted, under-tagged sources silently widening access rather than
        narrowing it, and an auto-sync path that would have overwritten manual
        database overrides. The readiness gate fails closed if any metric is
        untagged, and production stays bastion-only rather than dispatchable
        from CI.
      </>
    ),
    plainSummary: (
      <>
        Coordinated a change across three separate codebases, owned by
        different teams, so every automated action can be traced back to
        which system originally requested it — closing a gap where that
        traceability could otherwise get lost between teams.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 1057,
        url: PR("sensors", 1057),
        title: "PI-6649: source-app lineage and Tier 1 enforcement",
        status: "merged",
        added: 3652,
        removed: 75,
        opened: "Jun 29",
      },
      {
        repo: "agents",
        number: 2355,
        url: PR("agents", 2355),
        title: "PI-6649: agents source-app gate at invocation entry",
        status: "unmerged",
        added: 364,
        removed: 6,
        opened: "Jun 29",
      },
      {
        repo: "sensors",
        number: 1016,
        url: PR("sensors", 1016),
        title: "Filter promoted resource_context columns with JSON fallback (PI-1725)",
        status: "merged",
        added: 108,
        removed: 58,
        opened: "Jun 10",
      },
      {
        repo: "data-airflow",
        number: 3873,
        url: PR("data-airflow", 3873),
        title: "Promote resource_context fields to typed columns on sensor eval tables (PI-1725)",
        status: "unmerged",
        added: 600,
        removed: 184,
        opened: "Jun 10",
      },
      {
        repo: "pattern-exp",
        number: 16924,
        url: PR("pattern-exp", 16924),
        title: "PI-6649: forward effective_app_codes to agents recommendation context",
        status: "unmerged",
        added: 14,
        removed: 0,
        opened: "Jun 29",
      },
      {
        repo: "sensors",
        number: 1152,
        url: PR("sensors", 1152),
        title: "[PI-6649] Source-app enforcement rollout — part 1 (S1 + S3)",
        status: "merged",
        added: 467,
        removed: 143,
        opened: "Aug 3",
      },
      {
        repo: "sensors",
        number: 1229,
        url: PR("sensors", 1229),
        title: "[PI-6649] Source-app enforcement rollout — part 2",
        status: "merged",
        added: 693,
        removed: 310,
        opened: "Aug 18",
      },
    ],
  },
  {
    id: "recommendation-gate",
    matrixLabel: "recommendation access gate",
    title: "Pattern-user gating for recommendations",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 0,
      "team-of-doers": 2,
      "game-changers": 0,
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            This gate exists solely to keep a capability partner brands pay for
            from leaking to users it wasn't built for — long-term value for
            partners over short-term convenience.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            It's a two-part gate split across the sensors-api route layer and
            the agents invocation layer — one guarantee held across two systems.
          </>
        ),
      },
    ],
    description: (
      <>
        A two-part gate restricting recommendation surfaces to Pattern
        users, split across the sensors-api route layer and the agents
        invocation layer.
      </>
    ),
    plainSummary: (
      <>
        Recommendations are a premium capability for the brands we work
        with. I built the access gate — across two separate systems — that
        makes sure only the right users can see them, protecting that
        feature's value for the partners it's meant for.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 972,
        url: PR("sensors", 972),
        title: "[PI-6784] SENSORS — Lock recommendations to Pattern users (Part 1/2: sensors-api gate)",
        status: "unmerged",
        added: 553,
        removed: 91,
        opened: "May 19",
      },
      {
        repo: "sensors",
        number: 974,
        url: PR("sensors", 974),
        title: "feat(sensors-api): Pattern-user gate on /recommendations* routes (PI-6784)",
        status: "merged",
        added: 788,
        removed: 5,
        opened: "May 20",
      },
      {
        repo: "agents",
        number: 1986,
        url: PR("agents", 1986),
        title: "feat(agents): Pattern-user gate for recommendation surfaces (PI-6784, part 2/2)",
        status: "unmerged",
        added: 1577,
        removed: 7,
        opened: "May 20",
      },
    ],
  },
  {
    id: "feature-api",
    matrixLabel: "feature, API & sensor chaining",
    title: "Feature, API & sensor-chaining work",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 2,
      "team-of-doers": 1,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            This is the day-to-day product partner brands actually touch —
            transactional handlers so a failure can't leave changes half-done,
            audit history, and an API that degrades gracefully under load
            instead of failing outright.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 2,
        line: (
          <>
            The new chain-create validation and <code>input_sensors</code>{" "}
            derivation guard the integrity of the sensor-chaining data model
            partners build on.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            I bounded a runaway Trino <code>COUNT(*)</code> so the endpoint
            degrades to <code>total: null</code> instead of 503ing the whole
            response.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            The <code>input_sensors</code> contract was coordinated with the
            workflow and agent consumers that read it.
          </>
        ),
      },
    ],
    description: (
      <>
        Product-facing sensors-api features: transactional handlers, audit
        history, dependency-derived sources, cascading PATCH updates, DRAFT-state
        promotion, and the sensor-chaining <code>input_sensors</code> contract
        (PI-8003 → 8006). One worth calling out is{" "}
        {prRef("#1026", PR("sensors", 1026))}: prod test failures showed{" "}
        <code>GET/POST /api/agents/sensor_analysis</code> returning a 503 at
        ~30s. The cause was an API Gateway 30s integration timeout racing an
        unbounded Trino <code>COUNT(*)</code> that had a 120s app budget —
        the app had headroom the edge didn't. I bounded the request to 21s
        with abort propagation, returned <code>total: null</code> when the
        count can't finish rather than 503ing the whole response, and cached
        the windowed count for 300s to keep the deploy-gate path warm.
        Manually exercising the DRAFT-promotion fix from {prRef("#1064", PR("sensors", 1064))}{" "}
        turned up a design gap since fixed in{" "}
        {prRef("#1094", PR("sensors", 1094))}: promoting a draft archives the
        previously-live version, which the dependency guard then blocked
        whenever that version was still referenced — now resolved and merged.
        The chaining model then grew a read-before-write half (PI-8007 → 8009):
        legacy cascade propagation retired behind a flag so editing a sensor no
        longer silently mints downstream versions ({prRef("#1120", PR("sensors", 1120))}),
        an endpoint that previews which downstream sensors an edit would affect
        ({prRef("#1125", PR("sensors", 1125))}), and a publish confirmation gate
        that ships dark ({prRef("#1146", PR("sensors", 1146))}). #1120 also
        carries a self-caught bug: the impact walk was rooted at the incoming
        draft rather than the version being replaced, so pinned dependents were
        silently under-reported on promotion.
      </>
    ),
    plainSummary: (
      <>
        The day-to-day features and reliability fixes that partner brands
        actually touch: safer database updates so a failure can't leave
        changes half-done, an audit trail so changes are traceable, a fix
        for an API that was timing out under load, and the new "sensor
        chaining" data model that lets one sensor feed another.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 962,
        url: PR("sensors", 962),
        title: "Wrap update/patch handlers in DB transactions",
        status: "merged",
        added: 685,
        removed: 441,
        opened: "May 12",
      },
      {
        repo: "sensors",
        number: 1025,
        url: PR("sensors", 1025),
        title: "feat(sensors-api): PI-7627 resolution preview — winning_scope, 404, org-scoped reads",
        status: "merged",
        added: 350,
        removed: 16,
        opened: "Jun 17",
      },
      {
        repo: "sensors",
        number: 1026,
        url: PR("sensors", 1026),
        title: "fix(sensors-api): prevent sensor_analysis 503s from slow Trino COUNT",
        status: "merged",
        added: 794,
        removed: 62,
        opened: "Jun 17",
      },
      {
        repo: "sensors",
        number: 1027,
        url: PR("sensors", 1027),
        title: "PI-7535 + PI-7628: variable audit history and org-scoped routing",
        status: "merged",
        added: 4723,
        removed: 535,
        opened: "Jun 17",
      },
      {
        repo: "sensors",
        number: 1046,
        url: PR("sensors", 1046),
        title: "feat(sensors-api): cascade downstream sensor versions on PATCH (PI-5884)",
        status: "merged",
        added: 2334,
        removed: 173,
        opened: "Jun 23",
      },
      {
        repo: "sensors",
        number: 1064,
        url: PR("sensors", 1064),
        title: "fix(sensors-api): promote pending DRAFT on visibility (PI-7857)",
        status: "merged",
        added: 485,
        removed: 15,
        opened: "Jul 1",
      },
      {
        repo: "sensors",
        number: 1094,
        url: PR("sensors", 1094),
        title: "[PI-7863] Fix draft promotion visibility cascade",
        status: "merged",
        added: 449,
        removed: 35,
        opened: "Jul 15",
      },
      {
        repo: "sensors",
        number: 1102,
        url: PR("sensors", 1102),
        title: "[PI-8003] Add evaluation_spec.input_sensors API contract",
        status: "merged",
        added: 1349,
        removed: 136,
        opened: "Jul 17",
      },
      {
        repo: "sensors",
        number: 1114,
        url: PR("sensors", 1114),
        title: "[PI-8005] Chain-create validation: DB-resolved input_sensors guards",
        status: "merged",
        added: 2038,
        removed: 68,
        opened: "Jul 21",
      },
      {
        repo: "sensors",
        number: 1116,
        url: PR("sensors", 1116),
        title: "[PI-8004] Derive SENSOR deps and sources from input_sensors",
        status: "merged",
        added: 475,
        removed: 279,
        opened: "Jul 22",
      },
      {
        repo: "sensors",
        number: 1119,
        url: PR("sensors", 1119),
        title: "[PI-8006] Suppress action queueing for non-current pinned sensor versions",
        status: "merged",
        added: 284,
        removed: 21,
        opened: "Jul 22",
      },
      {
        repo: "sensors",
        number: 1003,
        url: PR("sensors", 1003),
        title: "feat(sensors): collapse to single payload column (PI-7440 Phase A)",
        status: "merged",
        added: 106,
        removed: 213,
        opened: "Jun 5",
      },
      {
        repo: "sensors",
        number: 1120,
        url: PR("sensors", 1120),
        title: "[PI-8007] Retire cascade propagation for follow-current mode",
        status: "merged",
        added: 1157,
        removed: 20,
        opened: "Jul 23",
      },
      {
        repo: "sensors",
        number: 1125,
        url: PR("sensors", 1125),
        title: "[PI-8008] Edit-impact preview endpoint (C1)",
        status: "merged",
        added: 806,
        removed: 14,
        opened: "Jul 27",
      },
      {
        repo: "sensors",
        number: 1127,
        url: PR("sensors", 1127),
        title: "[PI-8007] Fix JSONC format gate blocking deploy checks",
        status: "merged",
        added: 144,
        removed: 142,
        opened: "Jul 27",
      },
      {
        repo: "sensors",
        number: 1146,
        url: PR("sensors", 1146),
        title: "[PI-8009] Edit-impact publish confirmation gate",
        status: "merged",
        added: 2094,
        removed: 130,
        opened: "Jul 30",
      },
    ],
  },
  {
    id: "infra-runtime",
    matrixLabel: "infra, runtime & decommissioning",
    title: "Infra, runtime & decommissioning",
    primary: "game-changers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 1,
      "team-of-doers": 1,
      "game-changers": 3,
    },
    valueLines: [
      {
        value: "game-changers",
        score: 3,
        line: (
          <>
            Retiring legacy password auth and dead code before they cause an
            incident is choosing to challenge "it's always worked this way"
            ahead of being forced to.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            Graceful shutdown and scale-in protection keep in-flight partner
            work from being dropped when workers deploy or scale down.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 1,
        line: (
          <>
            The sensors-ui CORS decommission was coordinated with its
            downstream consumers rather than pulled unilaterally.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: (
          <>
            The Terraform resilience fix was written against a counted failure —
            four <code>init</code> failures in one day from an upstream outage —
            not a hypothetical.
          </>
        ),
      },
    ],
    description: (
      <>
        ECS/container lifecycle hardening (graceful shutdown, scale-in
        protection), the RDS Proxy IAM auth groundwork that PI-8168/8174 later
        rolled out, and sensors-ui CORS decommissioning. August added
        process-level crash handling to sensors-api (
        {prRef("#1209", PR("sensors", 1209))}) — it was the only service in the
        repo without it while all three engine workers had it — installed{" "}
        <em>before</em> the app module is imported so it also covers failures
        during module evaluation, with rejections logged-and-continued rather
        than fatal because an HTTP service is not a worker. And after an
        upstream GitHub outage failed <code>terraform init</code> four times in
        one day and hard-blocked production deploys,{" "}
        {prRef("#1227", PR("sensors", 1227))} dropped an unused provider, warmed
        a plugin cache, and made init retry.
      </>
    ),
    plainSummary: (
      <>
        Modernized how our systems authenticate to databases — moving off
        long-lived passwords toward short-lived, automatically-rotated
        credentials — hardened how workers shut down so in-flight work isn't
        dropped, and retired old rules and code paths nobody used anymore.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 989,
        url: PR("sensors", 989),
        title: 'Revert "feat(sensors-engine): bundle smoke test in worker docker builds (PI-7340)"',
        status: "merged",
        added: 0,
        removed: 40,
        opened: "May 28",
      },
      {
        repo: "sensors",
        number: 990,
        url: PR("sensors", 990),
        title: "Update Dockerfile to set NODE_ENV to production",
        status: "merged",
        added: 2,
        removed: 2,
        opened: "May 28",
      },
      {
        repo: "sensors",
        number: 1015,
        url: PR("sensors", 1015),
        title: "feat(actions-processor): port graceful shutdown + ECS scale-in protection (PI-7329)",
        status: "merged",
        added: 746,
        removed: 43,
        opened: "Jun 10",
      },
      {
        repo: "sensors",
        number: 1018,
        url: PR("sensors", 1018),
        title: "feat(db): RDS Proxy IAM auth + real SSL wiring — Code PR (PI-1430)",
        status: "merged",
        added: 820,
        removed: 333,
        opened: "Jun 11",
      },
      {
        repo: "sensors",
        number: 1019,
        url: PR("sensors", 1019),
        title: "feat(infra): RDS Proxy IAM auth resources (PI-1430)",
        status: "merged",
        added: 131,
        removed: 2,
        opened: "Jun 11",
      },
      {
        repo: "sensors",
        number: 1086,
        url: PR("sensors", 1086),
        title: "PI-7915: Remove sensors-ui CORS origins + decommission docs",
        status: "merged",
        added: 23,
        removed: 16,
        opened: "Jul 9",
      },
      {
        repo: "sensors",
        number: 1045,
        url: PR("sensors", 1045),
        title: "fix(sensors-engine): re-add worker Docker smoke test with import-time-safe config (PI-7353)",
        status: "merged",
        added: 28,
        removed: 14,
        opened: "Jun 23",
      },
      {
        repo: "sensors",
        number: 1144,
        url: PR("sensors", 1144),
        title: "[PI-8175] Harden auth event writes and cache partition checks",
        status: "merged",
        added: 416,
        removed: 43,
        opened: "Jul 30",
      },
      {
        repo: "sensors",
        number: 1176,
        url: PR("sensors", 1176),
        title: "terraform(sensors-engine): raise staging Aurora max ACU to ~24GB",
        status: "merged",
        added: 1,
        removed: 1,
        opened: "Aug 6",
      },
      {
        repo: "sensors",
        number: 1209,
        url: PR("sensors", 1209),
        title: "[PI-8770] Process-level handlers + RequestLogger/RateLimiter hardening",
        status: "merged",
        added: 406,
        removed: 103,
        opened: "Aug 13",
      },
      {
        repo: "sensors",
        number: 1227,
        url: PR("sensors", 1227),
        title: "[PI-8871] Make terraform init survive GitHub release-hosting outages",
        status: "merged",
        added: 72,
        removed: 40,
        opened: "Aug 18",
      },
    ],
  },
  {
    id: "contract-safety",
    matrixLabel: "API contract safety net",
    title: "An API contract safety net, and retiring the old auth surface",
    primary: "team-of-doers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 1,
      "team-of-doers": 3,
      "game-changers": 2,
    },
    valueLines: [
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            The whole point is other teams: sensors-api is consumed by{" "}
            <code>pattern-exp</code>, <code>agents</code>, and{" "}
            <code>pi-toolsmith</code>, and a "safe" response change can break a
            consumer that parses it strictly. The runbook names which consumers
            break and how to check, rather than leaving each author to find out
            after merge.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            A silent contract break in a shared API surfaces to partners as a
            broken product page, not as a failing test.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            Rather than leave a retired authentication surface sitting in the
            codebase, I deleted it — including a hardcoded fallback secret path
            — and then chased down the last callers and the operator docs still
            telling people to use it.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: (
          <>
            The snapshot gate states its coverage as a measured number — 100% of
            routes enumerated, but name-level fidelity only where middleware is
            named — instead of claiming it proves more than it does.
          </>
        ),
      },
    ],
    description: (
      <>
        A provider-side regression net for the API contract (PI-8701) plus the
        runbook that explains how to classify a contract change before merging
        it (PI-8702). The harness ({prRef("#1165", PR("sensors", 1165))}) and
        the phase-1 goldens ({prRef("#1174", PR("sensors", 1174))}) snapshot
        real response envelopes with tenant data pseudonymized and credentials
        masked, enforced in CI with no soft bypass. What makes it trustworthy is
        what it refuses to claim: it covers the controller seam only, and the
        PR says so in a section headed "explicit non-claims" — no consumer
        parseability, no auth-scoping coverage, no query construction. Along the
        way the retired symmetric-JWT surface and its fallback-secret path came
        out entirely ({prRef("#1158", PR("sensors", 1158))}), then the last live
        caller of the retired Auth0 token endpoint (
        {prRef("#1204", PR("sensors", 1204))}) — which would have taken a{" "}
        <code>410</code> the moment a flag flipped — followed by the operator
        guides still walking people through it (
        {prRef("#1259", PR("sensors", 1259))}). The runbook fix worth noting:
        the on-call triage table routed on an error string the workflow no
        longer emits, and sent whoever was paged to go investigate an Auth0
        outage that could not happen anymore.
      </>
    ),
    plainSummary: (
      <>
        Several other teams build on top of our API, and a small change to a
        response can quietly break their code without breaking any of our tests.
        I built an automated net that records what our API actually returns and
        fails the build when that changes unexpectedly, plus a guide for
        deciding whether a change is safe and which teams to check with. I also
        removed an old, retired login mechanism that was still sitting in the
        code, and fixed the on-call instructions that were sending people to
        investigate a system we no longer use.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 1158,
        url: PR("sensors", 1158),
        title: "[PI-8701] Remove retired symmetric JWT surface",
        status: "merged",
        added: 37,
        removed: 661,
        opened: "Aug 5",
      },
      {
        repo: "sensors",
        number: 1159,
        url: PR("sensors", 1159),
        title: "[PI-8702] Add breaking API change runbook for sensors-api",
        status: "merged",
        added: 203,
        removed: 11,
        opened: "Aug 5",
      },
      {
        repo: "sensors",
        number: 1165,
        url: PR("sensors", 1165),
        title: "[PI-8701] Add response-snapshot harness foundation",
        status: "merged",
        added: 935,
        removed: 8,
        opened: "Aug 5",
      },
      {
        repo: "sensors",
        number: 1174,
        url: PR("sensors", 1174),
        title: "[PI-8701] Land phase-1 response-snapshot goldens",
        status: "merged",
        added: 3913,
        removed: 117,
        opened: "Aug 6",
      },
      {
        repo: "sensors",
        number: 1204,
        url: PR("sensors", 1204),
        title: "[PI-8701] Retire the last Auth0 M2M callers from CI tooling and docs",
        status: "merged",
        added: 132,
        removed: 215,
        opened: "Aug 11",
      },
      {
        repo: "sensors",
        number: 1237,
        url: PR("sensors", 1237),
        title: "[PI-8600] Validate org_id on /sensor_analysis query params",
        status: "merged",
        added: 140,
        removed: 38,
        opened: "Aug 20",
      },
      {
        repo: "sensors",
        number: 1239,
        url: PR("sensors", 1239),
        title:
          "[PI-8600] Regenerate route-inventory golden for named validateQuery middleware",
        status: "merged",
        added: 26,
        removed: 24,
        opened: "Aug 21",
      },
      {
        repo: "sensors",
        number: 1259,
        url: PR("sensors", 1259),
        title: "[PI-8701] Replace retired Auth0 M2M minting in operator guides",
        status: "merged",
        added: 75,
        removed: 107,
        opened: "Aug 27",
      },
      {
        repo: "sensors",
        number: 1222,
        url: PR("sensors", 1222),
        title: "[PI-8176] Roll out sensors-api auth matrix (stage)",
        status: "merged",
        added: 279,
        removed: 44,
        opened: "Aug 17",
      },
      {
        repo: "sensors",
        number: 1226,
        url: PR("sensors", 1226),
        title:
          "ci(sensors-api): mint the auth-matrix token and stop swallowing its exit code (PI-8176)",
        status: "unmerged",
        added: 47,
        removed: 32,
        opened: "Aug 18",
      },
      {
        repo: "sensors",
        number: 1258,
        url: PR("sensors", 1258),
        title: "[PI-8176] Fail closed if auth-matrix token export is empty",
        status: "open",
        added: 32,
        removed: 16,
        opened: "Aug 27",
      },
      {
        repo: "sensors",
        number: 1261,
        url: PR("sensors", 1261),
        title: "[PI-8176] Skip auth-matrix correct case for sensor config export",
        status: "open",
        added: 15,
        removed: 5,
        opened: "Aug 27",
      },
    ],
  },
  {
    id: "visibility-seam",
    matrixLabel: "sensor visibility & coverage scoping",
    title: "Sensor visibility seam & coverage defaults",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 1,
      "team-of-doers": 2,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            This is the second tenancy axis, underneath org access: which
            sensors a given caller is even allowed to <em>see</em>. New sensors
            now default to the narrow setting, so the safe state is the default
            rather than something someone has to remember to choose.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            A machine-enforced census keeps every future reader honest: a new
            query that reads sensors has to declare whether it's request-scoped
            or a system walk, so the next person can't accidentally widen access
            by writing ordinary code.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: (
          <>
            Correctness was verified against generated SQL baselines rather than
            by reading the code and trusting it.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            The entire seam shipped as a deliberate no-op first — every read path
            declares who is asking while the filter still returns nothing — so
            the risky part became one switch rather than one large change.
          </>
        ),
      },
    ],
    description: (
      <>
        PI-8010 threads a visibility scope through every security-relevant
        sensor read, in three stacked PRs that each ship no behavior change:
        the seam and killswitch first ({prRef("#1150", PR("sensors", 1150))}),
        then the four read families and chain-create validation (
        {prRef("#1156", PR("sensors", 1156))}), then the sweep that classified
        the remaining readers and closed a real hole — a guessable version
        identifier could bypass parent gating, because the guard only watched
        the sensors table and not the versions table (
        {prRef("#1194", PR("sensors", 1194))}). Write and evaluation paths are
        exempted through named intent wrappers instead of inline escapes, and an
        allowlist that can only shrink keeps the exemption list from growing
        quietly. PI-8848 ({prRef("#1234", PR("sensors", 1234))},{" "}
        {prRef("#1268", PR("sensors", 1268))}) flips the default for new sensors
        to the narrow coverage mode and refuses to guess: a resource type whose
        org can't be derived returns an explicit error rather than silently
        widening.
      </>
    ),
    plainSummary: (
      <>
        Beyond keeping brands' data separate, there's a second question: which
        sensors a given user should be able to see at all. I ran a wire through
        every place the system reads sensor data so each one has to state who is
        asking — shipped inert first, so turning it on later is a single switch
        rather than a risky rewrite. I also changed the default for newly
        created sensors to the more private setting, so the safe option is what
        you get without having to know to ask for it.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 1150,
        url: PR("sensors", 1150),
        title: "[PI-8010] Sensor visibility seam foundation (PR-1 part A)",
        status: "merged",
        added: 382,
        removed: 3,
        opened: "Jul 31",
      },
      {
        repo: "sensors",
        number: 1156,
        url: PR("sensors", 1156),
        title: "[PI-8010] Thread sensor visibility scope through read paths",
        status: "merged",
        added: 1062,
        removed: 214,
        opened: "Aug 5",
      },
      {
        repo: "sensors",
        number: 1194,
        url: PR("sensors", 1194),
        title: "[PI-8010] Complete sensor-read seam PR-2 sweep",
        status: "merged",
        added: 1243,
        removed: 490,
        opened: "Aug 10",
      },
      {
        repo: "sensors",
        number: 1234,
        url: PR("sensors", 1234),
        title: "[PI-8848] Default new sensors to opt-in coverage",
        status: "merged",
        added: 1643,
        removed: 177,
        opened: "Aug 19",
      },
      {
        repo: "sensors",
        number: 1268,
        url: PR("sensors", 1268),
        title: "[PI-8848] Tighten opt-in stamp org and M2M coverage access",
        status: "open",
        added: 277,
        removed: 57,
        opened: "Aug 28",
      },
    ],
  },
  {
    id: "metrics-catalog",
    matrixLabel: "fact-table catalog & Metrics page",
    title: "A Metrics page that shows the data you can't currently see",
    primary: "data-fanatics",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 2,
      "game-changers": 1,
    },
    valueLines: [
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            The gap it closes is a pure legibility gap: the old endpoint only
            showed columns already registered, so the columns a builder is
            actually hunting for — the unregistered ones — were the exact ones
            it could never show. Making the warehouse's real shape visible is
            what lets anyone build from data instead of from memory.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            It's a product surface people use to build the automations partner
            brands run on, with data freshness shown honestly — tables missing
            upstream say so and sort last rather than rendering as healthy.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            Backend contract and UI landed the same day across two repos, and a
            shared helper was <em>moved</em> rather than copied so the permanent
            surface has exactly one owner.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            Read-only with no exceptions: the write actions are omitted
            entirely, not rendered and disabled, so the page can't imply a
            capability it doesn't have.
          </>
        ),
      },
    ],
    description: (
      <>
        A full-stack read-only Metrics page: the fact-table catalog contract in{" "}
        <code>sensors-api</code> ({prRef("#1238", PR("sensors", 1238))}) and the
        two-lens UI in <code>sensors-workflow-builder</code> (
        {prRef("#50", PR("sensors-workflow-builder", 50))}) — by table and by
        metric, over the same data. Each honesty-critical mapping is a pure,
        separately tested function, and where a heuristic is used the real
        underlying type is carried alongside it rather than hidden. Freshness is
        sourced from the pipeline's own health table with amber and red
        thresholds. The usage count is table-grain and the PR says so plainly
        instead of implying per-metric precision it doesn't have. The UI is
        gated behind a toggle that fails closed — a missing provider, a failed
        fetch, or a missing key all keep it restricted.
      </>
    ),
    plainSummary: (
      <>
        People building automations needed to know what data columns exist and
        which are usable, but the only tool available showed them just the
        columns already set up — never the ones they were looking for. I built
        the page that shows the real picture, front to back across two
        codebases, including how fresh each data source actually is. It's
        deliberately read-only, and where a value is an educated guess the page
        shows the underlying truth next to it rather than hiding it.
      </>
    ),
    prTable: [
      {
        repo: "sensors",
        number: 1238,
        url: PR("sensors", 1238),
        title: "[PI-8926] Fact-table catalog API for the Metrics page",
        status: "merged",
        added: 3316,
        removed: 95,
        opened: "Aug 21",
      },
      {
        repo: "sensors-workflow-builder",
        number: 50,
        url: PR("sensors-workflow-builder", 50),
        title: "[PI-8926] Read-only Metrics page (fact-table catalog UI)",
        status: "merged",
        added: 3869,
        removed: 15,
        opened: "Aug 21",
      },
    ],
  },
  {
    id: "consumer-smokes",
    matrixLabel: "consumer smokes (and reverting them)",
    title: "Consumer smoke tests — and deleting them when they weren't real",
    primary: "game-changers",
    scores: {
      "partner-obsession": 1,
      "data-fanatics": 1,
      "team-of-doers": 2,
      "game-changers": 3,
    },
    valueLines: [
      {
        value: "game-changers",
        score: 3,
        line: (
          <>
            Six weeks of my own work went back out of the main branch in one PR.
            The merged files <em>looked</em> like a finished suite; the two spec
            files asserted nothing and one helper had no caller at all. A
            half-built safety net that reads as finished is worse than no net,
            so I removed it and restarted rather than let the next person
            inherit it.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            This is detection for a UI owned by another team against an API
            owned by mine — deliberately positioned as complementary to the
            provider-side goldens rather than duplicating them, and explicitly
            not a merge gate on anyone else's repo.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 1,
        line: (
          <>
            The failures it's meant to catch are the ones that reach a user as a
            blank page rather than as an error anyone gets paged for.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: (
          <>
            The restart classifies a red run by fault domain, so a failure names{" "}
            <code>sensors-api</code>, <code>pi</code>, <code>auth</code>, or{" "}
            <code>infra</code> instead of "something is red."
          </>
        ),
      },
    ],
    description: (
      <>
        End-to-end detection for the automations UI in <code>pattern-exp</code>:
        redesign-survivable test identifiers and a dual-authentication test
        graph ({prRef("#18489", PR("pattern-exp", 18489))}), Slack routing that
        distinguishes a login failure from a real regression (
        {prRef("#18664", PR("pattern-exp", 18664))}), and a liveness probe run
        first to confirm the alert channel worked at all before wiring anything
        to it ({prRef("#18614", PR("pattern-exp", 18614))}). Then{" "}
        {prRef("#18751", PR("pattern-exp", 18751))} reverted all of it. The
        restart ({prRef("#19486", PR("pattern-exp", 19486))}) replaces an
        expired schedule with one tagged suite whose alerting surface is
        narrow on purpose — three endpoints can raise Slack, seventeen demo
        tests run quarantined and never page — and it states up front the
        problem it will <em>not</em> solve: the near-daily failure that
        dominates the channel comes from an unrelated cause and is deliberately
        excluded rather than papered over.
      </>
    ),
    plainSummary: (
      <>
        I built automated tests that use the product the way a person does, to
        catch the kind of breakage that shows up as a blank screen rather than
        an error. Partway through I concluded the work wasn't good enough — the
        files looked like a finished test suite but the tests didn't actually
        check anything — so I deleted the whole thing from the main branch and
        started over. Leaving it in place would have given everyone false
        confidence that this was covered.
      </>
    ),
    prTable: [
      {
        repo: "pattern-exp",
        number: 18489,
        url: PR("pattern-exp", 18489),
        title: "[PI-8705] Automations smoke test-ids and dual-auth e2e graph",
        status: "merged",
        added: 626,
        removed: 135,
        opened: "Aug 7",
      },
      {
        repo: "pattern-exp",
        number: 18614,
        url: PR("pattern-exp", 18614),
        title: "[PI-8794] Critical-alerts webhook liveness probe (0h)",
        status: "merged",
        added: 27,
        removed: 0,
        opened: "Aug 11",
      },
      {
        repo: "pattern-exp",
        number: 18664,
        url: PR("pattern-exp", 18664),
        title: "[PI-8794] Route automations smoke failures to Slack",
        status: "merged",
        added: 231,
        removed: 4,
        opened: "Aug 12",
      },
      {
        repo: "pattern-exp",
        number: 18681,
        url: PR("pattern-exp", 18681),
        title: "[PI-8794] Fix automations results upload path + verify inputs",
        status: "unmerged",
        added: 56,
        removed: 7,
        opened: "Aug 12",
      },
      {
        repo: "pattern-exp",
        number: 18740,
        url: PR("pattern-exp", 18740),
        title: "[PI-8705] Add automations consumer smokes",
        status: "unmerged",
        added: 1008,
        removed: 129,
        opened: "Aug 13",
      },
      {
        repo: "pattern-exp",
        number: 18751,
        url: PR("pattern-exp", 18751),
        title: "[PI-8705] Revert the automations smoke suite and PI-8794 alerting",
        status: "merged",
        added: 135,
        removed: 852,
        opened: "Aug 13",
      },
      {
        repo: "pattern-exp",
        number: 19486,
        url: PR("pattern-exp", 19486),
        title: "[PI-8705] Consolidate PI scheduled smoke into one tagged suite",
        status: "open",
        added: 2217,
        removed: 217,
        opened: "Aug 27",
      },
    ],
  },
];

function withImpact<T extends { id: string }>(item: T) {
  const impact = existingImpact[item.id];
  if (!impact) throw new Error(`missing impact for ${item.id}`);
  return { ...item, impact };
}

export const cases: CaseStudy[] = baseCases.map(withImpact);
export const themes: ThemeSection[] = [...recentThemes, ...baseThemes.map(withImpact)];

/** The evaluation matrix, in the same order the detail cards appear. */
export const matrixRows: MatrixRow[] = [...cases, ...themes].map(
  (c: Scored & { id: string; matrixLabel: string; ticket?: string }) => ({
    id: c.id,
    label: c.matrixLabel,
    ticket: "ticket" in c ? (c as CaseStudy).ticket : undefined,
    scores: c.scores,
    primary: c.primary,
  })
);

/** Column order for the matrix and axis summaries — follows the four values as given. */
export const valueOrder: ValueId[] = [
  "partner-obsession",
  "data-fanatics",
  "team-of-doers",
  "game-changers",
];

/** Per-value roll-up derived from the matrix: weighted points and how many contributions touch each value. */
export const valueTally = valueOrder.map((id) => ({
  id,
  weighted: matrixRows.reduce((sum, r) => sum + r.scores[id], 0),
  touches: matrixRows.filter((r) => r.scores[id] > 0).length,
  primaries: matrixRows.filter((r) => r.primary === id).length,
}));

export const repoBreakdown: RepoBreakdownRow[] = [
  { repo: "sensors", total: 209, merged: 171, open: 13, closed: 25, added: 92494, removed: 12428 },
  { repo: "pattern-exp", total: 28, merged: 19, open: 1, closed: 8, added: 7575, removed: 1775 },
  { repo: "sensors-workflow-builder", total: 17, merged: 9, open: 4, closed: 4, added: 8476, removed: 254 },
  { repo: "agents", total: 8, merged: 3, open: 1, closed: 4, added: 2491, removed: 378 },
  { repo: "pi-toolsmith", total: 6, merged: 6, open: 0, closed: 0, added: 1959, removed: 636 },
  { repo: "white-glove", total: 5, merged: 3, open: 2, closed: 0, added: 762, removed: 24 },
  { repo: "data-airflow", total: 2, merged: 0, open: 1, closed: 1, added: 603, removed: 185 },
];
