// Structured roadmap data. Rendered by components/Roadmap.js at /docs/roadmap.
// Keep this in sync with content/docs/changelog.md when a milestone ships.

export const ROADMAP_INTRO =
  'Stream Connector is in active re-development. This is the working roadmap: what has recently ' +
  'landed, what the engine is being built toward, and the dated items that are next. Because the ' +
  'project is being rebuilt, dates are targets and specifics can change as work progresses.';

// Status vocabulary. `key` maps to the CSS modifier (.status-<key>).
export const STATUSES = {
  planned: { label: 'Planned', note: 'Committed and specced, not started or in early work.' },
  progress: { label: 'In Progress', note: 'Actively being built right now.' },
  shipped: { label: 'Shipped', note: 'Landed in a release.' },
};

// Dated / named upcoming work. `date` is a human label ("TBD", "Q3 2026", ...).
export const ROADMAP = [
	{
		title: 'VixForge Haptics Nexus Release',
		status: 'planned',
		date: 'TBD',
		summary:
			'VixForge Haptics Nexus debuts as a dedicated, haptics-only sister application built on the unified v6/v7 execution engine. ' +
			'It omits streaming event sources for a lean footprint while introducing per-actuator hardware routing and high-frequency custom OSC triggers.',
		points: [
			'Compiles as a standalone edition, fully excluding TikTok, TikFinity, and Streamer.bot modules for a pure VRChat and hardware focus.',
			'Consolidates settings, saved devices, license state, controls, chains, and logs into a single local SQLite database (saved/app.db) that is easy to back up and easy to reset.',
			'Deploys a Custom OSC trigger system that bypasses standard rate limiters, evaluating arbitrary OSC addresses at ~15 Hz to drive live, proportional fan-out across Intiface, PiShock, and OwO continuous drives.',
			'Overhauls Intiface routing architecture to support per-actuator interval limits and stepping, enabling concurrent and distinct waveform modes on complex multi-actuator hardware.',
			'Consolidates OSC noise and nuclear filters into a WAL-enabled SQLite FilterStore with cache-first memory loading, completely eliminating per-message filesystem reads on the OSC hot path.',
			'Implements defense-in-depth actuation gating tied to offline license validation, alongside an internal OwO Review Mode that broadcasts to a visualizer via UDP for license-bypassed evaluations.',
			'Transitions system logging to a bounded SQLite sink that retains session history across runs, eliminating the legacy text-log scaffolding and production truncations.',
			'Integrates an edition-aware Discord Rich Presence utilizing a dedicated daemon thread and asyncio Proactor loop, ensuring the main OSC and hardware loops remain undisrupted.'
		],
	},
	{
		title: 'VixForge Stream Connector Release',
		status: 'planned',
		date: 'TBD',
		summary:
			'VixForge Stream Connector stands as the core live-streaming event ingestion powerhouse built on the unified v6/v7 execution engine. ' +
			'This milestone shifts focus to extreme high-throughput event processing, transitioning legacy configuration architectures to robust database backends and introducing dedicated workspace lifecycle management.',
		points: [
			'Maintains full orchestration of the live-streaming pipeline, preserving native, concurrent integration hooks for TikTok, TikFinity, and Streamer.bot event models.',
			'Centralizes parameter and OSC filters into a centralized SQLite database, replacing legacy JSON file structures to optimize performance and drastically reduce disk I/O overhead on the streaming hot path.',
			'Deploys an updated user interface specifically engineered for real-time visualization, manipulation, and live hot-reloading of active event parameter filters.',
			'Shares the unified v6/v7 single-database store (saved/app.db), keeping settings, saved devices, controls, chains, and logs in one local file with no cloud component.',
			'Overhauls workspace maintenance by introducing automated routines that route and isolate backup files into dedicated directories, preventing workspace decay during high-volume sessions.',
			'Isolates incoming WebSocket and webhook network loops into dedicated thread workers, safeguarding the core execution pipeline against latency spikes during sudden audience event floods.',
			'Migrates historical event and system logs into a bounded, session-persistent SQLite sink, deprecating text-log scaffolding and mitigating production disk bloat.',
			'Integrates the edition-aware Discord Rich Presence module via an independent asyncio Proactor loop, broadcasting live streaming connectivity status without blocking event execution pipelines.'
		],
	},
];

// Ongoing focus areas with no single ship date.
export const FOCUS = [
  {
    title: 'Stability',
    text: 'Keeping the execution engine dependable under sustained, heavy use - deterministic dispatch, no double-firing, reliable stop controls.',
  },
  {
    title: 'Broader device support',
    text: 'Widening the command surface and known-device coverage so more hardware works out of the box.',
  },
  {
    title: 'Deeper VRChat integration',
    text: 'More from OSCQuery and SPS / OGB: richer live-touch, cleaner avatar-change handling, and drift-free state.',
  },
  {
    title: 'Better Cyber Security',
    text: 'Constant on going efforts to monitor and remedy new CVE flaws in dependencies used.',
  },
];

