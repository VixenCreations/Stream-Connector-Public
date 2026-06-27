Stream Connector includes a native, local-only Streamer.bot integration. Stream Connector connects to
Streamer.bot's WebSocket server, subscribes to custom events, and runs the chain you target. This
gives you a single path from any Streamer.bot trigger (Twitch, YouTube, Kick, timers, and more) into
a Stream Connector automation.

---

## Connection overview

Stream Connector connects to Streamer.bot's WebSocket server, by default at:

```
ws://127.0.0.1:8080/
```

Enable it in Streamer.bot under **Servers / Clients > WebSocket Server**, then start the server.
Stream Connector connects automatically and subscribes. The connection is local-only, reconnects
automatically with backoff, and never opens an inbound internet port.

---

## Subscription

On connect, Stream Connector sends this subscription request and listens only for general custom
events:

```json
{
  "request": "Subscribe",
  "id": "streamconnector-sub",
  "events": {
    "General": ["Custom"]
  }
}
```

Only custom events broadcast by your Streamer.bot actions are processed.

---

## Event payload

To trigger a chain, a Streamer.bot action broadcasts a JSON payload over the WebSocket. Stream
Connector reads these fields from the broadcast `data` object:

```json
{
  "type": "external_hook",
  "provider": "streamconnector",
  "commandId": "test",
  "context": {
    "user": "viewer123",
    "message": "hello world",
    "source": "streamerbot"
  }
}
```

- **type** selects the event parser (use `external_hook` for the standard path)
- **provider** is the routing namespace (`streamconnector` for chains)
- **commandId** is the target chain's name, lower-cased
- **context** is optional structured data, forwarded to the chain untouched

All three of `type`, `provider`, and `commandId` are required, or the event is ignored.

---

## Streamer.bot sub-action (C#)

Add a C# sub-action to a Streamer.bot action and paste the code below. It builds the payload and
broadcasts it with `CPH.WebsocketBroadcastJson`. Set the target chain by changing the `commandId`
default, or by passing a `commandId` argument from the action.

```csharp
using System;

public class CPHInline
{
    public bool Execute()
    {
        try
        {
            // Routing namespace used by Stream Connector. "streamconnector" targets chains.
            string provider = args.ContainsKey("provider") ? args["provider"].ToString() : "streamconnector";

            // The chain to run, lower-cased. Change "test" to your chain's name.
            string commandId = args.ContainsKey("commandId") ? args["commandId"].ToString() : "test";

            // Event type. Must match a Stream Connector parser key; "external_hook" is the default path.
            string eventType = args.ContainsKey("eventType") ? args["eventType"].ToString() : "external_hook";

            // Optional context.
            string user = args.ContainsKey("user") ? args["user"].ToString() : "unknown";
            string rawInput = args.ContainsKey("rawInput") ? args["rawInput"].ToString() : "";

            // Streamer.bot broadcasts a string, so build the JSON manually.
            string json =
                "{"
                + "\"type\":\"" + Escape(eventType) + "\","
                + "\"provider\":\"" + Escape(provider) + "\","
                + "\"commandId\":\"" + Escape(commandId) + "\","
                + "\"context\":{"
                    + "\"user\":\"" + Escape(user) + "\","
                    + "\"message\":\"" + Escape(rawInput) + "\","
                    + "\"source\":\"streamerbot\","
                    + "\"timestamp\":\"" + DateTime.UtcNow.ToString("o") + "\""
                + "}"
                + "}";

            CPH.WebsocketBroadcastJson(json);

            CPH.LogInfo(
                "[StreamConnector] WS broadcast sent -> "
                + "eventType=" + eventType
                + " provider=" + provider
                + " commandId=" + commandId
            );

            return true;
        }
        catch (Exception ex)
        {
            CPH.LogError("[StreamConnector] WS broadcast ERROR: " + ex.ToString());
            return false;
        }
    }

    // Escapes characters that would otherwise produce invalid JSON.
    private string Escape(string input)
    {
        if (string.IsNullOrEmpty(input)) return "";

        return input
            .Replace("\\", "\\\\")
            .Replace("\"", "\\\"")
            .Replace("\n", "\\n")
            .Replace("\r", "\\r");
    }
}
```

---

## Setup steps

1. In Streamer.bot, start the WebSocket Server (`127.0.0.1:8080`) and confirm Stream Connector
   connects and subscribes.
2. Create an action and add a trigger (for example, a Twitch channel-point reward or chat command).
3. Add a **Execute C# Code** sub-action and paste the code above.
4. Change `commandId` to the name of the chain you want to run, lower-cased.
5. Save and compile, then use **Test Trigger**. The chain runs and appears in the Stream Connector
   live log.

A ready-made action is included in the application's `Streamer Kit/Streamerbot Example` folder; you
can import it and edit only the `commandId`.

---

## Passing dynamic values

Because the payload is built from Streamer.bot arguments, you can forward live event data into the
chain context. Set arguments such as `user`, `rawInput`, or `commandId` earlier in the action (for
example from the trigger's variables), and they flow through to Stream Connector unchanged.

---

## Supported event types

The `type` field selects a parser. The standard integration uses `external_hook`; the following
typed events are also recognized and normalized before execution:

| Event type | Typical fields |
| --- | --- |
| `external_hook` | `provider`, `commandId`, `context` |
| Twitch chat | `user`, `message` |
| Twitch subscription | `user`, `tier`, `months`, `is_gift` |
| Twitch cheer | `user`, `bits` |
| OBS events | `scene` |
| Timer / button | `timer`, `button` |

---

## Execution flow

```
Streamer.bot action
   |
   v
CPH.WebsocketBroadcastJson  (Custom event)
   |
   v
Stream Connector WebSocket listener
   |
   v
Validation + typed parser
   |
   v
execute_external_hook(provider, commandId, context)
   |
   v
Chain runs
```

---

## Behavior and safety

- The WebSocket connection is local-only, with no inbound internet exposure
- Only typed, validated payloads are executed; there is no arbitrary code execution
- Malformed events are logged and ignored rather than guessed at
- Reconnection uses backoff and avoids duplicate subscriptions
