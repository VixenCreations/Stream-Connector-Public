import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getDoc,
  getAllDocSlugs,
  getDocMeta,
  getGroupedDocs,
  getChangelogVersions,
} from '@/lib/docs.mjs';
import Roadmap from '@/components/Roadmap';
import ChangelogControls from '@/components/ChangelogControls';

export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const meta = getDocMeta(params.slug);
  return { title: meta.title, description: meta.description };
}

// Flattened, ordered list of docs for prev/next navigation.
function orderedDocs() {
  return getGroupedDocs().flatMap((g) => g.docs);
}

export default function DocPage({ params }) {
  const meta = getDocMeta(params.slug);
  const doc = meta.virtual ? { ...meta, html: null } : getDoc(params.slug);
  if (!doc) notFound();

  const ordered = orderedDocs();
  const idx = ordered.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const versions = doc.slug === 'changelog' ? getChangelogVersions() : [];

  return (
    <article>
      <div className="docs-breadcrumb">
        <Link href="/docs">Docs</Link> / {doc.title}
      </div>

      <div className="docs-intro">
        <h1>{doc.title}</h1>
        {doc.description ? <p className="lead">{doc.description}</p> : null}
      </div>

      {doc.slug === 'changelog' ? <ChangelogControls versions={versions} /> : null}

      {meta.virtual && doc.slug === 'roadmap' ? (
        <Roadmap />
      ) : (
        <div
          className={doc.slug === 'changelog' ? 'prose changelog-prose' : 'prose'}
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      )}

      <nav className="docs-pager">
        {prev ? (
          <Link className="prev" href={`/docs/${prev.slug}`}>
            <span className="label">Previous</span>
            {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link className="next" href={`/docs/${next.slug}`}>
            <span className="label">Next</span>
            {next.title}
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
