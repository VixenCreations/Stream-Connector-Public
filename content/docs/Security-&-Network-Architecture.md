This page lists every port and connection Stream Connector uses. If the app opens a port or makes an
outbound connection, it's listed here. Features you don't use stay off.

---

## Where the settings live

Network settings are local and yours to edit. There is no cloud dashboard and no remote
configuration.

```
saved/config/routing/
  └── endpoints.json        (ports, hosts, and related network settings)
```

If you change ports, change them here; otherwise the defaults apply. Local services bind to
`127.0.0.1`.

---

## OwO vest (your local network)

The vest pairs with the **OwO app** on your PC or phone. Stream Connector sends sensations to that
app; it never talks to the vest directly.

- Finds the OwO app with a broadcast on your local network
- Sends sensations over UDP, port `54020`
- Opens no internet-facing listener

---

## GiggleTech (outbound to your LAN)

GiggleTech units are driven directly, with no vendor router in between.

- One UDP packet per unit, to the unit's own IP on port `8888` by default
- Outbound only; the app opens no listener for GiggleTech
- Addresses are yours to edit in `saved/config/devices/giggletech_devices.json`

---

## DG-LAB Coyote (Bluetooth)

By default the Coyote connects straight to your PC over Bluetooth.

- Bluetooth LE only, nothing over the internet
- Each channel has a strength limit, and the app never goes above it

### Relay mode (optional)

If you switch DG-LAB to relay mode, the app connects through the vendor's relay instead.

- Outbound secure WebSocket to the DG-LAB relay
- Pairing is a QR code you scan in the DG-LAB phone app

---

## Internal API (127.0.0.1:8832)

The app's own control surface, used by the app and by local tools.

- Lists and runs chains and avatar parameters
- Not reachable from other machines

---

## External API (127.0.0.1:8840)

The surface for your own scripts and tools, on the same machine.

- Local-only binding
- Checks every request for a provider and a command
- No remote access by default

Exposing it beyond localhost is not part of the default configuration. See the
[External API guide](/docs/stream-connector-dev-guide-external-api) for usage details.

---

## PiShock (outbound only)

PiShock is a brokered platform, so it needs internet access:

- Outbound secure WebSocket (WSS) to the broker for real-time commands
- Outbound HTTPS for account and device lookups
- No inbound ports opened on your machine

---

## Update check (outbound)

Once a day, and whenever you ask it to check, the app downloads a small `version.json` file from this site to see whether a new
version is out. It sends nothing about you or your setup, and it never downloads or installs
anything else.

---

## License check

The free Python app makes no license calls, in either edition. The paid Rust app will check your
license with the Gumroad license API when you activate it, then from time to time after that.

---

## Safety

- One chain runs at a time, in priority order
- Device output is rate-limited
- Hard stops: Clear Queue and the PiShock Emergency Stop
- Reconnects wait longer after each failure instead of retrying in a tight loop
- A setting the app can't read never drives a device

---

## Summary

- Nothing is exposed to the internet
- Every connection is listed on this page
- No hidden listeners or background connections
