import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { BASE_PATH } from './site.mjs';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');

export function slugify(name) {
  return name
    .replace(/\.md$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Stable anchor id for a heading's raw text, e.g. "v6.12.0" -> "v6-12-0".
export function headingId(raw) {
  return String(raw)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Curated titles, blurbs, and grouping, keyed by slug. Order defines sidebar /
// index ordering within each group. Anything on disk without an entry here still
// renders, falling back to a prettified filename.
export const GROUPS = ['Core', 'Releases', 'Advanced / Reference', 'Legal', 'Developer Guides'];

const META = {
  home: { title: 'Overview', description: 'What Stream Connector is and what it does.', group: 'Core', order: 1 },
  installation: { title: 'Installation', description: 'Setup steps, requirements, and first launch.', group: 'Core', order: 2 },
  features: { title: 'Features', description: 'Core features and supported systems.', group: 'Core', order: 3 },
  'additional-uses': { title: 'Additional Uses', description: 'Advanced and non-streaming use cases.', group: 'Core', order: 4 },

  roadmap: { title: 'Roadmap', description: "What's shipped, what's in progress, and what's next.", group: 'Releases', order: 1, virtual: true },
  changelog: { title: 'Changelog', description: 'Full version history, newest first.', group: 'Releases', order: 2 },

  'file-structure': { title: 'File Structure', description: 'How the app stores configs, logs, and assets.', group: 'Advanced / Reference', order: 1 },
  security: { title: 'Security', description: 'Security white paper: model, network surface, and antivirus false positives.', group: 'Advanced / Reference', order: 2 },
  'security-network-architecture': { title: 'Network Architecture', description: 'Data flow, services, ports, and architecture.', group: 'Advanced / Reference', order: 3 },
  faq: { title: 'FAQ', description: 'Common questions and quick answers.', group: 'Advanced / Reference', order: 4 },

  'security-licensing': { title: 'Security & Licensing', description: 'The two editions, their license models, and the security posture.', group: 'Legal', order: 1 },
  'license-usage-terms': { title: 'License & Usage Terms', description: 'End User License Agreement (EULA) and plain-English usage guidelines.', group: 'Legal', order: 2 },

  'stream-connector-dev-guide-external-api': { title: 'Dev Guide: External API', description: 'Integrate tools and plugins via the external API.', group: 'Developer Guides', order: 1 },
  'stream-connector-dev-guide-streamer-bot': { title: 'Dev Guide: Streamer.bot', description: 'Streamer.bot integration and event flow.', group: 'Developer Guides', order: 2 },
};

function prettify(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Map every markdown file to its slug once, so a slug can be resolved back to a
// real filename (filenames contain characters like "&" and "." that the slug drops).
function fileIndex() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.md'));
  const bySlug = {};
  for (const file of files) bySlug[slugify(file)] = file;
  return bySlug;
}

export function getDocSlugs() {
  return Object.keys(fileIndex());
}

// Slugs that render from a component instead of a markdown file (e.g. the roadmap).
export function getVirtualSlugs() {
  return Object.keys(META).filter((slug) => META[slug].virtual);
}

// Every routable doc slug: markdown files plus virtual pages.
export function getAllDocSlugs() {
  return [...new Set([...getDocSlugs(), ...getVirtualSlugs()])];
}

export function getDocMeta(slug) {
  const meta = META[slug] || {};
  return {
    slug,
    title: meta.title || prettify(slug),
    description: meta.description || '',
    group: meta.group || 'Advanced / Reference',
    order: meta.order ?? 99,
    virtual: meta.virtual || false,
  };
}

// Docs grouped and ordered for the index grid and the sidebar.
export function getGroupedDocs() {
  const docs = getAllDocSlugs().map(getDocMeta);
  return GROUPS.map((group) => ({
    group,
    docs: docs
      .filter((d) => d.group === group)
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
  })).filter((g) => g.docs.length > 0);
}

// Rewrite GitHub wiki URLs (any owner) to root-relative in-site doc routes before
// handing the markdown to the renderer. External links pass through.
function rewriteWikiLinks(md) {
  const wiki = /https?:\/\/github\.com\/[^/\s)"']+\/Stream-Connector-Public\/wiki\/([^)\s#"']+)(#[^)\s"']*)?/gi;
  return md.replace(wiki, (_match, page, anchor = '') => {
    const slug = slugify(decodeURIComponent(page));
    return `/docs/${slug}/${anchor}`;
  });
}

// Prefix the production base path onto root-relative links/assets in the rendered
// HTML. next/link handles this for React routes, but markdown-authored links go out
// as raw HTML, so they need it applied here. No-op in dev (BASE_PATH is empty).
function applyBasePath(html) {
  if (!BASE_PATH) return html;
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${BASE_PATH}/`);
}

// Render markdown to HTML, giving every heading a stable, de-duplicated anchor id
// so links and the changelog version selector can jump straight to it.
function renderMarkdown(md) {
  const renderer = new marked.Renderer();
  const seen = new Map();
  renderer.heading = (text, level, raw) => {
    const base = headingId(raw) || `section-${level}`;
    let id = base;
    if (seen.has(base)) {
      const n = seen.get(base) + 1;
      seen.set(base, n);
      id = `${base}-${n}`;
    } else {
      seen.set(base, 0);
    }
    return `<h${level} id="${id}">${text}</h${level}>\n`;
  };
  return marked.parse(md, { gfm: true, async: false, renderer });
}

export function getDoc(slug) {
  const file = fileIndex()[slug];
  if (!file) return null;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const html = applyBasePath(renderMarkdown(rewriteWikiLinks(raw)));
  return { ...getDocMeta(slug), html };
}

// Version headings (## vX.Y.Z) from the changelog, newest first, for the selector.
export function getChangelogVersions() {
  const file = fileIndex().changelog;
  if (!file) return [];
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const versions = [];
  const re = /^##\s+(v\d[^\n]*?)\s*$/gm;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const label = m[1].trim();
    versions.push({ id: headingId(label), label });
  }
  return versions;
}
