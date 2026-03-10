# Environment

Environment variables, external dependencies, and setup notes.

**What belongs here:** Required env vars, external API keys/services, dependency quirks, platform-specific notes.
**What does NOT belong here:** Service ports/commands (use `.factory/services.yaml`).

---

## Environment Variables

- `ADMIN_PASSWORD` — Password for the admin panel at /admin. Set in `.env.local`.
- `PORT` — Dev server port (default 3100). Set via services.yaml start command.

## External Dependencies

- **OpenFreeMap** — Free vector tiles at `https://tiles.openfreemap.org`. No API key needed. No rate limits. Uses OpenMapTiles schema with `building` source-layer containing `render_height` data.
- **Google Fonts** — CDN for Orbitron, Share Tech Mono, Rajdhani, VT323. No API key needed.

## Platform Notes

- Node.js v24.11.1, pnpm 10.24.0
- MapLibre GL JS requires `window`/DOM — must use dynamic imports with `ssr: false` in Next.js
- Import `maplibre-gl/dist/maplibre-gl.css` for controls/popups to render correctly
