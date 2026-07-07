This page describes how Stream Connector is laid out on disk. Every persistent file lives under a
single `saved/` folder, which makes the application easy to back up and reset.

---

## Root

```
Stream Connector/
├── Stream Connector.exe
├── giftMapping.json
└── saved/
```

All important state lives in `saved/`. Removing that folder resets the application to a clean state.

---

## saved/

```
saved/
├── changelogs/
├── config/
├── controls/
├── logs/
└── userdata/
```

---

## saved/changelogs/

```
saved/changelogs/
└── version.json
```

Used by the in-app UI to display release history.

---

## saved/config/

```
saved/config/
├── dev.json            (debug toggle: selects logs_debug.db vs logs_prod.db)
├── user.json
├── devices/
│   ├── devices.json
│   └── intiface_devices.json
├── filters/
│   └── filters.db      (noisy + nuclear OSC filters; edit via Manage Filters)
├── owo/
└── routing/
    └── endpoints.json
```

Routing endpoints (OSC, Intiface, TikFinity, webhook, and Streamer.bot) are editable in
`routing/endpoints.json`.

---

## saved/controls/

```
saved/controls/
├── chains/
│   ├── *.json
│   └── backup/
├── export/
├── owo/
└── backup/
```

Each chain is stored as its own JSON file, with automatic backups.

---

## saved/logs/ (SQLite)

Logging uses a pair of SQLite databases with one table per module, rather than loose `.log` text
files. `dev.json` decides which database is used.

```
saved/logs/
├── logs_debug.db   (debug runs; appended)
└── logs_prod.db    (normal runs; truncated each launch)
```

---

## saved/userdata/

Holds a small local state file that is generated on first run and recreated automatically if it is
missing. It contains no account or remote credentials.

---

## Notes

- Everything persistent lives under `saved/`
- Logs are separated cleanly by subsystem
- If something fails, the logs record the cause
