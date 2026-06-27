Stream Connector exposes a small, local-only HTTP API so external tools, scripts, and plugins can
trigger automations on the same machine. Nothing here is internet-facing; all services bind to
`127.0.0.1`.

There are two local servers:

| API | Base URL | Purpose |
| --- | --- | --- |
| External API | `http://127.0.0.1:8840` | Trigger registered hooks (such as chains) from external tools |
| Internal / Features API | `http://127.0.0.1:8832` | Enumerate and execute the app's actions and avatar parameters |

Ports are configurable in `saved/config/routing/endpoints.json`. The values above are the defaults.

---

## How chains are exposed

On startup, every chain you have created is automatically registered as an external hook:

- **provider:** `streamconnector`
- **commandId:** the chain's name, normalized to lower case

So a chain named `Test` is reachable as `provider = "streamconnector"`, `commandId = "test"`.

---

## External API

### `GET /api/external/info`

Returns metadata about the API.

```json
{
  "data": {
    "name": "Stream Connector External API",
    "author": "@Vixenlicious",
    "version": "6.9.0"
  }
}
```

### `GET /api/external/list`

Returns every registered external hook, so a tool can discover what it is allowed to trigger.

```json
{
  "data": [
    {
      "provider": "streamconnector",
      "commandId": "test",
      "name": "Test",
      "description": "Chain: Test"
    }
  ]
}
```

### `POST /api/external/exec`

Executes a hook. Accepts a JSON body (recommended), and also falls back to form data or query-string
parameters. `commandId` may also be sent as `command_id` or `command`.

Request body:

```json
{
  "provider": "streamconnector",
  "commandId": "test",
  "context": {
    "user": "viewer123",
    "message": "hello world"
  }
}
```

Successful response:

```json
{ "ok": true }
```

`context` is optional and is passed through to the chain untouched. It may be a JSON object or a JSON
string. Both `provider` and `commandId` are required.

---

## Examples

### curl

```bash
curl -X POST http://127.0.0.1:8840/api/external/exec \
  -H "Content-Type: application/json" \
  -d '{"provider":"streamconnector","commandId":"test","context":{"user":"viewer123"}}'
```

### Python

```python
import requests

resp = requests.post(
    "http://127.0.0.1:8840/api/external/exec",
    json={
        "provider": "streamconnector",
        "commandId": "test",
        "context": {"user": "viewer123", "message": "hello world"},
    },
    timeout=5,
)

print(resp.json())  # {"ok": true}
```

### JavaScript (Node or browser)

```js
await fetch("http://127.0.0.1:8840/api/external/exec", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    provider: "streamconnector",
    commandId: "test",
    context: { user: "viewer123" },
  }),
});
```

### Discovering available hooks first

```python
import requests

hooks = requests.get("http://127.0.0.1:8840/api/external/list", timeout=5).json()["data"]
for hook in hooks:
    print(hook["provider"], hook["commandId"], "-", hook["description"])
```

---

## Internal / Features API

The Features API on port `8832` lets tooling enumerate and run the app's actions and avatar
parameters directly.

### `GET /api/app/info`

```json
{ "data": { "author": "@VixForge Interactive", "name": "Stream Connector", "version": "6.9.0" } }
```

### `GET /api/features/categories`

```json
{
  "data": [
    { "categoryId": "chains", "categoryName": "Chains" },
    { "categoryId": "avatar_parameters", "categoryName": "Avatar Parameters" }
  ]
}
```

### `GET /api/features/actions?categoryId=chains`

```json
{
  "data": [
    { "actionId": "test", "actionName": "Test" }
  ]
}
```

### `POST /api/features/actions/exec`

```json
{
  "categoryId": "chains",
  "actionId": "test",
  "context": {}
}
```

```bash
curl -X POST http://127.0.0.1:8832/api/features/actions/exec \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"chains","actionId":"test","context":{}}'
```

---

## Error handling

The External API returns HTTP `200` even on failure, so that calling bots and automations are not
interrupted by transport errors. Inspect the `ok` field in the response body instead of relying on
the status code.

```json
{ "ok": false, "error": "provider and commandId required" }
```

---

## Behavior and safety

- All servers bind to `127.0.0.1` and are not exposed beyond the local machine by default
- `context` is treated as data only; it is never evaluated or executed
- Unknown providers or command IDs are rejected and logged
- Execution is dispatched asynchronously, so triggering a hook does not block the caller
