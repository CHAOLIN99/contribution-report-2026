import { useEffect, useRef, useState } from "react";
import type { MetricFlowItem, PillStatus } from "../types";

/** Flips true one frame after mount, so bar widths transition in instead of popping. */
function useGrown() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return grown;
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
              style={{ width: grown ? `${(r.count / max) * 100}%` : "0%" }}
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
            style={{ width: grown ? `${(s.count / total) * 100}%` : "0%" }}
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
export function CompareBar({ items }: { items: MetricFlowItem[] }) {
  const grown = useGrown();
  const before = items.find((i) => i.variant === "before" && i.raw !== undefined);
  const after = items.find((i) => i.variant === "after" && i.raw !== undefined);
  const rest = items.filter((i) => i !== before && i !== after);

  if (!before || !after) {
    // No numeric pair to chart — fall back to the plain stat row.
    return (
      <>
        {items.map((item, i) => (
          <span className="mf-item" key={i}>
            <span className="mf-n">{item.value}</span>
            <span className="mf-l">{item.label}</span>
          </span>
        ))}
      </>
    );
  }

  const scale = (n: number) => Math.log10(Math.max(n, 1) + 1);
  const maxScale = Math.max(scale(before.raw!), scale(after.raw!)) || 1;

  return (
    <div className="compare-bar">
      {[before, after].map((item) => (
        <div className="compare-row" key={item.label}>
          <span className={`mf-n ${item.variant}`}>{item.value}</span>
          <div className="compare-track">
            <div
              className={`compare-fill ${item.variant}`}
              style={{ width: grown ? `${(scale(item.raw!) / maxScale) * 100}%` : "0%" }}
            />
          </div>
          <span className="mf-l">{item.label}</span>
        </div>
      ))}
      {rest.map((item, i) => (
        <div className="compare-extra" key={i}>
          <span className="mf-n">{item.value}</span>
          <span className="mf-l">{item.label}</span>
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
    <span className="diff-bar" title={`+${added} / -${removed}`}>
      <span className="diff-bar-track">
        <span
          className="diff-bar-add"
          style={{ width: grown ? `${(added / total) * 100}%` : "0%" }}
        />
        <span
          className="diff-bar-del"
          style={{ width: grown ? `${(removed / total) * 100}%` : "0%" }}
        />
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
