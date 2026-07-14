import type {
  CaseStudy,
  MetricFlow,
  PrRow,
  RepoBreakdownRow,
  StatItem,
  ThemeSection,
} from "./types";

export const stats: StatItem[] = [
  { value: "67", label: "Total PRs" },
  { value: "47", label: "Merged" },
  { value: "11", label: "Still open" },
  { value: "9", label: "Closed, unmerged" },
  { value: "+40,910", label: "Lines added", variant: "add" },
  { value: "-6,882", label: "Lines removed", variant: "del" },
];

export const repoTally = [
  { repo: "sensors", count: 58 },
  { repo: "agents", count: 5 },
  { repo: "pi-toolsmith", count: 3 },
  { repo: "data-airflow", count: 1 },
];

export const overviewBullets = [
  <>
    <b>Partitioned a runaway Postgres table (PI-7372)</b> to stop it driving
    Aurora cost in staging and prod.
  </>,
  <>
    <b>Fixed a claim-path query regression</b> on that same table family —
    diagnosed from its <code>EXPLAIN</code> plan, not guesswork.
  </>,
  <>
    <b>Built a deploy-gate test suite from scratch</b>, then deleted a
    ~720-line home-grown monitor after a Datadog audit showed it was
    redundant. That same audit picked which 15 of ~45 endpoints were worth
    testing.
  </>,
  <>
    <b>Hardened org / tenancy access control</b> route by route — and caught
    and fixed the one production regression the rollout produced, same day.
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
  items: [
    { value: "39M / 47GB", label: "before", variant: "before" },
    { value: "1.6M / 7.7GB", label: "after (triggered only)", variant: "after" },
    { value: "1 of 16", label: "partitions per query" },
  ],
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
    number: 1001,
    url: PR("sensors", 1001),
    title:
      "feat(sensors-api): remap staging org_ids to prod for data queries (PI-6650)",
    status: "open",
    added: 487,
    removed: 43,
    opened: "Jun 3",
  },
  {
    repo: "sensors",
    number: 1042,
    url: PR("sensors", 1042),
    title:
      "fix(sensors-api): PI-5941 GET /api/sources collection-scoped discoverability",
    status: "open",
    added: 218,
    removed: 21,
    opened: "Jun 22",
  },
];

const case3MetricFlow: MetricFlow = {
  items: [
    { value: "~720 + ~360", label: "workflow + terraform lines", variant: "before" },
    { value: "0", label: "deleted, redundant w/ Datadog", variant: "after" },
    { value: "45 → 15", label: "endpoints, ranked by traffic" },
  ],
};

