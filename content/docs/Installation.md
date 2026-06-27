> **Project status:** Stream Connector is in active re-development and is not currently
> distributed as a public product. There is no public download or storefront listing at this time.
> The steps below describe how the application is set up and configured, for reference and for
> existing builds.

---

## Requirements

- Windows 10 or newer
- VRChat (optional, only if you use OSC)
- A TikTok account (optional)
- PiShock or OwO devices (optional)

---

## First launch

1. Extract the application folder to any location you choose.
2. Run `Stream Connector.exe`.
3. Approve the one-time Windows Firewall prompt if it appears, so the application can use its local OSC and WebSocket connections.
4. Let the application initialize its `saved/` folders on first run.

Stream Connector runs as a standard user and does not request administrator rights. The only system
prompt you may see on first launch is the Windows Firewall dialog for local network access. No
account, login, or activation step is required.

---

## Initial configuration

1. Open the dropdown menu in the top left.
2. Select **Configuration**.
3. Set only the integrations you intend to use.

Optional settings include:

- TikTok username (case sensitive)
- PiShock account and API key
- OSC (VRChat)

Any integration you do not use can be left blank without affecting the others.

---

## Streamer.bot integration (optional)

For automation across Twitch, YouTube, and Kick, connect Streamer.bot:

1. Install [Streamer.bot](https://streamer.bot/).
2. Extract and launch it.
3. Open **Servers / Clients > WebSocket Server**.
4. Start the server on `127.0.0.1:8080` (the default).
5. Stream Connector connects automatically and subscribes to events.

When connected, the WebSocket Server panel shows an active client and confirmed subscription.
For the full integration walkthrough, see the [Streamer.bot guide](/docs/stream-connector-dev-guide-streamer-bot).

---

## Importing the example actions

A starter Streamer.bot action is included in the application's `Streamer Kit/Streamerbot Example`
folder:

1. Open the export file in the example folder.
2. Select all of its contents and copy them.
3. In Streamer.bot, choose **Import** and paste the contents.
4. Confirm the import warning. Streamer.bot warns on any imported code by design; this is expected.
5. Edit the imported sub-action to target the chain you want to trigger.

---

## Notes

- Everything runs locally
- No cloud services are required
- No accounts are needed
- No usage tracking is performed

If something does not trigger as expected, check the logs first; the cause is almost always a
configuration setting that needs adjusting.
