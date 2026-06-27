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

// Curated titles, blurbs, and grouping, keyed by slug. Order defines sidebar /
// index ordering within each group. Anything on disk without an entry here still
// renders, falling back to a prettified filename.
export const GROUPS = ['Core', 'Releases', 'Advanced / Reference', 'Developer Guides'];

const META = {
  home: { title: 'Overview', description: 'What Stream Connector is and what it does.', group: 'Core', order: 1 },
  installation: { title: 'Installation', description: 'Setup steps, requirements, and first launch.', group: 'Core', order: 2 },
  features: { title: 'Features', description: 'Core features and supported systems.', group: 'Core', order: 3 },
  'additional-uses': { title: 'Additional Uses', description: 'Advanced and non-streaming use cases.', group: 'Core', order: 4 },

  'upcoming-features': { title: 'Upcoming Features', description: "What's next on the roadmap.", group: 'Releases', order: 1 },
  changelog: { title: 'Changelog', description: 'Full version history, newest first.', group: 'Releases', order: 2 },

  'file-structure': { title: 'File Structure', description: 'How the app stores configs, logs, and assets.', group: 'Advanced / Reference', order: 1 },
  security: { title: 'Security', description: 'Security white paper: model, network surface, and antivirus false positives.', group: 'Advanced / Reference', order: 2 },
  'security-network-architecture': { title: 'Network Architecture', description: 'Data flow, services, ports, and architecture.', group: 'Advanced / Reference', order: 3 },
  faq: { title: 'FAQ', description: 'Common questions and quick answers.', group: 'Advanced / Reference', order: 4 },

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

export function getDocMeta(slug) {
  const meta = META[slug] || {};
  return {
    slug,
    title: meta.title || prettify(slug),
    description: meta.description || '',
    group: meta.group || 'Advanced / Reference',
    order: meta.order ?? 99,
  };
}

// Docs grouped and ordered for the index grid and the sidebar.
export function getGroupedDocs() {
  const docs = getDocSlugs().map(getDocMeta);
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

export function getDoc(slug) {
  const file = fileIndex()[slug];
  if (!file) return null;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
  const html = applyBasePath(marked.parse(rewriteWikiLinks(raw), { gfm: true, async: false }));
  return { ...getDocMeta(slug), html };
}
