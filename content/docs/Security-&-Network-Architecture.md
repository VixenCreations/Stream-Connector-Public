This page documents every part of Stream Connector's network surface. If the application uses a
port or makes an outbound connection, it is listed here. Features you do not use stay inactive.

---

## Configuration source of truth

Networking settings are local, user-owned, and editable. There is no cloud dashboard and no remote
configuration.

```
saved/config/routing/
  └── endpoints.json        (ports, hosts, and related network settings)
```

If you change ports, change them here; otherwise the defaults apply. Services bind to `127.0.0.1`
unless explicitly configured otherwise.

---

## OwO vest (local hardware, Bluetooth)

The OwO vest control path is hardware communication, not internet traffic.

- Pairs to the vest through the operating system's Bluetooth stack
- Sends commands through BLE characteristics
- Uses deterministic dispatch (busy locks and rate limiting)
- Never opens internet-facing listeners

### Visualizer path (optional)

If you enable a visualizer layer, it remains local and configurable. Depending on the visualizer
tool it may use UDP or HTTP, but the binding stays on `127.0.0.1`.

---

## GiggleTech (outbound to your LAN)

GiggleTech units are driven directly, with no vendor router in between.

- One UDP packet per unit, to the unit's own IP on port `8888` by default
- Outbound only; the app opens no listener for GiggleTech
- Addresses are yours to edit in `saved/config/devices/giggletech_devices.json`

---

## DG-LAB Coyote (outbound relay)

The DG-LAB Coyote pairs and receives commands through the vendor's relay, which is how the device is
designed to work.

- Outbound secure WebSocket to the DG-LAB relay
- Pairing is a QR code you scan in the DG-LAB phone app
- The device's own strength limits are read back and always respected

---

## Internal API (127.0.0.1:8832)

This is the application's internal control surface, used by the app to communicate with itself.

- Chain execution
- UI actions
- Internal orchestration

It is not publicly exposed and is not remotely routable.

---

## External API (127.0.0.1:8840)

This is the surface for developer tooling and controlled triggers, on the same machine.

- Local-only binding
- Strict payload validation
- No remote access by default

Exposing it beyond localhost is not part of the default configuration. See the
[External API guide](/docs/stream-connector-dev-guide-external-api) for usage details.

---

## PiShock networking (outbound only)

PiShock is a brokered platform, so it requires internet access:

- Outbound secure WebSocket (WSS) to the broker for real-time commands
- Outbound HTTPS for account and device discovery
- No inbound ports opened on your machine

---

## Safety and failure behavior

- Global execution locks
- Busy-state enforcement
- Rate limiting and cooldowns
- Hard stop paths
- Reconnect with backoff rather than tight retry loops
- Fail-closed behavior: if state cannot be validated, execution stops

---

## Summary

Stream Connector is local-first and explicit by design:

- No inbound internet exposure
- An auditable, documented network surface
- No hidden listeners or background connections
