import type { Scored, ValueDef, ValueId } from "../types";

/** The per-contribution value read-out: a 4-axis score strip plus one earned line per value. */
export function ValueScorecard({
  item,
  values,
  order,
}: {
  item: Scored;
  values: ValueDef[];
  order: ValueId[];
}) {
  const defOf = (id: ValueId) => values.find((v) => v.id === id)!;
  return (
    <div className="scorecard">
      <div className="scorecard-strip">
        {order.map((id) => {
          const score = item.scores[id];
          return (
            <div
              key={id}
              className={`sc-axis${score === 0 ? " sc-axis-off" : ""}${
                item.primary === id ? " sc-axis-primary" : ""
              }`}
            >
              <span className={`sc-axis-name value-chip-${id}`}>{defOf(id).name}</span>
              <span className={`mx-dots mx-dots-${id}`} aria-label={`${score} of 3`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`mx-dot${n <= score ? " on" : ""}`} />
                ))}
              </span>
            </div>
          );
        })}
      </div>
      <ul className="scorecard-lines">
        {item.valueLines.map((r) => (
          <li key={r.value} className={`why-value why-value-${r.value}`}>
            <b>{defOf(r.value).name}</b> {r.line}
          </li>
        ))}
      </ul>
    </div>
  );
}
