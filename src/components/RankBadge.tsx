export function RankBadge({ rank, score }: { rank: number; score: number }) {
  return (
    <a className="rank-badge" href="#ranking" title="Rank by value to Pattern">
      #{rank} · {score}/10
    </a>
  );
}
