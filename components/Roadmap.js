import Link from 'next/link';
import { ROADMAP_INTRO, STATUSES, ROADMAP, FOCUS, MILESTONES } from '@/lib/roadmap.mjs';

function StatusBadge({ status }) {
  const meta = STATUSES[status] || STATUSES.planned;
  return <span className={`status-badge status-${status}`}>{meta.label}</span>;
}

export default function Roadmap() {
  return (
    <div className="roadmap">
      <p className="lead">{ROADMAP_INTRO}</p>

      <div className="roadmap-legend" aria-label="Status key">
        {Object.entries(STATUSES).map(([key, meta]) => (
          <span className="legend-item" key={key}>
            <StatusBadge status={key} />
            <span className="legend-note">{meta.note}</span>
          </span>
        ))}
      </div>

      <h2>Next up</h2>
      <ol className="roadmap-timeline">
        {ROADMAP.map((item) => (
          <li className="roadmap-item" key={item.title}>
            <div className="rm-head">
              <h3>{item.title}</h3>
              <StatusBadge status={item.status} />
              <span className="rm-date">Release date: {item.date}</span>
            </div>
            <p className="rm-summary">{item.summary}</p>
            {item.points?.length ? (
              <ul className="rm-points">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      <h2>Ongoing focus</h2>
      <div className="grid">
        {FOCUS.map((f) => (
          <div className="card" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <h2>Recent milestones</h2>
      <ol className="milestones">
        {MILESTONES.map((m) => (
          <li className="milestone" key={m.version}>
            <div className="ms-head">
              <span className="ms-version">{m.version}</span>
              <StatusBadge status="shipped" />
              <span className="ms-title">{m.title}</span>
            </div>
            <ul className="ms-points">
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="roadmap-foot">
        Full detail lives in the <Link href="/docs/changelog">changelog</Link>. Dates are targets,
        not promises - this page tracks direction while the rebuild continues.
      </p>
    </div>
  );
}
