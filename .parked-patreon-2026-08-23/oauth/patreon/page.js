'use client';

import { useEffect, useState } from 'react';

// Patreon sends the browser back here after someone approves the connection.
// The page is static (GitHub Pages), so it never sees a client secret. It hands
// the one-time code to the copy of Stream Connector running on the same PC, and
// falls back to showing the code when it cannot reach it.

const LOCAL_PORTS = [8832, 8840];
const LOCAL_PATH = '/patreon/callback';

function readParams() {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  return {
    code: q.get('code') || '',
    state: q.get('state') || '',
    error: q.get('error') || '',
    errorDescription: q.get('error_description') || '',
  };
}

async function handOff(code, state) {
  for (const port of LOCAL_PORTS) {
    const url =
      `http://127.0.0.1:${port}${LOCAL_PATH}` +
      `?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;
    try {
      const res = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' });
      if (res.ok) return port;
    } catch {
      // Nothing listening on that port, or the browser refused the call.
    }
  }
  return null;
}

export default function PatreonCallback() {
  const [params, setParams] = useState(null);
  const [status, setStatus] = useState('working');
  const [port, setPort] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = readParams();
    setParams(p);

    if (p.error) {
      setStatus('denied');
      return;
    }
    if (!p.code) {
      setStatus('nocode');
      return;
    }

    let cancelled = false;
    handOff(p.code, p.state).then((hit) => {
      if (cancelled) return;
      setPort(hit);
      setStatus(hit ? 'delivered' : 'manual');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function copyCode() {
    if (!params?.code) return;
    navigator.clipboard?.writeText(params.code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false),
    );
  }

  return (
    <section className="container" style={{ padding: '72px 20px 96px', maxWidth: 720 }}>
      <span className="eyebrow">Patreon</span>

      {status === 'working' && (
        <>
          <h1 style={{ fontSize: 32, margin: '18px 0 10px' }}>Connecting…</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            Handing your Patreon connection back to Stream Connector.
          </p>
        </>
      )}

      {status === 'delivered' && (
        <>
          <h1 style={{ fontSize: 32, margin: '18px 0 10px' }}>You&rsquo;re connected</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            Stream Connector picked this up on port {port}. You can close this tab and
            head back to the app.
          </p>
        </>
      )}

      {status === 'manual' && (
        <>
          <h1 style={{ fontSize: 32, margin: '18px 0 10px' }}>Almost there</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            We couldn&rsquo;t reach Stream Connector on this PC, so paste this code into the
            app&rsquo;s Patreon box. Make sure the app is running first.
          </p>
          <div
            style={{
              margin: '18px 0',
              padding: '14px 16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: 15,
              wordBreak: 'break-all',
            }}
          >
            {params?.code}
          </div>
          <button type="button" className="btn" onClick={copyCode}>
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </>
      )}

      {status === 'denied' && (
        <>
          <h1 style={{ fontSize: 32, margin: '18px 0 10px' }}>Connection cancelled</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            Patreon said: {params?.errorDescription || params?.error}. Nothing changed on
            your account. Start again from the app whenever you like.
          </p>
        </>
      )}

      {status === 'nocode' && (
        <>
          <h1 style={{ fontSize: 32, margin: '18px 0 10px' }}>Nothing to do here</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            This page is where Patreon sends you after you connect your account. Open it
            from Stream Connector rather than directly.
          </p>
        </>
      )}
    </section>
  );
}
