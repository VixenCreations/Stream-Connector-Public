Stream Connector is in active re-development. This page summarizes the most recent direction of the
project and the major capabilities that have landed, with more work ongoing.

---

## What the project is

Stream Connector is a control engine. It executes logic deterministically, routes signals
intentionally, and does exactly what it is configured to do. The current focus of development is on
reliability, the breadth of device support, and live, reactive integration with VRChat.

---

## Recent milestone: live VRChat touch (v6.9.0)

This release made VRChat touch a first-class input. SPS / OGB contact parameters now drive real
hardware in real time.

### SPS / OGB live-touch

- Real-time output, scaled to the live touch level
- Fans out to all enabled outputs at once: Intiface, OSC, PiShock, and the OwO vest
- Continuous mode (scaled) and threshold mode (one-shot chain)
- Per-zone include and exclude, plus contact-type selection

### Full device command surface

- Vibrate, oscillate, constrict, and inflate
- Linear depth and stroking (including strokers such as the Lovense Solace Pro)
- Rotation with an optional alternating direction
- Multi-actuator devices driven together
- Buttplug v4 with automatic v3 fallback

### OwO and PiShock

- The OwO vest plays continuously while a touch is held
- PiShock vibrates proportionally to touch; on the live-touch path it is always vibrate, never shock

### Stability

- SQLite-based logging in place of scattered log files
- Device-race and routing fixes
- Windows taskbar icon fix

---

## Engine hardening (v6.3.0)

An earlier release focused entirely on making the engine dependable under sustained, heavy use.

- A unified execution pipeline with a single source of truth
- Strong protection against race conditions and double-firing
- Fail-closed safety logic and reliable stop controls
- Faster dispatch with lower thread contention

---

## Direction

Development continues with an emphasis on stability, broader device support, and deeper VRChat
integration. Because the project is being rebuilt, specifics are subject to change as work
progresses.
