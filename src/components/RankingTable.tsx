import { rankedIds, rubricQuestions, rubrics, total } from "../ranking";

export function RankingTable({ labels }: { labels: Record<string, string> }) {
  return (
    <>
      <div className="rubric">
        {rubricQuestions.map((q, i) => (
          <div className="rubric-q" key={q.key}>
            <p className="rubric-head">
              <b>
                {String.fromCharCode(65 + i)}. {q.label}
              </b>{" "}
              <span>0–{q.max}</span>
            </p>
            <p>{q.question}</p>
            <p className="rubric-scale">{q.scale}</p>
          </div>
        ))}
      </div>
      <div className="table-wrap">
        <table className="rank-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Contribution</th>
              <th title="Business stakes">A</th>
              <th title="Proven in production">B</th>
              <th title="Size">C</th>
              <th title="Reach">D</th>
              <th>Score</th>
              <th>Deciding factor</th>
            </tr>
          </thead>
          <tbody>
            {rankedIds.map((id, i) => {
              const r = rubrics[id];
              return (
                <tr key={id}>
                  <td className="num">{i + 1}</td>
                  <td className="title">
                    <a href={`#${id}`}>{labels[id]}</a>
                  </td>
                  <td className="num">{r.stakes}</td>
                  <td className="num">{r.proven}</td>
                  <td className="num">{r.size}</td>
                  <td className="num">{r.reach}</td>
                  <td className="num">
                    <b>{total(r)}</b>
                  </td>
                  <td className="why">{r.why}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
