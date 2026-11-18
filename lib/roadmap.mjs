// Structured roadmap data. Rendered by components/Roadmap.js at /docs/roadmap.
// Keep this in sync with content/docs/changelog.md when a milestone ships.

export const ROADMAP_INTRO =
  'This is where Stream Connector is headed: what just landed, what is being worked on, and what ' +
  'comes next. Dates are targets, and details can change as the work goes on.';

// Status vocabulary. `key` maps to the CSS modifier (.status-<key>).
export const STATUSES = {
  planned: { label: 'Planned', note: 'Committed and specced, not started or in early work.' },
  progress: { label: 'In Progress', note: 'Actively being built right now.' },
  shipped: { label: 'Shipped', note: 'Landed in a release.' },
};

// Dated / named upcoming work. `date` is a human label ("TBD", "Q3 2026", ...).
export const ROADMAP = [
	{
		title: 'Rust Rewrite',
		status: 'progress',
		date: 'TBD',
		summary:
			'Stream Connector and VixForge Haptics Nexus are being rebuilt in Rust, with a new window. ' +
			'Each part is checked step by step against the current app, so it behaves the same. The Rust Rewrite page has the details.',
		points: [
			'Done: saved data, VRChat OSC, avatar loading, chains, live touch and live touch shapes',
			'Built: Intiface Central, PiShock and the OwO vest, not yet hooked into chains',
			'Screens: OSC Controls is done. Chain Controls is in progress, and the chain editor works',
			'Next: device settings in the chain editor, chain import and export, then Configuration, PiShock Controls and Support'
		],
	},
	{
		title: 'Easter eggs',
		status: 'planned',
		date: 'TBD',
		summary:
			'Trying to break the app on purpose? It might have something to say about that. ' +
			'Easter eggs are coming to both the current app and the new Rust app.',
		points: [
			'They change what the app says, never what it does. Anything that would break something is still caught, same as now',
			'An easter egg never sets off a device, and the stop buttons always stop right away'
		],
	},
	{
		title: 'VixForge Haptics Nexus Release',
		status: 'planned',
		date: 'TBD',
		summary:
			'VixForge Haptics Nexus is the haptics-only edition, for VRChat and your devices. ' +
			'It leaves out the streaming side, so it stays small and focused.',
		points: [
			'Works with Intiface Central, PiShock, the OwO vest, GiggleTech and DG-LAB Coyote V3',
			'Live touch from SPS / OGB, and a Custom OSC trigger that drives your devices from any avatar parameter',
			'Tune each motor on a toy separately, with its own Interval and Step',
			'Manage Filters lets you see and change which noisy avatar parameters the app ignores, with no restart',
			'Your settings, devices, controls, chains and logs live in one local file, saved/app.db, so backing up or starting fresh is easy'
		],
	},
	{
		title: 'VixForge Stream Connector Release',
		status: 'planned',
		date: 'TBD',
		summary:
			'VixForge Stream Connector is the full edition: everything in Haptics Nexus, plus your stream. ' +
			'Events from your stream can run chains and drive your devices.',
		points: [
			'TikTok gifts, subscriptions and diamond counts, through TikFinity',
			'Streamer.bot can run any chain, so its Twitch, YouTube, Kick and timer triggers can too'
		],
	},
];

// Ongoing focus areas with no single ship date.
export const FOCUS = [
  {
    title: 'Stability',
    text: 'Keeping the app steady through long, busy sessions, with chains that fire once and stop buttons that stop right away.',
  },
  {
    title: 'Broader device support',
    text: 'More devices, and more of what each device can do, working right out of the box.',
  },
  {
    title: 'Deeper VRChat integration',
    text: 'More from OSCQuery and SPS / OGB: richer live touch, smoother avatar changes, and values that stay in step with your avatar.',
  },
  {
    title: 'Better security',
    text: 'Watching for security fixes in the libraries the app uses, and updating them as fixes come out.',
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
