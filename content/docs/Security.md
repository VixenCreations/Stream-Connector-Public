> **Security white paper.** This document describes Stream Connector's security posture, its network
> and runtime behavior, and the specific, legitimate implementation details that can cause antivirus
> and endpoint-protection engines to raise heuristic or machine-learning false positives. It is
> intended for security-conscious users, IT administrators, and anyone evaluating the application.

---

## 1. Summary

Stream Connector is a desktop application that runs locally on Windows. It does not depend on a
cloud service to function, performs no telemetry, opens no inbound internet listeners, and installs
no drivers, services, or autostart entries. All persistent state lives in a single `saved/` folder
alongside the executable.

Because the application is a packaged Python program that drives hardware, talks to several local
and remote services, and calls native Windows APIs, it exercises a number of behaviors that modern
antivirus heuristics associate with malware families. These behaviors are dual-use: they are common
to both legitimate automation software and to malicious tooling. This document explains each one and
why it is benign in this project.

---

## 2. Security posture

- **Local-first execution.** The engine runs entirely on the user's machine.
- **No telemetry.** No usage data, analytics, or crash reporting is transmitted.
- **No inbound exposure.** Local servers bind to `127.0.0.1`; nothing is reachable from outside the machine by default.
- **No elevation.** The application manifest requests `asInvoker`, so it runs with standard user privileges and does not request administrator rights.
- **No persistence.** No registry Run keys, scheduled tasks, services, or startup entries are created.
- **Fails closed.** If state cannot be validated, execution stops rather than continuing in an unknown state.

---

## 3. Runtime and build profile

| Property | Value |
| --- | --- |
| Language / runtime | Python 3.11 |
| Packager | PyInstaller 6.12 (one-file, windowed) |
| Compression | UPX disabled (no executable packing) |
| Code signing | Unsigned (no Authenticode certificate) |
| Privilege level | `asInvoker` (no elevation) |
| UI | Tkinter desktop GUI |
| Primary dependencies | Flask, websockets, websocket-client, python-osc, zeroconf, watchdog, requests, Pillow, TikTokLive, pythonnet |

The single-file build unpacks its bundled runtime to a temporary directory (`%TEMP%`) on launch and
executes from there. This is standard PyInstaller behavior and is itself a frequent source of
heuristic detections (see section 5.1).

---

## 4. Network surface

| Channel | Direction | Binding / endpoint | Purpose |
| --- | --- | --- | --- |
| Internal API (Flask) | Local | `127.0.0.1:8832` | Internal orchestration and UI actions |
| External API (Flask) | Local | `127.0.0.1:8840` | Triggers from local developer tools |
| OSC | Local | `127.0.0.1` UDP | VRChat parameter send/receive |
| OSCQuery / mDNS | Local network | zeroconf advertise + discover | VRChat OSC endpoint discovery |
| Intiface / Buttplug | Local | WebSocket to Intiface Central | Device control |
| Streamer.bot / TikFinity | Local | WebSocket | Event ingestion |
| PiShock | Outbound | WSS + HTTPS to PiShock broker | Real-time device commands (brokered platform) |
| TikTok | Outbound | HTTPS | Live event stream and gift-image CDN fetch |

Every endpoint is documented in [Network Architecture](/docs/security-network-architecture) and is
configurable in `saved/config/routing/endpoints.json`.

---

## 5. Why antivirus engines may flag Stream Connector

The behaviors below are legitimate and necessary for the application's function. Each entry lists the
observed behavior, the detection heuristics it commonly triggers, the related technique class that
engines key on, and why it is benign in this project. Detection names are representative examples of
the kind of generic, machine-learning, or heuristic verdicts that unsigned packaged-Python
applications routinely receive; they are false positives in this context.

### 5.1 PyInstaller one-file executable

- **Behavior:** The application ships as a single packaged executable that unpacks a bundled Python interpreter and dependencies to `%TEMP%` and runs from there.
- **Typical verdicts:** `Trojan:Win32/Wacatac.B!ml`, `Trojan:Win32/Bsymem`, `Wacatac`, `Zenpak`, `Sabsik`, `Heur.AdvML.B`, `ML.Attribute.HighConfidence`, `Gen:Variant`, `Static AI - Suspicious PE`.
- **Technique class:** Self-extraction and execution from a temporary directory (dropper-like pattern); bundled-interpreter execution (T1059).
- **Why it is benign:** This is the documented, default behavior of PyInstaller, which is used by a large number of legitimate applications. The same packaging method is also used by some malware, which is why the pattern alone (not the contents) drives these machine-learning verdicts. No payload is dropped to disk for persistence; the extracted files are the application's own runtime and are removed on exit.

### 5.2 Unsigned binary

- **Behavior:** The executable is not Authenticode-signed (`codesign_identity` is unset in the build).
- **Typical verdicts:** SmartScreen "Unknown Publisher" warnings, reputation-based blocks, and elevated heuristic scoring for low-prevalence files.
- **Technique class:** Absence of a trusted signature and low file reputation.
- **Why it is benign:** Code-signing certificates establish publisher reputation; they do not make code safe, and their absence does not make code malicious. Until a signing certificate and download prevalence are established, new builds are treated as low-reputation and scored more aggressively.

