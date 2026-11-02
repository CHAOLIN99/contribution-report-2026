import type { Contribution, StatItem } from "./types";

export const roleLine =
  "Software Engineering Intern, Sensors · Pattern · May 2026 to now";

export const summary =
  "I work on Sensors, the platform that runs automated price, listing and ad actions for Pattern's partner brands. These are the six changes that mattered most, and how I got there.";

export const stats: StatItem[] = [
  { value: "211", label: "changes shipped" },
  { value: "109", label: "tickets closed" },
  { value: "7", label: "codebases" },
];

export const contributions: Contribution[] = [
  {
    id: "revenue-automations",
    headline: "Brands get the price and listing changes they pay for",
    number: "~220 rejected actions a day → 0, every day since Oct 9",
    did: [
      "Price-suppression and brand-management actions were getting rejected by the task service 41 to 813 times a day. I pulled the rejected requests from prod and compared them with what the task service accepts: we sent a person's name field in lowercase, and its enum only matched the capitalized value.",
      "The right fix was in the task service, another team's service, not a workaround in our code. I got push access and fixed the enum there on Oct 8. Rejections have been 0 every day since.",
      "In the same prod data I found ungated batch pricing actions fanning out one row per org, 55 to 113 copies per run, each sending the full batch. It came from my own Aug 21 change, so I owned the cleanup: I wrote the cancel query for the 1,738 extra rows blocking other actions, and a teammate with prod write access ran it. The one-row-per-node fix is in review.",
      "For the duplicate-dispatch guard, I counted violations in prod before merging. A plain unique index would have failed the deploy over 2,267 existing duplicate keys, so I scoped it to new rows.",
    ],
  },
  {
    id: "org-access",
    headline: "Partner brands can only see their own data",
    number:
      "Every org-scoping gap from the audit closed, enforced in prod since Jul 22",
    did: [
      "An audit found gaps in how our API scoped data to each brand. One flag flip was the fast option, but over-rejecting service-to-service callers was as real a risk as leaving a gap. So I closed it one route family at a time.",
      "When I staged the enforcement flag on Jul 13, it broke 5 wildcard routes for M2M clients. I fixed only those routes the same day instead of rolling back, so it never reached prod.",
      "I flipped prod on Jul 22 after a 48-hour staging soak. Once 401s, 403s and 5xx stayed flat, I deleted the killswitch and its fail-open branches, code first and then infra.",
      "In October I deleted old unused routes, instead of patching them.",
    ],
  },
  {
    id: "prod-reliability",
    headline: "People using our tools stopped hitting errors",
    number: '~1,664 "service unavailable" errors → 0 since Oct 13',
    did: [
      "The product's hourly smoke tests kept going red on the automations pages. I split the failures by cause instead of treating them as one bug, and found three, in three teams' code.",
      "The API Gateway access log has no path, so I grouped the 503s by response size. All 1,664 were the same 113-byte org lookup failure body from the user lookup at sign-in. I made our API wait up to 5 seconds for it inside the gateway deadline and return a clear error otherwise. 0 since Oct 13.",
      "A storefront page hung on about 4% of its requests the day I measured. Prod logs showed normal browsers hitting it, not just our test account, so I treated it as a customer bug and put timeouts on the unbounded SSR fetches.",
      "A request list in the task service timed out at 30 seconds. The suggested fix was a row limit plus an index. I tested it and it didn't help, because the real cost was a join across every request type, so I changed the query to filter by ids.",
    ],
  },
  {
    id: "safety-net-real",
    headline: "A bad release gets caught in minutes, not by a partner",
    number: "My post-deploy check caught 3 broken prod routes on Oct 14",
    did: [
      "The API test gate always showed green, so I looked at its run times. A real run takes about 85 seconds, and every pass took 2 to 5. A reusable-workflow condition had skipped it 54 times. I fixed the call path, and the PR that makes it run on every deploy is in review.",
      "I also made an access test run against prod after every successful deploy.",
      "On Oct 14 it caught 3 routes returning 500s. Main deploys diffed migrations from HEAD~1, so after a cancelled run a migration got skipped. The next day I changed the diff to start from the last successful run.",
    ],
    how: [
      "The skipped runs sent no requests.",
    ],
  },
  {
    id: "failure-attribution",
    headline: "We can see why automations fail, so we fix the right thing",
    number: "35,259 failed actions traced to one bug → 0 since Aug 26",
    did: [
      'Thousands of asset actions failed every day, and each one was saved with an empty status and the driver\'s generic "Failed query" message. Guessing wasn\'t going to work, so my first PR changed no behavior: it walked the error cause chain and saved the SQL state and constraint name in their own columns.',
      "Re-reading my own PR against its acceptance criteria, I found it logged the raw error one line before sanitizing it, which put org IDs and action config in the logs. I fixed both paths, added tests, and checked that they fail when the fix is reverted.",
      "Once causes were recorded, about 85% of failures were one thing: SQLSTATE 23505 on a unique key that didn't include the org. The first org's asset won and every other org's failed.",
      "I added the org to the key and fixed the enqueue. It went live Aug 26 at 22:00 UTC, and there have been 0 since across 117,000+ actions.",
    ],
    how: [
      "One mapping feeds both the column and the metric. Causes started recording on Aug 12. That cause was 2,200 to 2,900 failed actions a day. The last duplicate was Aug 26 at 21:12 UTC.",
    ],
  },
  {
    id: "partitioning",
    headline: "Lower database costs that repeat every month",
    number: "Biggest table 82% smaller: 47 GB → 8.6 GB",
    did: [
      "The ticket asked whether to move the state table into the data warehouse. I mapped every read and write first. The move didn't fit: writes share a transaction with the versions table, and some reads aggregate 400k+ JSONB rows. But the audit showed 93% of rows were non-triggered and never read anywhere.",
      "So I stopped writing non-triggered rows and HASH-partitioned the table by sensor_id into 16, so a per-sensor query hits one partition (1.5 GB at most).",
      "The first cutover failed: copying 39M rows blew the migration Lambda's 300-second limit. Only triggered rows are ever read, so I copied just those, about 3%, and it fit.",
      "On the second try, the drift guard I built found five columns created as varchar(255) where prod had unbounded varchar. It aborted the swap and rolled back cleanly. I fixed the types and finished the cutover with the workers paused. The old table stays as a rollback copy for now.",
      "Separately, when batches got stuck in prod, EXPLAIN showed the claim query's OR clause forcing a seq scan and sort (cost ~217,000 vs ~19 on the right partial index). I split it into two queries.",
    ],
    how: [
      "The table went from about 40 million rows to 2.3 million. The old copy is still present as of Nov 2. Deleting it frees the 47 GB.",
    ],
  },
];
