## Is Stream Connector available to download right now?

Not at this time. The project is in active re-development and is not currently distributed as a
public product. There is no public download or storefront listing. This documentation covers the
current architecture and feature set while development continues.

---

## Does Stream Connector run in the cloud?

No. Nothing runs in the cloud, nothing contacts a remote server on its own, and nothing listens on
the public internet. Everything runs locally on your machine.

---

## Do I need to use every feature?

No. Every system is modular. You can use any subset on its own:

- VRChat only
- TikTok only
- Streamer.bot only
- OwO only
- PiShock only
- Intiface only
- Any combination, up to everything at once

Nothing forces you into a feature you do not want.

---

## Can I use only VRChat?

Yes. OSC works standalone, with no TikTok or bot integration required.

---

## Can I use only TikTok?

Yes. TikTok events flow directly into Stream Connector actions, with no VRChat required.

---

## Can VRChat touch drive my devices?

Yes. SPS / OGB contact parameters feed the live-touch engine. In-game touch drives your devices in
real time (Intiface, OSC, PiShock, and the OwO vest at once), scaled to the live touch level, and
stops when the touch ends.

---

## Is it safe to run?

Yes, and more importantly it is predictable:

- Local-only execution
- No inbound ports opened to the internet
- No remote control
- No telemetry
- No background services
- No silent updates

Actions happen because you configured them to.

---

## Can it damage or modify my system?

No. There are no kernel hooks, no driver installs, and no persistent system modifications. The
worst realistic outcome is a misconfiguration that does not trigger as expected.

The engine is also built with rate limits, cooldowns, safety gates, and hard execution caps to keep
behavior controlled.

---

## Where does my data go?

It stays on your machine. All state lives inside the application's own folder:

```
Stream Connector/
└── saved/
    ├── config/
    ├── controls/
    ├── logs/
    └── userdata/
```

Removing that folder resets the application to a clean state.
