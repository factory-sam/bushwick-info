# User Testing

Testing surface: tools, URLs, setup steps, isolation notes, known quirks.

**What belongs here:** How to test the app manually, what tools to use, URLs, credentials, known issues during testing.

---

## Testing Surface

- **Public map:** http://localhost:3100/
- **Admin panel:** http://localhost:3100/admin
- **Admin password:** Value of `ADMIN_PASSWORD` env var (default: `bushwick-admin-2024`)

## Tools

- **agent-browser:** Available at `/Users/sam/.factory/bin/agent-browser`. Use for UI validation — screenshots, clicking, typing.
- **curl:** Available at `/usr/bin/curl`. Use for API route validation.

## Setup Steps

1. Ensure dependencies are installed: `pnpm install`
2. Start dev server: `PORT=3100 pnpm dev`
3. Wait for healthcheck: `curl -sf http://localhost:3100`
4. Run tests against http://localhost:3100

## Known Quirks

- MapLibre GL requires WebGL — agent-browser headless Chrome may NOT support WebGL (SwiftShader GPU failure). MapLibre maps will mount correctly (DOM structure present) but the canvas may be blank in screenshots. This is an environment limitation, not a code bug.
- Map tiles load asynchronously — wait 2-3 seconds after page load before taking map screenshots
- 3D buildings only visible when pitch > 0 — screenshots should be taken after setting camera pitch
- **WebGL workaround:** When WebGL is unavailable, use JavaScript evaluation via agent-browser to query map state (e.g., `map.loaded()`, `map.getPitch()`, `map.getZoom()`, `map.getCenter()`) instead of relying on visual screenshots. Also verify DOM structure (element presence, classes, computed styles).

## Flow Validator Guidance: Web UI

### Testing Tool

Use `agent-browser` skill for all web UI testing. Invoke it via the Skill tool at session start.

### Session Management

- Each flow validator MUST use its own unique browser session ID (passed in the prompt).
- Format: `8d8ad5bb9df2__<group-id>` (e.g., `8d8ad5bb9df2__map`, `8d8ad5bb9df2__eva`).

### Isolation Rules

- All tests are read-only (viewing the public map page). No data mutations.
- Each subagent operates independently on `http://localhost:3100/`.
- No shared state to worry about — the app has no auth, no sessions, no persistent user state.
- Each subagent should NOT resize or manipulate the browser in ways that interfere with another subagent's viewport.

### WebGL Limitation

MapLibre GL maps require WebGL which may not be available in headless Chrome. Validators should:

1. Take screenshots (they may show a blank canvas — that's OK)
2. Use JavaScript evaluation to verify map state: `map.loaded()`, `map.getPitch()`, `map.getZoom()`, `map.getCenter()`, `map.getBearing()`
3. Verify DOM structure: check for elements by class/id, computed styles, CSS properties
4. Check console for errors (some WebGL warnings are expected in headless mode)

### Evidence Collection

For each assertion, collect:

- Screenshots (even if canvas is blank, overlays and UI chrome are still visible)
- Console errors (filter out expected WebGL warnings)
- DOM checks (element existence, computed styles, attribute values)
- JavaScript evaluation results (map state queries)
