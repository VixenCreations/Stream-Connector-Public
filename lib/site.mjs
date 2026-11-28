// Shared site constants. Imported by next.config.mjs and the docs library so the
// base path stays in one place.

// GitHub project pages serve from https://<user>.github.io/<repo>/, so the app
// needs this prefix on absolute internal URLs in production.
export const REPO_BASE = '/Stream-Connector-Public';

// Empty in dev (localhost root), the repo prefix in the exported production build.
export const BASE_PATH = process.env.NODE_ENV === 'production' ? REPO_BASE : '';

// Absolute production origin + project path (GitHub Pages, no custom domain). Used
// for absolute Open Graph / Twitter card URLs, which must be fully-qualified.
export const SITE_URL = `https://vixencreations.github.io${REPO_BASE}`;

export const SITE = {
  name: 'Stream Connector',
  tagline: 'The Ultimate Interactive Control Engine',
  description:
    'An interactivity app for streamers and avatar creators: TikTok Live through TikFinity, Streamer.bot, VRChat OSC and live touch, PiShock, Intiface, the OwO vest, GiggleTech and DG-LAB, tied together with chains and running on your PC.',
  url: SITE_URL,
  // Social share / SEO tile card (served from public/, 1536x657).
  ogImage: `${SITE_URL}/Webbanner.png`,
  ogImageWidth: 1536,
  ogImageHeight: 657,
  links: {
    wiki: 'https://github.com/VixenCreations/Stream-Connector-Public/wiki',
    repo: 'https://github.com/VixenCreations/Stream-Connector-Public',
    vrchat:
      'https://vrchat.com/home/group/grp_10099934-42e2-4ab4-bd7e-007f0709be5d',
    kofi: 'https://ko-fi.com/vixenlicous',
    discord: 'https://discord.com/invite/3vbJCKcPtJ',
    throne: 'https://throne.com/vixenlicious',
    gumroad: 'https://vixenlicous.gumroad.com/',
    toolbox: 'https://vixencreations.github.io/VixenToolBox/',
    latexUltra: 'https://vixenlicous.gumroad.com/l/latex-ultra',
    vixforgeToon: 'https://vixenlicous.gumroad.com/l/vixforge-toon',
    x: 'https://x.com/VixForge',
    youtube: 'https://www.youtube.com/@vixenlicious',
  },
  more: [
    ['discord', 'Discord'],
    ['vrchat', 'VRChat Group'],
    ['kofi', 'Ko-fi'],
    ['throne', 'Throne'],
    ['gumroad', 'Gumroad'],
    ['toolbox', 'VixenToolBox'],
    ['latexUltra', 'Latex Ultra'],
    ['vixforgeToon', 'VixForge Toon'],
    ['x', 'X'],
    ['youtube', 'YouTube'],
  ],
};
