import type { MatrixRow, ValueDef } from "../types";

const scoreWord: Record<number, string> = { 3: "primary", 2: "strong", 1: "present" };

/** Per-value read-back of the matrix: which contributions earn each value, ranked by score. */
export function ValueLens({
  def,
  rows,
  weighted,
}: {
  def: ValueDef;
  rows: MatrixRow[];
  weighted: number;
}) {
  const scored = rows
    .filter((r) => r.scores[def.id] > 0)
    .sort((a, b) => b.scores[def.id] - a.scores[def.id]);

  return (
    <section className={`lens value-section-${def.id}`} id={def.id}>
      <div className="lens-head">
        <span className={`value-badge value-badge-${def.id}`}>{def.name}</span>
        <span className="lens-score">
          <b>{weighted}</b> pts · {scored.length} contributions
        </span>
      </div>
      <p className="value-official">“{def.officialLine}”</p>
      <p className="value-plain">{def.plainLine}</p>
      <div className="lens-chips">
        {scored.map((r) => (
          <a
            key={r.id}
            href={`#${r.id}`}
            className={`lens-chip value-chip-${def.id}${
              r.primary === def.id ? " lens-chip-primary" : ""
            }`}
            title={`${scoreWord[r.scores[def.id]]} (${r.scores[def.id]}/3)`}
          >
            <span className={`mx-dots mx-dots-${def.id}`} aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`mx-dot${n <= r.scores[def.id] ? " on" : ""}`} />
              ))}
            </span>
            {r.label}
          </a>
        ))}
      </div>
    </section>
  );
}
