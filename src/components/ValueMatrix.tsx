import type { MatrixRow, ValueDef, ValueId, ValueScore } from "../types";
import { scoreLabel } from "../types";

/** Dots for a single cell: `score` filled of three, colored by value; score 0 is a faint dash. */
function ScoreCell({ value, score }: { value: ValueId; score: ValueScore }) {
  const title = `${scoreLabel[score]}${score ? ` (${score}/3)` : ""}`;
  if (score === 0) {
    return (
      <span className="mx-dots mx-dots-none" title="not applicable" aria-label="not applicable">
        ·
      </span>
    );
  }
  return (
    <span className={`mx-dots mx-dots-${value}`} title={title} aria-label={title}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`mx-dot${n <= score ? " on" : ""}`} />
      ))}
    </span>
  );
}

interface ValueMatrixProps {
  rows: MatrixRow[];
  values: ValueDef[];
  order: ValueId[];
  tally: { id: ValueId; weighted: number; touches: number }[];
}

export function ValueMatrix({ rows, values, order, tally }: ValueMatrixProps) {
  const defOf = (id: ValueId) => values.find((v) => v.id === id)!;
  const tallyOf = (id: ValueId) => tally.find((t) => t.id === id)!;

  return (
    <div className="matrix-wrap">
      <table className="matrix">
        <thead>
          <tr>
            <th className="mx-row-head">Contribution</th>
            {order.map((id) => (
              <th key={id} className="mx-col-head" scope="col">
                <span className={`mx-col-badge value-chip-${id}`}>{defOf(id).name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <th className="mx-row-label" scope="row">
                <a href={`#${row.id}`}>{row.label}</a>
                {row.ticket && <span className="mx-row-ticket">{row.ticket}</span>}
              </th>
              {order.map((id) => (
                <td
                  key={id}
                  className={`mx-cell${row.primary === id ? " mx-primary" : ""}`}
                >
                  <ScoreCell value={id} score={row.scores[id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="mx-row-label mx-total-label" scope="row">
              Weighted total
            </th>
            {order.map((id) => {
              const t = tallyOf(id);
              return (
                <td key={id} className="mx-cell mx-total">
                  <span className="mx-total-n">{t.weighted}</span>
                  <span className="mx-total-sub">{t.touches} of {rows.length}</span>
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
      <p className="matrix-legend">
        Each contribution is scored on all four values:{" "}
        <span className="mx-key">
          <span className="mx-dot on" />
          <span className="mx-dot on" />
          <span className="mx-dot on" />
        </span>{" "}
        primary ·{" "}
        <span className="mx-key">
          <span className="mx-dot on" />
          <span className="mx-dot on" />
          <span className="mx-dot" />
        </span>{" "}
        strong ·{" "}
        <span className="mx-key">
          <span className="mx-dot on" />
          <span className="mx-dot" />
          <span className="mx-dot" />
        </span>{" "}
        present · <span className="mx-none-key">·</span> not applicable. The
        highlighted cell in each row is that contribution's leading value. Click
        a row to jump to its detail. Weighted total sums each column's scores.
      </p>
    </div>
  );
}
