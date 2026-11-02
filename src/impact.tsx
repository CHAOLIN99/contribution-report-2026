import type { BusinessImpact, ImpactPillar, ThemeSection } from "./types";
import { prs } from "./recentPrs";

/** Company-level impact for the contributions written up through Aug 28, keyed by card id. */
export const existingImpact: Record<string, BusinessImpact> = {
  partitioning: {
    outcome: (
      <>
        A table that had grown to 47GB now holds 7.7GB, and every lookup reads one
        slice of it instead of all sixteen. That lowers database cost and keeps the
        evaluation pipeline that partner automations run on fast.
      </>
    ),
    whyEssential: (
      <>
        Database capacity is billed by usage, and the growth was compounding with
        every evaluation. Left alone it would have kept raising cloud spend and
        slowing every automation that reads sensor state.
      </>
    ),
  },
  "claim-path": {
    outcome: (
      <>
        Removed a slowdown where the queue that hands out automation work did
        ~11,000× more database work than needed under backlog, so a busy period no
        longer stalls the actions partner brands are waiting on.
      </>
    ),
    whyEssential: (
      <>
        Backlogs are exactly when the system needs to catch up fastest. A query that
        degrades under load turns a short spike into hours of delayed actions.
      </>
    ),
  },
  "deploy-gate": {
    outcome: (
      <>
        Releases to production now pass an automated check on the 15 endpoints real
        traffic uses most, and ~1,000 lines of duplicate monitoring were never
        shipped, so the team has one less system to maintain.
      </>
    ),
    whyEssential: (
      <>
        Before this, a breaking change could reach partner brands with only manual
        review in the way. A gate picked from real traffic protects what customers
        actually use.
      </>
    ),
  },
  "org-access": {
    outcome: (
      <>
        Every brand's data is now separated from every other brand's on both read
        and write paths, enforced in production since Jul 22, and the one rollout
        regression was fixed the same day.
      </>
    ),
    whyEssential: (
      <>
        Data separation between brands is the basis of partner trust. One
        cross-brand leak would cost far more than any feature could earn back.
      </>
    ),
  },
  "iam-db-auth": {
    outcome: (
      <>
        Services connect to the database with short-lived credentials that expire on
        their own instead of permanent passwords, rolled out one service at a time
        with zero downtime.
      </>
    ),
    whyEssential: (
      <>
        A permanent database password that leaks keeps working until someone notices.
        Expiring credentials shrink that window from indefinite to minutes.
      </>
    ),
  },
  "failure-attribution": {
    outcome: (
      <>
        Failed automation actions now record why they failed, and that data exposed a
        bug where one brand's result overwrote other brands' results.
      </>
    ),
    whyEssential: (
      <>
        Without a cause on every failure, the team was guessing. Measurement turned
        an unexplained failure rate into a specific, fixable bug.
      </>
    ),
  },
  "alert-noise": {
    outcome: (
      <>
        The production incident channel stopped being flooded with test-environment
        alerts (about 800 every two weeks), and every alert can still fire.
      </>
    ),
    whyEssential: (
      <>
        When a channel is mostly noise, people stop reading it, and the real outage
        scrolls past. Fewer, real alerts mean faster response when something breaks
        for partners.
      </>
    ),
  },
  "mcp-integration": {
    outcome: (
      <>
        Pattern's AI agents can read and act on sensors data through a supported
        interface, with the right brand context passed on every call.
      </>
    ),
    whyEssential: (
      <>
        AI agents are a strategic product direction. They're only as useful as the
        data they can reach safely, and this connects them to the automation
        platform.
      </>
    ),
  },
  "source-app-lineage": {
    outcome: (
      <>
        Every automated action can be traced to the product it came from, across
        three team-owned codebases, so access rules can follow the data.
      </>
    ),
    whyEssential: (
      <>
        Traceability is what lets Pattern answer "who triggered this, and were they
        allowed to?", a question partners and auditors will ask.
      </>
    ),
  },
  "recommendation-gate": {
    outcome: (
      <>
        Recommendations are visible only to the users they are meant for, enforced
        in both the backend and the agent surfaces.
      </>
    ),
    whyEssential: (
      <>
        A premium capability that anyone can open stops being premium, and exposing
        it early risks showing unfinished output to partners.
      </>
    ),
  },
  "feature-api": {
    outcome: (
      <>
        Shipped sensor chaining (one sensor feeding another), safe all-or-nothing
        updates, change history, and edit-impact previews that warn before a change
        breaks downstream automations.
      </>
    ),
    whyEssential: (
      <>
        These are the features teams use to build automations for partner brands.
        Previews and safe updates stop one edit from silently breaking someone
        else's work.
      </>
    ),
  },
  "infra-runtime": {
    outcome: (
      <>
        Workers finish in-flight work before shutting down, encrypted database
        connections are required, and retired code paths and apps were removed.
      </>
    ),
    whyEssential: (
      <>
        Dropped work on every scale-down means lost or duplicated actions for
        partners. Dead infrastructure costs money and widens the attack surface.
      </>
    ),
  },
  "contract-safety": {
    outcome: (
      <>
        The build fails if an API response changes shape without warning, and a
        runbook spells out how to make a breaking change safely. An unused login
        mechanism was also removed.
      </>
    ),
    whyEssential: (
      <>
        Several teams build on this API. A silent change to a response breaks their
        product, not ours, which makes it the hardest kind of bug to spot.
      </>
    ),
  },
  "visibility-seam": {
    outcome: (
      <>
        Every place that reads sensor data now has to say who is asking, and new
        sensors default to the more private setting.
      </>
    ),
    whyEssential: (
      <>
        Safe defaults protect partners even when the person creating a sensor doesn't
        know the rules, and the groundwork makes future visibility rules a single
        switch.
      </>
    ),
  },
  "metrics-catalog": {
    outcome: (
      <>
        Automation builders can see every data column that's available and how fresh
        it is, instead of only the ones already set up.
      </>
    ),
    whyEssential: (
      <>
        People can only build automations on data they know exists. Showing
        freshness honestly also stops them from building on stale data.
      </>
    ),
  },
  "consumer-smokes": {
    outcome: (
      <>
        Removed a test suite that looked complete but checked nothing, and replaced
        it with one that really tests the automations pages every hour.
      </>
    ),
    whyEssential: (
      <>
        A test that always passes is worse than no test because it creates false
        confidence. Honest tests are the only ones worth paying to run.
      </>
    ),
  },
};

