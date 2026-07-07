This page summarizes what Stream Connector actually does. Each system below is modular and can be
used on its own or combined with the others through the chain engine.

---

## TikTok integration

- Live response to follows, gifts, likes, and comments
- Immediate, event-driven execution
- No artificial delays between event and action

If an event happens on stream, Stream Connector receives it and runs only the actions you have
configured for it.

---

## TikFinity engine

The TikFinity engine is the event core of the application.

- True event-driven execution
- Reliable chaining under sustained load
- State-aware logic
- Deterministic, repeatable behavior

It is designed so that the same input produces the same result every time.

---

## VRChat OSC

- Live avatar parameter discovery
- State tracking that does not drift
- No stale or "ghost" values
- No desynchronization between app and avatar

If a parameter exists on the avatar, the engine can drive it cleanly and repeatably.

---

## Chain logic system

The chain engine is where individual actions become full automations.

- Multi-step execution
- Delays, conditions, and branching logic
- A visual chain editor
- Clear, explicit ordering

You define what happens and in what order, rather than relying on implicit behavior.

---

## PiShock support

- Realtime WebSocket v2
- Shock, vibrate, and beep
- Owned or shared devices
- Centralized control logic

All output is gated and rate-limited, and nothing fires without explicit configuration.

---

## Intiface and Bluetooth devices

Stream Connector supports the full Buttplug command surface, not just basic vibration.

- Vibrate, oscillate, constrict, and inflate
- Linear depth and stroking (including strokers such as the Lovense Solace Pro)
- Rotation, with an optional alternating direction
- Multi-actuator devices driven together (for example, constrict and vibrate at once)
- Per-device mode, intensity, and duration in the chain editor
- Per-device motor selection on multi-actuator toys: drive only the actuators you pick, all of them, or a random subset that re-rolls each trigger (Selected / All Motors / Random Motors)
- A per-device Custom mode gives each motor its own waveform (vibrate, pulse, oscillation, constrict, ...) and its own intensity, all running at once
- Buttplug v4 protocol, with automatic v3 fallback for older Intiface servers
- Live battery readout and on-demand device rescan

Each command is routed to the correct actuator based on the device's reported capabilities.

---

## OwO haptics

- Full device control
- Pattern playback
- Visualizer synchronization
- Multi-device coordination
- Continuous live-touch playback that re-queues for as long as a touch is held

---

## SPS / OGB live-touch

VRChat reports where and how much an avatar is being touched through SPS / OGB contact parameters.
Stream Connector converts that into live device output, in real time and scaled to the touch level.

- Output ramps with the touch and stops when the touch ends
- Drives all enabled outputs at once: Intiface intensity, OSC parameters, PiShock vibrate, and the OwO vest
- Continuous mode scales each output to the live touch level
- Threshold mode fires the full chain once when the touch crosses a configured level, then re-arms
- Per-zone include and exclude, plus contact-type selection
- On the live-touch path, PiShock is limited to vibrate and is never live-shocked, by design

---

## Custom OSC trigger

Beyond the built-in SPS / OGB contacts, a chain can listen to **any** incoming OSC parameter and use
it as a live input - point it at your own avatar or world parameters and drive every enabled output
from them.

- Add as many parameters as you like, one row each (like the pattern editor)
- Each row is Continuous (scales the outputs to the live value) or Threshold (fires the whole chain
  once when the value crosses, then re-arms)
- Per-row deadzone and scale to shape how each parameter feels
- Fans out to every enabled integration at once: Intiface, OSC parameters, PiShock, and the OwO vest
- Watched parameters bypass the noise filters, so fast-changing values are never auto-muted

---

## Privacy and intimate use

Stream Connector is commonly used for private, high-control experiences, and it is built to support
that responsibly:

- Local-only execution
- No cloud dependency
- No data collection
- No hidden behavior

Every action is deliberate and reversible, and output stops as soon as you stop it or the
triggering condition ends.

---

## External API

- Native Streamer.bot integration
- A local HTTP API for external scripts and tools
- Event-driven, webhook-style triggering

See the [External API guide](/docs/stream-connector-dev-guide-external-api) and the
[Streamer.bot guide](/docs/stream-connector-dev-guide-streamer-bot) for full integration details.

---

## Design goals

Stream Connector prioritizes control, precision, reliability, and ownership. Behavior is explicit,
state is local, and the system does only what you configure it to do.
