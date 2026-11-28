## Is Stream Connector available to download right now?

Not at this time. The project is in active re-development and is not currently distributed as a
public product. There is no public download or storefront listing. This documentation covers the
current feature set while development continues.

---

## How much does it cost?

The Python app is free and fully unlocked, in both editions (Stream Connector and Haptics Nexus).
There is no license key and no paid tier. The upcoming [Rust app](/docs/rust-rewrite) is the paid
one; its prices are on the [Pricing](/docs/pricing) page.

---

## Does Stream Connector run in the cloud?

No. Everything runs on your PC, and nothing listens on the public internet. The app only goes
online for the services you set up (like PiShock), plus a small check once a day for a new version.

---

## Do I need to use every feature?

No. Each part works on its own. You can use any of these alone:

- VRChat only
- TikTok (through TikFinity) only
- Streamer.bot only
- OwO only
- PiShock only
- Intiface only
- GiggleTech only
- DG-LAB only
- Any combination, up to everything at once

---

## Can I use only VRChat?

Yes. OSC works on its own, with no TikTok or bot integration required.

---

## Can I use only TikTok?

Yes, with no VRChat required. TikTok events reach the app through **TikFinity**, so you set
TikFinity up once and point it at Stream Connector. There is no separate TikTok login in the app.

---

## Can VRChat touch drive my devices?

Yes. SPS / OGB contact parameters drive your devices in real time (Intiface, OSC parameters,
PiShock, GiggleTech, DG-LAB, and the OwO vest at once), scaled to the live touch level, and output
stops when the touch ends.

---

## Is it safe to run?

Yes, and it's predictable:

- Everything runs on your PC
- No ports opened to the internet
- No remote control
- No telemetry
- No background services
- No silent updates

Things happen because you set them up to.

---

## Can it damage or change my PC?

No. There are no kernel hooks, no driver installs, and no changes to Windows. The worst realistic
outcome is a setting that doesn't trigger the way you expected.

Device output is rate-limited, and PiShock shocks on live touch are held to a fixed safety limit.

---

## Where does my data go?

It stays on your PC, in the app's own folder:

```
Stream Connector/
└── saved/
    ├── app.db
    ├── config/
    └── controls/
```

`app.db` holds your settings, controls, chains, and logs. Delete the `saved/` folder and the app
starts fresh. The [File Structure](/docs/file-structure) page has the details.