/** Contributions from Aug 29 through Nov 2, 2026. */
export const recentThemes: ThemeSection[] = [
  {
    id: "prod-reliability",
    matrixLabel: "production errors real users hit",
    title: "Finding why production was failing for real users",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 3,
      "team-of-doers": 2,
      "game-changers": 1,
    },
    impact: {
      outcome: (
        <>
          The automations API returned ~1,664 "service unavailable" errors traced to
          one slow dependency, with zero since Oct 23. The Pi storefront page that
          hung for real shoppers (~4% of one page's requests on the day measured) now
          times out bounded fetches instead of hanging, and a Task Registry list that timed out at 30s now reads ~99% fewer pages (measured on test data).
        </>
      ),
      whyEssential: (
        <>
          These were errors real partners and shoppers saw, not test noise. Each one
          is a moment someone at a partner brand decides Pattern's tools are
          unreliable.
        </>
      ),
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            Production logs showed the storefront hang was hitting ordinary browsers,
            not just the test account. That changed it from a test problem into a
            customer problem.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            Every fix started from a measurement: classifying 503s by response size
            in the gateway log, reading the query plan behind the 30s timeout, and
            counting hang signatures per day.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            The fixes landed in three codebases owned by different teams: sensors,
            the Pi web app, and Task Registry.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            The proposed fix for the list timeout (a row limit plus an index) was
            tested and shown not to help. The real fix was a different query shape.
          </>
        ),
      },
    ],
    description: (
      <>
        Hourly production smoke tests kept failing on the automations pages. I split
        the failures by cause. The sensors-api 503s came from an authorization
        dependency, so I made them fail clearly, logged and documented, then waited
        for it within the gateway's deadline. The Pi storefront hang came from
        unbounded server-side fetches, which now have timeouts and labels. The Task
        Registry list timeout was a join that walked every request type, fixed by
        filtering on ids.
      </>
    ),
    plainSummary: (
      <>
        Some pages were failing or freezing for real users. I found which system
        caused each failure, fixed each one in the codebase that owned it, and used
        production logs to confirm the errors stopped.
      </>
    ),
    prTable: [
      ...prs("sensors", 1344, 1346, 1347, 1351, 1352, 1361, 1362, 1366),
      ...prs("pattern-exp", 20150, 20741, 21152),
      ...prs("white-glove", 1415),
    ],
  },
  {
    id: "revenue-automations",
    matrixLabel: "automations that act for brands",
    title: "Unblocking the automations that act on behalf of partner brands",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 3,
      "team-of-doers": 3,
      "game-changers": 1,
    },
    impact: {
      outcome: (
        <>
          Price-suppression and brand-management actions rejected for name casing
          went from 104–314 a day to zero on every day from Oct 9 to Nov 1. A batch
          step that fired 55–113 times per run now fires once. 1,738 redundant queued
          jobs that were starving other actions were cleared, and ad-ineligibility
          actions, which hadn't created a real task since late June, were repointed
          at the live schema.
        </>
      ),
      whyEssential: (
        <>
          These automations do work for partner brands: protecting the Buy Box,
          flagging ad problems, and opening tickets. A rejected or duplicated action
          means a brand issue nobody acts on, or acts on many times.
        </>
      ),
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            Each fix is measured in brand-facing actions that now go through, not in
            code shipped.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            Re-querying production before building showed that two tickets' original
            framing was stale. It also showed that a proposed unique index would have
            failed to deploy over 2,267 existing duplicate keys in prod.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            The casing fix shipped in Task Registry, another team's service, after I
            got push access. The backlog cleanup was coordinated with teammates who
            had prod write access.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            Retired idle request types and dormant action versions instead of leaving
            them to fail quietly.
          </>
        ),
      },
    ],
    description: (
      <>
        Fixed enum values that differed only in case in Task Registry. Persisted the
        Predict error body so failures can be diagnosed. Guarded batch dispatch
        against duplicates, scoped to new rows so the migration can apply over
        history. Planned the per-node Predict enqueue fix. Moved the
        ad-ineligibility actions to the live request version. Enabled asset enqueue
        v2 in production.
      </>
    ),
    plainSummary: (
      <>
        Pattern runs automations that take action for brands, like fixing a price or
        opening a case. Many were being silently rejected or run over and over. I
        found out why for each one, fixed it, and checked production afterward to
        confirm the actions now go through.
      </>
    ),
    prTable: [
      ...prs("white-glove", 1365),
      ...prs("sensors", 1292, 1315, 1340, 1354, 1376, 1431, 1436, 1446),
      ...prs("data-airflow", 7629),
    ],
  },
  {
    id: "security-finish",
    matrixLabel: "credentials & access, finished",
    title: "Finishing the credential migration and closing the last access gaps",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 2,
      "team-of-doers": 3,
      "game-changers": 2,
    },
    impact: {
      outcome: (
        <>
          The sensors API and three production workers now use short-lived database credentials, with the rest in review. A shared-key route that skipped brand and app checks was
          deleted, manual runs now check app access, a test password was kept out of
          CI reports, and plaintext action secrets are being replaced with
          references.
        </>
      ),
      whyEssential: (
        <>
          Each gap was a way partner data or credentials could leak. Closing them
          before an incident is far cheaper than responding to one.
        </>
      ),
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: <>Every item closes a concrete path to partner data or a credential.</>,
      },
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            The production cutover went one service per change, each with a soak
            period, across a migration that started in July.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 2,
        line: (
          <>
            Showed on stage that the database proxy handles the IAM step: five
            services, 865k+ rows written in 24h, zero auth failures. That ruled out a
            risky permission grant on the shared production database.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            The insecure shared-key routes were deleted, not patched, once usage
            showed nothing depended on them.
          </>
        ),
      },
    ],
    description: (
      <>
        Rolled IAM database auth out to production one service at a time:
        cleanup-orchestrator, metrics publisher, batch relay, then sensors-api, with
        the remaining workers and the password-path retirement in review. Removed
        the Heimdall shared-key routes. Added a source-app gate on manual runs.
        Fixed the Pattern org being dropped from org-scoped reads and validated org
        ids. Kept the smoke password out of Playwright reports. Started replacing
        plaintext action secrets with secret references.
      </>
    ),
    plainSummary: (
      <>
        I finished moving production systems off permanent database passwords, and
        closed the remaining ways one brand's data or a password could be exposed.
      </>
    ),
    prTable: [
      ...prs("sensors", 1287, 1288, 1290, 1314, 1324, 1343, 1355, 1367, 1368, 1433),
      ...prs("sensors", 1384, 1398, 1399, 1400, 1401, 1402, 1403, 1383),
      ...prs("sensors", 1322, 1328, 1312, 1313, 1323, 1350, 1303, 1437),
      ...prs("pattern-exp", 23165),
    ],
  },
  {
    id: "safety-net-real",
    matrixLabel: "a safety net that really catches",
    title: "Making the release safety net actually catch problems",
    primary: "game-changers",
    scores: {
      "partner-obsession": 2,
      "data-fanatics": 3,
      "team-of-doers": 2,
      "game-changers": 3,
    },
    impact: {
      outcome: (
        <>
          An access test now runs against production after every deploy. On Oct 14 it
          caught production errors caused by a skipped database migration, and I
          fixed the cause in the pipeline. I also found that the pre-release API
          check had never actually run (54 "passing" runs of 2–5 seconds each) and
          got it running.
        </>
      ),
      whyEssential: (
        <>
          A check that passes without running is worse than none because people trust
          it. Now a broken release is caught by a machine within minutes instead of by
          a partner.
        </>
      ),
    },
    valueLines: [
      {
        value: "game-changers",
        score: 3,
        line: (
          <>
            Questioned green checks the team relied on, including my own, and proved
            which ones were real.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 3,
        line: (
          <>
            Run durations exposed the dead gate: a real run takes ~85s, and every
            "pass" took 2–5s.
          </>
        ),
      },
      {
        value: "partner-obsession",
        score: 2,
        line: (
          <>
            The production check caught real partner-facing 500s on its first big
            test.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 2,
        line: (
          <>
            Fixed the shared CI pipeline that every sensors engineer deploys through.
          </>
        ),
      },
    ],
    description: (
      <>
        Ran the auth matrix in production after each successful ECS deploy and
        retired its feature flags. Fixed the reusable-workflow condition that
        silently skipped the Bruno deploy gate, and opened a PR to make it always
        on. Made main deploys diff from the last successful run so cancelled runs
        can't skip migrations. Added snapshot tests with mutation proofs for five
        write routes. Made the Bruno validator enforce <code>allOf</code> and
        required fields. Got the hourly Pi smoke suite green and honest.
      </>
    ),
    plainSummary: (
      <>
        Automated checks are supposed to stop a bad release from reaching customers.
        I found that one key check had never actually run, fixed it, and added a
        check against live production that has already caught a real problem.
      </>
    ),
    prTable: [
      ...prs("sensors", 1286, 1321, 1326, 1338, 1385, 1386, 1409, 1410, 1435),
      ...prs("sensors", 1387, 1388, 1389, 1390, 1395, 1393, 1394, 1304),
      ...prs("pattern-exp", 19856, 19860, 19864, 20084, 20273, 20617, 20624, 20844, 20845, 22552),
    ],
  },
  {
    id: "builder-product",
    matrixLabel: "Workflow Builder product work",
    title: "Workflow Builder features teams use every day",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 2,
      "team-of-doers": 3,
      "game-changers": 1,
    },
    impact: {
      outcome: (
        <>
          Workflow Builder gained team labels, a staging switch, a working login
          redirect from Pi, one-click links to the n8n workflow behind an action, a refresh-cadence field, and a sync check that stops a run until the sensor
          definition reaches the data warehouse. Duplicate metric registrations are
          prevented, and existing duplicates are retired.
        </>
      ),
      whyEssential: (
        <>
          Workflow Builder is where teams build the automations partner brands rely
          on. Every confusing state or stale run there turns into a wrong action for a
          brand.
        </>
      ),
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            The sync gate stops someone from running an automation on a definition
            the warehouse hasn't received yet.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            Work landed across the API, the builder UI, Pi, and Task Registry, often
            the same day.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 2,
        line: (
          <>
            The sync check reuses the data team's existing comparison rules, so both
            sides agree on what "synced" means.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 1,
        line: (
          <>
            Duplicate metrics are marked superseded instead of deleted, so nothing
            that references them breaks.
          </>
        ),
      },
    ],
    description: (
      <>
        Built shared team labels, a staging environment tag, a login redirect
        through Pi, and n8n workflow links on the action panel and canvas. Added
        the sensor sync-status endpoint with a gate on Trigger Run, a sync
        indicator, and the SLA cadence column. Added duplicate-metric prevention
        with <code>superseded_by</code>. Mapped source-app lineage for fact tables.
        Preserved source sensors on cascade, import, and copy, and added
        resource-type validation.
      </>
    ),
    plainSummary: (
      <>
        Workflow Builder is the tool teams use to build automations. I shipped a
        series of improvements that make it clearer and safer, so people don't run
        automations on outdated data or lose track of who owns what.
      </>
    ),
    prTable: [
      ...prs("sensors", 1289, 1360, 1345, 1353, 1339, 1341, 1356, 1363, 1364, 1365, 1382),
      ...prs("sensors", 1412, 1413, 1414, 1415, 1417, 1418, 1434, 1447),
      ...prs("sensors-workflow-builder", 148, 149, 153, 170, 171, 172, 173, 181),
      ...prs("sensors-workflow-builder", 204, 205, 206, 207, 209, 210),
      ...prs("pattern-exp", 22550),
      ...prs("white-glove", 1368, 1369),
    ],
  },
  {
    id: "business-requests",
    matrixLabel: "capabilities business teams asked for",
    title: "New capabilities business teams asked for",
    primary: "partner-obsession",
    scores: {
      "partner-obsession": 3,
      "data-fanatics": 1,
      "team-of-doers": 3,
      "game-changers": 2,
    },
    impact: {
      outcome: (
        <>
          The product-matching team can have an action re-fire on every run while a
          problem persists (shipped to production). A native Slack digest is in review so
          a regional advertising team gets alerts in its own channel, and Ask Pi
          links now open the exact runbook section.
        </>
      ),
      whyEssential: (
        <>
          These came straight from business teams outside engineering. Building what
          they need, in a reusable way rather than one-off, is how the platform earns
          more users.
        </>
      ),
    },
    valueLines: [
      {
        value: "partner-obsession",
        score: 3,
        line: (
          <>
            Each request started from a business team's real workflow. For one of
            them I sent ten scoping questions before writing code.
          </>
        ),
      },
      {
        value: "team-of-doers",
        score: 3,
        line: (
          <>
            The Slack action was re-routed through another team's integration service
            after their review, instead of building a parallel path.
          </>
        ),
      },
      {
        value: "game-changers",
        score: 2,
        line: (
          <>
            Re-fire is a reusable setting on any action, not a hard-coded special
            case for one sensor.
          </>
        ),
      },
      {
        value: "data-fanatics",
        score: 1,
        line: <>Stale source tables now skip a run instead of re-firing on old data.</>,
      },
    ],
    description: (
      <>
        Added <code>refire_mode: every_run</code> for individual actions, which
        skips a batch when its source table is stale. Started with a five-PR stack
        and shipped it as one PR. Built a native Slack digest action across sensors,
        Workflow Builder, and the Task Registry sync API, now in review. Added Ask Pi
        runbook anchors in Workflow Builder and agents.
      </>
    ),
    plainSummary: (
      <>
        Teams outside engineering asked for new abilities: re-alert while a problem
        is still happening, and send alerts to Slack. I scoped each request with the
        team that asked and built it so other teams can reuse it.
      </>
    ),
    prTable: [
      ...prs("sensors", 1422, 1423, 1424, 1425, 1426, 1427, 1429, 1450),
      ...prs("sensors-workflow-builder", 218, 221),
      ...prs("agents", 3970),
      ...prs("white-glove", 1427),
    ],
  },
];

