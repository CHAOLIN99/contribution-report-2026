import type { RepoBreakdownRow } from "../types";
import { AddDel, DiffBar } from "./charts";

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
                <DiffBar added={row.added} removed={row.removed} />
                <AddDel added={row.added} removed={row.removed} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
