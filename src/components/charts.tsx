import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { MetricFlow, PillStatus } from "../types";

/** Flips true one frame after mount, so bar widths transition in instead of popping. */
function useGrown() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return grown;
}

/** 0% until mounted, then the real percentage — so the bar transitions in. */
function growWidth(grown: boolean, pct: number): CSSProperties {
  return { width: grown ? `${pct}%` : "0%" };
}

function MetricPair({ value, label }: { value: string; label: string }) {
  return (
    <>
      <span className="mf-n">{value}</span>
      <span className="mf-l">{label}</span>
    </>
  );
}

/** Shared "+added/-removed" rendering, used by PrTable, RepoBreakdownTable, and DiffBar's tooltip. */
export function formatAddDel(added: number, removed: number) {
  return `+${added.toLocaleString()} / -${removed.toLocaleString()}`;
}

export function AddDel({ added, removed }: { added: number; removed: number }) {
  return (
    <>
      <span className="add">+{added.toLocaleString()}</span>{" "}
      <span className="del">-{removed.toLocaleString()}</span>
    </>
  );
}

// ---- Repo distribution ----
export function RepoBarChart({ rows }: { rows: { repo: string; count: number }[] }) {
  const grown = useGrown();
  const max = Math.max(...rows.map((r) => r.count));
  return (
    <div className="bar-chart" role="img" aria-label="Pull requests by repo">
      {rows.map((r) => (
        <div className="bar-row" key={r.repo}>
          <span className="bar-row-label">{r.repo}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={growWidth(grown, (r.count / max) * 100)}
              title={`${r.repo}: ${r.count} PRs`}
            />
          </div>
          <span className="bar-row-value">{r.count}</span>
        </div>
      ))}
    </div>
  );
}

// ---- Merged / open / closed stacked bar ----
export function StatusBar({
  segments,
}: {
  segments: { label: string; count: number; variant: PillStatus }[];
}) {
  const grown = useGrown();
  const total = segments.reduce((sum, s) => sum + s.count, 0);
  return (
    <div className="status-bar-wrap">
      <div className="status-bar-track" role="img" aria-label="PR status breakdown">
        {segments.map((s) => (
          <div
            key={s.label}
            className={`status-bar-seg seg-${s.variant}`}
            style={growWidth(grown, (s.count / total) * 100)}
            title={`${s.label}: ${s.count}`}
          />
        ))}
      </div>
      <div className="status-bar-legend">
        {segments.map((s) => (
          <span className="status-legend-item" key={s.label}>
            <span className={`dot dot-${s.variant}`} />
            {s.label} <b>{s.count}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---- Before → after compare bar (log-scaled when the ratio is large) ----
export function CompareBar({ metricFlow }: { metricFlow: MetricFlow }) {
  const grown = useGrown();
  const { before, after, extra } = metricFlow;
  const scale = (n: number) => Math.log10(Math.max(n, 1) + 1);
  const maxScale = Math.max(scale(before.raw), scale(after.raw)) || 1;

  return (
    <div className="compare-bar">
      {([
        ["before", before],
        ["after", after],
      ] as const).map(([variant, point]) => (
        <div className="compare-row" key={variant}>
          <span className={`mf-n ${variant}`}>{point.value}</span>
          <div className="compare-track">
            <div
              className={`compare-fill ${variant}`}
              style={growWidth(grown, (scale(point.raw) / maxScale) * 100)}
            />
          </div>
          <span className="mf-l">{point.label}</span>
        </div>
      ))}
      {extra?.map((item, i) => (
        <div className="compare-extra" key={i}>
          <MetricPair value={item.value} label={item.label} />
        </div>
      ))}
    </div>
  );
}

// ---- Inline added/removed diff bar for the repo breakdown table ----
export function DiffBar({ added, removed }: { added: number; removed: number }) {
  const grown = useGrown();
  const total = added + removed || 1;
  return (
    <span className="diff-bar" title={formatAddDel(added, removed)}>
      <span className="diff-bar-track">
        <span className="diff-bar-add" style={growWidth(grown, (added / total) * 100)} />
        <span className="diff-bar-del" style={growWidth(grown, (removed / total) * 100)} />
      </span>
    </span>
  );
}

// ---- Jump-to nav with scroll-spy highlighting ----
export function JumpNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const ref = useRef<HTMLElement[]>([]);

  useEffect(() => {
    ref.current = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ref.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav className="jump-nav" aria-label="Jump to section">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`jump-link${active === item.id ? " active" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
