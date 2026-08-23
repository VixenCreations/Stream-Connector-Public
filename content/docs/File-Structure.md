This page describes how Stream Connector is laid out on disk. Everything it saves lives under a
single `saved/` folder next to the executable, so the app is easy to back up and easy to reset.

---

## Root

```
Stream Connector/
├── Stream Connector.exe
└── saved/
```

Delete `saved/` and the app starts fresh. That is the whole reset procedure.

---

## saved/

```
saved/
├── app.db
├── config/
└── controls/
```

**`app.db` is the important one.** It is a single SQLite database holding your settings, your OSC
filters, your avatar control layouts, your chains, and the app's logs. Back up that one file and you
have your setup.

It is a plain, unencrypted database. Anything you put in it (a PiShock API key, a license key) is
readable by anything that can read the file, so treat it the way you would treat any other file in
your user profile.

> **Upgrading from 7.3.0 or earlier?** The app used to keep several separate databases and a folder
> of JSON files. On first launch it folds them all into `app.db` automatically. Your originals are
> kept in `saved/controls/backup/`, so nothing is thrown away.

---

## saved/config/

```
saved/config/
├── devices/
│   └── giggletech_devices.json   (your GiggleTech units: name, IP, port)
├── owo/
├── routing/
│   └── endpoints.json            (OSC, Intiface, TikFinity, webhook, Streamer.bot, GiggleTech, DG-LAB)
└── userdata/
```

Edit `endpoints.json` if you need to move a port or point the app at a different address. Everything
else in here the app manages for you.

GiggleTech units stay in a plain JSON file on purpose. They are LAN addresses, not secrets, and
keeping them editable makes it easy to fix a unit that changed IP.

---

## saved/controls/

```
saved/controls/
├── backup/
├── export/
└── owo/
```

- **`backup/`** holds automatic backups, including the pre-upgrade copies of your old chain files.
- **`export/`** is where Export writes to, and where you put a file to import.
- **`owo/`** holds your `.owo` sensation files.

Your live chains and control layouts are no longer loose JSON files. They live in `app.db` with
version history, which is why the old `chains/` folder is gone.

---

## Notes

- Everything persistent lives under `saved/`.
- Logs are in `app.db`, one table per part of the app, and they now survive across runs.
- If something fails, the logs record the cause.