// Shipped milestones, newest first. Mirrors content/docs/changelog.md.
export const MILESTONES = [
  {
    version: 'v7.5.0',
    title: 'GiggleTech, DG-LAB, and a plain-file rebuild',
    points: [
      'GiggleTech units are driven directly over your network, with no vendor router needed, and work in chains and live touch like any other device',
      'DG-LAB Coyote V3 on both channels, paired by QR code, with per-step strength and frequency and the device\'s own limits always respected',
      'Saved data is no longer encrypted and now lives in a single saved/app.db; the old encryption keyed off the same machine that held the file, and it made the app look like ransomware to antivirus engines',
      'Every release is signed, honestly described: a self-signed certificate buys a stable publisher identity, not SmartScreen trust',
      'Licensing eased off - 90 days offline instead of 14, a daily rather than constant re-check, and a server outage no longer locks you out',
      'PiShock no longer cuts out during a live touch, and the 14-day beta expiry is gone entirely',
      'TikTok events now arrive exclusively through TikFinity; Python 3.13 and a fully re-audited dependency set',
    ],
  },
  {
    version: 'v7.4.0',
    title: 'Live touch shapes and PiShock safety',
    points: [
      'Seven live touch shapes (Steady, Hold, Edge, Climb, Pace, Peak, Tease) decide how a device expresses a touch over time, separately from how hard it is, across every device family',
      'PiShock can shock from a live VRChat touch, off by default and held to a fixed safety envelope, with placement guidance shown right in the chain editor',
      'SPS / OGB zones no longer come up empty on avatars whose contact receivers VRChat leaves switched off until asked',
      'Long PiShock runs split into parts correctly and respect each shocker\'s own reported limits',
    ],
  },
  {
    version: 'v7.3.0',
    title: 'Instant hard stop, quieter log, update checks',
    points: [
      'Clear Queue now forces an immediate full stop on every connected device (Intiface, PiShock, and OwO), including long-running and parallel patterns - every running action halts within a fraction of a second',
      'The on-screen activity log no longer floods with connection status messages; device connect/disconnect and heartbeat events update the indicators quietly and are still recorded',
      'The app checks for updates on launch and shows a non-blocking notice with a one-click download link, plus a new Changelog button and docs that open in your browser',
    ],
  },
	{
    version: 'v7.2.0',
    title: 'Manage Filters UI, unified filters database, clean backups',
    points: [
      'New Manage Filters window on the OSC Controls tab lets you browse, search, add, and remove parameter filters directly, with changes taking effect immediately without a restart',
      'OSC filters now live in a single unified SQLite database (filters.db) instead of two separate JSON files, reducing disk reads and writes; existing files migrate automatically on launch',
      'Backup (.bak) copies of your chains and control layouts are now cleanly routed into dedicated backup/ subfolders rather than cluttering your active working directories',
    ],
  },
  {
    version: 'v7.1.0',
    title: 'Discord Rich Presence',
    points: [
      'Optional Discord Rich Presence shows what you are running - product logo, an elapsed timer, a live status line (Idle / Waiting for VRChat / Connected to VRChat), and Website + Join Discord buttons - through your local Discord app only',
      'Edition-aware: Stream Connector and VixForge Haptics Nexus each appear with their own name and logo',
      'Turn it on or off under Configuration -> Edit Config; it sends no data to VixForge and adds no network calls',
    ],
  },
	{
    version: 'v7.0.0',
    title: 'Custom OSC trigger, motor-selection modes, hard stop',
    points: [
      'New Custom OSC trigger - point a chain at ANY incoming OSC parameter (not just SPS / OGB) and drive every enabled output from it, with Continuous (scaled) and Threshold (one-shot) rows plus per-row deadzone and scale',
      'Per-device motor selection for multi-actuator toys: Selected, All Motors, or Random Motors (a random subset re-rolled each trigger / touch-start), plus a Custom mode that gives each motor its own waveform and intensity at once',
      'Clear Queue now stops the chain that is currently running - cancels its remaining steps, halts continuous live-drive, and stops all device output - not just the pending queue',
    ],
  },
  {
    version: 'v6.12.0',
    title: 'Persistent logs & a quieter footprint',
    points: [
      'Logs now persist across sessions in a size-capped local database instead of being wiped each launch',
      'Saved PiShock devices are kept only in the encrypted local database (no plain-text copy)',
      'Reduced behaviours that antivirus and sandbox tools flag - fewer file overwrites, no unsolicited local-network broadcasts',
    ],
  },
  {
    version: 'v6.11.0',
    title: 'Licensing & encrypted settings',
    points: [
      'VixForge Haptics Nexus gained one-time license activation with a 14-day offline grace window',
      'Stored settings moved to an encrypted, machine-bound local database (secure.db)',
      'Added the License & Usage Terms page and refreshed Security & Licensing',
    ],
  },
  {
    version: 'v6.10.0',
    title: 'Per-actuator tuning & multi-motor drive',
    points: [
      'Per-actuator Interval and Step boxes tune each motor on a device independently',
      'Multi-motor toys now expose and drive every motor, with collapsible per-device cards',
      'Custom SPS/OGB contact names, plus per-edition theming and OSCQuery connection fixes',
    ],
  },
  {
    version: 'v6.9.0',
    title: 'Live VRChat touch (SPS / OGB)',
    points: [
      'VRChat SPS / OGB contact parameters became a first-class input, driving hardware in real time',
      'Full Buttplug command surface (vibrate, oscillate, constrict, inflate, linear depth, rotation) on protocol v4 with v3 fallback',
      'Continuous and threshold touch modes fanning out to Intiface, OSC, PiShock, and the OwO vest',
    ],
  },
  {
    version: 'v6.2.0',
    title: 'External API & Streamer.bot engine',
    points: [
      'Dedicated loopback-only External Integration API (port 8840) with exec / info / list endpoints',
      'Rewritten Streamer.bot 1.0.x WebSocket listener with a typed event system and backoff reconnects',
      'Unified execution pipeline for HTTP and Streamer.bot events, hardened against duplicate and malformed-payload execution',
    ],
  },
];
