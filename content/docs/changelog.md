Full version history for Stream Connector. Newest releases first.

> This log mirrors the changelog shipped inside the app (Docs → Changelog).
> Offline-safe, no telemetry, no cloud.

## v7.2.0

- **Feature:** New Manage Filters window - open it from the OSC Controls tab (the 'Manage Filters' button next to 'Filter Selected') to browse, search, add, and remove the parameter filters the app uses to mute chatty or tracking-only OSC. Pick a category (three Noisy buckets and two Nuclear buckets), search within it, add a pattern with Enter, remove selected rows, and double-click a noisy row to toggle whether it is sanitized. Changes take effect right away, no restart needed.
- **Improvement:** Your OSC filters now live in a single filters database (filters.db) instead of two separate JSON files. This means fewer disk reads and writes while the app is running (nothing is re-read from disk on every incoming OSC message anymore), which keeps things a touch lighter and reduces the app's on-disk footprint. Your existing filter files are imported automatically on first launch and kept as .migrated backups.
- **Bugfix:** Backup (.bak) copies of your chain and control-layout files are now saved into their proper 'backup' folders (for example VixForge Haptics Nexus\saved\controls\chains\backup) instead of being dropped next to the live files. Your working folders stay clean.
- **Dev:** New FilterStore (plaintext SQLite, WAL) replaces noisy_parameters.json / nuclear.json; the noisy filter is now cache-first (removed a per-message getmtime syscall from the OSC hot path) and the nuclear filter no longer runs a watchdog file-watcher (a module-level reload hook is used instead). New _backup_file() helper routes all .bak copies into sibling backup/ folders with timestamped names.
- **Dev:** Application version bumped to 7.2.0 across the executable manifest and version info (MINOR - feature addition).

## v7.1.0

- **Feature:** Discord Rich Presence - while the app is open, your Discord status can show that you are running Stream Connector (or VixForge Haptics Nexus), with the product logo, an elapsed timer, a live status line (Idle / Waiting for VRChat / Connected to VRChat), and Website + Join Discord buttons. It is completely optional and best-effort: if Discord is not running, nothing changes and no error is shown.
- **Improvement:** The Rich Presence is edition-aware - each edition uses its own Discord app and its own logo, so Stream Connector and VixForge Haptics Nexus each appear with the correct name and icon.
- **Feature:** Discord Rich Presence can be turned on or off in the app under Configuration → Edit Config with the 'Show Discord Rich Presence' checkbox; the change takes effect immediately. You can also hide it from Discord's own Activity Privacy settings, or simply not run Discord.
- **Privacy:** Rich Presence talks only to your local Discord app over its normal on-device link; it sends no data to VixForge and adds no network calls. The status text is generic (it never includes your avatar, chains, or device details).
- **Dev:** New DiscordPresence worker (pypresence over the local Discord IPC pipe) runs on its own thread; edition-aware DISCORD_CLIENT_ID and DISCORD_LARGE_IMAGE constants; the website link is shared via a single WEBSITE_URL constant used by both the presence button and the in-app icon bar.
- **Dev:** Application version bumped to 7.1.0 across the executable manifest and version info (MINOR - feature addition).

## v7.0.0

- **Feature:** New Custom OSC trigger - point a chain at ANY incoming OSC parameter (not just the built-in SPS / OGB touch contacts) and drive every enabled output from it. Add a row per parameter with a '+ Add Parameter' button, just like the pattern editor.
- **Feature:** Each Custom OSC parameter row can be Continuous (scales all enabled outputs - Intiface, OSC, PiShock, OwO - to the live value) or Threshold (fires the whole chain once when the value crosses, then re-arms when it drops).
- **Feature:** Continuous rows have their own Deadzone (below this value the row contributes nothing) and Scale (multiplier applied before driving, clamped to 0-1), so you can shape how each parameter feels.
- **Feature:** New per-device Motors mode for Intiface toys with more than one actuator - choose Selected (only the checked actuators), All Motors (every actuator on the device), or Random Motors (a random subset of the checked actuators, re-rolled each time the chain fires or a live touch begins) for more varied experiences.
- **Feature:** New per-device 'Custom' mode for multi-motor toys - give each actuator its own waveform (vibrate, pulse, burst, oscillation, randomized wobble, or constrict) and its own intensity, all running at once, for maximum flexibility.
- **Bugfix:** The Clear Queue button now also stops the chain that is currently running - it cancels the running chain's remaining steps, halts continuous SPS / Custom OSC live-drive, and stops all Intiface / PiShock / OwO output. Previously it only emptied the pending queue and left the active chain playing.
- **Dev:** Custom OSC trigger uses a dedicated watch path that bypasses the noise/rate filters (like SPS) so rapidly-changing parameters are never auto-muted; running chains observe a cancel generation so Clear interrupts them deterministically even with several chains in flight.
- **Dev:** Application version bumped to 7.0.0 across the executable manifest and version info. Per the updated versioning policy, milestone / roadmap feature additions now bump the MAJOR version.

## v6.12.0

- **Improvement:** Logs now keep their history across sessions instead of being wiped on every launch - each run is separated by a 'session start' marker, so you can review what happened on previous runs. The log database is capped so it stays small and fast.
- **Improvement:** On VixForge Haptics Nexus the chain buttons now use the edition's gold / ember theme instead of the violet Stream Connector colour, so the whole window matches.
- **Bugfix:** The Windows taskbar and title-bar icon now shows the app icon reliably (reverted to the approach that always worked).
- **Security:** Your saved PiShock devices are now always kept in the encrypted local database - the app no longer writes a plain-text copy under saved/config/devices.
- **Housekeeping:** The app no longer creates an unused saved/changelogs folder (the changelog lives in the Docs page you are reading).
- **Security:** Reduced several behaviours that antivirus and malware-sandbox tools flag - fewer repeated overwrites of your saved files, and no local-network broadcasts unless a feature that needs one is explicitly enabled.
- **Dev:** Application version bumped to 6.12.0 across the executable manifest and version info.

## v6.11.0

- **Feature:** VixForge Haptics Nexus now requires a one-time license activation. Enter the email and license key from your purchase under Configuration → License; the app opens but nothing fires (no OSC, PiShock, Intiface, or OwO output) until the license is valid.
- **Feature:** A License indicator was added to the status bar (Haptics Nexus only) showing Licensed / Unlicensed at a glance.
- **Feature:** After activating once online, the app keeps working offline for up to 14 days between successful online re-checks, so a dropped connection won't lock you out. A refunded or disputed purchase deactivates on the next online check.
- **Security:** Your stored settings now live in an encrypted local database (saved/config/secure.db) instead of plain-text files. Your PiShock credentials, saved PiShock/Intiface devices, avatar list, and license are encrypted at rest and tied to your machine. Existing user.json / device files are imported automatically and the old plain-text copies are renamed to *.migrated.
- **Improvement:** Activation runs on a background thread so the window never freezes while it checks your key, and startup no longer waits on the network to open.
- **Docs:** Added a License & Usage Terms page (single-user EULA, no-refunds policy, and usage guidelines for the paid Haptics Nexus edition) and updated the Security & Licensing page to reflect the license activation.
- **Dev:** Application version bumped to 6.11.0 across the executable manifest and version info.

## v6.10.1

- **Improvement:** The OSC status indicator now shows 'Connected' as soon as VRChat is found through OSCQuery, instead of only while avatar parameters happen to be streaming in - so a live VRChat link is reflected even when you are sitting in a menu or otherwise not sending steady OSC traffic.
- **Improvement:** The indicator drops back out of 'Connected' when VRChat goes away (its OSCQuery service disappears) and comes back automatically when VRChat returns, so the status no longer gets stuck showing connected after you close VRChat.
- **Dev:** Track VRChat presence via zeroconf add/remove of its _oscjson._tcp service (new vrchat_lost event); the OSC heartbeat treats an OSCQuery-confirmed link as connected in addition to recent inbound traffic.

