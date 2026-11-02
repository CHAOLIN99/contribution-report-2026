import type { Contribution, StatItem } from "./types";

export const roleLine =
  "Software Engineering Intern, Sensors (Pattern's automation platform) · May 2026 to now";

export const summary =
  "I work on the system that runs automated price, listing and ad actions for Pattern's partner brands. These are the six changes that mattered most.";

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
      "Automated price and listing actions were rejected 41 to 813 times a day because a person's name didn't match in capitalization. I found the cause and fixed it on Oct 8.",
      "I also found a batch step that ran 55 to 113 times per run instead of once. I cleared the backlog it caused, and the fix that stops it for good is in review.",
    ],
    how: [
      "The downstream API compared an enum value case-sensitively. The automation sent lowercase, so a person's name failed the match. I compared the values on each side, then fixed the casing at the source on Oct 8. Rejections ranged from 41 to 813 a day. They have been 0 every day since Oct 9.",
      "A batch action was enqueued once per brand, 55 to 113 copies, and each copy ran the whole batch. I cancelled that backlog. The fix that enqueues one row per node is in review.",
    ],
  },
  {
    id: "org-access",
    headline: "Partner brands can only see their own data",
    number:
      "every gap from the data access audit closed, enforced in production since July 22",
    did: [
      "I closed each gap the audit found and turned the checks on in production.",
      "My rollout caused one problem. I caught it and fixed it the same day.",
      "In October I deleted old unused routes that skipped these checks, instead of patching them.",
      "Results now show only the brands the viewer has access to.",
    ],
    how: [
      "Brand scoping is now enforced on every read and write. I rolled the checks out behind a flag, first in staging, then in production on July 22. A test matrix checks the access rules on each deploy.",
      "During the rollout, service-to-service calls were over-rejected. I caught that and fixed it the same day. After production soaked, I removed the flag so the checks stay on. In October I deleted old unused routes that skipped these checks. Results now include only the brands the viewer has access to.",
    ],
  },
  {
    id: "prod-reliability",
    headline: "People using our tools stopped hitting errors",
    number: '~1,664 "service unavailable" errors → 0 since Oct 13',
    did: [
      "All of them came from one slow step at sign-in. I changed it to wait a few seconds and fail cleanly instead of erroring.",
      "A frontend page froze on about 4% of visits on the day I measured. It now gives up on a slow call instead of freezing.",
      "I fixed these in 3 codebases owned by different teams.",
    ],
    how: [
      "Gateway access logs do not include the path. I grouped the errors by response body size. All ~1,664 \"service unavailable\" errors were the same size: a failed sign-in lookup. I added a 5 second wait for the user lookup and a clean timeout on the results deadline. Those errors have been 0 since Oct 13.",
      "On the frontend, a slow fetch during server rendering froze the page on about 4% of visits the day I measured. I bounded the fetches so a slow call times out and the page still renders. I made these fixes in 3 codebases owned by different teams.",
    ],
  },
  {
    id: "safety-net-real",
    headline: "A bad release gets caught in minutes, not by a partner",
    number: "my after-release check caught 3 broken production pages on Oct 14",
    did: [
      "On Oct 14, the check I built caught 3 pages failing because the release had skipped a database update. The next day I fixed the pipeline so releases can't skip them.",
      'I also found that the team\'s main release check had "passed" 54 times without running. A real run takes about 85 seconds, and these took 2 to 5. I fixed it so it really runs. Turning it on for every release is in review.',
    ],
    how: [
      "Cancelled CI runs made the pipeline compute the database-update diff from the previous commit. That skipped a migration. On Oct 14 my after-release check caught 3 production pages failing for that reason. I changed the diff to start from the last successful deploy.",
      "The team's main release check is an API test suite. Its call path sent no requests, so it reported a pass in 2 to 5 seconds. A real run takes about 85 seconds. That happened 54 times. I fixed the call path so the suite really runs. Turning it on for every release is in review.",
    ],
  },
  {
    id: "failure-attribution",
    headline: "We can see why automations fail, so we fix the right thing",
    number:
      "35,259 failed actions traced to one bug → 0 since my fix went live Aug 26",
    did: [
      "Every failure was saved the same blank way, so no one could tell the causes apart. I made each failure record its reason.",
      "The data pointed to one cause right away: duplicate records, 2,200 to 2,900 failed actions a day, about 85% of all failures.",
      "I fixed the duplicate check so each brand gets its own result. There have been none since, across 117,000+ actions.",
    ],
    how: [
      "Every failure used to land as an empty status and a generic driver message. I walked the full error cause chain and wrote the SQL state and constraint name into their own columns. One mapping feeds both the column and the metric.",
      "Causes started recording on Aug 12. The dominant cause was SQLSTATE 23505 on a unique key that was too narrow (missing the org), so one brand's record collided with another's. That was 2,200 to 2,900 failed actions a day, about 85% of all failures, 35,259 in total.",
      "I widened the unique key and enqueued one row per org. The fix went live Aug 26 at 22:00 UTC. The last duplicate was Aug 26 at 21:12 UTC. There have been none since, across 117,000+ actions.",
    ],
  },
  {
    id: "partitioning",
    headline: "Lower database costs that repeat every month",
    number: "biggest table 82% smaller, 47 GB → 8.6 GB",
    did: [
      "I measured what the table stored and found 93% of it was never read again, so I stopped saving it.",
      "I split the table into 16 pieces, so a lookup reads one piece (1.5 GB at most) instead of all 47 GB.",
      "I fixed a query that did 11,000 times more work than it needed under heavy load.",
      "During the switch, a safety check I built stopped a data mismatch before it reached production.",
      "The old copy is kept for rollback for now. Deleting it frees the 47 GB.",
    ],
    how: [
      "I measured what the table stored. 93% of rows were written on every run and never read again. I stopped saving those rows. The table went from about 40 million rows to 2.3 million, and from 47 GB to 8.6 GB.",
      "I hash-partitioned it into 16 pieces. A lookup now reads one piece, 1.5 GB at most, instead of all 47 GB.",
      "Copying all ~40 million rows could not finish in the migration window. Because 93% of rows are never read, the copy only needed the rest. A safety check ran before the swap. It found a type mismatch between the old table and the new one and aborted, so the mismatch never reached production. I aligned the types and completed the switch. The old table is kept as a rollback copy (47 GB, still present Nov 2). Deleting it frees the 47 GB.",
      "Separately, a query under heavy load did 11,000 times more work than it needed. The plan was a full scan and sort. I split the query so it uses the index.",
    ],
  },
];
