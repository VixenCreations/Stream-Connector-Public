import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Lost in the chain</h1>
        <p className="sub">That page does not exist (or moved). Let&apos;s get you back on track.</p>
        <div className="hero-actions">
          <Link href="/" className="btn primary">Home</Link>
          <Link href="/docs" className="btn">Browse the Docs</Link>
        </div>
      </div>
    </section>
  );
}
