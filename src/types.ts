import type { ReactNode } from "react";

export type PillStatus = "merged" | "open" | "unmerged";

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

export interface MetricFlowItem {
  value: string;
  label: string;
  variant?: "before" | "after";
}

export interface MetricFlow {
  items: MetricFlowItem[];
  note?: ReactNode;
}

export interface CaseStudy {
  title: string;
  ticket: string;
  lead: ReactNode;
  signalTag?: string;
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
