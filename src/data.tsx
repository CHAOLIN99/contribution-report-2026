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
  { value: "79", label: "Total PRs" },
  { value: "60", label: "Merged" },
  { value: "9", label: "Still open" },
  { value: "10", label: "Closed, unmerged" },
  { value: "+47,183", label: "Lines added", variant: "add" },
  { value: "-9,414", label: "Lines removed", variant: "del" },
];

export const repoTally = [
  { repo: "sensors", count: 67 },
  { repo: "agents", count: 6 },
  { repo: "pi-toolsmith", count: 5 },
  { repo: "data-airflow", count: 1 },
];

export const statusBreakdown = [
  { label: pillLabel.merged, count: 60, variant: "merged" as const },
  { label: pillLabel.open, count: 9, variant: "open" as const },
  { label: pillLabel.unmerged, count: 10, variant: "unmerged" as const },
];

export const overviewBullets = [
  <>
    <b>Partner Obsession</b> — the widest axis: all nine work items score on it,
    because protecting partner brands' data, uptime, and product experience is
    the throughline. Strongest in the org/tenancy hardening and the
    recommendation access gate.
  </>,
  <>
    <b>Data Fanatics</b> — measuring before changing. Strongest in the two
    performance fixes, where the diagnosis came from a 39M-row usage audit and
    a read of the query planner's own cost — not a guess.
  </>,
  <>
    <b>Team of Doers</b> — following through across other teams' repos.
    Strongest in the MCP integration and source-app lineage, each landed across
    two-to-three team-owned codebases at once.
  </>,
  <>
    <b>Game Changers</b> — undoing sunk-cost work when the evidence says so.
    Strongest in the deploy gate (deleted ~1,000 lines mid-project) and
    retiring legacy DB auth before it caused an incident.
  </>,
];

/** Per-value roll-up derived from the matrix: weighted points and how many contributions touch each value. */
export const valueTally = [
  { id: "partner-obsession" as const, weighted: 20, touches: 9, primaries: 3 },
  { id: "data-fanatics" as const, weighted: 14, touches: 6, primaries: 2 },
  { id: "team-of-doers" as const, weighted: 15, touches: 9, primaries: 2 },
  { id: "game-changers" as const, weighted: 12, touches: 7, primaries: 2 },
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
    status: "open",
    added: 487,
    removed: 43,
    opened: "Jun 3",
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

export const cases: CaseStudy[] = [
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
        date: "May 18 – Jul 22 · ongoing hardening",
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
            {prRef("#1049", PR("sensors", 1049))}), and a recent fix to the
            staging gate's wildcard org-access handling on sensor-config
            routes ({prRef("#1115", PR("sensors", 1115))}).
          </>
        ),
      },
    ],
    metricFlow: case3MetricFlow,
    result: (
      <>
        <b>Result:</b> a stage→prod gate that blocks bad deploys on real
        endpoint coverage chosen from production traffic data — sitting
        deliberately behind Datadog instead of duplicating it.
      </>
    ),
  },
  {
    id: "org-access",
    navLabel: "Org access",
    matrixLabel: "org & tenancy access hardening",
    title: "Org & tenancy access hardening",
    ticket: "PI-6651 → PI-7873 / 7901 / 7920",
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
        score: 1,
        line: (
          <>
            Org scoping shipped flag-<em>independently</em>, so a user-token
            caller was protected even while the enforcement flag was still off.
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
    ],
    result: (
      <>
        <b>Result:</b> org-scoping closed across read and write paths with
        case-insensitive comparisons and documented M2M contracts — and
        because I watched the staged rollout rather than fire-and-forgetting
        it, the one regression got caught, root-caused, and fixed same-day.
        Both the staging and <em>production</em> enforcement flags are now
        live and stable.
      </>
    ),
    prTable: case4Prs,
  },
];

export const themes: ThemeSection[] = [
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
        content back to the LLM.
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
        status: "open",
        added: 142,
        removed: 19,
        opened: "Jul 16",
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
      "partner-obsession": 1,
      "data-fanatics": 2,
      "team-of-doers": 3,
      "game-changers": 0,
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
        score: 1,
        line: (
          <>
            It closes a gap where an automated action's origin could otherwise
            be lost between systems.
          </>
        ),
      },
    ],
    description: (
      <>
        Tier-1 lineage enforcement at the agents invocation boundary, plus
        promoting resource_context payload fields to typed columns across
        sensors and data-airflow.
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
        status: "open",
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
        status: "open",
        added: 1547,
        removed: 2220,
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
        status: "open",
        added: 284,
        removed: 21,
        opened: "Jul 22",
      },
      {
        repo: "sensors",
        number: 1003,
        url: PR("sensors", 1003),
        title: "feat(sensors): collapse to single payload column (PI-7440 Phase A)",
        status: "open",
        added: 106,
        removed: 208,
        opened: "Jun 5",
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
      "data-fanatics": 0,
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
    ],
    description: (
      <>
        ECS/container lifecycle hardening (graceful shutdown, scale-in
        protection), RDS Proxy IAM auth groundwork, and sensors-ui CORS
        decommissioning.
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
        status: "open",
        added: 895,
        removed: 368,
        opened: "Jun 11",
      },
      {
        repo: "sensors",
        number: 1019,
        url: PR("sensors", 1019),
        title: "feat(infra): RDS Proxy IAM auth resources (PI-1430)",
        status: "open",
        added: 183,
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
    ],
  },
];

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

export const repoBreakdown: RepoBreakdownRow[] = [
  { repo: "sensors", total: 67, merged: 53, open: 8, closed: 6, added: 42485, removed: 8246 },
  { repo: "agents", total: 6, merged: 2, open: 1, closed: 3, added: 2242, removed: 353 },
  { repo: "pi-toolsmith", total: 5, merged: 5, open: 0, closed: 0, added: 1856, removed: 631 },
  { repo: "data-airflow", total: 1, merged: 0, open: 0, closed: 1, added: 600, removed: 184 },
];
