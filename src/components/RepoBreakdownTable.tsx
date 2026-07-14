import type { RepoBreakdownRow } from "../types";

export function RepoBreakdownTable({ rows }: { rows: RepoBreakdownRow[] }) {
  return (
    <div className="repo-summary">
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Total</th>
            <th>Merged</th>
            <th>Open</th>
            <th>Closed</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.repo}>
              <td className="repo-name">{row.repo}</td>
              <td>{row.total}</td>
              <td>{row.merged}</td>
              <td>{row.open}</td>
              <td>{row.closed}</td>
              <td>
                <span className="add">+{row.added.toLocaleString()}</span>{" "}
                <span className="del">-{row.removed.toLocaleString()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
