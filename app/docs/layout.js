import DocsSidebar from '@/components/DocsSidebar';
import { getGroupedDocs } from '@/lib/docs.mjs';

export default function DocsLayout({ children }) {
  const groups = getGroupedDocs();
  return (
    <div className="docs-shell">
      <DocsSidebar groups={groups} />
      <div className="docs-main">{children}</div>
    </div>
  );
}
