'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const trim = (p) => (p && p !== '/' ? p.replace(/\/+$/, '') : p);

export default function DocsSidebar({ groups }) {
  const here = trim(usePathname());

  return (
    <aside className="docs-sidebar">
      <div className="group">
        <div className="group-title">Documentation</div>
        <Link href="/docs" className={here === '/docs' ? 'active' : ''}>
          All Docs
        </Link>
      </div>
      {groups.map(({ group, docs }) => (
        <div className="group" key={group}>
          <div className="group-title">{group}</div>
          {docs.map((d) => {
            const href = `/docs/${d.slug}`;
            return (
              <Link key={d.slug} href={href} className={here === href ? 'active' : ''}>
                {d.title}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
