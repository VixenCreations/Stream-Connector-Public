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
  exploring: { label: 'Exploring', note: 'Under consideration, shape not final.' },
  shipped: { label: 'Shipped', note: 'Landed in a release.' },
};

// Dated / named upcoming work. `date` is a human label ("TBD", "Q3 2026", ...).
export const ROADMAP = [
	{
    title: 'Discord Rich Presence Support',
    status: 'In Progress',
    date: 'TBD',
    summary:
      'A local Inter-Process Communication (IPC) integration that broadcasts your current Haptics Nexus routing state ' +
      'to your Discord profile, maintaining our strict zero-telemetry and no-account architecture.',
    points: [
      'Pushes dynamic states directly to your desktop Discord client via local named pipes-zero external servers required',
      'Real-time status updates reflecting active VRChat OSC connections, SPS/OGB live-touch engagements, and hardware routing',
      'Granular privacy toggles allowing you to broadcast specific hardware like Intiface or PiShock, or just a generic "Active" status',
    ],
  },
  {
    title: 'Stream Connector Public Re-Release',
    status: 'planned',
    date: 'TBD',
    summary:
      'Stream Connector edition returns as a public release, rebuilt on the hardened ' +
      'execution engine with the full streaming, VRChat, and hardware toolkit intact.',
    points: [
      'Public download restored for this edition',
      'Built on the unified, fail-closed execution engine hardened across the v6 line',
      'Ships as a sister app to VixForge Haptics Nexus edition',
    ],
  },
  {
    title: 'Audio Sync Trigger Type',
    status: 'exploring',
    date: 'TBD',
    summary:
      'A new trigger that reads a live audio signal and drives your outputs from it - sync haptics, ' +
      'OSC parameters, and chains to music, voice, or any sound source in real time.',
    points: [
      'Amplitude- and beat-reactive output, scaled the way the SPS / OGB live-touch path is',
      'Fans out to every enabled integration at once: Intiface, OSC, PiShock, and the OwO vest',
      'Continuous (scaled) and threshold (one-shot chain) modes, matching the SPS trigger',
    ],
  },
  {
    title: 'bHaptics Gear Support',
    status: 'exploring',
    summary:
      'Looking at bHaptics wearables (TactSuit and Tactosy gear) as another haptic output, driven ' +
      'by the same triggers and chains as the OwO vest.',
    points: [
      'Full-body and limb gear as a fan-out target alongside Intiface, OSC, PiShock, and OwO',
      'Driven from live VRChat touch and chain events',
    ],
  },
  {
    title: 'Razer Wyvern Haptics Support',
    status: 'exploring',
    summary:
      'Assessing Razer Wyvern haptic hardware as an output for chains and live touch, routed ' +
      'through the same trigger and chain system as every other device.',
    points: [
      'A fan-out target alongside the existing haptic outputs',
      'Driven from live VRChat touch and chain events',
    ],
  },
  {
    title: 'GiggleTech Haptics Support',
    status: 'exploring',
    summary:
      'Evaluating native GiggleTech support - OSC-driven pat and vibration hardware that reacts ' +
      'to VRChat proximity, wired into the same trigger and chain system.',
    points: [
      'Driven from SPS / OGB live touch and OSC proximity parameters',
      'A fan-out target alongside Intiface, OSC, PiShock, and OwO',
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
    version: 'v7.0.0',
    title: 'Custom OSC trigger, motor-selection modes, hard stop',
    points: [
      'New Custom OSC trigger - point a chain at ANY incoming OSC parameter (not just SPS / OGB) and drive every enabled output from it, with Continuous (scaled) and Threshold (one-shot) rows plus per-row deadzone and scale',
      'Per-device motor selection for multi-actuator toys: Selected, All Motors, or Random Motors (a random subset re-rolled each trigger / touch-start)',
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