/** The headline: what the work as a whole changed for Pattern. */
export const pillars: ImpactPillar[] = [
  {
    id: "pillar-automations",
    headline: "Partner automations that actually go through",
    metric: "314 → 0",
    metricLabel: "rejected brand actions per day",
    outcome: (
      <>
        Found and fixed why automations acting for brands were rejected, duplicated,
        or stuck: casing rejections, a step firing 55–113× per run, 1,738 redundant queued jobs, and ad actions that hadn't worked since June.
      </>
    ),
    whyEssential: (
      <>
        These automations are the product. Each rejected action is a price, ad, or
        case problem a partner brand is paying Pattern to catch.
      </>
    ),
    evidence: [
      { id: "revenue-automations", label: "automations" },
      { id: "failure-attribution", label: "failure attribution" },
      { id: "claim-path", label: "claim path" },
    ],
  },
  {
    id: "pillar-trust",
    headline: "Brand data and credentials kept safe",
    metric: "0",
    metricLabel: "outages from the credential cutover",
    outcome: (
      <>
        Separated each brand's data in production, moved services off permanent
        database passwords one at a time, and deleted routes that skipped access
        checks.
      </>
    ),
    whyEssential: (
      <>
        Partner trust rests on brand data staying separate and secrets staying
        secret. A single leak costs more than any feature earns.
      </>
    ),
    evidence: [
      { id: "org-access", label: "org access" },
      { id: "iam-db-auth", label: "IAM auth" },
      { id: "security-finish", label: "finishing it" },
      { id: "recommendation-gate", label: "recommendation gate" },
    ],
  },
  {
    id: "pillar-reliability",
    headline: "Production errors real users saw, fixed",
    metric: "~1,664 → 0",
    metricLabel: "automations API 503s (zero since Oct 23)",
    outcome: (
      <>
        Traced failing and freezing pages to their source across three teams'
        systems and fixed each one at the source.
      </>
    ),
    whyEssential: (
      <>
        Logs showed real shoppers and partners hit these errors. Reliability is the
        first thing people judge a tool on.
      </>
    ),
    evidence: [
      { id: "prod-reliability", label: "production errors" },
      { id: "claim-path", label: "query-plan fix" },
    ],
  },
  {
    id: "pillar-safety-net",
    headline: "Releases that can't quietly break things",
    metric: "54",
    metricLabel: "fake-green gate runs uncovered and fixed",
    outcome: (
      <>
        Built the pre-release gate, the production access check, and API snapshot
        tests. Proved one gate had never really run and fixed it. The production check has already caught real production errors.
      </>
    ),
    whyEssential: (
      <>
        Every engineer ships through this pipeline. A safety net that really
        catches problems lets the whole team move faster.
      </>
    ),
    evidence: [
      { id: "safety-net-real", label: "real safety net" },
      { id: "deploy-gate", label: "deploy gate" },
      { id: "contract-safety", label: "API contracts" },
      { id: "consumer-smokes", label: "honest smokes" },
    ],
  },
  {
    id: "pillar-cost",
    headline: "Lower cloud cost and less noise",
    metric: "96%",
    metricLabel: "smaller hot table (47GB → 7.7GB)",
    outcome: (
      <>
        Shrank the largest database table by measuring what was actually read, and
        moved ~800 test alerts every two weeks out of the incident channel without
        muting any of them.
      </>
    ),
    whyEssential: (
      <>
        Cloud spend compounds, and alert fatigue hides real incidents. Both fixes
        keep paying off every day.
      </>
    ),
    evidence: [
      { id: "partitioning", label: "partitioning" },
      { id: "alert-noise", label: "alert noise" },
    ],
  },
  {
    id: "pillar-product",
    headline: "Features teams asked for, shipped end to end",
    metric: "109",
    metricLabel: "ClickUp tickets closed",
    outcome: (
      <>
        Shipped sensor chaining, edit-impact previews, the Metrics page, AI-agent
        access to sensors, Workflow Builder improvements, action re-fire, and Slack
        digests, across seven repos owned by several teams.
      </>
    ),
    whyEssential: (
      <>
        These features are what turns the automation platform into something
        business teams choose to use.
      </>
    ),
    evidence: [
      { id: "builder-product", label: "Workflow Builder" },
      { id: "business-requests", label: "business requests" },
      { id: "feature-api", label: "chaining & API" },
      { id: "metrics-catalog", label: "Metrics page" },
      { id: "mcp-integration", label: "AI agents" },
    ],
  },
];
