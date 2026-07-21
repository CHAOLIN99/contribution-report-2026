import type { ReactNode } from "react";
import type { ValueDef } from "../types";

export function ValueSection({ def, children }: { def: ValueDef; children: ReactNode }) {
  return (
    <section className={`value-section value-section-${def.id}`} id={def.id}>
      <div className={`value-header value-header-${def.id}`}>
        <span className={`value-badge value-badge-${def.id}`}>{def.name}</span>
        <p className="value-official">“{def.officialLine}”</p>
        <p className="value-plain">{def.plainLine}</p>
      </div>
      {children}
    </section>
  );
}
