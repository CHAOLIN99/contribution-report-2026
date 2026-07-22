import type { ReactNode } from "react";

export type PillStatus = "merged" | "open" | "unmerged";

export const pillLabel: Record<PillStatus, string> = {
  merged: "Merged",
  open: "Open",
  unmerged: "Closed",
};

export interface PrRow {
  repo: string;
  number: number;
  url: string;
  title: string;
  status: PillStatus;
  added: number;
  removed: number;
  opened: string;
}

export interface FlowStep {
  date: string;
  label: ReactNode;
  body: ReactNode;
  setBack?: boolean;
}

export interface MetricStat {
  value: string;
  label: string;
}

/** A before/after point on the compare bar; raw is its magnitude, log-scaled when the ratio is large. */
export interface MetricPoint extends MetricStat {
  raw: number;
}

export interface MetricFlow {
  before: MetricPoint;
  after: MetricPoint;
  /** Extra plain stats shown alongside the compare bar (not part of the before/after pair). */
  extra?: MetricStat[];
  note?: ReactNode;
}

export type ValueId = "game-changers" | "data-fanatics" | "team-of-doers" | "partner-obsession";

export interface ValueDef {
  id: ValueId;
  name: string;
  /** The official company-value line, quoted as given. */
  officialLine: string;
  /** A one-sentence, jargon-free restatement for non-technical readers. */
  plainLine: string;
}

/** 0 = not applicable, 1 = present, 2 = strong, 3 = primary/defining. */
export type ValueScore = 0 | 1 | 2 | 3;

export const scoreLabel: Record<ValueScore, string> = {
  0: "not applicable",
  1: "present",
  2: "strong",
  3: "primary",
};

/** Every contribution is scored on all four values — the matrix, not a single bucket. */
export type ValueScores = Record<ValueId, ValueScore>;

/** The earned "why this value" line for one axis a contribution scores on (score > 0). */
export interface ValueRationale {
  value: ValueId;
  score: ValueScore;
  line: ReactNode;
}

/** Fields every contribution (deep case study or theme cluster) shares for the matrix. */
export interface Scored {
  /** How this contribution rates on each of the four values. */
  scores: ValueScores;
  /** One line per value it earns, ordered strongest-first; drives the per-card readout. */
  valueLines: ValueRationale[];
  /** Highest-scoring value — sets the accent color; ties resolved editorially. */
  primary: ValueId;
}

export interface CaseStudy extends Scored {
  id: string;
  navLabel: string;
  /** Short label used in the matrix row. */
  matrixLabel: string;
  title: string;
  ticket: string;
  lead: ReactNode;
  /** Plain-English "what this means" callout, written for a non-technical reader. */
  plainSummary: ReactNode;
  signal: ReactNode;
  narrative: ReactNode[];
  flow: FlowStep[];
  metricFlow?: MetricFlow;
  result: ReactNode;
  prTable?: PrRow[];
}

export interface ThemeSection extends Scored {
  id: string;
  /** Short label used in the matrix row. */
  matrixLabel: string;
  title: string;
  description: ReactNode;
  /** Plain-English "what this means" callout, written for a non-technical reader. */
  plainSummary: ReactNode;
  prTable: PrRow[];
}

/** One row of the evaluation matrix — any scored contribution, case or theme. */
export interface MatrixRow {
  id: string;
  label: string;
  ticket?: string;
  scores: ValueScores;
  primary: ValueId;
}

export interface RepoBreakdownRow {
  repo: string;
  total: number;
  merged: number;
  open: number;
  closed: number;
  added: number;
  removed: number;
}

export interface StatItem {
  value: string;
  label: string;
  variant?: "add" | "del";
}
