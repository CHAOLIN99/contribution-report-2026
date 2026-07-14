import type { StatItem } from "../types";

export function StatGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <div className={`n${stat.variant ? ` ${stat.variant}` : ""}`}>{stat.value}</div>
          <div className="l">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
