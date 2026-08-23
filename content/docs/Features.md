This page summarizes what Stream Connector actually does. Each system below is modular and can be
used on its own or combined with the others through the chain engine.

---

## TikTok integration

TikTok events reach Stream Connector through **TikFinity**, which handles the connection to your
live stream. Set TikFinity up once and point it at the app.

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

## GiggleTech

GiggleTech units are driven straight over your network. You do not need the GiggleTech router
running.

- Add each unit by name, IP, and port (default `8888`)
- Works in chains and on the live-touch path, the same as every other device
- Motor output is scaled to protect the hardware, matching what the vendor's own router does
- Release always sends an explicit stop, so a motor can never be left running

---

## DG-LAB Coyote

Support for the DG-LAB Coyote V3, on both channels.

- Pair by scanning a QR code in the DG-LAB app
- Both channels (A and B) are addressable independently
- Strength and frequency are set per step, with waveform playback
- The device reports its own strength limits and the app never exceeds them

---

## SPS / OGB live-touch

VRChat reports where and how much an avatar is being touched through SPS / OGB contact parameters.
Stream Connector converts that into live device output, in real time and scaled to the touch level.

- Output ramps with the touch and stops when the touch ends
- Drives all enabled outputs at once: Intiface, OSC parameters, PiShock, GiggleTech, DG-LAB, and the OwO vest
- Continuous mode scales each output to the live touch level
- Threshold mode fires the full chain once when the touch crosses a configured level, then re-arms
- Per-zone include and exclude, plus contact-type selection

### Shapes

A shape decides *how* a device expresses the live touch over time, separately from how hard the
touch is. Pick one per chain, or per device family:

| Shape | What it feels like |
| --- | --- |
| **Steady** | Follows the touch directly. The original behaviour. |
| **Hold** | Keeps the last level when you stop moving. |
| **Edge** | Drops to nothing the moment you stop. |
| **Climb** | Builds the longer you keep moving, and resets when you stop. |
| **Pace** | Separate hits, closer together the faster you go. |
| **Peak** | One hit at each turn of a stroke, harder when it is fast. |
| **Tease** | Loudest when you are still and deep. |

### PiShock on live touch

PiShock defaults to vibrate on the live-touch path. You can turn on shock, and if you do, the app
holds it to a fixed safety envelope: each hit is the shortest the PiShock API accepts, with a
minimum gap of one second between hits, and your chain's Intensity is the hard ceiling. Placement
guidance is shown right in the editor.

---

## Custom OSC trigger

Beyond the built-in SPS / OGB contacts, a chain can listen to **any** incoming OSC parameter and use
it as a live input - point it at your own avatar or world parameters and drive every enabled output
from them.

- Add as many parameters as you like, one row each (like the pattern editor)
- Each row is Continuous (scales the outputs to the live value) or Threshold (fires the whole chain
  once when the value crosses, then re-arms)
- Per-row deadzone and scale to shape how each parameter feels
- Fans out to every enabled integration at once: Intiface, OSC parameters, PiShock, GiggleTech, DG-LAB, and the OwO vest
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
