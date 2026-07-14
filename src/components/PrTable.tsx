import type { PrRow } from "../types";

const pillLabel: Record<PrRow["status"], string> = {
  merged: "Merged",
  open: "Open",
  unmerged: "Closed",
};

export function PrTable({ rows }: { rows: PrRow[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>PR</th>
            <th>Title</th>
            <th>Status</th>
            <th>Diff</th>
            <th>Opened</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.repo}-${row.number}`}>
              <td className="repo">{row.repo}</td>
              <td className="num">
                <a href={row.url}>#{row.number}</a>
              </td>
              <td className="title">{row.title}</td>
              <td className="pill-cell">
                <span className={`pill ${row.status}`}>{pillLabel[row.status]}</span>
              </td>
              <td className="loc">
                <span className="add">+{row.added}</span>{" "}
                <span className="del">-{row.removed}</span>
              </td>
              <td className="date">{row.opened}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
