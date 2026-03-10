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

- MapLibre GL requires WebGL — agent-browser must support WebGL rendering for map screenshots
- Map tiles load asynchronously — wait 2-3 seconds after page load before taking map screenshots
- 3D buildings only visible when pitch > 0 — screenshots should be taken after setting camera pitch
