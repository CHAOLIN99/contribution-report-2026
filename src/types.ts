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

export interface CaseStudy {
  id: string;
  value: ValueId;
  navLabel: string;
  title: string;
  ticket: string;
  lead: ReactNode;
  /** Plain-English "what this means" callout, written for a non-technical reader. */
  plainSummary: ReactNode;
  /** Explicit "why this is [value]" line, tying the work back to the value's own definition. */
  whyValue: ReactNode;
  signal: ReactNode;
  narrative: ReactNode[];
  flow: FlowStep[];
  metricFlow?: MetricFlow;
  result: ReactNode;
  prTable?: PrRow[];
}

export interface ThemeSection {
  value: ValueId;
  title: string;
  description: ReactNode;
  /** Plain-English "what this means" callout, written for a non-technical reader. */
  plainSummary: ReactNode;
  /** Explicit "why this is [value]" line, tying the work back to the value's own definition. */
  whyValue: ReactNode;
  prTable: PrRow[];
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
