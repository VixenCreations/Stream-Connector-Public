Two editions, two models - so let's be precise.

**Stream Connector** (the full edition) is **free, local, and yours to control**: no keys, no
tiers, no activations, no servers deciding what you're "allowed" to do.

**VixForge Haptics Nexus** (the paid edition) requires a one-time license activation - a purchase
email + license key - after which it runs locally like everything else. Its full purchase terms
live on the [License & Usage Terms](/docs/license-usage-terms) page.

---

## License Model

**Stream Connector** operates under a permissive, MIT-style model.

- Free to use
- Free to modify
- Free to redistribute
- Free for personal or commercial projects

**VixForge Haptics Nexus** is a paid product with a single-user license.

- Activate once with your purchase email + license key
- Credentials stored encrypted and locally (machine-bound)
- Keeps working offline within a grace window between online re-checks
- No refunds (digital product) - see [License & Usage Terms](/docs/license-usage-terms)

Either way, it runs on your machine, under your control. The full terms for the paid edition are on
the [License & Usage Terms](/docs/license-usage-terms) page.

---

## Security Philosophy

Security here is boring by design - because boring security is reliable security.

- Local execution only
- No background services
- No cloud dependency
- No telemetry
- No forced updates

Nothing runs without you launching it. Nothing hides what it's doing.

**Paid-edition note:** the free Stream Connector edition never phones home. The paid VixForge
Haptics Nexus edition makes exactly one kind of outbound call for licensing - it contacts the
Gumroad license API to verify your key at activation and periodically afterward. It sends only your
license key and purchase email for that check. No telemetry, no analytics, no usage tracking.

---

## Network & Runtime Behavior

- Explicit WebSocket connections only
- No external listeners unless enabled
- All ports and endpoints are visible
- Fails closed, not open

If it's talking to something, you configured it. For the full technical breakdown, see the
[Network Architecture](/docs/security-network-architecture) page.

---

## Antivirus & Trust

All builds are scanned and validated through Windows Defender cloud reputation checks and standard
executable trust heuristics. There is no telemetry submission, no remote scanning, and no hidden
updater.

If your antivirus complains, it's because this software:

- Controls hardware
- Opens sockets
- Does real work
- Is designed to communicate in real time across interconnected software channels

Not because it's malicious.

---

## What This Does NOT Do

- No data collection
- No analytics
- No accounts
- No cloud login
- No remote kill switches

**Paid-edition note:** the one exception is licensing on VixForge Haptics Nexus - a purchase that is
refunded, charged back, or disputed will fail its license re-check and the paid edition will stop
operating. That is license enforcement, not telemetry or a remote kill switch on your data or your
machine.

You own your install. You own your data. You own the consequences.
