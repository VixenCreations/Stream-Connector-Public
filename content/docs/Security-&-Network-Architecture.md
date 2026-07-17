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

## TikTok gift images (outbound pull and cache)

When a gift icon is unknown or not yet cached, the application can fetch it from TikTok's CDN.

- Outbound only, over HTTPS on port `443`
- A standard HTTPS GET request
- Cached locally after retrieval to avoid repeat fetches

To avoid network fetches entirely, you can supply your own asset pack and force local mapping.

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
