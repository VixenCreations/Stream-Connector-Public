import Link from 'next/link';
import { getGroupedDocs } from '@/lib/docs.mjs';

export const metadata = {
  title: 'Documentation',
  description: 'Setup, features, security, and developer guides for Stream Connector.',
};

export default function DocsIndex() {
  const groups = getGroupedDocs();
  return (
    <>
      <div className="docs-intro">
        <h1>Documentation</h1>
        <p className="lead">
          Everything you need to install, configure, and build with Stream Connector.
        </p>
      </div>

      {groups.map(({ group, docs }) => (
        <section className="section" style={{ padding: '24px 0' }} key={group}>
          <h2 style={{ fontSize: '1.1rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 14px' }}>
            {group}
          </h2>
          <div className="grid">
            {docs.map((d) => (
              <Link className="card" href={`/docs/${d.slug}`} key={d.slug}>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
