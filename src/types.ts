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

export interface CaseStudy {
  id: string;
  navLabel: string;
  title: string;
  ticket: string;
  lead: ReactNode;
  signal: ReactNode;
  narrative: ReactNode[];
  flow: FlowStep[];
  metricFlow?: MetricFlow;
  result: ReactNode;
  prTable?: PrRow[];
}

export interface ThemeSection {
  title: string;
  description: ReactNode;
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
