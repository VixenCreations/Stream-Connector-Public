import Link from 'next/link';
import { SITE } from '@/lib/site.mjs';

const FEATURES = [
  {
    title: 'TikTok Live',
    text: 'Respond to follows, gifts, likes, subscriptions, and comments. Event-driven and deterministic, with immediate execution.',
  },
  {
    title: 'Chain Logic Engine',
    text: 'Compose multi-step automations with delays, conditions, and branching in a visual editor. Define exactly what runs and when.',
  },
  {
    title: 'VRChat OSC',
    text: 'Live avatar parameter discovery and drift-free state tracking through OSCQuery, with no ghost values or desync.',
  },
  {
    title: 'SPS / OGB Live-Touch',
    text: 'VRChat contact parameters (SPS / OGB) drive every enabled output in real time, scaled to the live touch level.',
  },
  {
    title: 'Intiface / Bluetooth Devices',
    text: 'Full Buttplug command surface: vibrate, oscillate, constrict, inflate, linear depth, and rotation. Protocol v4 with automatic v3 fallback.',
  },
  {
    title: 'PiShock',
    text: 'Realtime WebSocket v2 support for shock, vibrate, and beep across owned or shared devices, gated and rate-limited by design.',
  },
  {
    title: 'OwO Haptics',
    text: 'Full vest control with pattern playback, visualizer sync, multi-device coordination, and continuous live-touch playback.',
  },
  {
    title: 'Streamer.bot + External API',
    text: 'A native, local-only Streamer.bot integration for Twitch, YouTube, and Kick, plus a documented HTTP API for external tools.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">In active re-development</span>
          <h1>{SITE.tagline}</h1>
          <p className="sub">
            A purpose-built, GUI-powered interactivity engine for streamers and avatar creators.
            It unifies live events, VRChat avatars, and connected hardware into a single, reactive
            logic pipeline, and it runs entirely on your machine.
          </p>
          <div className="hero-actions">
            <Link href="/docs" className="btn primary">Read the Docs</Link>
            <Link href="/docs/features" className="btn">Explore Features</Link>
            <a href={SITE.links.repo} className="btn" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-head">
            <h2>Everything, unified</h2>
            <p>One reactive engine that connects live events, avatars, and hardware through a single logic pipeline.</p>
          </div>
          <div className="grid">
            {FEATURES.map((f) => (
              <div className="card" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Built for real control</h2>
            <p>No forced workflows. No locked ecosystems. No cloud dependency. Everything runs locally.</p>
          </div>
          <div className="grid">
            <Link href="/docs/home" className="card">
              <h3>What it is</h3>
              <p>A modular, event-driven engine designed around explicit, repeatable behavior.</p>
            </Link>
            <Link href="/docs/features" className="card">
              <h3>Full feature list</h3>
              <p>Every supported system and integration, documented in one place.</p>
            </Link>
            <Link href="/docs/additional-uses" className="card">
              <h3>Beyond streaming</h3>
              <p>Advanced and non-streaming use cases the engine makes possible.</p>
            </Link>
          </div>

          <div className="cta-band">
            <h2>Project status: in active re-development</h2>
            <p>
              Stream Connector is currently being rebuilt and is not offered as a public product at
              this time. There is no public download or storefront listing. This site documents the
              current architecture and feature set while development continues. The public
              re-release and what is landing next are tracked on the roadmap.
            </p>
            <div className="hero-actions">
              <Link href="/docs/roadmap" className="btn primary">See the Roadmap</Link>
              <Link href="/docs" className="btn">Browse the Docs</Link>
              <a href={SITE.links.vrchat} className="btn" target="_blank" rel="noopener noreferrer">VRChat Group</a>
              <a href={SITE.links.repo} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
