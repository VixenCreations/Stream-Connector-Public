> **Project status:** Stream Connector is in active development and preparing for release. It is
> **not yet available for purchase** - store listings and activation are still being finalized, and the
> [pricing](/docs/pricing) shown is provisional and subject to change. This documentation describes the
> current architecture and feature set while work continues.

## The unified toolkit for VRChat, TikTok, and real-time interactivity

Stream Connector is an interactivity engine for creators, VTubers, and streamers who want
precise control over live reactions, device integrations, and real-time logic.

It connects:

- TikTok Live
- Streamer.bot (Twitch, YouTube, and Kick)
- VRChat OSC
- PiShock devices
- Intiface and Bluetooth devices
- OwO haptics
- External tools through a local HTTP API
- Custom logic chains

All of these run inside a single, unified system.

---

## What Stream Connector is

Stream Connector is a modular, event-driven engine rather than a plugin or a single-purpose tool.
It is designed to:

- React to live events immediately
- Drive hardware and avatars
- Translate live VRChat touch (SPS / OGB) into device output
- Build multi-step logic flows
- Run everything locally and predictably

---

## Editions

Stream Connector ships in two editions built from the same engine:

- **Stream Connector** - the full toolkit described above: TikTok Live, Streamer.bot
  (Twitch, YouTube, and Kick), VRChat OSC, PiShock, Intiface and Bluetooth devices, OwO,
  the external HTTP API, and the chain system.
- **VixForge Haptics Nexus** - a haptics-focused edition for VRChat. It keeps VRChat OSC and
  OSCQuery, SPS / OGB live-touch, Intiface and Bluetooth devices, PiShock, OwO, and the full
  chain system, but leaves out the livestreaming sources (no TikTok, TikFinity, or
  Streamer.bot). It is for people who only want VRChat touch driving real devices - a lighter,
  focused interface with its own dark-alloy theme.

Both editions share the same chains, device support, and SPS engine; the Haptics Nexus simply
hides the streaming layer. Each edition offers a free tier plus paid Pro and Lifetime tiers, licensed
and billed separately - see the [Pricing](/docs/pricing) page.

---

## Design principles

- No forced workflows
- No locked ecosystems
- Local-first execution
- Explicit, repeatable control

The engine is built for creators who want explicit, repeatable control rather than fixed presets.
