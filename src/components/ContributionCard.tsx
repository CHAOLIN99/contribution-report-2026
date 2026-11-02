import type { Contribution } from "../types";

export function ContributionCard({ item }: { item: Contribution }) {
  return (
    <article className="case" id={item.id}>
      <h2>{item.headline}</h2>
      <p className="big-number">{item.number}</p>
      <ul className="did-list">
        {item.did.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <h3 className="how-title">How it works (technical)</h3>
      {item.how.map((paragraph) => (
        <p className="narrative" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </article>
  );
}
