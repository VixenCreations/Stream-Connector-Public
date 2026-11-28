> **Project status:** Stream Connector is in active development and preparing for release. The
> current Python app is **free and fully unlocked**, in both editions. A paid
> [Rust app](/docs/rust-rewrite) is on the way, and its [pricing](/docs/pricing) is provisional and
> subject to change. This documentation describes the current feature set while work continues.

## The unified toolkit for VRChat, TikTok, and real-time interactivity

Stream Connector is an interactivity tool for creators, VTubers, and streamers who want
precise control over live reactions, device integrations, and real-time logic.

It connects:

- TikTok Live (through TikFinity)
- Streamer.bot (Twitch, YouTube, and Kick)
- VRChat OSC
- PiShock devices
- Intiface and Bluetooth devices
- GiggleTech units
- DG-LAB Coyote
- OwO haptics
- External tools through a local HTTP API
- Custom logic chains

All of these work together in one app.

---

## What Stream Connector is

Stream Connector is one app that reacts to events, rather than a plugin or a single-purpose tool.
It is designed to:

- React to live events immediately
- Drive hardware and avatars
- Translate live VRChat touch (SPS / OGB) into device output
- Build multi-step logic flows
- Run everything locally and predictably

---

## Editions

Stream Connector ships in two editions built from the same code:

- **Stream Connector** - the full toolkit described above: TikTok Live through TikFinity,
  Streamer.bot (Twitch, YouTube, and Kick), VRChat OSC, PiShock, Intiface and Bluetooth devices,
  GiggleTech, DG-LAB, OwO, the external HTTP API, and chains.
- **VixForge Haptics Nexus** - a haptics-focused edition for VRChat. It keeps VRChat OSC and
  OSCQuery, SPS / OGB live-touch, Intiface and Bluetooth devices, PiShock, GiggleTech, DG-LAB,
  OwO, and chains, but leaves out the livestreaming sources (no TikTok, TikFinity,
  or Streamer.bot). It is for people who only want VRChat touch driving real devices - a lighter,
  focused interface with its own dark-alloy theme.

Both editions share the same chains, device support, and live touch; the Haptics Nexus simply
leaves out the streaming parts. In the Python app, both editions are free and fully unlocked. The
upcoming Rust app has a free tier plus paid Pro and Lifetime tiers for each edition, licensed and
billed separately - see the [Pricing](/docs/pricing) page.

---

## Design principles

- No forced workflows
- No locked ecosystems
- Everything runs on your PC
- Explicit, repeatable control

It's built for creators who want explicit, repeatable control rather than fixed presets.
