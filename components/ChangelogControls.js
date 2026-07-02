'use client';

import { useEffect, useState } from 'react';

export default function ChangelogControls({ versions }) {
  const [current, setCurrent] = useState(versions[0]?.id || '');
  const [showTop, setShowTop] = useState(false);

  // Highlight the version currently in view so the selector tracks scrolling.
  useEffect(() => {
    const headings = versions
      .map((v) => document.getElementById(v.id))
      .filter(Boolean);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [versions]);

  function jumpTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    setCurrent(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname);
  }

  if (!versions.length) return null;

  return (
    <>
      <div className="changelog-controls">
        <label htmlFor="version-select">Jump to version</label>
        <select
          id="version-select"
          value={current}
          onChange={(e) => jumpTo(e.target.value)}
        >
          {versions.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
        <span className="changelog-count">{versions.length} releases</span>
      </div>

      <button
        type="button"
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑ Top
      </button>
    </>
  );
}