### 5.3 Native Windows API calls via ctypes

- **Behavior:** The application calls Win32 APIs directly through `ctypes`: `shell32!SetCurrentProcessExplicitAppUserModelID` (to set a stable taskbar identity) and `user32!LoadImageW` / `user32!SendMessageW` with `WM_SETICON` (to set the window and taskbar icon).
- **Typical verdicts:** Generic heuristic flags for direct native-API use from an interpreted process.
- **Technique class:** Native API (T1106).
- **Why it is benign:** These calls are limited to setting the application's own taskbar identity and icon. They do not inject into other processes, hook APIs, or modify system state.

### 5.4 Dynamic .NET assembly loading (pythonnet / CLR)

- **Behavior:** The OWO haptics SDK is distributed as a native .NET assembly (`OWO.dll`) and is loaded at runtime through pythonnet (`clr`, `System.Reflection`) rather than being statically linked.
- **Typical verdicts:** Heuristics for reflective or runtime assembly loading.
- **Technique class:** Reflective code loading (T1620).
- **Why it is benign:** The loaded assembly is the official OWO SDK, loaded from the application's own folder to talk to OWO hardware. Loading a vendor SDK at runtime is the supported integration method for that device.

### 5.5 Multiple local network listeners and WebSocket clients

- **Behavior:** The application binds local HTTP servers (Flask on `8832` and `8840`), opens UDP sockets for OSC, and maintains WebSocket connections to Intiface, Streamer.bot, and TikFinity.
- **Typical verdicts:** Heuristics for software that listens on sockets and maintains multiple persistent connections.
- **Technique class:** Application-layer and non-application-layer protocols (T1071, T1095).
- **Why it is benign:** All servers bind to `127.0.0.1` and are not reachable from outside the machine. The WebSocket clients connect only to services the user has configured (local device bridges and a remote device broker).

### 5.6 mDNS / zeroconf service advertising and discovery

- **Behavior:** To interoperate with VRChat's OSCQuery, the application advertises and discovers services on the local network using multicast DNS (zeroconf).
- **Typical verdicts:** Heuristics for network service discovery and LAN broadcast activity.
- **Technique class:** Network service discovery (T1046).
- **Why it is benign:** OSCQuery is the standard mechanism VRChat uses to publish and locate OSC endpoints. The advertisement is limited to the OSC service and contains no sensitive data.

### 5.7 Filesystem monitoring (watchdog)

- **Behavior:** The application watches its own configuration and avatar files with the `watchdog` library to support live hot-reload.
- **Typical verdicts:** Heuristics that associate broad filesystem monitoring with spyware or ransomware staging.
- **Technique class:** File and directory discovery / monitoring (T1083).
- **Why it is benign:** Monitoring is scoped to the application's own `saved/` configuration files, not user documents, and is used only to reload configuration when it changes.

### 5.8 Outbound encrypted connections

- **Behavior:** The application opens outbound TLS connections: secure WebSocket (WSS) and HTTPS to the PiShock broker, and HTTPS to TikTok for live events and gift images.
- **Typical verdicts:** Heuristics for encrypted command-and-control-style channels.
- **Technique class:** Encrypted channel (T1573).
- **Why it is benign:** These connections go to the documented PiShock and TikTok services that the corresponding features require. PiShock is a brokered platform and cannot be driven without its broker; TikTok event ingestion requires a connection to TikTok.

### 5.9 Cryptographic hashing

- **Behavior:** The application uses `hashlib` (SHA-256 and BLAKE2s) to hash configuration data for change detection and safe, deduplicated backups.
- **Typical verdicts:** Heuristics that score cryptographic-primitive usage in combination with the items above.
- **Technique class:** Use of cryptographic primitives.
- **Why it is benign:** Hashing is used for integrity and backup deduplication only. The current build performs no file encryption.

---

## 6. Deliberate choices that reduce false positives

- **No executable packing.** UPX is disabled, because packed executables raise heuristic scores.
- **No obfuscation.** The build is not obfuscated, keeping its behavior straightforward to analyze.
- **No elevation.** The manifest requests `asInvoker`; the application does not ask for administrator rights.
- **Documented surface.** Every port, protocol, and outbound destination is published in this document and in the Network Architecture page.

---

## 7. Verifying a build

For users who want to confirm a build independently:

1. **Submit it to a multi-engine scanner** such as VirusTotal. Expect that a small number of engines may report generic machine-learning verdicts; cross-reference those against the explanations in section 5.
2. **Compare file hashes** against the published hash for the release to confirm the file has not been altered.
3. **Allowlist the executable** in your antivirus if it is quarantined, after confirming its origin and hash.
4. **Report false positives** to your antivirus vendor; vendors correct generic false positives on submission, which also improves prevalence-based reputation over time.

---

## 8. What the application does not do

- No data collection, analytics, or telemetry
- No accounts or cloud login
- No inbound internet listeners
- No remote control of the host
- No persistence, autostart, services, or scheduled tasks
- No driver or kernel-mode components
- No self-updating or remote code download

---

## 9. Disclosure

Security questions and suspected vulnerabilities can be raised through the project's community
channels listed on this site. Responsible disclosure is appreciated, and confirmed issues are
addressed in the changelog.
