This page sums up what Stream Connector does. Use any part on its own, or tie them together with
chains.

---

## TikTok

TikTok events reach Stream Connector through **TikFinity**, which handles the connection to your
live stream. Set TikFinity up once and point it at the app.

- Run a chain when someone sends a gift, with an optional gift count
- Run a chain when the stream's diamond total passes a number you set
- Filter gifts by diamond value, gifter level, and subscriber or moderator status

Events run their chains straight away, with nothing added in between.

---

## VRChat OSC

- Finds VRChat and your avatar's parameters on its own (OSCQuery)
- Sends and receives avatar parameters, with live values in the controls list
- Noise filters keep fast-changing parameters from flooding the log
- Reloads your avatar's controls when you change avatars

If a parameter exists on your avatar, a chain can drive it.

---

## Chains

Chains are where single actions become full automations.

- Run several steps in order, with a delay between them
- Drive avatar parameters and every enabled device from one chain
- Random chains pick their steps at random, with an optional step limit and repeat
- Queue chains by priority, or run them straight away
- Build and edit chains in the chain editor

You decide what happens and in what order.

---

## PiShock

- Realtime connection through PiShock's WebSocket v2 broker
- Shock, vibrate, and beep, plus pulse, burst, oscillation, random wobble, and your own patterns
- Owned or shared devices

All output is rate-limited, and nothing fires unless a chain tells it to.

---

## Intiface and Bluetooth devices

Stream Connector supports far more than vibration.

- Vibrate, oscillate, constrict, and inflate
- Linear depth and stroking (including strokers such as the Lovense Solace Pro)
- Rotation, with an optional alternating direction
- Multi-actuator devices driven together (for example, constrict and vibrate at once)
- Per-device mode, intensity, and duration in the chain editor
- Per-device motor selection on multi-actuator toys: drive only the actuators you pick, all of them, or a random subset that re-rolls each trigger (Selected / All Motors / Random Motors)
- A per-device Custom mode gives each motor its own waveform (vibrate, pulse, oscillation, constrict, ...) and its own intensity, all running at once
- Patterns: a list of steps, each with its own actuator, strength, length, and delay
- Buttplug v4, with automatic v3 fallback for older Intiface servers
- Live battery readout and on-demand device rescan

Each command goes to the right actuator, based on what the device says it can do.

---

## OwO haptics

- Play your `.owo` sensation files
- Build your own patterns: pick the muscles, strength, frequency, and timing for each step
- Continuous live-touch playback that re-queues for as long as a touch is held

The app talks to the OwO app on your PC or phone, which drives the vest.

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

- Connects over Bluetooth: switch the Coyote on, scan, and pick it
- An optional relay mode pairs by scanning a QR code in the DG-LAB app instead
- Both channels (A and B) are addressable independently
- Strength and frequency are set per chain, with waveform playback
- Each channel has a strength limit, and the app never goes above it

---

## SPS / OGB live-touch

VRChat reports where and how much an avatar is being touched through SPS / OGB contact parameters.
Stream Connector turns that into live device output, in real time and scaled to the touch level.

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
- Watched parameters skip the noise filters, so fast-changing values are never auto-muted

---

## Privacy and intimate use

Stream Connector is often used for private, high-control experiences, and it's built for that:

- Everything runs on your PC
- No cloud service needed
- No data collection
- Nothing happens that you didn't set up

Output stops as soon as you stop it or the triggering condition ends.

---

## External API

- Native Streamer.bot integration
- A local HTTP API for your own scripts and tools
- Trigger any chain by name

See the [External API guide](/docs/stream-connector-dev-guide-external-api) and the
[Streamer.bot guide](/docs/stream-connector-dev-guide-streamer-bot) for full integration details.
