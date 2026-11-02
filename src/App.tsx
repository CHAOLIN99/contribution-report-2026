import { StatGrid } from "./components/StatGrid";
import { ContributionCard } from "./components/ContributionCard";
import { contributions, roleLine, stats, summary } from "./data";

export function App() {
  return (
    <div className="page">
      <header className="masthead">
        <div className="brand-rule" />
        <h1>Wei Chao</h1>
        <p className="subhead">{roleLine}</p>
        <StatGrid stats={stats} />
        <p className="summary">{summary}</p>
      </header>

      {contributions.map((item) => (
        <ContributionCard item={item} key={item.id} />
      ))}

      <footer className="notes">
        <p>
          Wei Chao ·{" "}
          <a href="mailto:wei.chao@pattern.com">wei.chao@pattern.com</a>
        </p>
      </footer>
    </div>
  );
}
