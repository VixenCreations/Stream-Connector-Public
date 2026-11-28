Stream Connector isn't only for stream alerts. This page covers some of the other ways people use it.

---

## Slow, precise control

Every output runs through chains, so you can build exact, repeatable behaviour instead of one-off
triggers:

- Fine intensity control, per device and per step
- Slow escalation with patterns and step delays
- Timed sequences
- Random chains that still stay inside the limits you set

Nothing fires unless a chain tells it to.

---

## Safeguards

- The chain queue runs one chain at a time, in priority order
- Device output is rate-limited
- PiShock shocks on live touch are held to a fixed safety limit
- **Clear Queue** stops the running chain and drops everything waiting
- The PiShock **Emergency Stop** stops every PiShock device straight away

---

## Personal and interactive use

Stream Connector is also used for private, interactive setups, including expression-driven and
power-dynamic experiences. It handles these the same way as everything else:

- Everything runs on your PC
- No data collection
- Every action is opt-in, and you can stop it at any time

---

## VRChat avatar control

Chains can drive your avatar as well as your devices:

- Toggle clothing and accessories
- Step through visual states in order, with delays between them
- Reset parameters before or after a chain
- Drive avatar parameters from touch or any OSC input

---

## Several devices at once

When several devices are connected, one chain can drive them together:

- Drive every enabled device from one chain or one touch
- Pick which devices each chain uses, or let it pick at random
- Choose which motors run on multi-motor toys