export const cases: CaseStudy[] = [
  {
    title: "Partitioning sensor_version_state to stop an ACU blow-up",
    ticket: "PI-7372",
    lead: (
      <>
        Cut a <b>39M-row / 47GB</b> table down to <b>1.6M / 7.7GB</b> and made
        every query touch one partition instead of sixteen.
      </>
    ),
    signal: (
      <>
        <code>sensor_version_state</code> had grown to ~39M rows / 47GB, and
        every per-sensor query scanned the whole table. In staging and prod
        that showed up as Aurora ACU pressure and slow batch-eval writes. The
        table needed to shrink <em>and</em> change how it was written — an
        index alone wouldn't fix it.
      </>
    ),
    narrative: [
      <>
        I audited the writes first: workers wrote a state row for{" "}
        <b>every</b> evaluation, but only <em>triggered</em> rows are ever
        read anywhere in the codebase — non-triggered writes were ~93% of
        volume for zero downstream use. The fix had two parts that had to
        land in order: (1) partition the table by{" "}
        <code>HASH(sensor_id)</code> so per-sensor reads and bulk
        expiry/turn-off updates prune to one partition instead of scanning
        all sixteen, and (2) stop writing non-triggered rows so the lean
        table stays lean. Since it was a live-data cutover, the migration
        carried its own drift guard that aborts the swap rather than risk
        corrupting the table.
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
    title: "A query-plan regression on the claim path",
    ticket: "actions-processor",
    lead: (
      <>
        Found a claim query running at ~<b>217,000</b> cost where the right
        index-scan plan costs ~<b>19</b> — by reading its{" "}
        <code>EXPLAIN</code> output, not guessing.
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
    title: "A deploy-gate suite — with Datadog picking what to test",
    ticket: "sensors-api-test-suite",
    lead: (
      <>
        Built a stage→prod deploy gate, let 90 days of Datadog traffic rank
        the <b>15</b> endpoints worth gating, and deleted a redundant{" "}
        <b>~720-line</b> home-grown monitor.
      </>
    ),
    signal: (
      <>
        sensors-api had no synthetic coverage between a stage deploy and a
        prod deploy — a regression could reach production with only manual
        QA in the way. The real question wasn't "add tests," it was which of
        ~45 endpoints were worth gating on, and whether Datadog already
        solved part of the problem.
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
        date: "May 18 – Jul 6 · ongoing hardening",
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
            {prRef("#1023", PR("sensors", 1023))}), and M2M client coverage (
            {prRef("#1049", PR("sensors", 1049))}).
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
    title: "Org & tenancy access hardening",
    ticket: "PI-6651 → PI-7873 / 7901 / 7920",
    lead: (
      <>
        Closed org-scoping gaps route by route across read and write paths —
        and caught the one regression the staged rollout produced the{" "}
        <b>same day</b>.
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
    ],
    result: (
      <>
        <b>Result:</b> org-scoping closed across read and write paths with
        case-insensitive comparisons and documented M2M contracts — and
        because I watched the staged rollout rather than fire-and-forgetting
        it, the one regression got caught, root-caused, and fixed same-day
        instead of reaching prod.
      </>
    ),
    prTable: case4Prs,
  },
];

export const themes: ThemeSection[] = [
  {
    title: "MCP / agent integration (sensors-api ↔ agents)",
    description: (
      <>
        Wiring sensors-api into the MCP surface used by agents: forwarding
        org/brand/version context through headers, then completing the
        coverage CRUD + provenance envelope and toggle-gated rollout.
      </>
    ),
    prTable: [
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
    title: "Source-app lineage & resource-context typing",
    description: (
      <>
        Tier-1 lineage enforcement at the agents invocation boundary, plus
        promoting resource_context payload fields to typed columns across
        sensors and data-airflow.
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
        added: 68,
        removed: 23,
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
    title: "Pattern-user gating for recommendations",
    description: (
      <>
        A two-part gate restricting recommendation surfaces to Pattern
        users, split across the sensors-api route layer and the agents
        invocation layer.
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
        status: "open",
        added: 789,
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
    title: "Feature & API work",
    description: (
      <>
        Product-facing sensors-api features: transactional handlers, audit
        history, dependency-derived sources, cascading PATCH updates, and
        DRAFT-state promotion. One worth calling out is{" "}
        {prRef("#1026", PR("sensors", 1026))}: prod test failures showed{" "}
        <code>GET/POST /api/agents/sensor_analysis</code> returning a 503 at
        ~30s. The cause was an API Gateway 30s integration timeout racing an
        unbounded Trino <code>COUNT(*)</code> that had a 120s app budget —
        the app had headroom the edge didn't. I bounded the request to 21s
        with abort propagation, returned <code>total: null</code> when the
        count can't finish rather than 503ing the whole response, and cached
        the windowed count for 300s to keep the deploy-gate path warm.
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
        status: "open",
        added: 311,
        removed: 35,
        opened: "Jun 17",
      },
      {
        repo: "sensors",
        number: 1026,
        url: PR("sensors", 1026),
        title: "fix(sensors-api): prevent sensor_analysis 503s from slow Trino COUNT",
        status: "open",
        added: 1067,
        removed: 494,
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
        number: 1039,
        url: PR("sensors", 1039),
        title: "PI-7629: Derive sensor_versions.sources from sensor_version_dependencies",
        status: "merged",
        added: 1535,
        removed: 206,
        opened: "Jun 19",
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
        number: 1003,
        url: PR("sensors", 1003),
        title: "feat(sensors): collapse to single payload column (PI-7440 Phase A)",
        status: "open",
        added: 103,
        removed: 204,
        opened: "Jun 5",
      },
    ],
  },
  {
    title: "Infra, runtime & decommissioning",
    description: (
      <>
        ECS/container lifecycle hardening (graceful shutdown, scale-in
        protection), RDS Proxy IAM auth groundwork, and sensors-ui CORS
        decommissioning.
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
        added: 153,
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

export const repoBreakdown: RepoBreakdownRow[] = [
  { repo: "sensors", total: 58, merged: 42, open: 11, closed: 5, added: 37101, removed: 5903 },
  { repo: "agents", total: 5, merged: 2, open: 0, closed: 3, added: 2100, removed: 334 },
  { repo: "pi-toolsmith", total: 3, merged: 3, open: 0, closed: 0, added: 1209, removed: 461 },
  { repo: "data-airflow", total: 1, merged: 0, open: 0, closed: 1, added: 600, removed: 184 },
];
