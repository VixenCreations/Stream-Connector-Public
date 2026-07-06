import './globals.css';
import Link from 'next/link';
import { SITE } from '@/lib/site.mjs';

const OG_IMAGE = {
  url: SITE.ogImage,
  width: SITE.ogImageWidth,
  height: SITE.ogImageHeight,
  alt: `${SITE.name} - ${SITE.tagline}`,
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    url: SITE.url,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export const viewport = { themeColor: '#0b0c10' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              <span className="dot" aria-hidden="true" />
              {SITE.name}
            </Link>
            <nav className="nav">
              <Link href="/docs">Docs</Link>
              <Link href="/docs/roadmap">Roadmap</Link>
              <a href={SITE.links.wiki} target="_blank" rel="noopener noreferrer">Wiki</a>
              <a href={SITE.links.vrchat} target="_blank" rel="noopener noreferrer">VRChat</a>
              <a href={SITE.links.repo} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={SITE.links.kofi} className="cta" target="_blank" rel="noopener noreferrer">Support</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <span>© {new Date().getFullYear()} Vixenlicious. In active re-development.</span>
            <div className="footer-links">
              <Link href="/docs">Docs</Link>
              <Link href="/docs/licensing">Licensing</Link>
              <Link href="/docs/terms-of-service">Terms</Link>
              <Link href="/docs/privacy-policy">Privacy</Link>
              <a href={SITE.links.wiki} target="_blank" rel="noopener noreferrer">Wiki</a>
              <a href={SITE.links.vrchat} target="_blank" rel="noopener noreferrer">VRChat Group</a>
              <a href={SITE.links.kofi} target="_blank" rel="noopener noreferrer">Ko-fi</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