## v6.10.0

- **Feature:** Per-actuator Interval and Step boxes in the chain editor - each actuator on an Intiface device (for example a Max's vibrator and its air-pump constrict) can be tuned independently.
- **Feature:** Per-actuator Interval sets a minimum time between commands to that actuator (default 0.5s) - it caps how fast the actuator is driven so slower hardware like air pumps is not overloaded, while a vibrator can update faster. Updates that arrive too quickly are smoothed to the latest value, and stopping always takes effect immediately.
- **Feature:** Per-actuator Step sets the stepping granularity for the Oscillation and Constrict modes (for example air-pump constrict 1 to 3, vibrator 0 to 20), so a multi-motor toy ramps each motor at its own resolution at the same time.
- **Feature:** Each actuator's Step box now shows and enforces that actuator's EXACT hardware step count (read live from your connected toy, with a bundled device database covering ~500 devices as a fallback for saved or offline toys) - so you can't set more steps than the hardware actually has.
- **Feature:** SPS trigger now accepts custom contacts - a Custom box lets you type your own comma-separated OGB/SPS contact names to watch alongside the built-in ones.
- **Improvement:** Per-actuator interval limiting applies to both the live SPS touch drive and the stepped chain modes.
- **Improvement:** VixForge Haptics Nexus no longer shows the TikFinity branding icon (it has no streaming sources).
- **Improvement:** The app now identifies itself by its product name when connecting to external services - Intiface Central, PiShock, VRChat (OSCQuery), and the external API - so the VixForge Haptics Nexus edition shows up as 'VixForge Haptics Nexus' instead of 'Stream Connector'. (OWO is identified by its registered game ID and is unchanged.)
- **Improvement:** VixForge Haptics Nexus now uses its own Dark Alloy + gold/ember theme; Stream Connector keeps its violet/teal theme.
- **Bugfix:** Fixed the taskbar icon showing the default Python icon - the installed app now reads its icon from its own executable (where it is baked in per edition during build) and applies it to the correct top-level window, instead of relying on a temporary file that the packaged build did not always unpack.
- **Bugfix:** Per-actuator Interval is now honored in plain Vibrate mode too - the level is re-asserted at the configured interval so each motor is commanded at its own rate (and kept alive), instead of a single command that the interval never affected.
- **Bugfix:** Multi-motor toys with several motors of the same type (e.g. a 2-motor vibrator, or a Lovense Edge) now expose EVERY motor individually - previously only the first was shown and driven. Each motor has its own checkbox, interval, and step.
- **Improvement:** The chain editor's Intiface devices are now collapsible cards (one row per motor) so the list stays tidy even with many devices; already-configured devices open automatically.
- **Bugfix:** Per-device Intiface settings (mode, selected actuators, motion params, and the new per-actuator interval/step) now persist correctly across restarts - they were previously being discarded on load.
- **Bugfix:** Fixed VRChat / OSCQuery apps failing to connect to us ('Could not make new OscClient'). The OSCQuery web service is now started and confirmed listening before it is advertised, automatically uses a free port if the default is busy, and survived request errors gracefully.
- **Bugfix:** Fixed the advertised OSC port - VRChat is now told to send OSC to the port we actually listen on, so avatar parameters arrive reliably once connected.
- **Dev:** Interval limiting is a coalescing trailing throttle at the driver level (_drive_one_scalar / _flush_actuator); stop paths clear pending sends so a release is never undone.
- **Dev:** Application version metadata bumped to 6.10.0 across the executable manifest and version info.

## v6.9.0

- **Feature:** New SPS/OGB live-touch trigger - VRChat SPS/OGB contact parameters now drive your devices in real time based on where and how much you are being touched.
- **Feature:** SPS continuous mode drives EVERY enabled integration at once (Intiface + OSC + PiShock + OwO), all scaled to the live touch level.
- **Feature:** SPS threshold mode fires the entire chain (OSC + PiShock + OwO + Intiface) once when the touch crosses a level you set, then re-arms when released.
- **Feature:** Per-zone SPS filtering - include or exclude specific contact zones and choose which contact types (TouchOthers, PenOthers, Depth, etc.) count toward the touch level.
- **Feature:** OSC parameters can be driven live by touch - numeric params follow the touch 0 to 1, bool and forced-int params hold while touched, and every param resets on release.
- **Feature:** PiShock can be driven live by touch - vibrates proportionally to how much you are touched (throttled, and ALWAYS vibrate, never shock, for safety).
- **Feature:** The OwO haptic vest now plays continuously for as long as the touch is held (re-queued back-to-back) instead of firing a single burst.
- **Feature:** Full Buttplug command support - vibrate, oscillate, constrict, and inflate, plus linear depth/position (strokers such as the Lovense Solace Pro) and rotation, all routed by actuator kind.
- **Feature:** New Intiface device modes - Stroke (oscillates depth between two points) and Rotate (directional spin with optional alternating direction).
- **Feature:** Multi-actuator drive - multi-motor toys (for example constrict + vibrate) are now driven together from a single chain.
- **Feature:** Per-device Intiface configuration in the chain editor - each selected device gets its own mode, intensity, and duration, with a live battery readout and on-demand rescan.
- **Feature:** Buttplug v4 protocol support with automatic fallback to v3 for older Intiface servers.
- **Feature:** Added known-device profiles (including the Lovense Solace Pro) so depth and rotation capabilities are recognized out of the box; live capabilities still come from Intiface at runtime.
- **Feature:** Configurable routing - OSC / Intiface / TikFinity / webhook / Streamer.bot endpoints are now editable in saved/config/routing/endpoints.json.
- **Improvement:** OSCQuery detection improved with live endpoint discovery and idempotent service advertising for a more reliable VRChat connection.
- **Improvement:** Live avatar changes now run the full avatar load (OSC bridge, controls, chains, re-grid, and persistence) instead of a partial refresh, fixing inconsistent state after switching avatars.
- **Improvement:** Continuous SPS drive for Intiface and OSC is level-gated (re-sends only when the touch level changes) so it stays smooth and never floods VRChat or your devices.
- **Improvement:** PiShock live-drive uses overlapping hold windows so the buzz tracks the touch without gaps.
- **Improvement:** OwO continuous playback never blocks live touch processing and winds down within one cycle after release - the vest is never force-disconnected.
- **Improvement:** OSC sending unified through a lazy OSC bridge with a raw-client fallback (for when no avatar is loaded or a param is not yet in the OSCQuery cache) and a single always-fire auto-reset.
- **Bugfix:** Fixed the Windows taskbar showing the default Python/interpreter icon instead of the Stream Connector logo - the app now sets an explicit AppUserModelID before the window is shown.
- **Bugfix:** Fixed the window/taskbar icon failing to load on 64-bit Windows (the icon handle was being truncated); the logo now loads reliably in both the installed build and source runs.
- **Bugfix:** Fixed Intiface under-counting devices (for example showing 2 of 3 connected toys) - devices are now merged individually as they connect, with automatic post-connect rescans.
- **Bugfix:** Fixed a device-registry race that could send commands to the wrong device or crash with a dictionary-changed-size error during avatar or chain activity.
- **Bugfix:** Fixed actuator routing being clobbered when an SPS, random, or manual-control drive overlapped a running chain.
- **Bugfix:** Fixed invalid OSC value types being sent to VRChat - unknown values now coerce to float and real booleans are sent as booleans.
- **Bugfix:** Fixed v4 LinearCmd / RotateCmd capability detection so strokers and rotators are recognized correctly.
- **Performance:** Logging migrated from text .log files to SQLite (one table per module, separate debug and production databases, and configurable verbosity) for faster, cleaner diagnostics.
- **Dev:** SPS continuous fan-out is built from dedicated per-output drivers (Intiface / OSC / PiShock / OwO) with unified release handling (stop Intiface, reset OSC to 0/False, clear the PiShock throttle).
- **Dev:** OwO live-fire is fully non-blocking - the synchronous pattern player runs on a daemon thread with its busy window marked up front; template mode uses the queue-backed sender. Re-fire is gated on the vest busy window to avoid unbounded queue growth.
- **Dev:** OSC live step parsing classifies each step as numeric / bool / forced-int, detecting bool BEFORE normalization so bool params send a real boolean instead of a scaled float.
- **Dev:** Source housekeeping - relocated ~1,900 inline code comments out of the main source file into the canonical developer_info.md (organized by class / function); behavior, string literals, and docstrings untouched.
- **Dev:** Application version metadata bumped to 6.9.0 across the executable manifest and version info for clean Windows Explorer display.

## v6.2.3

- **Feature:** Advanced weighted PiShock device randomization engine added with per-device bias control.
- **Feature:** Support added for pishock_random_min / pishock_random_max device selection ranges.
- **Feature:** No-repeat window support added for PiShock random routing (pishock_random_no_repeat_s).
- **Feature:** Core device selection logic centralized for all execution paths (standalone, hybrid, random, queue).
- **Feature:** Broker error escalation system added with user-facing diagnostics and cooldown handling.
- **Feature:** Support popup system hardened with reentrancy guards and cooldown suppression.
- **Feature:** Global PiShock busy-gate now enforced across all parallel and non-blocking execution paths.
- **Bugfix:** Fixed inline randomization causing duplicate device dispatch under concurrent execution.
- **Bugfix:** Fixed race conditions from shallow device list copies in threaded PiShock paths.
- **Bugfix:** Fixed intermittent 'no valid device IDs' failures during random-trigger chains.
- **Bugfix:** Fixed PiShock parallel helper spawning ghost workers under high concurrency.
- **Bugfix:** Fixed queue worker starvation caused by double-blocking duration sleeps.
- **Bugfix:** Fixed hybrid chains incorrectly re-randomizing devices mid-execution.
- **Bugfix:** Fixed PiShock-only random loops leaking shared mutable device state.
- **Bugfix:** Fixed broker connection errors being silently swallowed and ignored.
- **Bugfix:** Fixed support popup thread safety issues causing UI instability.
- **Bugfix:** Fixed repeated popup spam due to missing reentrancy guards.
- **Bugfix:** Fixed chain execution aborts caused by selector signature mismatch.
- **Bugfix:** Fixed parallel PiShock threads completing early due to incorrect lifetime enforcement.
- **UX Change:** Support popup now uses cooldown-based suppression instead of permanent disable.
- **UX Change:** Broker connectivity failures now surface immediately with actionable user guidance.
- **UX Change:** Chain execution status now accurately reflects true hardware execution state.
- **UX Change:** Reduced UI lockups during heavy parallel PiShock + OwO + OSC execution.
- **Security:** Removed all inline entropy injection paths to prevent logic manipulation.
- **Security:** Centralized randomization pipeline hardened against injection and state corruption.
- **Security:** Parallel execution paths further hardened against race conditions and state bleed.
- **Security:** Broker error handling tightened to prevent silent execution bypass.
- **Security:** Additional Anti-Tamper Controls Added to the software.
- **Performance:** Reduced lock contention in parallel PiShock dispatch.
- **Performance:** Improved queue worker throughput by eliminating redundant joins and sleeps.
- **Performance:** Optimized weighted random selection algorithm for large device pools.
- **Performance:** Reduced thread churn in random-trigger execution loops.
- **Performance:** Improved overall chain scheduling stability under sustained load.
- **Dev:** Core PiShock device selection engine fully rewritten and normalized.
- **Dev:** All execution paths (executor, queue worker, random runner, hybrid) unified to a single selector pipeline.
- **Dev:** Parallel PiShock helper fully refactored for deterministic thread lifecycle management.
- **Dev:** Broker message handler hardened with structured escalation and gating.
- **Dev:** Support popup system refactored for strict main-thread UI safety.
- **Dev:** Removed all legacy inline randomization code paths.
- **Dev:** Internal state handling normalized to eliminate shared mutable structures.
- **Dev:** Additional debug instrumentation added to random routing and parallel dispatch.
- **Dev:** Build pipeline updated to reflect hardened threading and async execution model.

## v6.2.2

- **Feature:** Random PiShock device selection engine added with per-chain and random-trigger support.
- **Feature:** Random device routing fully integrated across standard, hybrid, standalone, and random chain modes.
- **Feature:** Multi-device selection filtering now supports bulk add/remove instead of single-item only.
- **Feature:** Global top-level verbose logger implemented for unified debug output across core systems.
- **Feature:** Chain runner upgraded to support randomized device targeting without breaking priority queue logic.
- **Feature:** Random trigger chains now properly randomize both steps and device targets.
- **Feature:** Queue worker upgraded to support parallel PiShock + OwO + OSC execution without blocking.
- **Feature:** PiShock parallel helper upgraded with random device injection support.
- **Feature:** Executor path upgraded to support random device routing in all standalone and hybrid modes.
- **Bugfix:** Fixed chain runner only selecting first device instead of full eligible device pool.
- **Bugfix:** Fixed random chains incorrectly reusing stale device lists.
- **Bugfix:** Fixed PiShock-only chains ignoring selected device filters in some execution paths.
- **Bugfix:** Fixed queue worker blocking on PiShock threads in non-blocking modes.
- **Bugfix:** Fixed silent failures when random chains were triggered from queue worker thread.
- **Bugfix:** Fixed reset-after timers misfiring when random chains were active.
- **Bugfix:** Fixed UI desync when deleting multiple filtered controls at once.
- **UX Change:** Filter-out controls now support multi-select operations for faster workflow.
- **UX Change:** Chain execution status now accurately reflects hybrid + parallel execution states.
- **UX Change:** Reduced UI freeze during random chain execution by offloading heavy work to worker threads.
- **Security:** Random device selection respects existing license tier enforcement with no bypass paths.
- **Security:** Parallel execution paths hardened to prevent race conditions during device dispatch.
- **Security:** Additional Anti-Tamper Controls Added to the software.
- **Performance:** Reduced lock contention in chain runner during parallel PiShock + OSC execution.
- **Performance:** Improved queue throughput by eliminating unnecessary thread joins.
- **Performance:** Faster random chain execution with optimized shuffle + dispatch logic.
- **Dev:** Core chain engine fully refactored to support random routing without duplication.
- **Dev:** Queue worker, executor, and random runner logic unified for consistent behavior.
- **Dev:** Parallel PiShock helper updated for deterministic thread lifecycle management.
- **Dev:** Global logger architecture introduced for consistent debug visibility across systems.
- **Dev:** Expanded PyInstaller hidden-import coverage for threading, asyncio, inspect, concurrent.futures, and random.
- **Dev:** Build pipeline updated to support new async + threaded execution paths.
- **Dev:** Internal code paths cleaned and normalized for future logic engine extensions.

## v6.2.1

- **Feature:** Fully encrypted, machine-bound license storage using Fernet cryptography (no plaintext license files).
- **Feature:** Hardware fingerprint binding added to all licenses to prevent cross-system sharing.
- **Feature:** Sealed Gold Trial system with encrypted start date and tamper detection.
- **Feature:** Atomic encrypted license writes with temp-file replace strategy for corruption safety.
- **Feature:** Live license revalidation on config save with immediate tier/flag refresh.
- **Feature:** Production-hardened PyInstaller pipeline with explicit hidden-import coverage for all dynamic modules.
- **Feature:** Custom windowed bootloader support for cleaner startup behavior.
- **Feature:** Full EXE + MSI code signing pipeline with SHA256 + timestamping.
- **Feature:** WiX v4 installer integration with automatic saved/ directory injection.
- **Bugfix:** Invalid, revoked, or failed license validation no longer falls back to trial mode.
- **Bugfix:** Closed trial reset abuse via license file deletion or corruption.
- **Bugfix:** Corrupt or tampered license payloads now hard-invalidate instead of recovering.
- **Bugfix:** Trial banner no longer appears on licensed systems.
- **Bugfix:** TikFinity disconnected spam eliminated via connection state guards.
- **Bugfix:** Streamer.bot WebSocket reconnect storms fixed with proper backoff handling.
- **Bugfix:** External API dispatch stability improvements and error isolation.
- **Bugfix:** Multiple silent crashes resolved in OSC parameter fetching and chain execution.
- **Bugfix:** Watchdog + zeroconf runtime crashes resolved in packaged builds.
- **Bugfix:** Cryptography module resolution failures fixed in onefile builds.
- **UX Change:** Encrypted license + supporter keys now editable directly from config editor.
- **UX Change:** License UI now hard-blocks on invalid states with no silent downgrade.
- **UX Change:** Trial messaging only appears when genuinely applicable.
- **UX Change:** Cleaner startup flow with reduced boot noise and dialog spam.
- **Security:** Trial abuse vectors fully closed (file deletion, date tampering, machine transfer).
- **Security:** License tampering now results in permanent invalidation.
- **Security:** DRM logic now fails closed and silent on any anomaly.
- **Performance:** Reduced startup overhead by eliminating redundant license parsing.
- **Performance:** Improved thread safety across TikFinity listener and event dispatch queue.
- **Performance:** Faster chain execution path with reduced lock contention.
- **Dev:** Single-file safe cryptography architecture (no external key files or env dependencies).
- **Dev:** Expanded hidden-import coverage for TikTokLive, websockets, watchdog, zeroconf, tkinter, PIL, cryptography.
- **Dev:** Build script hardened for non-standard Python install paths.
- **Dev:** Improved logging clarity across DRM, TikFinity, external API, and build pipeline.

## v6.2.0

- **Feature:** Introduced dedicated External Integration API server on port 8840 for high-performance external automation.
- **Feature:** Added /api/external/exec endpoint supporting JSON, form, and query payloads for maximum platform compatibility.
- **Feature:** Added /api/external/info and /api/external/list discovery endpoints.
- **Feature:** Unified execution pipeline for HTTP and Streamer.bot events.
- **Feature:** Implemented bot-safe response model (no 4xx on validation errors).
- **Feature:** Full CORS support for OBS Browser, local dashboards, and helper tools.
- **Feature:** Fully rewritten Streamer.bot 1.0.x WebSocket listener with correct General → Custom subscription model.
- **Feature:** Added clean reconnect logic with exponential backoff (no reconnect storms).
- **Feature:** Implemented crash containment and defensive parsing on all WebSocket handlers.
- **Feature:** Introduced production-grade typed event system.
- **Feature:** Added ExternalHookEvent parser.
- **Feature:** Added TwitchChatEvent parser.
- **Feature:** Added TwitchSubEvent parser.
- **Feature:** Added TwitchCheerEvent parser.
- **Feature:** Added ObsSceneEvent parser.
- **Feature:** Added TimerEvent parser.
- **Feature:** Added ButtonEvent parser.
- **Improvement:** Normalized provider namespace handling across all ingress layers.
- **Improvement:** Hardened commandId resolution and routing logic.
- **Improvement:** Context parsing now fault-tolerant with raw fallback support.
- **Improvement:** Structured logging added for all external execution calls.
- **Improvement:** Dedicated external integration log channel added.
- **Improvement:** Clean separation between transport, parsing, and execution layers.
- **Fix:** Corrected Streamer.bot subscription shape mismatch causing silent failures.
- **Fix:** Resolved WebSocket reconnect storm behavior under disconnect conditions.
- **Fix:** Fixed malformed payload crashes in custom event handling.
- **Fix:** Fixed context string parsing edge cases.
- **Fix:** Fixed duplicate execution edge cases during rapid event bursts.
- **Security:** Enforced loopback-only binding for External Integration API.
- **Security:** Added input validation for provider and commandId.
- **Security:** Isolated malformed context payloads to prevent execution corruption.
- **Security:** Hardened ingress crash containment across all entry points.
- **UX Change:** Upgraded Windows manifest to Per-Monitor v2 DPI awareness for crisp multi-monitor scaling.
- **UX Change:** Updated application version metadata for clean Windows Explorer display.
- **Performance:** External execution pipeline optimized for low-latency routing.
- **Performance:** WebSocket event handling optimized for high-throughput scenarios.
- **Performance:** Reduced overhead in event parsing and dispatch layers.
- **Internal:** Added EVENT_PARSERS registry for centralized typed dispatch.
- **Internal:** Refactored external execution pipeline for maintainability.
- **Internal:** Centralized typed event routing layer implemented.
- **Internal:** Improved separation between business logic and transport layers.
- **Breaking:** Raw dict event handling is deprecated. All inbound events now pass through typed parsers.
- **Breaking:** Streamer.bot events must now include type, provider, and commandId fields or will be ignored.

## v6.1.7

- **Feature:** Incremental device subscription - only new devices are SUBSCRIBED, preventing duplicate subscriptions and SUBSCRIBE_ERROR spam.
- **Feature:** Improved logging and debugging output for subscription flow (targets, counts, ACKs).
- **Feature:** Added internal tracking (_subscribed_targets) to maintain subscription state between refreshes.
- **Feature:** Added New PiShock Controls Drop Down Menu.
- **Feature:** Fully Overhauled how PiShock Devices are controlled! We now use the same method as PiShocks Website!
- **Feature:** Unified Controls method! You can now throw as many pishocks as you want at it!
- **Feature:** Added New Claim Shared Devices Button, Allowing you to quickly setup devices in software!
- **Feature:** Added new PiShock Quick Test Button, Allowing you to test on the fly!
- **Feature:** Added new PiShock Quick Select Drop Down, Allowing you to select and test on the fly!
- **Bugfix:** Corrected device target generation to use only client IDs for SUBSCRIBE (removes legacy user ID appending).
- **Bugfix:** Resolved UNSUBSCRIBE issues by ensuring only active subscriptions are cleared, preventing UNSUBSCRIBE_ERROR spam.
- **Bugfix:** Updated refresh & subscribe workflow to safely combine owned + shared devices without duplicating targets.
- **Bugfix:** Incremental subscription now avoids re-subscribing to previously subscribed devices after share code claims.
- **Bugfix:** Fixed session race conditions during device refresh after share code claims.
- **Hotfix:** General PiShock WebSocket stability improvements and error handling refinements.
- **UX Change:** Moved the Clear Que button to the Chain Controls Drop Down.
- **UX Change:** Moved the Emergerncy Stop button to the PiShock Controls Drop Down.
- **UX Change:** Added the ability to remove steps in patterns.
- **UX Change:** Chains will now regrid themselves properly!
- **UX Change:** Added New Kofi Button! Please consider supporting!
- **UX Change:** Added New TikTok Button! Please consider giving me a follow!
- **Performance:** PiShock Operations are now Instant!
- **Performance:** Avatar Changes are now Instant!
- **Performance:** GUI Registering is now Instant!
- **Performance:** HUGE Gains on overall Performance! Now 78% More Effiecient!

## v6.1.3

- **Feature:** Added Clear Queue Button - now you can instantly clear all queued events on demand.
- **Feature:** Emergency Stop Button relocated to the Special Controls Tab for easier access.
- **Bugfix:** Emergency Stop Button now reliably kills all sending operations to fully halt the program.
- **Bugfix:** Chain Runner execution slightly optimized for faster processing.
- **Bugfix:** GUI spawn times improved for smoother interface loading.
- **Bugfix:** Search bar fixed - filtering now updates the table correctly and scrolls to top.
- **Bugfix:** Chain Editor checkmark selections now behave correctly.
- **Bugfix:** PiShock runner smoothing applied for more fluid device control.

## v6.1.2

- **Feature:** Removed old legacy code blocking users from using the software without vrchat.
- **Bugfix:** Fixed broken code from legacy code removal.
- **Bugfix:** Fixed Device Schema Frame Naming and Logging Logic.
- **Bugfix:** Fixed Pishock website logs, Software now cleanly communicates with pishock.

## v6.1.0

- **Bugfix:** Fixed the feature of not saving devices from pishock.
- **Bugfix:** Fixed the feature of not pruning devices from pishock Api.
- **Extended:** New TikTok Gift Mapping Added.

## v6.0.9

- **Feature:** Added VRC OSC Router Support.
- **Note:** You can now edit the osc_config.json under /saved/config/ folder to path into vrc router!

## v6.0.8

- **Hotfix:** Controls Location Logic.
- **Hotfix:** Accidentally left the debug logic on causing slow downs.
- **Rebuild:** Rebuilt TikTok Gift Mapping, the insane amount of gifts caused a slow down.

## v6.0.7

- **Hotfix:** VRC Fury Parameter Compressor Logic Fix.
- **Note:** The new behavoir invalidated a ton of controls on large avatars causing them to spill over in Tikfinity, you may need to delete duplicate controls in your lists that don't work.
- **Hotfix:** Buttons not having the correct identifier causing some weird issues.
- **Improvement:** Moved Save Layout to the OSC Controls drop down for faster navigation.

## v6.0.6

- **Feature:** New OwO Vest Support Using OwO Visualizer, This is locked behind the Gold License.
- **Note:** OwO Haptic Vest Chains will run the loaded files from /saved/controls/owo and send them to your vest in real time using the OwO Visualizer.
- **Special Note:** OwO Haptic Vests Support a Maximum of 11 actions per file run and can interupt each other, additional logic to come later to the que mode to correct for this.
- **Feature:** New Save Avatar State Button.
- **Note:** This button serves its purpose by allowing direct saving instead of relying on automatic saves in case you forgot to load in specifically and want to make sure its corrected.
- **Improvement:** Updated TikTok running gift map with expanded metadata and icon caching.
- **Improvement:** Optimized vest dispatch pipeline for fully non-blocking performance during live streams.
- **Fix:** Added robust error handling for missing or malformed .owo files to prevent silent failures.
- **Hotfix:** Resolved rare issue where some live streams have enough viewers the on the fly editor takes forever to load.
- **Improvement:** Added inline tooltip descriptions for all OwO Vest controls in the chain editor UI.
- **Improvement:** Seperated Pishock devices so you can identify which is which in the editor easily.
- **Improvement:** Increased editor speed by up to 57%
- **Improvement:** Streamlined configuration storage for faster template loading and reduced disk I/O.
- **Misc:** Changed the default loaded drop down to the special tab

## v6.0.4

- **Hotfix:** Fixed Manual Connection Option for TikTok Fallback.
- **Feature:** New Pishock Mode Added called Rage, This Requires the Silver+ License.
- **Note:** Rage Mode Fires a 100ms zap at the duration and intensity you set with half second delay.
- **Improvement:** Updated Tiktok running gift map for summer fest.

## v6.0.3

- **Feature:** Added support popup suppression flag-once user clicks OK or Contact Support, no further popups for this session.
- **Feature:** Custom critical-error message parameter in _show_support_popup to encourage contacting The Vixen Den ASAP.
- **Fix:** Block next OSC chain execution until the longest per-step reset timer completes-prevents overlapping outfits.
- **Fix:** _run_pishock_parallel now correctly spawns one thread per selected device for both special and non-special modes.
- **Fix:** Non-special (chunked) PiShock sender now honors the full total_duration_ms, splitting into successive ≤15 s PUBLISH chunks with proper inter-chunk delays.
- **Fix:** send_special_mode runner scopes and updates 'intensity' and 'step' correctly, enforces ≥1000 ms per pulse, and prevents UnboundLocalError.
- **Fix:** Removed overly verbose detect_transport logging from the WebSocket connect loop.
- **Fix:** Coerce null OriginalCommand to empty string in listener to avoid attribute errors.
- **Fix:** Skip duplicate CONNECT_ERROR messages to avoid double-counting broker errors.
- **Fix:** WebSocket listener now counts only real BROKER errors, triggers support popup on the 3rd, and resets its counter on success.
- **Improvement:** Connect loop now resets its error and broker-error counters on successful connection, and applies exponential backoff properly.
- **Improvement:** Support popup now appears after 3 consecutive connection failures and will not reappear until acknowledged.
- **Improvement:** Watch Dog now creates the base files for the client filters using internal dictionary if the file is missing.
- **Improvement:** Subscriptions are now moved to thier own trigger type in the software.
- **UX:** Support popup foreground color updated to bright white for improved readability.

## v6.0.2

- **Hotfix:** Fixed Pishock related runner error that gave math errors.

## v6.0.1

- **Hotfix:** Pishock Runner dropping commands have been tightened.
- **Hotfix:** Pishock Share Codes no longer available to the user are now properly dropped.
- **Hotfix:** Pishock Share Codes now properly merge on share code change.
- **Hotfix:** Chain Editor can no longer open a ton of editor windows at the same time.
- **Hotfix:** Implemented a new watch dog system to automatically quiet down noisy avatars.

## v6.0.0

- **Feature:** Shock Together - Collaborate with friends and experience synchronized live shocks!
- **Feature:** New Trigger Type: Diamond Count - Activate chains based on the total diamonds received.
- **Feature:** Precision Filtering - Set exact values and thresholds for refined trigger control.
- **Feature:** Gift Count Threshold - Fire chains only when specific gift counts are met.
- **Feature:** Gifter Level, Subscriber, and Moderator Filters - Limit triggers to specific user roles.
- **Improvement:** General UI cleanup for a smoother and more intuitive experience.
- **Improvement:** Internal filter system refactored to minimize log spam and boost efficiency.
- **Improvement:** Enhanced PiShock integration with smarter logic and better reliability.
- **Improvement:** Tooltips added across the editor to guide you through each feature effortlessly.
- **Improvement:** Chain Runner now operates on a dedicated handler for significantly faster execution.
- **Improvement:** Controls Builder has its own handler, boosting startup and UI responsiveness.
- **Improvement:** Optimized startup performance when using heavy avatars - no more slowdowns.
- **Improvement:** TikTok gift mapping updated for improved accuracy and future compatibility.
- **Improvement:** Importing Chains now converts pishock devices automatically but you must reselect your device when importing.
- **Fix:** 'Reset Before' logic now functions correctly during chain execution.
- **Fix:** Right-click copy/paste restored in the config editor.
- **Fix:** Eliminated face and full-body tracking spam bugs.
- **Fix:** Fixed edge case crash in the priority queue under specific conditions.
- **Fix:** Resolved rare disconnection bug with TikFinity integration.
- **Fix:** Patched crash caused by TikFinity edge-case failures.
- **Fix:** Fixed GUI freezing issues tied to specific trigger combinations.
- **Fix:** Addressed PiShock stalling and live listener crash scenarios.
- **Fix:** App version now accurately displays in the window title bar.
- **Fix:** Fixed a rare bug where commands were silently ignored.
- **Fix:** Prevented parameter spam and tooltip crashes caused by bad widget references.
- **Fix:** Trigger-specific UI components now reliably load on startup.
- **Fix:** Gift Mapping Missing over 200 different gifts.
- **Fix:** Randomizer Not setting the delay and duration the same causing commands not to send correctly.
- **Fix:** Fixed an issue where normal zaps would cancel out each other.
- **Fix:** Fixed an issue where devices would not run simulateounously.
- **Fix:** Fixed an issue where the normal chains would cancel out the special modes.
- **Fix:** Fixed an issue where exporting chains would not show the prompt telling you.
- **Fix:** Fixed an issue where the internal queue system wouldn't lock the runner.
- **Internal/dev:** Emulated Android client parameters in TikTokLiveConnection to retrieve the full (mobile + web) gift catalog.
- **Internal/dev:** Refactored giftMapping script to replace deprecated getAvailableGifts() calls with fetchAvailableGifts().
- **Internal/dev:** Corrected HTTP client usage-switched from `url` to `path` in webClient.request to eliminate the startsWith TypeError.

## v5.5.2

- **Hotfix:** Steam VR Valve Index Issues breaking the program.
- **Hotfix:** Certain OSC Assets Causing back log slow startup.
- **Hotfix:** Pishock API Response Issues.

## v5.5.0

- **Feature:** Added silver-tier exclusive Pishock Pattern Editor.
- **Feature:** Added new 'pattern' PiShock mode with custom sequence editor.
- **Feature:** Added bronze-tier exclusive modes: pulse, burst, oscillation, randomized_wobble.
- **Info:** If you bought Silver tier all modes are available as they scale.
- **UX:** New GUI controls for all special PiShock modes with tooltips and gating per license tier.
- **Fix:** Enforced minimum 1000ms duration for all special mode operations to avoid dropped packets.
- **Fix:** Proper delay handling for randomized_wobble to ensure device receives all signals.
- **Fix:** Pattern steps now validated to ensure minimum duration and delay values.
- **Fix:** Patched more stray full body tracking OSC Parameters.
- **Fix:** Patched Large Logs! Oops! Now cleanly nukes your logs and backs them up once a day! Thris greatly improves load performance.
- **Improvement:** Increased Max CPU Threads from 4 to 8 greatly improving runtime performance.

## v5.4.5

- **Hotfix:** Gui dispatcher for new row filtering with heavy avatars.

## v5.4.4

- **New:** Nuclear OSC filtering system implemented for tracking data suppression.
- **New:** Fuzzy suffix blocklist added to silently reject invasive OSC suffixes.
- **Improved:** Legacy noisy filter system now loads alongside nuclear filters for layered OSC handling.
- **Internal:** Controls parser now de-dupes noisy parameters against enforced blocklists.
- **Internal:** Added hard filter layer for known tracking prefixes and motion parameters.

## v5.4.3

- **Fix:** Avatar Controls sometimes not firing correctly.
- **Fix:** TikFinity desync on new avatar imports or loading unregistered avatars.
- **Fix:** Chain registry conflicts when gift-triggered chains re-import improperly.
- **New:** Added Chain Controls dropdown to toolbar.
- **New:** Added Export and Import Chains buttons under Chain Controls.
- **New:** DRM License Check integrated (supports licensed and premium tiers).
- **Improved:** load_avatar_from_path now purges and reloads saved controls before re-rendering UI.
- **Improved:** Registry I/O and TikFinity integration now sync actions and categories cleanly after avatar load.
- **Removed:** OneDrive placeholder pinning logic (was unstable on non-standard drives).
- **New:** Export directory created at saved/controls/export/ during startup seeding.
- **Internal:** Restructured TikFinity API boot logic for stronger cache validation and recovery after state loss.

## v5.4.2

- **Fix:** Avatar loader now always saves last_avatar.txt properly after a successful import.
- **Fix:** Controls JSON is now rewritten after load to preserve a hard backup, even if unchanged.
- **Fix:** Legacy or stale control entries no longer overwrite valid avatar control files.
- **Fix:** Forced override addresses (e.g., ::# syntax) are now validated against base OSC paths.
- **Fix:** sanitize_controls no longer drops user-defined parameters like /avatar/change or /tracking/vrsystem.
- **Fix:** Controls merge no longer silently corrupts valid entries when avatar JSON is missing.
- **Fix:** Improved compatibility for OSCQuery parameter matching under fuzzy conditions.
- **Fix:** Better error handling for missing or malformed avatar parameter JSON files.
- **New:** sanitize_controls now supports OSCBridge validation + avatar JSON + whitelist path logic.
- **New:** Automatic cleanup of invalid controls entries using OSC param cache and avatar source.
- **New:** User-injected paths like /chatbox/input are preserved by explicit path whitelist.
- **New:** sanitize_controls logs full drop/keep summaries to controls.log for traceability.
- **Improved:** load_avatar_from_path now purges and reloads saved controls before re-rendering UI.
- **Improved:** Avatar control rows are only persisted if successfully validated.
- **Internal:** Moved sanitize_controls to shared helpers to enable chain-level use if needed.
- **Internal:** Restructured validation logic to enable fuzzy override compatibility and cache fallback paths.

## v5.4.1

- **Fix:** Drag-and-drop chain reordering now reliably updates and persists layout_index in saved files.
- **Fix:** save_chains_force now enforces correct layout ordering based on chain frame position.
- **Fix:** Chain UI now respects layout_index explicitly during regrid, ensuring consistent visual order.
- **Fix:** Resolved rare case where layout_index changes were not saved if hash matched prior snapshot.
- **Fix:** Backups are now created properly even when layout_index is the only change.
- **Fix:** Resolved Issue with chains that are gift triggered not being blocked from Tikfinity listings.
- **Fix:** Extreme edge case where if Tikfinity sent a new gift thats not mapped it does it anyway.
- **Fix:** Chain driven events not detecting in some cases.
- **Fix:** Pishock Api sometimes throwing a popup for whatever reason on broker errors and not being 100% reliable.
- **Fix:** Pishock Api pulsating, decreased the chain offset so they run more tightly together.
- **Fix:** Repeated Gift Chains not firing after X count.
- **Fix:** Filters not loading on the Ui correctly.
- **Fix:** Older Chain Driven Events sometimes throwing a rare edge case value error and not appearing in the Ui anymore.
- **New:** Repeat Mode toggle in the Chain Editor, this enables you to allow repeat counts to stack infinitely.
- **New:** Added 6 more loggers to the program for each module to help detect and find errors.
- **New:** Added Future Support for more features such as if its a Subscriber they get additional things!
- **Improved:** load_chains applies smarter normalization for missing or invalid layout_index values.
- **Internal:** save_chains_force now supports external layout maps for full control over save ordering.
- **Internal:** Removed legacy layout_index bypass checks that blocked drag-save operations.
- **Internal:** Simplified layout tracking logic across UI and chain metadata for better synchronization.

## v5.4.0

- **New:** Drag-and-drop re-arrangeable chain buttons with glow effects on hover.
- **New:** Intelligent Filtering system with silent intellisense corrections-automatically fixes minor input errors.
- **New:** Fixed face tracking data stream edge case causing loss of updates.
- **New:** Intelligent Logging for more useful diagnostics with reduced noise.
- **New:** Intelligent PiShock Handling for improved session stability and edge-case recovery.
- **New:** Improved PiShock API handling with faster reconnections and higher reliability.
- **New:** Added buttons in the top-right linking to official project websites.
- **New:** Refreshed branding and styling across UI to match new design aesthetic.
- **New:** 'Filter Out' option in right-click menu for suppressing noisy OSC parameters via persistent filter.
- **New:** Regex-based sanitization for malformed OSC parameters (e.g., addresses starting with '!').
- **New:** Improved fuzzy search across OSC paths and visible labels (case-insensitive, token-aware).
- **Fix:** Face tracking data bug patched for stream continuity.
- **Fix:** Better error handling for malformed OSC address edge cases.
- **Improved:** Faster load times for UI initialization and parameter parsing.
- **Improved:** Save logic now writes faster and more safely under high volume.
- **Internal:** Intelligent Error and Crash Handling introduced across thread contexts.
- **Internal:** Refactored search logic for clarity and reliability.
- **Internal:** Introduced centralized _add_to_noisy_filter() for safely updating noisy_parameters.json.

## v5.3.0

- **New:** Added a settings gear next to the search bar; this opens the Safety Controls Side Dock.
- **New:** Added reconnection logic for V3 PiShock API handling.
- **New:** Added retry logic for fetching devices from PiShock.
- **New:** Added Emergency Stop button inside the side dock to forcefully terminate the app.
- **New:** Implemented Pause All Devices button logic (button currently hidden pending API support from PiShock team).
- **Fix:** Improved Chain Editor UI contrast to better indicate selected vs unselected devices.
- **Fix:** Devices without 'code' are now handled properly if 'shockerId' is present.
- **Fix:** Redis connection errors are now internally retried until stabilized.
- **Internal:** Simplified _send_publish_command logic.
- **Internal:** Removed legacy IP regex logic from _send_simple.
- **Internal:** Centralized versioning in dashboard.py via __version__.
- **Internal:** Version bumped to 5.3.0.

## v5.2.2

- **New:** Added 'Special' mode to the toolbar dropdown with dedicated buttons for 'Changelog' and '💖 Support Me'.
- **New:** Introduced LICENSE_TIER global parsed from Gumroad 'variants' (Bronze, Silver, Gold).
- **New:** Personalized license popup messages based on supporter tier with emojis and custom text.
- **New:** LICENSE_TIER now drives all license messaging instead of LICENSE_TYPE.
- **New:** Display tier-specific thank-you messages for Gold, Silver, and Bronze supporters.
- **New:** Added license.json first-run fallback with auto-write of free license key.
- **New:** Implemented is_running() method in PiShockClient to prevent duplicate thread starts.
- **Fix:** Resolved incorrect tkinter popup showing 'Free License' despite valid supporter license due to missing global LICENSE_TIER.
- **Fix:** Ensured external browser is always used for 'Support Me' link using webbrowser.open_new().
- **Fix:** Removed legacy Support button from right_tools once migrated to the 'Special' toolbar.
- **Internal:** Minor UI cleanup and positioning adjustments in render_toolbar_buttons().

## v5.2.0

- **New:** Deferred TikFinity action registration until after UI and OSC initialization using the _ready flag and finalize_controls().
- **New:** Deferred TikFinity registry cache reads and writes until after OSC parameters are loaded via load_registry_cache() and save_registry_cache().
- **New:** Added re_register_all_tikfinity_actions() helper to hot-reload TikFinity actions and prevent duplicate registrations.
- **New:** Integrated Gumroad license verification with GUMROAD_VERIFY_URL, SUPPORTER_PRODUCT_ID, and FREE_POPUP_URL constants.
- **New:** Implemented _check_license_valid() to validate license key (read from /saved/config/user.json) against Gumroad’s API using requests.
- **New:** On startup, display a “Free Version” popup when no valid license is found, featuring “Buy Supporter License” and “Continue (Free)” options.
- **New:** Extended edit_config() to include a License Key field, persisting it alongside TikTok and PiShock settings.
- **Fix:** Eliminated premature register_action() calls and config persistence by deferring both until after full initialization.
- **Internal:** Adjusted edit_config() window layout to accommodate the new License Key entry.
- **Internal:** Version bumped to 5.2.0

## v5.0.0

- **Fix:** VRChat collision issue with VRCFacetracking resolved to ensure proper parameter syncing.
- **Fix:** Migrated to a faster VRC parameter system for improved runtime performance.
- **Start:** Building installer package for streamlined update deployment.
- **Fix:** Core logic for seeding default files and configs corrected for stability on first run.
- **Fix:** Addressed lockup and client crash during avatar change triggered by OSC update race condition.
- **Fix:** Core logic for Hyroe gift + Fooma Twitch integration now ensures proper detection and event registration.
- **Migrated:** Core logic and save operations now leverage VRC OSC Query interface for lower-latency interactions.
- **Migrated:** OSC logic now powered by an internal API layer for faster parsing and cleaner abstraction.
- **Migrated:** GUI logic improved for better async handling, faster redraws, and responsive OSC query results.
- **Migrated:** Save/load pipelines now operate on optimized internal data structures to cut down disk I/O.
- **Migrated:** Controls logic now uses unified internal sync model with the OSC bridge for stability.
- **Investigated:** Avatar parameter change detected in OSC Debug but not firing in-game. Root cause: VRChat bug. Workaround: avatar must be favorited to consistently trigger updates.
- **Fix:** Queue freeze resolved by replacing incorrect return in pump_q loop with continue, ensuring proper message handling.
- **Optimized:** Registry cache now writes only on content changes, preventing unnecessary disk I/O at startup.

## v4.8.5

- **New:** Added PiShock Connection Warning for when PiShock servers encounter service issues.
- **New:** Added PiShock Connection Warning for user hubs failing to connect to their registered devices.
- **New:** Added 'Contact Support' button to PiShock error dialog, which opens the official PiShock Discord in the browser.
- **Fix:** Fixed auto-registration of Hyroe's INT/gift assets - issue identified by YoteTheCoyote; resolved via robust file creation logic.
- **Fix:** Ensured control and chain files are pre-created and saved under /saved/<folder> before attempting auto-registration.
- **Internal:** Added non-interactive create_int_series_rows() helper to bypass GUI prompts and match manual INT injection.
- **Internal:** Refactored _auto_register_assets() to use real control creation logic instead of synthetic fallback.
- **Internal:** Version bumped to 4.8.5

## v4.8.0

- **New:** Fuzzy name matching for Hyroe gift auto-registration - mismatched casing or slight variations now resolve to the correct giftMapping entry, so icons and coinCosts display properly.
- **New:** Fallback delays for unspecified gifts in HYROE_GIFTS (defaults to 6 s) and explicit filtering of holiday specials (Ghost, Pumpkin) to prevent unwanted chains.
- **Fix:** `_auto_register_assets` now ensures `_gift_mapping` is loaded before use, eliminating silent failures when giftMapping wasn’t initialized.
- **New:** INT-series injection only resets on the final step (::#N), avoiding redundant resets during the chain.
- **Fix:** Robust avatar JSON path resolution in `_on_avatar_change` - handles both legacy string entries and new-style dicts without KeyError.
- **Fix:** `send_shock_ws` now pauses all non-PUBLISH operations during a PUBLISH to avoid being flagged as malicious by the PiShock broker.
- **Fix:** Heartbeat task cancellation and reconnect back-off refined to prevent overlapping tasks and spurious disconnections.
- **UI:** Gift-chain buttons now correctly display the 🎁 icon, coinCost badge, and icon image from giftMapping.
- **UI:** Chain play buttons updated to use the new `ChainPlay.TButton` style for consistent theming.
- **Security:** Hardened `_auto_register_assets` so that only newly added chains are persisted to disk, avoiding accidental overwrites.

## v4.5.2

- **New:** One-shot save-guard → creates timestamped backups, refuses empty / smaller lists silently, and logs at most once (no spam).
- **Fix:** AttributeErrors on capture-timeout (_finalize_capture / _save_avatar_snapshot) resolved - timers now target valid methods.
- **New:** Debounced /avatar/change (1 s) + rolling-buffer pre-fill; capture finalises idempotently and marks avatar ready.
- **New:** Burst-safe OSC sender - repeated hits refresh the same reset timer, so chat-spam maps cleanly in-game; INT-series unchanged.
- **Fix:** ‘after_id’ UnboundLocalError squashed when multiple INT-series parameters fire in quick succession.
- **API:** /api/features/actions/exec fully rewritten - always returns HTTP 200 with {"data":[]}, honours both "context" & legacy "data", sets CORS, and queues work on the Tk thread when alive.
- **API:** Internal callback errors are logged but never bubble up, eliminating TikFinity’s 500-error flood and queue bloat.
- **UI:** Guard / API errors now emit a single, colour-coded log-line per incident instead of endless repeats.
- **Security:** Flask handler no longer returns (Response,int) tuple - fixes NameError and adheres to WSGI expectations.

## v4.5.1

- **New:** Drop-in PiShock-v2 connector built around the official broker spec (PUBLISH / SUBSCRIBE) - no legacy code paths.
- **New:** Automatic 25-second heartbeat (PING) keeps the WS session alive through broker idle-timeouts.
- **New:** Self-healing reconnect loop with exponential back-off-+-random-jitter (5-→-60-s).
- **New:** Graceful downgrade to *-log-only channels when Redis ping fan-out fails, so logs still stream while ops queue recovers.
- **Fix:** PUBLISH payload now mirrors the NodeJS reference exactly (nested list removed, integers not strings).
- **New:** Device discovery writes a de-duplicated list to saved/config/devices/devices.json and re-uses it on startup.
- **Fix:** Pathing re-wired to global constants (USER_CFG_FILE, PISHOCK_DEVICE_FILE, etc.) eliminating hard-coded strings.
- **UI:** Live PiShock event log shows success / error feedback with timestamps and coloured badges.
- **Internal:** Queue heartbeat to GUI thread (‘connected’ / ‘disconnected’) so status LED never desynchronises.
- **API:** TLS context enforced on websockets.connect → prevents MITM/downgrade attacks and meets PiShock security guidance.

## v4.0.0

- **New:** Event dispatch queue for TikFinity to decouple UI thread logic
- **New:** Priority queue for gift chain execution (via `priority` field)
- **New:** Fuzzy gift matching and preview icons via AutoCompleteCombobox
- **New:** Added New UI Element Called Changelog, this reads this very text!
- **Fix:** Accurate "Connected" event status for TikFinity socket (q.put fixed)
- **New:** TikFinity gift handler merged with OSC chain trigger
- **Fix:** Gift chain buttons now render properly in UI
- **UI:** Added changelog window with scrollback
- **Internal:** Code Cleanup performed to reduce load and stress on app
- **API:** New Dedicated Listeners for Tikfinity Events

## v3.8.5

- **Fix:** Prevented creation of empty chains (blank name or no steps)
- **Fix:** Avoid UnboundLocalError in `_register_chain` for "random" trigger
- **Fix:** Enforced `::#` integer cast logic during OSC dispatch
- **Fix:** Respects `random` mode when executing chain (now shuffles properly)
- **Fix:** Ensures `random` is registered with correct delay_min/delay_max logic
- **Internal:** `random` module import added to prevent crash on shuffle
- **Log:** Enhanced debug output for chain execution paths

## v3.8.2

- **Fix:** Deferred TikFinity re-register now waits for avatar load completion
- **Fix:** Added missing _save_avatar_capture_log() method to prevent crash
- **Fix:** Prevent duplicate or premature TikFinity action executions
- **Internal:** Internal _avatar_ready flag and queue event now synced reliably
- **Internal:** Radial layout regeneration logic improved with stable path hashing
- **Log:** TikFinity action registration now confirmed with console prints

## v3.8.1

- **Fix:** Layouts now correctly saved to controls_<avatar_id>.json
- **Fix:** Ensures self.avatar_id and config stay in sync during save/load
- **Fix:** Auto-load of saved layouts now restores INT-series rows reliably
- **Fix:** Logging added to confirm saved/loaded control file paths
- **Fix:** WebSocket event logging hardened for unknown TikFinity event types
- **Internal:** Improved TikFinity registration logic: unique actions, grouped UI
- **Internal:** Row builder assigns full address for action IDs to preserve uniqueness

## v3.8.0

- **Internal:** Live parameter capture now auto-triggers on avatar change
- **Add:** Per-avatar snapshot (<id>.json) and current pointer file added
- **Add:** Radial support: radials/controls_<id>.json with hash detection
- **Add:** Chains can now load per avatar and execute in serial mode
- **Fix:** UI crash on missing config folders
- **Fix:** Avatar change no longer causes double-loading or layout overwrite
- **Fix:** VRChat’s noisy parameters (Voice, VRMode, etc.) now ignored on capture
- **UI/UX:** Improved OSC status & avatar load feedback in status bar

## v3.7.0

- Avatar JSON auto-load now re-generates radial layout correctly
- INT-series parameters now reset using correct base OSC address
- Timer reset logic now respects INT-series row mapping
- TikFinity gift actions no longer register twice on reload
- Robust fallback if avatar JSON has missing or invalid ID
- Auto-loaded avatars now correctly trigger snapshot + radial logic
- Graceful handling of broken or missing radial layout files
- WebSocket reconnect stability improved (TikFinity + gift server)
- UI layout behavior in dark mode refined (hover, scrollbar, combobox)
- **Fix:** Processes now terminate correctly when closing the client
- **Fix:** INT Series delete button no longer deletes chains
- **New:** Autodetection + avatar prompt for unknown avatar imports
- **New:** Simplified tutorial and onboarding steps
- **Internal:** Radial layout deduplication with hash prefilter

## v3.6.2.1

- **Fix:** TikFinity new chains not registering

## v3.6.1

- **Fix:** Critical thread allocation issue fixed
- **Fix:** Offline chain button logic corrected

## v3.6.0

- **New:** Priority system for chains (lower = sooner)
- **New:** Easy Mode radial editor (UI shell only)
- **New:** Gift trigger WebSocket listener (local)
- **New:** Coin count based gift threshold triggers
- **New:** Radial menu auto-generation from avatar JSON
- **New:** Auto-load last used avatar snapshot
- **New:** Avatar snapshot and layout save/load support
- **New:** Gift image and coin cost in UI (via TikTok CDN)
- **New:** /saved/ storage for all user data
- **Fix:** Dark theme hover highlight improved
- **Fix:** Duplicate TikFinity action registration blocked
- **Fix:** Graceful handling of broken giftMapping.json
- **Fix:** Chain delay/step spacing bug fixed
- **Fix:** Capture logs can now be saved pre/post avatar change
- **New:** Unified control UI with trigger mode support
