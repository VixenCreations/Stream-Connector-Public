import Link from 'next/link';
import { SITE } from '@/lib/site.mjs';

const FEATURES = [
  {
    title: 'TikTok Live',
    text: 'Run chains on gifts and on the stream\'s diamond total, delivered through TikFinity, with filters for gift value, gifter level, and subscribers or moderators.',
  },
  {
    title: 'Chains',
    text: 'Build multi-step automations with delays, random order, and priority queueing in the chain editor. You decide exactly what runs and when.',
  },
  {
    title: 'VRChat OSC',
    text: 'Finds VRChat and your avatar\'s parameters on its own through OSCQuery, and reloads your controls when you change avatars.',
  },
  {
    title: 'SPS / OGB Live-Touch',
    text: 'VRChat contact parameters (SPS / OGB) drive every enabled output in real time, scaled to the live touch level.',
  },
  {
    title: 'Intiface / Bluetooth Devices',
    text: 'Vibrate, oscillate, constrict, inflate, linear depth, and rotation, with per-motor control and patterns. Buttplug v4 with automatic v3 fallback.',
  },
  {
    title: 'PiShock',
    text: 'Shock, vibrate, and beep, built-in modes, and your own patterns, across owned or shared devices, all rate-limited.',
  },
  {
    title: 'OwO Haptics',
    text: 'Play your sensation files or build your own muscle patterns, plus continuous live-touch playback.',
  },
  {
    title: 'GiggleTech',
    text: 'Drives GiggleTech units directly over your network, with no vendor router in the middle. Add each unit by IP and use it anywhere a device can go.',
  },
  {
    title: 'DG-LAB Coyote',
    text: 'DG-LAB Coyote V3 over Bluetooth, on both channels, with strength and frequency per chain and a strength limit the app never goes above.',
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
            An interactivity app for streamers and avatar creators. It ties live events, VRChat
            avatars, and connected hardware together through chains you build, and it runs entirely
            on your PC.
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
            <p>One app that connects live events, avatars, and hardware through the chains you build.</p>
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
              <p>One app built around explicit, repeatable behavior.</p>
            </Link>
            <Link href="/docs/features" className="card">
              <h3>Full feature list</h3>
              <p>Every supported device and integration, documented in one place.</p>
            </Link>
            <Link href="/docs/additional-uses" className="card">
              <h3>Beyond streaming</h3>
              <p>Other ways people use it, beyond streaming.</p>
            </Link>
          </div>

          <div className="cta-band">
            <h2>Project status: in active re-development</h2>
            <p>
              Stream Connector is currently being rebuilt and is not offered as a public product at
              this time. There is no public download or storefront listing. This site documents the
              current feature set while development continues. The public
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
