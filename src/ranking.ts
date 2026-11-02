/** How much each contribution is worth to Pattern, scored on four questions that add up to 10. */
export interface Rubric {
  /** A. Does it touch what partner brands pay for or trust Pattern with? (0–3) */
  stakes: 0 | 1 | 2 | 3;
  /** B. Is it live in production, and is the result measured? (0–3) */
  proven: 0 | 1 | 2 | 3;
  /** C. How big a problem did it solve, or how much value did it create? (0–2) */
  size: 0 | 1 | 2;
  /** D. How much of Pattern benefits? (0–2) */
  reach: 0 | 1 | 2;
  /** One line on the deciding factor. */
  why: string;
}

export const rubricQuestions = [
  {
    key: "stakes",
    label: "Business stakes",
    max: 3,
    question: "Does it touch what partner brands pay for or trust Pattern with?",
    scale: "3 directly affects brands' revenue, data, or experience · 2 protects or enables the business · 1 internal quality",
  },
  {
    key: "proven",
    label: "Proven in production",
    max: 3,
    question: "Is it live, and is the result measured?",
    scale: "3 live with a measured result · 2 live, not measured or partly rolled out · 1 test environment only, switched off, or in review",
  },
  {
    key: "size",
    label: "Size",
    max: 2,
    question: "How big a problem did it solve, or how much new value did it create?",
    scale: "2 large problem or major capability · 1 moderate · 0 small",
  },
  {
    key: "reach",
    label: "Reach",
    max: 2,
    question: "How much of Pattern benefits?",
    scale: "2 every brand or every engineer · 1 one team, product area, or system",
  },
] as const;

/** Listed in the order ties were first ranked; the final order is score, then stakes, then proven, then this order. */
const rubricById: [string, Rubric][] = [
  ["revenue-automations", { stakes: 3, proven: 3, size: 2, reach: 2, why: "The service brands pay for, with a zero confirmed in production for over three weeks." }],
  ["org-access", { stakes: 3, proven: 3, size: 2, reach: 2, why: "A cross-brand leak could end a partner relationship; the biggest risk removed." }],
  ["prod-reliability", { stakes: 3, proven: 3, size: 2, reach: 1, why: "Real users hit these errors; reach is the automations pages and one Pi page, not everything." }],
  ["safety-net-real", { stakes: 2, proven: 3, size: 2, reach: 2, why: "Every engineer ships through it, and it has already caught a live problem." }],
  ["iam-db-auth", { stakes: 2, proven: 2, size: 2, reach: 2, why: "Large security gain done with zero outages; security plumbing rather than something brands touch." }],
  ["failure-attribution", { stakes: 3, proven: 2, size: 2, reach: 1, why: "Protects the accuracy of brands' results; the failure rate was measured in testing." }],
  ["feature-api", { stakes: 2, proven: 2, size: 2, reach: 2, why: "Core capability for building bigger automations; the publish warning isn't switched on yet." }],
  ["partitioning", { stakes: 2, proven: 3, size: 2, reach: 1, why: "A measured 96% cut whose savings repeat every month." }],
  ["security-finish", { stakes: 2, proven: 3, size: 1, reach: 1, why: "Real security value, but the removed routes had no evidence of a brand ever being exposed." }],
  ["mcp-integration", { stakes: 2, proven: 2, size: 2, reach: 1, why: "Strategic for Pattern's AI direction, still early in adoption." }],
  ["claim-path", { stakes: 2, proven: 3, size: 1, reach: 1, why: "Keeps backlogs from turning into hours of delayed actions." }],
  ["deploy-gate", { stakes: 2, proven: 2, size: 1, reach: 2, why: "A good foundation; the safety-net work is what made it trustworthy." }],
  ["builder-product", { stakes: 1, proven: 1, size: 2, reach: 2, why: "Useful for builders, but Workflow Builder only runs on the test environment so far." }],
  ["business-requests", { stakes: 2, proven: 1, size: 2, reach: 1, why: "Driven by real requests; repeat alerts are paused for a pilot and Slack is in review." }],
  ["recommendation-gate", { stakes: 2, proven: 2, size: 1, reach: 1, why: "Protects a premium feature; narrow scope." }],
  ["source-app-lineage", { stakes: 2, proven: 2, size: 1, reach: 1, why: "Groundwork for access rules and audits; value shows up later." }],
  ["contract-safety", { stakes: 1, proven: 2, size: 1, reach: 2, why: "Stops silent breakage for other teams; covers part of the routes so far." }],
  ["alert-noise", { stakes: 1, proven: 3, size: 1, reach: 1, why: "Faster incident response; an internal benefit." }],
  ["infra-runtime", { stakes: 1, proven: 2, size: 1, reach: 2, why: "Prevents dropped work and cuts cost and attack surface; quiet value." }],
  ["metrics-catalog", { stakes: 1, proven: 1, size: 2, reach: 1, why: "Helpful for builders, but test-environment only and read-only." }],
  ["visibility-seam", { stakes: 2, proven: 1, size: 1, reach: 1, why: "Safe defaults now; most of the value arrives when it's switched on." }],
  ["consumer-smokes", { stakes: 1, proven: 1, size: 1, reach: 1, why: "Good judgment, but the benefit is mostly internal confidence." }],
];

export const rubrics: Record<string, Rubric> = Object.fromEntries(rubricById);

export function total(r: Rubric) {
  return r.stakes + r.proven + r.size + r.reach;
}

/** Contribution ids in rank order: score, then business stakes, then proven, then listing order. */
export const rankedIds: string[] = rubricById
  .map(([id, r], i) => ({ id, r, i }))
  .sort(
    (a, b) =>
      total(b.r) - total(a.r) || b.r.stakes - a.r.stakes || b.r.proven - a.r.proven || a.i - b.i
  )
  .map((x) => x.id);

export function rankOf(id: string) {
  const i = rankedIds.indexOf(id);
  if (i < 0) throw new Error(`no ranking for ${id}`);
  return i + 1;
}
