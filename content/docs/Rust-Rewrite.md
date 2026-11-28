Stream Connector and VixForge Haptics Nexus are being rebuilt in Rust, with a new window. The aim is the same features and the same saved data on a faster, steadier base. This page shows where it's at.

> There's nothing to download yet. The current app keeps getting updates until the new one can do everything it does.

## How it's checked

Each part is run against the current app with the same inputs, step by step, and has to come out the same. That turned up real bugs in the current app too, like random chains that never ran and OwO patterns playing on the wrong muscles. Those fixes are in [v7.6.0](/docs/changelog#v7-6-0).

The new app reads the same `saved/app.db`, so your chains, controls and settings come with you.

## Where it's at

| Part | Status | Notes |
|---|---|---|
| Saved data | Done | Settings, filters, controls and chains, from the same `saved/app.db` |
| VRChat OSC | Done | Receiving, sending, filters, and finding VRChat |
| Avatar loading | Done | At startup and when you change avatars |
| Chains | Done | Steps, the queue, and random chains |
| Live touch (SPS / OGB) and Custom OSC | Done | Devices join in as each one is hooked into the app |
| Live touch shapes | Done | |
| Intiface Central | Built | Checked against a live Intiface Central. Not hooked into chains yet |
| PiShock | Built | Checked against a stand-in PiShock server. Not hooked into chains yet |
| OwO vest | Built | Try it on the OwO Controls test screen. Not hooked into chains yet |
| GiggleTech | Not started | |
| DG-LAB Coyote V3 | Not started | |
| Joystick TV | Built | New in the Rust app. Checked against a stand-in Joystick TV server. Streamers test it next |
| TikFinity, Streamer.bot, local API, Discord, update check, license | Not started | |

### Screens

| Screen | Status | Notes |
|---|---|---|
| OSC Controls | Done | Your avatar's parameters, sending, the filter manager and Save Layout |
| Chain Controls | Done | Running chains, the on/off switch, delete, groups, import, export, Clear Queue, and the chain editor with every device's settings and pattern tables |
| OwO Controls | Test screen | For trying the vest and your sensation files |
| Joystick TV | Built | Connect your channel, watch events come in, and send a test chat message |
| Configuration | Not started | |
| PiShock Controls | Done | Emergency Stop, claiming shared devices, refreshing devices, and a Test button for each device. It has its own login panel until the Configuration screen arrives |
| Support | Not started | |

## Progress log

### 2026-11-27

- The chain editor's Intiface and OwO pages, and the pattern tables for PiShock, Intiface and OwO. Pattern edits save with the chain.
- Checking the pattern tables against the current app turned up bugs in its pattern playback, including Intiface patterns that played every step at full power. Those fixes are in [v7.6.0](/docs/changelog#v7-6-0).

### 2026-11-26

- Joystick TV support, new in the Rust app. Sign in with your Joystick TV account, and tips, follows, subscriptions and chat commands can run your chains. A few streamers are testing it next.
- Chain Controls: Import, Export and Clear Queue.
- The PiShock Controls screen: Emergency Stop, claiming shared devices, refreshing devices, and a Test button for each device.
- The chain editor's PiShock, GiggleTech and DG-LAB pages.

### 2026-11-17

- The OSC Controls screen is done: your avatar's parameters, sending, the filter manager and Save Layout.
- Chain Controls: the chain list with its groups, running a chain, the on/off switch, and delete. Chains run in the background, so a long chain doesn't freeze the window.
- The chain editor: create and edit chains, with every trigger and the steps list. Device settings come to the editor as each device is hooked into the app. Until then it keeps whatever a chain already has saved for them.
- Checking the editor against the current app turned up four bugs in its chain editor, including one that cleared a chain's PiShock or Intiface devices when you saved while they were offline. Those fixes are in [v7.6.0](/docs/changelog#v7-6-0).

### 2026-11-16

- OwO vest support, with a test screen for sensations and your sensation files.

### 2026-11-15

- Intiface Central support, checked against a live Intiface Central.
- PiShock support, including shockers shared with you.
- Avatar changes, the same way the current app does them.

### 2026-11-14

- The base of the new app: saved data, VRChat OSC, live touch shapes, chains and live touch.
