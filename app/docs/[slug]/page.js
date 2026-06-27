import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDoc, getDocSlugs, getDocMeta, getGroupedDocs } from '@/lib/docs.mjs';

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
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
  const doc = getDoc(params.slug);
  if (!doc) notFound();

  const ordered = orderedDocs();
  const idx = ordered.findIndex((d) => d.slug === doc.slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  return (
    <article>
      <div className="docs-breadcrumb">
        <Link href="/docs">Docs</Link> / {doc.title}
      </div>

      <div className="docs-intro">
        <h1>{doc.title}</h1>
        {doc.description ? <p className="lead">{doc.description}</p> : null}
      </div>

      <div className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />

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
